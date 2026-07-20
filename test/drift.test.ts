import { expect, test } from 'bun:test'
// Deep import: the package's default export is the raw styles map, keyed by
// modifier name (DEFAULT + sizes + colors + invert). This is an internal path,
// not the public export; if a future release blocks it the test fails loudly,
// which is itself a valid drift signal. The package
// ships no declaration for this internal path, so `styles` is untyped `any`;
// we only call `Object.keys` on it, so that's fine.
import styles from '@tailwindcss/typography/src/styles.js'
import { COLORS, SIZES } from '../src/index'

// Compare the whole key set rather than parsing sizes vs colors. The
// bucket (size or color) isn't recoverable from the styles object and isn't
// needed to detect drift; a human classifies any newly-appeared key.
test('SIZES + COLORS match the typography built-in modifier set', () => {
  const actual = new Set(Object.keys(styles))
  const expected = new Set(['DEFAULT', 'invert', ...SIZES, ...COLORS])
  expect(actual).toEqual(expected)
})
