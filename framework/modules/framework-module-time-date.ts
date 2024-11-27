// Slate Framework Modules
// Time & Date
// by David Bethune
//
// Time and date functions.

import * as framework from "framework/startup/framework-startup"

// Create an array of the month names.
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Create an array of the day names.
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

// Date LDAP
// Given a Windows file time or LDAP timestamp, return a custom date object.
export function dateLdap(ldap) {
  // No ldap? Early return
  if (!ldap) return null

  // Create a JS date from the Windows file time
  // Magic numbers. LDAP timestamps are in 100-nanosecond intervals since January 1, 1601.
  let d = new Date(ldap / 1e4 - 1.16444736e13)

  return { ...date(d), ldap: ldap * 1 }
}

// Date JS
// Given a JS timestamp, return a custom date object.
export function dateJs(milliseconds) {
  return date(new Date(milliseconds))
}

// Date Unix
// Given a Unix timestamp, return a custom date object.
export function dateUnix(seconds) {
  // Magic numbers. Unix timestamps are in seconds. JS timestamps are in milliseconds.

  return date(new Date(seconds * 1000))
}

// Date
// Given a TS Date, return a custom date object.
export function date(d: Date) {
  // Keep month (0-11!) for calculations.
  const month = d.getMonth()

  // Keep hours for calculations.
  const hour = d.getHours()

  // Keep exact time (milliseconds) for jsExact.
  const jsExact = d.getTime()

  // Round d to the nearest minute.
  d.setSeconds(0, 0)

  // Populate the custom date object.
  // Magic numbers. Unix timestamps are in seconds. JS timestamps are in milliseconds.
  const dateObj: framework.frameworkDate = {
    unix: d.getTime() / 1000,
    year: d.getFullYear(),
    month: month + 1,
    day: d.getDate(),
    hour,
    minute: d.getMinutes(),
    second: d.getSeconds(),
    js: d.getTime(),
    jsExact,
    dateLocal: d.toLocaleDateString(),
    dateString: d.toUTCString(),
    dateShort: `${months[month].slice(
      0,
      3
    )} ${d.getDate()}, ${d.getFullYear()}`,
    timeLocal: d.toLocaleTimeString(),
    timeString: d.toTimeString(),
    string: d.toString(),
    dateHtml: d.toISOString().split("T")[0],
    monthName: months[month],
    monthShort: months[month].slice(0, 3),
    dayName: days[d.getDay()],
    dayShort: days[d.getDay()].slice(0, 3),
    hour12: hour % 12,
    ampm: hour < 12 ? "AM" : "PM",
  }

  return dateObj
}

// Date From String
// Given a string, return a custom date object.
export function dateFromString(str) {
  // Get a TS Date object from the string.
  let d = new Date(str)

  return date(d)
}

// Days Between
// Given two JS timestamps, return the number of days between them.
export function daysBetween(start, end) {
  // Get the difference in milliseconds.
  var difference = end - start

  // Convert to days. Magic numbers. 1000 milliseconds in a second. 60 seconds in a minute. 60 minutes in an hour. 24 hours in a day.
  return Math.floor(difference / (1000 * 60 * 60 * 24))
}

// Today
// Returns a JS timestamp for now.
export function today() {
  const d = new Date()

  return d.getTime()
}

// Todays Date
// Returns a custom date object for today.
export function todaysDate() {
  return dateJs(Date.now())
}

// Time Offset Constants
// Magic numbers. The number of milliseconds in a second minute, hour, day, week, month, and year.
export const timeConstants = {
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000,
  week: 604800000,
  month: 2592000000,
  year: 31536000000,
}
