import test from 'node:test'
import assert from 'node:assert'
import fixtures from './fixtures/index.js'
import { xcstrings2locize, locize2xcstrings } from '../index.js'

test('xcstrings2locize', (t) => {
  const ret = xcstrings2locize(fixtures.example.xcstrings)
  // console.log(JSON.stringify(ret, null, 2))
  assert.deepEqual(ret, fixtures.example.js)
})

test('locize2xcstrings', (t) => {
  const ret = locize2xcstrings(fixtures.example.js)
  // console.log(JSON.stringify(ret, null, 2))
  assert.deepEqual(ret, fixtures.example.xcstrings)
})
