import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  example: {
    js: JSON.parse(readFileSync(join(__dirname, 'example.json')).toString()),
    xcstrings: JSON.parse(readFileSync(join(__dirname, 'example.xcstrings')).toString())
  }
}
