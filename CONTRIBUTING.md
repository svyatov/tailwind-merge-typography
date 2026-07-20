# Contributing

Thanks for wanting to help. This is a small, single-file plugin, so the loop is short.

## Setup

This repo uses [Bun](https://bun.sh). Clone it, then:

```sh
bun install
```

## The loop

The source lives in `src/index.ts` and its tests in `test/index.test.ts`. Before opening a PR, make sure the same checks CI runs pass locally:

```sh
bun test        # add --coverage to see coverage locally
bun run check   # Biome lint + format
bun run typecheck
bun run build   # verify the dist build and type emit
```

Format-on-save is preconfigured for the `biomejs.biome` editor extension (see `.vscode/settings.json`), so most style issues fix themselves as you write.

## Pull requests

Keep changes focused and covered by a test. New `prose-*` resolution behavior should come with a case in `test/index.test.ts` that fails before your change and passes after. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org).

Releases publish automatically when a `v*` tag is pushed, so you don't need to touch versions or the registry in a PR.
