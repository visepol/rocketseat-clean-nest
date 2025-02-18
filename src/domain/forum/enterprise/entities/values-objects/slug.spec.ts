import { test, expect } from 'vitest'
import { Slug } from './slug'

test('should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('How to create a new slug')
  expect(slug.value).toEqual('how-to-create-a-new-slug')
})
