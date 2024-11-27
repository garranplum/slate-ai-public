// Slate Framework Modules
// i18n Internationalization
// by David Bethune
//
// Returns a localized string for the given key.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// STATIC IMPORTS
import en from "app/text/app-text-en.json"

// Setup for Language Constants

// All language names
export const allLanguageNames = {
  en: "English",
}

// Text
// Given a key in dot-separated form and a language,
// Return the key's text from languages in that language.
// If the key or language are not found, return errors.
export function text(key: string) {
  // Get the key by reducing the array of dotted keys.
  const keyText = key
    .split(".")
    .reduce(
      (outerKey, innerKey) =>
        outerKey && outerKey[innerKey] ? outerKey[innerKey] : undefined,
      en
    )

  // Return the key's text.
  return keyText ?? `NO: ${key}`
}

// Audit Languages
// For each language other than English, check the keys against English.

export function auditLanguages() {
  // const languageKeys = Object.keys(languages).filter(key => key !== "en")
  // console.group("Language Audit")
  // languageKeys.map(key => {
  //   const uniqueJson = getUniqueJson(languages.en, languages[key])
  //   const isSuccess = !Object.keys(uniqueJson).length
  //   console.log(
  //     languageNames[key],
  //     isSuccess ? "PASSED" : "FAILED",
  //     Object.keys(uniqueJson).length
  //   )
  //   if (!isSuccess) {
  //     console.log(uniqueJson)
  //   }
  // })
  // console.groupEnd()
}

// Audit i18n Files
// For each language other than English, check the keys in the catalog file against English.

// getUniqueJson
// Given two JSON objects, return a JSON object containing only the unique keys.
export function getUniqueJson(ENGLISH: any, OTHER_LANG: any): any {
  let output: any = {}

  for (const key in ENGLISH) {
    if (
      typeof ENGLISH[key] === "object" &&
      ENGLISH[key] !== null &&
      !Array.isArray(ENGLISH[key])
    ) {
      if (!OTHER_LANG.hasOwnProperty(key)) {
        output[key] = ENGLISH[key]
      } else {
        const nestedObject = getUniqueJson(ENGLISH[key], OTHER_LANG[key])
        if (Object.keys(nestedObject).length > 0) {
          output[key] = nestedObject
        }
      }
    } else {
      if (!OTHER_LANG.hasOwnProperty(key)) {
        output[key] = ENGLISH[key]
      }
    }
  }

  return output
}

// mergeJson
// Given two JSON objects, return a JSON object containing all keys from both.
function mergeJson(original, updates) {
  if (Array.isArray(original) && Array.isArray(updates)) {
    return updates
  } else if (
    original !== null &&
    updates !== null &&
    typeof original === "object" &&
    typeof updates === "object"
  ) {
    for (let key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (
          key in original &&
          typeof original[key] === "object" &&
          typeof updates[key] === "object"
        ) {
          original[key] = mergeJson(original[key], updates[key])
        } else {
          original[key] = updates[key]
        }
      }
    }
  }

  return original
}

// Merge File
// The output of translating only the missing keys from the English file.
const mergeFile = {}

// const mergeLanguage = "es"
// const origFile = await getI18nFile(mergeLanguage)
// console.log("MERGE OUTPUT", mergeLanguage, mergeJson(origFile, mergeFile))
