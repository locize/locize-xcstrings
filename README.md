[![CI](https://github.com/locize/locize-xcstrings/actions/workflows/ci.yml/badge.svg)](https://github.com/locize/locize-xcstrings/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/locize-xcstrings.svg)](https://npmjs.org/package/locize-xcstrings)

## Download

The source is available for download from
[GitHub](https://github.com/locize/locize-xcstrings/archive/master.zip).
Alternatively, you can install using npm:

```sh
npm install --save locize-xcstrings
```

You can then `import` or `require()` locize-xcstrings as normal:

```js
import converter from 'locize-xcstrings'
// or
const converter = require('locize-xcstrings')

const locizeData = converter.xcstrings2locize(xcstrings)
const xcstrings = converter.locize2xcstrings(locizeData)
```

Or you can direclty `import` or `require()` its functions:

```js
import xcstrings2locize from 'locize-xcstrings/xcstrings2locize'
import { xcstrings2locize, locize2xcstrings } from 'locize-xcstrings'
// or
const xcstrings2locize = require('locize-xcstrings/cjs/xcstrings2locize')
```

## Usage

```js
const xcstrings = `{
  "sourceLanguage" : "en",
  "strings" : {
    "empty" : {
    },
    "empty-str" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : ""
          }
        }
      }
    },
    "empty-trans" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "source with value"
          }
        }
      }
    },
    "empty-trans-str" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : ""
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "source with value"
          }
        }
      }
    },
    "key1" : {
      "comment" : "some comment",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Hallo"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Hello"
          }
        }
      }
    },
    "key2.nested" : {
      "comment" : "comment",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "xcstrings Daten-Manager"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "xcstrings Data Manager"
          }
        }
      }
    },
    "interpolation" : {
      "comment" : "some substitution",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "%d von %d verbleiben"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "%d of %d remaining"
          }
        }
      }
    },
    "pluralized" : {
      "comment" : "Pluralized translation",
      "localizations" : {
        "de" : {
          "variations" : {
            "plural" : {
              "one" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "%lld Haus"
                }
              },
              "other" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "%lld Häuser"
                }
              }
            }
          }
        },
        "en" : {
          "variations" : {
            "plural" : {
              "one" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "%lld house"
                }
              },
              "other" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "%lld houses"
                }
              }
            }
          }
        }
      }
    },
    "vars" : {
      "localizations" : {
        "de" : {
          "variations" : {
            "device" : {
              "iphone" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "eine Übersetzung für das iPhone"
                }
              },
              "other" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "eine andere Übersetzung"
                }
              }
            }
          }
        },
        "en" : {
          "variations" : {
            "device" : {
              "iphone" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "a translation for the iPhone"
                }
              },
              "other" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "an other translation"
                }
              }
            }
          }
        }
      }
    },
    "vars-pluralized-dev" : {
      "comment" : "ctx1",
      "localizations" : {
        "de" : {
          "variations" : {
            "device" : {
              "appletv" : {
                "variations" : {
                  "plural" : {
                    "one" : {
                      "stringUnit" : {
                        "state" : "translated",
                        "value" : "ein Apple TV"
                      }
                    },
                    "other" : {
                      "stringUnit" : {
                        "state" : "translated",
                        "value" : "%lld Apple TVs"
                      }
                    }
                  }
                }
              },
              "iphone" : {
                "variations" : {
                  "plural" : {
                    "one" : {
                      "stringUnit" : {
                        "state" : "translated",
                        "value" : "ein Iphone"
                      }
                    },
                    "other" : {
                      "stringUnit" : {
                        "state" : "translated",
                        "value" : "%lld Iphones"
                      }
                    }
                  }
                }
              },
              "other" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "%lld Geräte"
                }
              }
            }
          }
        },
        "en" : {
          "variations" : {
            "device" : {
              "appletv" : {
                "variations" : {
                  "plural" : {
                    "one" : {
                      "stringUnit" : {
                        "state" : "translated",
                        "value" : "one apple tv"
                      }
                    },
                    "other" : {
                      "stringUnit" : {
                        "state" : "translated",
                        "value" : "%lld apple tvs"
                      }
                    }
                  }
                }
              },
              "iphone" : {
                "variations" : {
                  "plural" : {
                    "one" : {
                      "stringUnit" : {
                        "state" : "translated",
                        "value" : "an iphone"
                      }
                    },
                    "other" : {
                      "stringUnit" : {
                        "state" : "translated",
                        "value" : "%lld iphones"
                      }
                    }
                  }
                }
              },
              "other" : {
                "stringUnit" : {
                  "state" : "translated",
                  "value" : "%lld devices"
                }
              }
            }
          }
        }
      }
    }
  },
  "version" : "1.0"
}

