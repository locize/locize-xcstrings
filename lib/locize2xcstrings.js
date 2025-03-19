const keyMetaRegex = /\[(.*?)\]$/

export default function locize2xcstrings (data) {
  const result = {
    sourceLanguage: data.sourceLng || Object.keys(data.resources || {})[0],
    strings: {},
    version: data.version || '1.0'
  }
  const lngs = Object.keys(data.resources)
  lngs.forEach((l) => {
    const keys = Object.keys(data.resources[l])
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
      if (l === result.sourceLanguage && data.resources[l][k]?.context?.text) {
        result.strings[key].comment = data.resources[l][k]?.context?.text
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
  return result
}
