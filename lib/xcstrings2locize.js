const checkForComment = (data, result, l, key, keyMeta = '') => {
  if (l === result.sourceLng && data.strings[key].comment) {
    result.resources[l][`${key}${keyMeta}`] ||= {}
    result.resources[l][`${key}${keyMeta}`].context = {
      text: data.strings[key].comment
    }
  }
}

export default function xcstrings2locize (data) {
  if (typeof data === 'string') data = JSON.parse(data)

  const result = {
    sourceLng: data.sourceLanguage,
    resources: {
      [data.sourceLanguage]: {}
    },
    version: data.version
  }

  const lngs = []
  const keys = Object.keys(data.strings)
  keys.forEach((key) => {
    const lngsForKey = Object.keys(data.strings[key].localizations || {})
    lngsForKey.forEach((l) => {
      if (lngs.indexOf(l) < 0) {
        lngs.push(l)
        result.resources[l] ||= {}
      }
    })

    if (lngsForKey.length === 0) {
      result.resources[result.sourceLng][key] ||= {}
    }

    lngsForKey.forEach((l) => {
      if (data.strings[key].localizations[l]?.stringUnit?.value !== undefined) {
        result.resources[l][key] ||= {}
        result.resources[l][key].value = data.strings[key].localizations[l].stringUnit.value
        checkForComment(data, result, l, key)
      } else if (data.strings[key].localizations[l]?.variations && data.strings[key].localizations[l]?.variations?.plural) {
        const pluralForms = Object.keys(data.strings[key].localizations[l].variations.plural)
        pluralForms.forEach((pf, i) => {
          const keyMeta = `[variations.plural.${pf}]`
          if (data.strings[key].localizations[l].variations.plural[pf]?.stringUnit?.value !== undefined) {
            result.resources[l][`${key}${keyMeta}`] ||= {}
            result.resources[l][`${key}${keyMeta}`].value = data.strings[key].localizations[l].variations.plural[pf].stringUnit.value
          }
          if (i === 0) checkForComment(data, result, l, key, keyMeta)
        })
      } else if (data.strings[key].localizations[l]?.variations && data.strings[key].localizations[l]?.variations?.device) {
        const devices = Object.keys(data.strings[key].localizations[l].variations.device)
        devices.forEach((d, i) => {
          const keyMeta = `[variations.device.${d}]`
          if (data.strings[key].localizations[l].variations.device[d]?.stringUnit?.value !== undefined) {
            result.resources[l][`${key}${keyMeta}`] ||= {}
            result.resources[l][`${key}${keyMeta}`].value = data.strings[key].localizations[l].variations.device[d].stringUnit.value
            if (i === 0) checkForComment(data, result, l, key, keyMeta)
          } else if (data.strings[key].localizations[l].variations.device[d]?.variations?.plural) {
            const subPluralForms = Object.keys(data.strings[key].localizations[l].variations.device[d].variations.plural)
            subPluralForms.forEach((pf, j) => {
              const subKeyMeta = `[variations.device.${d}[variations.plural.${pf}]]`
              if (data.strings[key].localizations[l].variations.device[d].variations.plural[pf]?.stringUnit?.value !== undefined) {
                result.resources[l][`${key}${subKeyMeta}`] ||= {}
                result.resources[l][`${key}${subKeyMeta}`].value = data.strings[key].localizations[l].variations.device[d].variations.plural[pf].stringUnit.value
              }
              if (i === 0 && j === 0) checkForComment(data, result, l, key, subKeyMeta)
            })
          }
        })
      }
    })
  })

  return result
}
