// Slate Framework Modules
// Colors
// by David Bethune
//
// Defines a color palette and functions for finding colors.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// STATIC IMPORTS

// Pure named colors. Basic rainbow.
import paletteJson from "app/colors/app-colors-palette.json"

// Role-based colors. Text, backgrounds, and borders.
import colorsJson from "app/colors/app-colors-colors.json"

// Brand book colors.
// import brandJson from "app/json/brand.json"

export const palette = paletteJson
export const colors = colorsJson
// export const brand = brandJson

// Theme
// Provides a starting index for related colors.

export let themes

const spring = {
  name: "spring",
  icon: "flower-daffodil",
  start: 4,
}
themes = { ...themes, spring }

const summer = {
  name: "summer",
  icon: "sun",
  start: 19,
}
themes = { ...themes, summer }

const fall = {
  name: "fall",
  icon: "leaf-maple",
  start: 2,
}
themes = { ...themes, fall }

const winter = {
  name: "winter",
  icon: "snowflake",
  start: 11,
}
themes = { ...themes, winter }

const rain = {
  name: "rain",
  icon: "raindrops",
  start: 15,
}
themes = { ...themes, rain }

const cloud = {
  name: "cloud",
  icon: "cloud-rainbow",
  start: 8,
}
themes = { ...themes, cloud }

// Setup for Theme
// Class/OOPS
// Creates closure.
// Magic words.
let theme = "summer"

// Theme
// Closure
// Returns current theme.
export function getTheme() {
  return themes[theme]
}

// Theme Key
// Closure
// Returns the key of the current theme.
export function getThemeKey() {
  return theme
}

// Set Theme
// Sets current theme.
export function setTheme(themeKey) {
  theme = themeKey

  framework.storeSession({ key: "theme", value: themeKey })
}

// Palette Index
// An array of palette keys. Allows finding a color name by index number (array position).
export const paletteIndex = Object.keys(palette)

// Color Index
// An array of color values. Allows finding a color value by index number (array position).
export const colorIndex = Object.values(palette)

// Get Color
// Find a color value by name or index number.
// Returns hex color value.
export function getColor(color) {
  // Setup for return
  let finalColor: string

  // Try palette index lookup
  if (parseInt(color) >= 0) {
    finalColor = palette[framework.nthArrayItem(paletteIndex, color, 0)]
    return finalColor
  }

  // Try palette key lookup
  if (palette[color]) {
    finalColor = palette[color]
    return finalColor
  }

  // Use literal value
  finalColor = color
  return finalColor
}

// Get CSS Color
// Given a color name or index, returns "color: #hex;".
export function getCSSColor(color) {
  return `color: ${getColor(color)};`
}

// Get Name
// Find a color name by index or color value.
// Returns color name (palette key).
export function getName(color) {
  // Setup for return
  let colorName: string

  // Try palette index lookup
  if (parseInt(color) >= 0) {
    colorName = paletteIndex[color]
    return colorName
  }

  // Try color value lookup
  let thisColorIndex = colorIndex.indexOf(color)
  if (thisColorIndex) {
    colorName = palette[thisColorIndex]
    return colorName
  }

  // Use literal value
  colorName = color
  return colorName
}

// Get Index
// Find a color's index number from its palette key or color value.
// Returns an index into paletteIndex.
export function getIndex(color) {
  // Setup for return
  let finalColorIndex

  // Try palette index lookup
  if (parseInt(color) >= 0) {
    finalColorIndex = color
    return finalColorIndex
  }

  // Try palette key lookup
  if (!finalColorIndex) {
    finalColorIndex = paletteIndex.indexOf(color)
    return finalColorIndex
  }

  // Try color value lookup
  if (finalColorIndex < 0) {
    let thisColorIndex = colorIndex.indexOf(color)
    if (thisColorIndex >= 0) {
      finalColorIndex = thisColorIndex
      return finalColorIndex
    }
  }

  // Use # value
  if (finalColorIndex < 0) {
    finalColorIndex = "#"
    return finalColorIndex
  }
}

// Get Random Color
// Returns a random color between start and finish, start and end, or beginning and end of palette.
export function getRandomColor(start?, finish?) {
  //Default start at palette beginning.
  start = start || 0

  //Default end at palette end.
  finish = finish || paletteIndex.length - 1

  //Choose random color index.
  let colorIndex = Math.floor(Math.random() * (finish - start)) + start

  //Get color.
  let randomColor = getColor(colorIndex)

  return randomColor
}
