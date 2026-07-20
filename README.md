# tailwind-merge-typography

Teach [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) how to resolve conflicts between [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography) `prose-*` classes, so conditional prose variants collapse to the last one instead of piling up.

`tailwind-merge` ships no knowledge of the typography plugin (it's a plugin, not core Tailwind), so out of the box it leaves conflicting prose classes untouched:

```ts
import { twMerge } from 'tailwind-merge'

twMerge('prose-sm prose-lg') // => 'prose-sm prose-lg'  (both kept, wrong)
twMerge('prose-gray prose-zinc') // => 'prose-gray prose-zinc'  (both kept, wrong)
```

With this plugin they resolve the way you'd expect:

```ts
import { extendTailwindMerge } from 'tailwind-merge'
import { withTypography } from 'tailwind-merge-typography'

const twMerge = extendTailwindMerge(withTypography)

twMerge('prose-sm prose-lg') // => 'prose-lg'
twMerge('prose-gray prose-zinc') // => 'prose-zinc'
```

## Install

```sh
bun add tailwind-merge-typography
```

`tailwind-merge` is a peer dependency, so install it too if you haven't already:

```sh
bun add tailwind-merge
```

## Usage

Wrap your `twMerge` once with `extendTailwindMerge` and use it everywhere (including inside a `cn()`/`clsx` helper):

```ts
import { extendTailwindMerge } from 'tailwind-merge'
import { withTypography } from 'tailwind-merge-typography'

export const twMerge = extendTailwindMerge(withTypography)
```

Size and color are independent groups, so they never clobber each other. Only same-group conflicts collapse:

```ts
twMerge('prose prose-lg prose-gray') // => 'prose prose-lg prose-gray'  (all independent)
twMerge('prose-gray prose-invert') // => 'prose-gray prose-invert'  (color + dark toggle)
twMerge('prose-blue prose-gray') // => 'prose-gray'  (both are colors)
```

`withTypography` composes with any other `tailwind-merge` plugins, in any order:

```ts
const twMerge = extendTailwindMerge(withTypography, someOtherPlugin)
```

### Custom prose themes

Registered a custom color or size in your Tailwind config (say `prose-brand` or `prose-3xl`)? `createTypographyPlugin` appends them to the built-in defaults so they merge too:

```ts
import { extendTailwindMerge } from 'tailwind-merge'
import { createTypographyPlugin } from 'tailwind-merge-typography'

const twMerge = extendTailwindMerge(
  createTypographyPlugin({ colors: ['brand'], sizes: ['3xl'] }),
)

twMerge('prose-gray prose-brand') // => 'prose-brand'
twMerge('prose-lg prose-3xl') // => 'prose-3xl'
```

`withTypography` is just `createTypographyPlugin()` with no custom themes, so you never lose the 22 built-in colors or 5 built-in sizes by using the factory.

### Element variants work automatically

Element modifiers like `prose-a:` and `prose-headings:` need no plugin code. `tailwind-merge` already dedupes any `foo:`-prefixed variant, so they resolve out of the box:

```ts
twMerge('prose-a:text-red-500 prose-a:text-blue-500') // => 'prose-a:text-blue-500'
```

## Compatibility

One package serves both major Tailwind lines, because the `prose-*` class names and the `tailwind-merge` config API are identical across them:

| Tailwind CSS | tailwind-merge |
| ------------ | -------------- |
| v3           | v2             |
| v4           | v3             |

The peer range is `tailwind-merge >=2.0.0 <4`.

## Editor setup

This repo uses [Biome](https://biomejs.dev) for lint and format. Install the `biomejs.biome` extension and format-on-save is preconfigured in `.vscode/settings.json` (Cursor reads it too).

## License

[MIT](./LICENSE) © Leonid Svyatov
