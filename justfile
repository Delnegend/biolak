export NODE_OPTIONS := "--no-deprecation"

@default:
  just --choose

# Minify JSON files in the migrations directory
minify-json:
  #!/usr/bin/env bash
  set -euo pipefail

  # Define a function to minify a single JSON file
  minify_single_json_file() {
    local file="$1"
    echo "Minifying $file..."
    # Use python to load and dump the json compactly, writing to a temp file first
    # The python script takes the input file path as its first argument (sys.argv[1])
    python3 -c "import json, sys; data = json.load(open(sys.argv[1])); json.dump(data, open(sys.argv[1]+'.tmp', 'w'), separators=(',', ':'))" "$file"
    # Replace the original file with the minified version
    mv "$file.tmp" "$file"
  }

  # Export the function so it's available to parallel's child processes
  export -f minify_single_json_file

  # Find all .json files in src/migrations/ and process them in parallel
  # -print0 and -0 handle filenames with spaces or special characters
  find src/migrations/ -name '*.json' -print0 | parallel -0 minify_single_json_file

  echo "JSON minification complete."


dev:
  pnpm next dev --turbo

build:
  pnpm next build --turbo

gen-importmap:
  pnpm payload generate:importmap

gen-types:
  pnpm payload generate:types

gen-db-schema:
  pnpm payload generate:db-schema

db-start-migrate:
  pnpm payload migrate

db-create-migrate:
  pnpm payload migrate:create
  just minify-json

db-dev-pg-start:
  docker compose up -d postgres-dev

lint:
  pnpm next lint --fix && pnpm prettier --write --list-different .

payload:
  pnpm payload

reinstall:
  pnpm rm -rf node_modules && rm pnpm-lock.yaml && pnpm --ignore-workspace install

start:
  pnpm next start

backup-prod:
  #!/usr/bin/env bash
  set -euo pipefail

  # Stop the services
  docker compose down

  # Create backup directory if it doesn't exist
  mkdir -p ./backup

  # Get current timestamp
  TIMESTAMP=$(date +%Y-%m-%d-%H-%M-%S)

  # Define the backup file name
  BACKUP_FILE="./backup/$TIMESTAMP.tar.gz"

  # Create the archive
  tar -czvf "$BACKUP_FILE" \
    --exclude="./public/thumbs" \
    ./postgres-data ./public

  echo "Backup created: $BACKUP_FILE"

  # Start the services
  docker compose up -d

update:
  docker compose down && git pull --rebase && docker compose up -d

# check if the prod would build successfully
test-build:
  docker compose up postgres-test-prod server-test-prod
  docker compose down postgres-test-prod server-test-prod

