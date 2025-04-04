import test from 'node:test'
import assert from 'node:assert'
import fixtures from './fixtures/index.js'
import { xcstrings2locize, locize2xcstrings } from '../index.js'

test('xcstrings2locize', (t) => {
  const ret = xcstrings2locize(fixtures.example.xcstrings)
  // console.log(JSON.stringify(ret, null, 2))
  assert.deepEqual(ret, fixtures.example.js)

  const ret2 = xcstrings2locize(JSON.parse(fixtures.example.xcstrings))
  // console.log(JSON.stringify(ret, null, 2))
  assert.deepEqual(ret2, fixtures.example.js)
})

test('locize2xcstrings', (t) => {
  const ret = locize2xcstrings(fixtures.example.js)
  assert.deepEqual(JSON.parse(ret), JSON.parse(fixtures.example.xcstrings))
  assert.equal(ret, fixtures.example.xcstrings)
})

test('locize2xcstrings (direct value)', (t) => {
  const ex = { ...fixtures.example.js }
  ex.resources.en.key3 = ex.resources.en.key3.value
  ex.resources.en['vars[variations.device.other]'] = ex.resources.en['vars[variations.device.other]'].value
  ex.resources.en['vars-pluralized-dev[variations.device.iphone[variations.plural.other]]'] = ex.resources.en['vars-pluralized-dev[variations.device.iphone[variations.plural.other]]'].value
  const ret = locize2xcstrings(ex)
  assert.deepEqual(JSON.parse(ret), JSON.parse(fixtures.example.xcstrings))
  assert.equal(ret, fixtures.example.xcstrings)
})
