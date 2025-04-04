const keyMetaRegex = /\[(.*?)\]$/

const getAllKeys = (res, lngs) => {
  const keys = []
  lngs.forEach((l) => {
    const ks = Object.keys(res[l])
    ks.forEach((k) => {
      if (keys.indexOf(k) < 0) {
        keys.push(k)
      }
    })
  })
  return keys.sort().sort((a, b) => {
    const aMatch = a.match(keyMetaRegex)
    const bMatch = b.match(keyMetaRegex)
    let aTest = a
    let bTest = b
    if (aMatch) aTest = a.substring(0, aMatch.index)
    if (bMatch) bTest = b.substring(0, bMatch.index)
    if (aTest === bTest) return 0
    return aTest > bTest ? 1 : -1
  })
}

export default function locize2xcstrings (data) {
  const result = {
    sourceLanguage: data.sourceLng || Object.keys(data.resources || {})[0],
    strings: {},
    version: data.version || '1.0'
  }
  const lngs = Object.keys(data.resources).sort()
  const keys = getAllKeys(data.resources, lngs)
  lngs.forEach((l) => {
    keys.forEach((k) => {
      const regRes = k.match(keyMetaRegex)
      let key
      let keyMeta
      let subKey
      let subKeyMeta
      if (!regRes) {
        key = k
      } else {
        key = k.substring(0, regRes.index)
        keyMeta = regRes[1]
        const subRegRes = keyMeta.match(keyMetaRegex)
        if (subRegRes) {
          subKey = keyMeta.substring(0, subRegRes.index)
          subKeyMeta = subRegRes[1]
        }
      }
      result.strings[key] ||= {}
      if (!result.strings[key].comment && data.resources[result.sourceLanguage]?.[k]?.context?.text) {
        result.strings[key].comment = data.resources[result.sourceLanguage][k]?.context?.text
      }
      if (data.resources[l][k] === undefined || data.resources[l][k] === null) return

      if (typeof data.resources[l][k] === 'string') {
        data.resources[l][k] = {
          value: data.resources[l][k]
        }
      }
      if (!keyMeta && data.resources[l][k].value !== undefined) {
        result.strings[key].localizations ||= {}
        result.strings[key].localizations[l] ||= {}
        result.strings[key].localizations[l].stringUnit = {
          state: 'translated',
          value: data.resources[l][k].value
        }
      } else if (keyMeta) {
        result.strings[key].localizations ||= {}
        result.strings[key].localizations[l] ||= {}
        if (!subKeyMeta) {
          const splitted = keyMeta.split('.')
          splitted.reduce((r, s) => {
            r[s] ||= {}
            if (s === splitted[splitted.length - 1]) {
              r[s].stringUnit = {
                state: 'translated',
                value: data.resources[l][k].value
              }
            }
            return r[s]
          }, result.strings[key].localizations[l])
        } else {
          const splitted = subKey.split('.')
          splitted.reduce((r, s) => {
            r[s] ||= {}
            if (s === splitted[splitted.length - 1]) {
              const splitted = subKeyMeta.split('.')
              splitted.reduce((r, s) => {
                r[s] ||= {}
                if (s === splitted[splitted.length - 1]) {
                  r[s].stringUnit = {
                    state: 'translated',
                    value: data.resources[l][k].value
                  }
                }
                return r[s]
              }, r[s])
            }
            return r[s]
          }, result.strings[key].localizations[l])
        }
      }
    })
  })
  const str = JSON.stringify(result, null, 2)
  return str.replace(/"\s*:\s*/g, '" : ').replace(/:\s*{},\s*/g, ': {\n\n    },\n    ')
}
