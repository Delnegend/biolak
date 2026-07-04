export NODE_OPTIONS := "--no-deprecation"

@default:
    just --choose

dev:
    pnpm next dev

build:
    pnpm next build --experimental-build-mode compile

gen-stuffs:
    #!/usr/bin/env bash
    pnpm payload generate:types
    pnpm payload generate:db-schema
    pnpm payload generate:importmap

db-create-migrate:
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
    pnpm tsc --noEmit

    end_time=$(date +%s%N)
    duration=$(( (end_time - start_time) / 1000000 ))
    echo "Linting, formatting, and type-checking completed in ${duration} ms."

docker-image-build:
    docker buildx build --load \
        -t ghcr.io/delnegend/biolak:$(git rev-parse --short HEAD) \
        -t ghcr.io/delnegend/biolak:latest .

docker-image-publish:
    #!/usr/bin/env bash
    TAG=$(git rev-parse --short HEAD)
    docker push --compression-format zstd --compression-level 9 ghcr.io/delnegend/biolak:latest
    docker push --compression-format zstd --compression-level 9 ghcr.io/delnegend/biolak:$TAG

docker-image-save:
    docker save ghcr.io/delnegend/biolak:latest | zstd -T0 -9 - > biolak-latest.tzst