test-google-drive-upload:
  #!/usr/bin/env bash
  set -euo pipefail # Exit on error, undefined variable, or pipe failure

  # --- Instructions for use ---
  # 1. Obtain an OAuth 2.0 Access Token for the Google Drive API.
  #    - Scope: https://www.googleapis.com/auth/drive.file
  #    - Tool: https://developers.google.com/oauthplayground
  # 2. Set ACCESS_TOKEN environment variable: export ACCESS_TOKEN="your_token"
  # 3. Find your Google Drive Folder ID (from URL).
  # 4. Set GDRIVE_FOLDER_ID environment variable: export GDRIVE_FOLDER_ID="your_folder_id"
  # 5. Ensure 'jq' is installed: sudo apt update && sudo apt install -y jq
  # 6. Run: just test-google-drive-upload
  # --- End Instructions ---

  # --- Configuration & Pre-flight Checks ---
  if [ -z "${ACCESS_TOKEN:-}" ]; then
    echo "Error: ACCESS_TOKEN environment variable is not set." >&2
    echo "Please obtain an OAuth 2.0 access token for Google Drive API and set it." >&2
    exit 1
  fi

  if [ -z "${GDRIVE_FOLDER_ID:-}" ]; then
    echo "Error: GDRIVE_FOLDER_ID environment variable is not set." >&2
    echo "Please specify the Google Drive folder ID for uploads." >&2
    exit 1
  fi

  if ! command -v jq &> /dev/null; then
    echo "Error: 'jq' command not found. Please install jq." >&2
    echo "  On Debian/Ubuntu: sudo apt install -y jq" >&2
    exit 1
  fi

  BACKUP_DIR="./backup"
  if [ ! -d "$BACKUP_DIR" ]; then
    echo "Error: Backup directory '$BACKUP_DIR' does not exist." >&2
    exit 1
  fi

  if [ -z "$(ls -A "$BACKUP_DIR" 2>/dev/null)" ]; then
    echo "Info: Backup directory '$BACKUP_DIR' is empty. Nothing to upload."
    exit 0
  fi

  echo "Starting Google Drive upload from '$BACKUP_DIR' to folder ID '$GDRIVE_FOLDER_ID'..."

  # --- Main Loop for Processing Files ---
  find "$BACKUP_DIR" -type f -print0 | while IFS= read -r -d $'\0' file_path; do
    filename=$(basename "$file_path")
    echo "Processing '$filename'..."

    # 1. Escape filename for Google Drive query (handles ' and \)
    escaped_gdrive_query_filename=$(echo -n "$filename" | sed "s/'/\\\\'/g; s/\\\\/\\\\\\\\/g")
    query="name = '$escaped_gdrive_query_filename' and '$GDRIVE_FOLDER_ID' in parents and trashed = false"
    encoded_query=$(echo -n "$query" | jq -sRr @uri)

    echo "  Checking existence on Google Drive..."
    check_response_json=$(curl --fail -sS -X GET \
      "https://www.googleapis.com/drive/v3/files?q=${encoded_query}&fields=files(id,name)&pageSize=1" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Accept: application/json")
    curl_exit_status=$?

    if [ $curl_exit_status -ne 0 ]; then
      echo "  Error: Failed to check file existence for '$filename' (curl exit code: $curl_exit_status)." >&2
      if echo "$check_response_json" | jq -e '.error' > /dev/null 2>&1; then
        error_message=$(echo "$check_response_json" | jq -r '.error.message')
        echo "  Google API Error: $error_message" >&2
        if [[ "$error_message" == *"Invalid Credentials"* || "$error_message" == *"Login Required"* || "$error_message" == *"insufficientPermissions"* ]]; then
          echo "  Critical Error: Invalid/expired ACCESS_TOKEN or insufficient permissions. Aborting." >&2
          exit 1
        fi
      else
         echo "  Curl error details may be in preceding lines or response was empty: $check_response_json" >&2
      fi
      continue
    fi

    file_count=$(echo "$check_response_json" | jq '.files | length')

    if [ "$file_count" -gt 0 ]; then
      file_id=$(echo "$check_response_json" | jq -r '.files[0].id')
      echo "  Skipping '$filename': Already exists on Google Drive (ID: $file_id)."
    else
      echo "  Uploading '$filename'..."
      mimetype="application/octet-stream" # Default
      case "$filename" in
        *.tar.gz) mimetype="application/gzip" ;; *.gz) mimetype="application/gzip" ;;
        *.zip)    mimetype="application/zip" ;;  *.json) mimetype="application/json" ;;
        *.txt)    mimetype="text/plain" ;;      *.jpg|*.jpeg) mimetype="image/jpeg" ;;
        *.png)    mimetype="image/png" ;;       *.pdf) mimetype="application/pdf" ;;
      esac

      metadata_json=$(jq -n --arg name "$filename" --arg folder_id "$GDRIVE_FOLDER_ID" \
        '{name: $name, parents: [$folder_id]}')

      upload_response_json=$(curl --fail -sS -X POST \
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -F "metadata=${metadata_json};type=application/json;charset=UTF-8" \
        -F "file=@${file_path};type=${mimetype}")
      curl_exit_status=$?

      if [ $curl_exit_status -ne 0 ]; then
        echo "  Error: Upload failed for '$filename' (curl exit code: $curl_exit_status)." >&2
        if echo "$upload_response_json" | jq -e '.error' > /dev/null 2>&1; then
          error_message=$(echo "$upload_response_json" | jq -r '.error.message')
          echo "  Google API Error: $error_message" >&2
          if [[ "$error_message" == *"Invalid Credentials"* || "$error_message" == *"Login Required"* || "$error_message" == *"insufficientPermissions"* ]]; then
            echo "  Critical Error: Invalid/expired ACCESS_TOKEN or insufficient permissions. Aborting." >&2
            exit 1
          fi
        else
          echo "  Curl error details may be in preceding lines or response was empty: $upload_response_json" >&2
        fi
        continue
      fi

      uploaded_file_id=$(echo "$upload_response_json" | jq -r '.id // "null"')
      uploaded_file_name=$(echo "$upload_response_json" | jq -r '.name // "null"')

      if [ "$uploaded_file_id" != "null" ]; then
        echo "  Successfully uploaded '$filename' as '$uploaded_file_name' (ID: $uploaded_file_id)."
      else
        echo "  Upload command for '$filename' seemed to succeed, but could not parse file ID/name from response." >&2
        echo "  Response: $upload_response_json" >&2
      fi
    fi
  done

  echo "Google Drive upload process finished."
