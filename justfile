export NODE_OPTIONS := "--no-deprecation"

@default:
    just --choose

# Minify JSON files in the migrations directory & rm trailing spaces
minify-migrations:
    #!/usr/bin/env bun
    import { unlink } from "node:fs/promises";

    /**
     * CONFIGURATION
     */
    const MIGRATIONS_DIR = "src/migrations";
    const CONCURRENCY_LIMIT = 10; // Number of files to process simultaneously

    /**
     * Minifies a JSON file by removing all unnecessary whitespace.
     */
    async function minifyJson(path: string) {
        try {
            const file = Bun.file(path);
            const data = await file.json();
            // Bun.write is atomic and significantly faster than Node fs
            await Bun.write(path, JSON.stringify(data));
            console.log(`✅ Minified JSON: ${path}`);
        } catch (error) {
            console.error(`❌ Failed to minify JSON [${path}]:`, error);
        }
    }

    /**
     * Removes trailing whitespace from each line of a TypeScript file.
     */
    async function removeTrailingSpaces(path: string) {
        try {
            const file = Bun.file(path);
            const text = await file.text();

            // Regex logic: matches spaces/tabs at the end of lines ($)
            const cleaned = text.replace(/[ \t]+$/gm, "");

            await Bun.write(path, cleaned);
            console.log(`✨ Cleaned TS: ${path}`);
        } catch (error) {
            console.error(`❌ Failed to process TS [${path}]:`, error);
        }
    }

    /**
     * Helper to process a list of tasks with a concurrency limit.
     */
    async function runWithLimit(tasks: (() => Promise<void>)[], limit: number) {
        const active = new Set<Promise<void>>();
        for (const task of tasks) {
            const promise = task().finally(() => active.delete(promise));
            active.add(promise);
            if (active.size >= limit) await Promise.race(active);
        }
        await Promise.all(active);
    }

    async function main() {
        console.log(`🚀 Starting migration cleanup in ${MIGRATIONS_DIR}...\n`);

        // Use the Glob class constructor for better compatibility with Bun v1.1+
        const jsonGlob = new Bun.Glob("**/*.json");
        const tsGlob = new Bun.Glob("**/*.ts");

        // scanSync returns an Iterable, we spread it into an array
        const jsonFiles = [...jsonGlob.scanSync(MIGRATIONS_DIR)];
        const tsFiles = [...tsGlob.scanSync(MIGRATIONS_DIR)];

        const allTasks: (() => Promise<void>)[] = [
            ...jsonFiles.map((f) => () => minifyJson(`${MIGRATIONS_DIR}/${f}`)),
            ...tsFiles.map((f) => () => removeTrailingSpaces(`${MIGRATIONS_DIR}/${f}`)),
        ];

        if (allTasks.length === 0) {
            console.log("No files found to process.");
            return;
        }

        const start = performance.now();
        await runWithLimit(allTasks, CONCURRENCY_LIMIT);
        const end = performance.now();

        console.log(
            `\n🎉 Finished processing ${allTasks.length} files in ${((end - start) / 1000).toFixed(2)}s.`,
        );
    }

    main();

dev:
    bun x next dev --turbo

build:
    bun x next build --turbo --experimental-build-mode compile

gen-importmap:
    bun x payload generate:importmap --disable-transpile

gen-types:
    bun x payload generate:types --disable-transpile

gen-db-schema:
    bun x payload generate:db-schema --disable-transpile

db-create-migrate:
    bun x payload migrate:create --disable-transpile
    just minify-migrations

lint:
    bun x next lint --fix && \
    bun x prettier --write --list-different \
        .devcontainer/devcontainer.json \
        .vscode \
        docs \
        public \
        src \
        *.{json,js,mjs,cjs,ts,md}

docker-image-build:
    docker buildx build --load \
        -t ghcr.io/delnegend/biolak:$(git rev-parse --short HEAD) \
        -t ghcr.io/delnegend/biolak:latest .

docker-image-publish:
    docker buildx build \
        -t ghcr.io/delnegend/biolak:latest \
        -t ghcr.io/delnegend/biolak:$(git rev-parse --short HEAD) \
        -o type=image,push=true,compression=zstd .

docker-image-save:
    docker save ghcr.io/delnegend/biolak:latest | gzip > biolak-latest.tar.gz
