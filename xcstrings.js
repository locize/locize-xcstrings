(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.xcstrings = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "locize2xcstrings", {
  enumerable: true,
  get: function get() {
    return _locize2xcstrings.default;
  }
});
Object.defineProperty(exports, "xcstrings2locize", {
  enumerable: true,
  get: function get() {
    return _xcstrings2locize.default;
  }
});
var _xcstrings2locize = _interopRequireDefault(require("./xcstrings2locize.js"));
var _locize2xcstrings = _interopRequireDefault(require("./locize2xcstrings.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  xcstrings2locize: _xcstrings2locize.default,
  locize2xcstrings: _locize2xcstrings.default
};
},{"./locize2xcstrings.js":2,"./xcstrings2locize.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = locize2xcstrings;
var keyMetaRegex = /\[(.*?)\]$/;
var getAllKeys = function getAllKeys(res, lngs) {
  var keys = [];
  lngs.forEach(function (l) {
    var ks = Object.keys(res[l]);
    ks.forEach(function (k) {
      if (keys.indexOf(k) < 0) {
        keys.push(k);
      }
    });
  });
  return keys.sort().sort(function (a, b) {
    var aMatch = a.match(keyMetaRegex);
    var bMatch = b.match(keyMetaRegex);
    var aTest = a;
    var bTest = b;
    if (aMatch) aTest = a.substring(0, aMatch.index);
    if (bMatch) bTest = b.substring(0, bMatch.index);
    if (aTest === bTest) return 0;
    return aTest > bTest ? 1 : -1;
  });
};
function locize2xcstrings(data) {
  var result = {
    sourceLanguage: data.sourceLng || Object.keys(data.resources || {})[0],
    strings: {},
    version: data.version || '1.0'
  };
  var lngs = Object.keys(data.resources).sort();
  var keys = getAllKeys(data.resources, lngs);
  lngs.forEach(function (l) {
    keys.forEach(function (k) {
      var _result$strings, _key, _data$resources$resul;
      var regRes = k.match(keyMetaRegex);
      var key;
      var keyMeta;
      var subKey;
      var subKeyMeta;
      if (!regRes) {
        key = k;
      } else {
        key = k.substring(0, regRes.index);
        keyMeta = regRes[1];
        var subRegRes = keyMeta.match(keyMetaRegex);
        if (subRegRes) {
          subKey = keyMeta.substring(0, subRegRes.index);
          subKeyMeta = subRegRes[1];
        }
      }
      (_result$strings = result.strings)[_key = key] || (_result$strings[_key] = {});
      if (!result.strings[key].comment && (_data$resources$resul = data.resources[result.sourceLanguage]) !== null && _data$resources$resul !== void 0 && (_data$resources$resul = _data$resources$resul[k]) !== null && _data$resources$resul !== void 0 && (_data$resources$resul = _data$resources$resul.context) !== null && _data$resources$resul !== void 0 && _data$resources$resul.text) {
        var _data$resources$resul2;
        result.strings[key].comment = (_data$resources$resul2 = data.resources[result.sourceLanguage][k]) === null || _data$resources$resul2 === void 0 || (_data$resources$resul2 = _data$resources$resul2.context) === null || _data$resources$resul2 === void 0 ? void 0 : _data$resources$resul2.text;
      }
      if (data.resources[l][k] === undefined || data.resources[l][k] === null) return;
      if (typeof data.resources[l][k] === 'string') {
        data.resources[l][k] = {
          value: data.resources[l][k]
        };
      }
      if (!keyMeta && data.resources[l][k].value !== undefined) {
        var _result$strings$key, _result$strings$key$l;
        (_result$strings$key = result.strings[key]).localizations || (_result$strings$key.localizations = {});
        (_result$strings$key$l = result.strings[key].localizations)[l] || (_result$strings$key$l[l] = {});
        result.strings[key].localizations[l].stringUnit = {
          state: 'translated',
          value: data.resources[l][k].value
        };
      } else if (keyMeta) {
        var _result$strings$key2, _result$strings$key$l2;
        (_result$strings$key2 = result.strings[key]).localizations || (_result$strings$key2.localizations = {});
        (_result$strings$key$l2 = result.strings[key].localizations)[l] || (_result$strings$key$l2[l] = {});
        if (!subKeyMeta) {
          var splitted = keyMeta.split('.');
          splitted.reduce(function (r, s) {
            r[s] || (r[s] = {});
            if (s === splitted[splitted.length - 1]) {
              r[s].stringUnit = {
                state: 'translated',
                value: data.resources[l][k].value
              };
            }
            return r[s];
          }, result.strings[key].localizations[l]);
        } else {
          var _splitted = subKey.split('.');
          _splitted.reduce(function (r, s) {
            r[s] || (r[s] = {});
            if (s === _splitted[_splitted.length - 1]) {
              var _splitted2 = subKeyMeta.split('.');
              _splitted2.reduce(function (r, s) {
                r[s] || (r[s] = {});
                if (s === _splitted2[_splitted2.length - 1]) {
                  r[s].stringUnit = {
                    state: 'translated',
                    value: data.resources[l][k].value
                  };
                }
                return r[s];
              }, r[s]);
            }
            return r[s];
          }, result.strings[key].localizations[l]);
        }
      }
    });
  });
  var str = JSON.stringify(result, null, 2);
  return str.replace(/"\s*:\s*/g, '" : ').replace(/:\s*{},\s*/g, ': {\n\n    },\n    ');
}
module.exports = exports.default;
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = xcstrings2locize;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var checkForComment = function checkForComment(data, result, l, key) {
  var keyMeta = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  if (l === result.sourceLng && data.strings[key].comment) {
    var _result$resources$l, _ref;
    (_result$resources$l = result.resources[l])[_ref = "".concat(key).concat(keyMeta)] || (_result$resources$l[_ref] = {});
    result.resources[l]["".concat(key).concat(keyMeta)].context = {
      text: data.strings[key].comment
    };
  }
};
function xcstrings2locize(data) {
  if (typeof data === 'string') data = JSON.parse(data);
  var result = {
    sourceLng: data.sourceLanguage,
    resources: _defineProperty({}, data.sourceLanguage, {}),
    version: data.version
  };
  var lngs = [];
  var keys = Object.keys(data.strings);
  keys.forEach(function (key) {
    var lngsForKey = Object.keys(data.strings[key].localizations || {});
    lngsForKey.forEach(function (l) {
      if (lngs.indexOf(l) < 0) {
        var _result$resources;
        lngs.push(l);
        (_result$resources = result.resources)[l] || (_result$resources[l] = {});
      }
    });
    if (lngsForKey.length === 0) {
      var _result$resources$res;
      (_result$resources$res = result.resources[result.sourceLng])[key] || (_result$resources$res[key] = {});
    }
    lngsForKey.forEach(function (l) {
      var _data$strings$key$loc, _data$strings$key$loc2, _data$strings$key$loc3, _data$strings$key$loc5, _data$strings$key$loc6;
      if (((_data$strings$key$loc = data.strings[key].localizations[l]) === null || _data$strings$key$loc === void 0 || (_data$strings$key$loc = _data$strings$key$loc.stringUnit) === null || _data$strings$key$loc === void 0 ? void 0 : _data$strings$key$loc.value) !== undefined) {
        var _result$resources$l2;
        (_result$resources$l2 = result.resources[l])[key] || (_result$resources$l2[key] = {});
        result.resources[l][key].value = data.strings[key].localizations[l].stringUnit.value;
        checkForComment(data, result, l, key);
      } else if ((_data$strings$key$loc2 = data.strings[key].localizations[l]) !== null && _data$strings$key$loc2 !== void 0 && _data$strings$key$loc2.variations && (_data$strings$key$loc3 = data.strings[key].localizations[l]) !== null && _data$strings$key$loc3 !== void 0 && (_data$strings$key$loc3 = _data$strings$key$loc3.variations) !== null && _data$strings$key$loc3 !== void 0 && _data$strings$key$loc3.plural) {
        var pluralForms = Object.keys(data.strings[key].localizations[l].variations.plural);
        pluralForms.forEach(function (pf, i) {
          var _data$strings$key$loc4;
          var keyMeta = "[variations.plural.".concat(pf, "]");
          if (((_data$strings$key$loc4 = data.strings[key].localizations[l].variations.plural[pf]) === null || _data$strings$key$loc4 === void 0 || (_data$strings$key$loc4 = _data$strings$key$loc4.stringUnit) === null || _data$strings$key$loc4 === void 0 ? void 0 : _data$strings$key$loc4.value) !== undefined) {
            var _result$resources$l3, _ref2;
            (_result$resources$l3 = result.resources[l])[_ref2 = "".concat(key).concat(keyMeta)] || (_result$resources$l3[_ref2] = {});
            result.resources[l]["".concat(key).concat(keyMeta)].value = data.strings[key].localizations[l].variations.plural[pf].stringUnit.value;
          }
          if (i === 0) checkForComment(data, result, l, key, keyMeta);
        });
      } else if ((_data$strings$key$loc5 = data.strings[key].localizations[l]) !== null && _data$strings$key$loc5 !== void 0 && _data$strings$key$loc5.variations && (_data$strings$key$loc6 = data.strings[key].localizations[l]) !== null && _data$strings$key$loc6 !== void 0 && (_data$strings$key$loc6 = _data$strings$key$loc6.variations) !== null && _data$strings$key$loc6 !== void 0 && _data$strings$key$loc6.device) {
        var devices = Object.keys(data.strings[key].localizations[l].variations.device);
        devices.forEach(function (d, i) {
          var _data$strings$key$loc7, _data$strings$key$loc8;
          var keyMeta = "[variations.device.".concat(d, "]");
          if (((_data$strings$key$loc7 = data.strings[key].localizations[l].variations.device[d]) === null || _data$strings$key$loc7 === void 0 || (_data$strings$key$loc7 = _data$strings$key$loc7.stringUnit) === null || _data$strings$key$loc7 === void 0 ? void 0 : _data$strings$key$loc7.value) !== undefined) {
            var _result$resources$l4, _ref3;
            (_result$resources$l4 = result.resources[l])[_ref3 = "".concat(key).concat(keyMeta)] || (_result$resources$l4[_ref3] = {});
            result.resources[l]["".concat(key).concat(keyMeta)].value = data.strings[key].localizations[l].variations.device[d].stringUnit.value;
            if (i === 0) checkForComment(data, result, l, key, keyMeta);
          } else if ((_data$strings$key$loc8 = data.strings[key].localizations[l].variations.device[d]) !== null && _data$strings$key$loc8 !== void 0 && (_data$strings$key$loc8 = _data$strings$key$loc8.variations) !== null && _data$strings$key$loc8 !== void 0 && _data$strings$key$loc8.plural) {
            var subPluralForms = Object.keys(data.strings[key].localizations[l].variations.device[d].variations.plural);
            subPluralForms.forEach(function (pf, j) {
              var _data$strings$key$loc9;
              var subKeyMeta = "[variations.device.".concat(d, "[variations.plural.").concat(pf, "]]");
              if (((_data$strings$key$loc9 = data.strings[key].localizations[l].variations.device[d].variations.plural[pf]) === null || _data$strings$key$loc9 === void 0 || (_data$strings$key$loc9 = _data$strings$key$loc9.stringUnit) === null || _data$strings$key$loc9 === void 0 ? void 0 : _data$strings$key$loc9.value) !== undefined) {
                var _result$resources$l5, _ref4;
                (_result$resources$l5 = result.resources[l])[_ref4 = "".concat(key).concat(subKeyMeta)] || (_result$resources$l5[_ref4] = {});
                result.resources[l]["".concat(key).concat(subKeyMeta)].value = data.strings[key].localizations[l].variations.device[d].variations.plural[pf].stringUnit.value;
              }
              if (i === 0 && j === 0) checkForComment(data, result, l, key, subKeyMeta);
            });
          }
        });
      }
    });
  });
  return result;
}
module.exports = exports.default;
},{}]},{},[1])(1)
});
