import { describe, expect, test } from 'bun:test'
import { extendTailwindMerge } from 'tailwind-merge'
import { createTypographyPlugin, withTypography } from '../src/index'

const twMerge = extendTailwindMerge(withTypography)

describe('withTypography', () => {
  test('core size/color conflicts collapse to last', () => {
    expect(twMerge('prose-gray prose-zinc')).toBe('prose-zinc')
    expect(twMerge('prose-base prose-lg')).toBe('prose-lg')
    expect(twMerge('prose-sm prose-lg')).toBe('prose-lg')
  })

  test('named color themes are built-in and merge', () => {
    expect(twMerge('prose-blue prose-gray')).toBe('prose-gray')
    expect(twMerge('prose-rose prose-blue')).toBe('prose-blue')
  })

  test('size / color / base / invert never cross-conflict', () => {
    expect(twMerge('prose prose-lg prose-gray')).toBe('prose prose-lg prose-gray')
    expect(twMerge('prose-gray prose-invert')).toBe('prose-gray prose-invert')
  })

  test('base marker dedupes', () => {
    expect(twMerge('prose prose')).toBe('prose')
  })

  test('element variants already work (regression guard)', () => {
    expect(twMerge('prose-a:text-red-500 prose-a:text-blue-500')).toBe('prose-a:text-blue-500')
  })

  test('normal merging is unbroken', () => {
    expect(twMerge('p-2 p-4')).toBe('p-4')
  })

  test('genuinely custom color passes through by default', () => {
    expect(twMerge('prose-brand prose-gray')).toBe('prose-brand prose-gray')
  })
})

describe('createTypographyPlugin', () => {
  test('registers a custom color (now a real prose-color member, last wins)', () => {
    const tw = extendTailwindMerge(createTypographyPlugin({ colors: ['brand'] }))
    // undecorated twMerge keeps both; once registered they conflict and last wins
    expect(tw('prose-gray prose-brand')).toBe('prose-brand')
  })

  test('registers a custom size (symmetric with colors)', () => {
    const tw = extendTailwindMerge(createTypographyPlugin({ sizes: ['3xl'] }))
    expect(tw('prose-lg prose-3xl')).toBe('prose-3xl')
  })

  test('custom values append to built-in defaults, never replace them', () => {
    const tw = extendTailwindMerge(createTypographyPlugin({ colors: ['brand'] }))
    expect(tw('prose-gray prose-zinc')).toBe('prose-zinc')
  })
})
