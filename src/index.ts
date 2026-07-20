import { type Config, mergeConfigs } from 'tailwind-merge'

/** A `tailwind-merge` config with arbitrary class/theme group ids. */
export type GenericConfig = Config<string, string>

/** The four class-group ids this plugin registers. */
export type ProseClassGroupId = 'prose' | 'prose-invert' | 'prose-size' | 'prose-color'

/** The 5 built-in typography sizes (`@tailwindcss/typography` `src/styles.js`). */
const SIZES = ['sm', 'base', 'lg', 'xl', '2xl']

/** The 22 built-in typography colors: 5 gray scales + 17 named link themes. */
const COLORS = [
  'gray',
  'slate',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]

/**
 * Build a `tailwind-merge` plugin for `@tailwindcss/typography`.
 *
 * `colors`/`sizes` are appended to the built-in defaults, so custom themes
 * (e.g. `prose-brand`) merge correctly without losing the built-ins.
 */
export function createTypographyPlugin(
  opts: { colors?: string[]; sizes?: string[] } = {},
): (config: GenericConfig) => GenericConfig {
  const sizes = [...SIZES, ...(opts.sizes ?? [])]
  const colors = [...COLORS, ...(opts.colors ?? [])]

  return (config) =>
    mergeConfigs<ProseClassGroupId>(config, {
      extend: {
        classGroups: {
          prose: ['prose'],
          'prose-invert': ['prose-invert'],
          'prose-size': [{ prose: sizes }],
          'prose-color': [{ prose: colors }],
        },
      },
    })
}

/** Zero-config plugin: the 22 built-in colors + 5 sizes. */
export const withTypography: (config: GenericConfig) => GenericConfig = createTypographyPlugin()

export default withTypography
