// Slate Framework Modules
// Storage
// by David Bethune
//
// Set, read, and delete browser storage.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// CONSTANTS
const dbName = "slate"
const dbVersion = 1

// VARIABLES
let db: IDBDatabase

// Store Session
// Store a value in session storage.
export function storeSession(storage: framework.storage) {
  // Cookie override?
  if (framework.settings.app.isCookies) {
    return storeSessionCookie(storage)
  }

  const [key] = Object.keys(storage)
  sessionStorage.setItem(
    key,
    typeof storage[key] == "object"
      ? JSON.stringify(storage[key])
      : storage[key]
  )
}

// Has Session
// Returns true if a value exists in session storage.
export function hasSession(key: string) {
  // Cookie override?
  if (framework.settings.app.isCookies) {
    return hasSessionCookie(key)
  }
  return sessionStorage.getItem(key) !== null
}

// Get Session
// Get a value from session storage.
export function getSession(key: string) {
  // Cookie override?
  if (framework.settings.app.isCookies) {
    return getSessionCookie(key)
  }
  return sessionStorage.getItem(key)
}

// Get Session JSON
// Get a JSON object from session storage.
export function getSessionJSON(key: string) {
  // Cookie override?
  if (framework.settings.app.isCookies) {
    return getSessionCookieJSON(key)
  }
  return JSON.parse(sessionStorage.getItem(key))
}

// Delete Session
// Delete a value from session storage.
export function deleteSession(key: string) {
  // Cookie override?
  if (framework.settings.app.isCookies) {
    return deleteSessionCookie(key)
  }
  sessionStorage.removeItem(key)
}

// Store Session Cookie
// Store a value in a cookie.
export function storeSessionCookie(storage: framework.storage) {
  const [key] = Object.keys(storage)
  let value =
    typeof storage[key] == "object"
      ? JSON.stringify(storage[key])
      : storage[key]

  // Check the size of the cookie
  if ((key + value).length > 4093) {
    console.error("Cookie size exceeds the limit of 4KB")
    return
  }

  value = encodeURIComponent(value)
  document.cookie = `${key}=${value}; path=/`
  // console.log("STORAGE", storage)
  // console.log("KEY", key)
  // console.log("VALUE", value)
  // console.log("COOKIE CHANGED", document.cookie)
}

// Has Session Cookie
// Returns true if a value exists in a cookie.
export function hasSessionCookie(key: string) {
  const cookies = document.cookie.split(";")
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(`${key}=`)) {
      return true
    }
  }
  return false
}

// Get Session Cookie
// Get a value from a cookie.
export function getSessionCookie(key: string) {
  const cookies = document.cookie.split(";")
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(`${key}=`)) {
      return cookie.substring(key.length + 1)
    }
  }
  return null
}

// Get Session Cookie JSON
// Get a JSON object from a cookie.
export function getSessionCookieJSON(key: string) {
  const cookieValue = getSessionCookie(key)
  const decodedCookieValue = decodeURIComponent(cookieValue)

  if (decodedCookieValue) {
    return JSON.parse(decodedCookieValue)
  }
  return null
}

// Delete Session Cookie
// Delete a value from a cookie.
export function deleteSessionCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