const locizeData = {
  "sourceLng": "en",
  "resources": {
    "en": {
      "empty" : {},
      "empty-str" : {
        "value": ""
      },
      "empty-trans" : {
        "value" : "source with value"
      },
      "empty-trans-str" : {
        "value" : "source with value"
      },
      "key1": {
        "value": "Hello",
        "context": {
          "text": "some comment"
        }
      },
      "key2.nested": {
        "value": "xcstrings Data Manager",
        "context": {
          "text": "comment"
        }
      },
      "interpolation": {
        "value": "%d of %d remaining",
        "context": {
          "text": "some substitution"
        }
      },
      "pluralized[variations.plural.one]": {
        "value": "%lld house",
        "context": {
          "text": "Pluralized translation"
        }
      },
      "pluralized[variations.plural.other]": {
        "value": "%lld houses"
      },
      "vars[variations.device.iphone]": {
        "value": "a translation for the iPhone"
      },
      "vars[variations.device.other]": {
        "value": "an other translation"
      },
      "vars-pluralized-dev[variations.device.appletv[variations.plural.one]]": {
        "value": "one apple tv",
        "context": {
          "text": "ctx1"
        }
      },
      "vars-pluralized-dev[variations.device.appletv[variations.plural.other]]": {
        "value": "%lld apple tvs"
      },
      "vars-pluralized-dev[variations.device.iphone[variations.plural.one]]": {
        "value": "an iphone"
      },
      "vars-pluralized-dev[variations.device.iphone[variations.plural.other]]": {
        "value": "%lld iphones"
      },
      "vars-pluralized-dev[variations.device.other]": {
        "value": "%lld devices"
      }
    },
    "de": {
      "empty-trans-str" : {
        "value" : ""
      },
      "key1": {
        "value": "Hallo"
      },
      "key2.nested": {
        "value": "xcstrings Daten-Manager"
      },
      "interpolation": {
        "value": "%d von %d verbleiben"
      },
      "pluralized[variations.plural.one]": {
        "value": "%lld Haus"
      },
      "pluralized[variations.plural.other]": {
        "value": "%lld Häuser"
      },
      "vars[variations.device.iphone]": {
        "value": "eine Übersetzung für das iPhone"
      },
      "vars[variations.device.other]": {
        "value": "eine andere Übersetzung"
      },
      "vars-pluralized-dev[variations.device.appletv[variations.plural.one]]": {
        "value": "ein Apple TV"
      },
      "vars-pluralized-dev[variations.device.appletv[variations.plural.other]]": {
        "value": "%lld Apple TVs"
      },
      "vars-pluralized-dev[variations.device.iphone[variations.plural.one]]": {
        "value": "ein Iphone"
      },
      "vars-pluralized-dev[variations.device.iphone[variations.plural.other]]": {
        "value": "%lld Iphones"
      },
      "vars-pluralized-dev[variations.device.other]": {
        "value": "%lld Geräte"
      }
    }
  },
  "version": "1.0"
}`

import { xcstrings2locize, locize2xcstrings } from 'locize-xcstrings'

const res = xcstrings2locize(xcstrings)
// res is like locizeData

const res = locize2xcstrings(locizeData)
// res is like xcstrings
```
