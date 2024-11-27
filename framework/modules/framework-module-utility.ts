// Slate Framework Modules
// Utility
// By David Bethune
//
// Provides utility functions for the Slate Framework.


// DEPENDENCIES
import {html, css} from "lit"
import {HTMLTemplateResult} from "lit"
import {c} from "vite/dist/node/types.d-aGj9QkWt"

// Copy to Clipboard
// Copies the passed value to the clipboard.
export function copyToClipboard(value)
{
  return navigator.clipboard.writeText(value).then(() => value)
}

// Get Clipbord
// Returns the clipboard contents.
export function getClipboard()
{
  return navigator.clipboard.readText()
}

// Pluralize
// Returns string if value is one or pluralString if more than one.
// Defaults to string + "s".
export function pluralize(
  value: number,
  string: string,
  pluralString?: string
): string
{
  pluralString = pluralString || `${string}s`

  return value == 1 ? string : pluralString
}

// Factorial
// Return n!
export function fact(n)
{
  //Negative number? Early return.
  if (n < 0)
  {
    return undefined
  }

  //Finished? Return 1.
  if (n == 0)
  {
    return 1
  }

  //Recurse
  return n * fact(n - 1)
}

// N Items
// Returns the first n items from array.
export function nItems(incomingArray: any[], n: number)
{
  return incomingArray.slice(0, n)
}

// Nth Array Index
// Returns the index n positions away from index, wrapping with modulo.
export function nthArrayIndex(array, index, n)
{
  // Use modulo to wrap array n positions.
  return (index + n) % array.length
}

// Nth Array Item
// Returns the item n positions away from index, wrapping with modulo.
export function nthArrayItem(array, index, n)
{
  // Use modulo to wrap item n positions.
  return array[nthArrayIndex(array, index, n)]
}

// Next Array Index
// Returns the next index from array starting at index, wrapping with modulo.
export function nextArrayIndex(array, index)
{
  // Use modulo to wrap array by 1.
  return nthArrayIndex(array, index, 1)
}

// Next Array Item
// Returns the next item from the array starting at index, wrapping with modulo.
export function nextArrayItem(array, index)
{
  // Return item at next wrapped index.
  return nthArrayItem(array, index, 1)
}

// Previous Array Item
// Returns the previous item from the array, starting at index, wrapping with modulo.
export function previousArrayItem(array, index)
{
  // Return item at previous position.
  return nthArrayItem(array, index, -1)
}

// Previous Array Index
// Returns the index of the previous item from the array, starting at index, wrapping with modulo.
export function previousArrayIndex(array, index)
{
  // Return index of previous position.
  return nthArrayIndex(array, index, array.length - 1)
}

// Combinations
// Answers "how many combinations of R items can be selected from a list of N items?"
// Also known as a "choose R from N" problem.
// Returns the number of possible combinations.
export function combinations(chooseR: number, fromN: number): number
{
  //Compute factorials.
  let factFromN = fact(fromN)
  let factChooseR = fact(chooseR)
  let factNLessR = fact(fromN - chooseR)

  //Compute combinations.
  let combos = factFromN / (factChooseR * factNLessR)

  return combos
}

// Get Combinations
// Returns all combinations of chooseR elements from fromArray.
export function getCombinations(chooseR: number, fromArray: any[]): any[]
{
  //Setup for outgoing array of all combos.
  let combos = []

  //Inline function. Collect all combinations of chooseR elements from fromArray.
  function combine(chooseR, fromArray, start = 0, combo = Array(chooseR))
  {
    //No more elements to choose? Return this combo.
    if (chooseR === 0)
    {
      combos.push([...combo])
      return
    }

    //For each element left to choose...
    for (let index = start; index <= fromArray.length - chooseR; index++)
    {
      //Add this element to combo array.
      combo[combo.length - chooseR] = fromArray[index]

      //Recurse w/next element and one fewer to choose.
      combine(chooseR - 1, fromArray, index + 1, combo)
    }
  }

  //Run combine on fromArray.
  combine(chooseR, fromArray)

  //Return array of all combos.
  return combos
}

// UnCamelCase
// Given camelCaseText, returns a title case string with spaces between words.
export function unCamelCase(string: string): string
{
  // Split on uppercase letter (regex).
  let words = string.split(/(?=[A-Z])/)

  // Capitalize first letter of first word.
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)

  // Join words with spaces.
  return words.join(" ")
}

