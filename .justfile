export NODE_OPTIONS := "--no-deprecation"

@default:
    just --choose

dev:
    #!/usr/bin/env bash
    pnpm next dev

build:
    #!/usr/bin/env bash
    pnpm next build --experimental-build-mode compile

gen-importmap:
    #!/usr/bin/env bash
    pnpm payload generate:importmap

gen-types:
    #!/usr/bin/env bash
    pnpm payload generate:types

gen-db-schema:
    #!/usr/bin/env bash
    pnpm payload generate:db-schema

db-create-migrate:
    #!/usr/bin/env bash
    pnpm run payload migrate:create

check:
    #!/usr/bin/env bash
    start_time=$(date +%s%N)

    pnpm eslint . --fix
    pnpm prettier --write --list-different \
        .devcontainer/devcontainer.json \
        .vscode \
        docs \
        public \
        src \
        *.{json,js,mjs,cjs,ts,md}

    end_time=$(date +%s%N)
    duration=$(( (end_time - start_time) / 1000000 ))
    echo "Linting and formatting completed in ${duration} ms."

docker-image-build:
    #!/usr/bin/env bash
    docker buildx build --load \
        -t ghcr.io/delnegend/biolak:$(git rev-parse --short HEAD) \
        -t ghcr.io/delnegend/biolak:latest .

docker-image-publish:
    #!/usr/bin/env bash
    TAG=$(git rev-parse --short HEAD)
    docker push --compression-format zstd --compression-level 9 ghcr.io/delnegend/biolak:latest
    docker push --compression-format zstd --compression-level 9 ghcr.io/delnegend/biolak:$TAG

docker-image-save:
    #!/usr/bin/env bash
    docker save ghcr.io/delnegend/biolak:latest | zstd -T0 -9 - > biolak-latest.tzst