// UnSnakeCase
// Given snake_case_text, returns a title case string with spaces between words.
export function unSnakeCase(string)
{
  // Split on underscore
  const words = string.split("_")
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// GreekSuffix
// Given a number, return the value with k, m, or g.
export function greekSuffix(value: number): string
{
  const gBytes = value / 1000000000
  const mBytes = value / 1000000
  const kBytes = value / 1000

  const returnValue = Math.round(
    gBytes >= 1 ? gBytes : mBytes >= 1 ? mBytes : kBytes >= 1 ? kBytes : value
  )

  const suffix =
    gBytes >= 1 ? "Gb" : mBytes >= 1 ? "Mb" : kBytes >= 1 ? "Kb" : ""

  return `${returnValue}${suffix}`
}

export function formatNumberWithGreekSuffix(num)
{
  const absNum = Math.abs(num)

  if (absNum >= 1000000)
  {
    return formatDecimal(num / 1000000) + "M"
  } else if (absNum >= 1000)
  {
    return formatDecimal(num / 1000) + "K"
  } else
  {
    return formatDecimal(num)
  }
}

// FormatDecimal for Greek Suffix
export function formatDecimal(value)
{
  const flooredValue = Math.floor(value)
  return flooredValue.toString()
}

interface realMoney
{
  value: number
  currency: string
}
export function money(realMoney: realMoney): string
{
  return `${realMoney.currency} ${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: realMoney.currency,
  }).format(realMoney.value ? realMoney.value / 100 : 0)}
      `
}

// Number to Percent
// Rounds a number to 2 digits and adds a % sign.
export function numberToPercent(number)
{
  return `${(number * 100).toFixed(2)}%`
}

// Split Array
// Given an array and a size, returns an array of arrays of the given size.
export function splitArray(array, size)
{
  return [
    ...Array(array.length <= size ? 1 : Math.ceil(array.length / size)),
  ].map((_, index) => array.slice(index * size, (index + 1) * size))
}

// Nonce
// Given a length, returns a random string of that length.
export function nonce(length: number = 32)
{
  let text = ""
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

// Class Div
// Given a class name and contents, returns a div with the class and contents inside.
export function classDiv(className: string, contents: any): HTMLTemplateResult
{
  return html`<div class=${className}>${contents}</div>`
}


// FILE DOWNLOADING //////////
// Opens a browser download dialog box for any content.

//downloadFile
//Download a file of arbitrary type
export const downloadFile = (content, fileName, mimeType) =>
{
  const a = document.createElement("a")
  const fileOptions: BlobPropertyBag = {
    // type: mimeType,
    type: "application/octet-stream",
    endings: "native",
  }
  const file = new Blob([content], fileOptions)
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
  URL.revokeObjectURL(a.href)
}

// downloadLink
// Download a file of arbitrary type from a base64-encoded string.
export async function downloadLink(b64String, fileName, mimeType = 'application/octet-stream')
{
  try
  {
    // Decode the base64 string
    const binaryString = atob(b64String)
    // Convert binary string to an array of 8-bit unsigned integers
    const binaryLen = binaryString.length
    const bytes = new Uint8Array(binaryLen)
    for (let i = 0; i < binaryLen; i++)
    {
      bytes[i] = binaryString.charCodeAt(i)
    }
    // Create a Blob from the byte array
    const blob = new Blob([bytes], {type: mimeType})
    // Create a link element
    const a = document.createElement("a")
    // Create a URL for the Blob
    a.href = URL.createObjectURL(blob)
    // Set the download attribute with the file name
    a.download = fileName
    // Trigger the download
    a.click()
    // Revoke the object URL
    URL.revokeObjectURL(a.href)
  } catch (error)
  {
    console.error("Error downloading the file:", error)
  }
}

//downloadJSON
//Download a JSON object or array
export const downloadJSON = (
  content: {} | [],
  fileName: string = "jsonObject"
) =>
{
  downloadFile(JSON.stringify(content), fileName, "text/json")
}

//downloadText
//Download a text file
export const downloadText = (content: string, fileName) =>
{
  downloadFile(content, fileName, "text")
}

// FILE UPLOADING

//    <input @change=${this.uploadActionList} type="file" id="file" name="file">
export const fileChooser = uploadFunction =>
{
  const input = document.createElement("input")
  input.type = "file"
  input.onchange = uploadFunction
  input.click()
}

const uploadFile = (event: Event): File =>
{
  const uploadedFile: File = event.target["files"][0]
  return uploadedFile
}

const uploadText = async (event: Event): Promise<string> =>
{
  const uploadedFile: File = uploadFile(event)
  const uploadedFileText = await uploadedFile.text()
  return uploadedFileText
}

export const uploadJSON = async (event: Event): Promise<{}> =>
{
  const uploadedText = await uploadText(event)
  let uploadedJSON = {}

  try
  {
    uploadedJSON = JSON.parse(uploadedText)
    return uploadedJSON
  } catch (error)
  {
    return false
  }
}

// UNIQUE IDs

// Generate GUID
// Returns a version 4 GUID
export function generateGUID()
{
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c =>
  {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Generate UUID
// Uses the browser to create a cryptographically secure UUID.
// Falls back to GUID if browser does not support crypto.
export function generateUUID()
{
  return crypto ? crypto.randomUUID() : generateGUID()
}

// Get Platform
// Returns "android", "ios", or "desktop" based on user agent.
export function getPlatform(): "android" | "ios" | "desktop"
{
  const userAgent = navigator.userAgent

  return /android/i.test(userAgent)
    ? "android"
    : /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream
      ? "ios"
      : "desktop"
}


