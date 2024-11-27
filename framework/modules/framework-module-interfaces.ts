// Slate Framework Modules
// Interfaces
// By David Bethune

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import { LitElement, TemplateResult } from "lit"
import { ClassInfo } from "lit/directives/class-map.js"
import { StyleInfo } from "lit/directives/style-map.js"

// Slate
export interface slate {
  index?: number
  offset?: number
  class?: string
  style?: string
  type?: string
  active?: boolean
  command?: string
  url?: string
  change?: Function
  submit?: Function
  click?: Function
  buttons?: framework.slate[]
  menu?: framework.menu
  key?: string
  default?: boolean
  icon?: string | string[]
  iconClass?: string
  img?: framework.asset
  imgClass?: string
  label?: framework.content | framework.content[]
  labelClass?: string
  desc?: framework.content | framework.content[]
  descClass?: string
  alt?: framework.slate
  content?: framework.content | framework.content[]
  contentClass?: string
  filter?: Function
}

// Route
export interface route {
  [key: string]: { [key: string]: string }
}

// Menu (Key-Value Directory of Slates)
export type menu = {
  [key: string]: slate | menu
}

// Slate Command Properties
export enum commandProperties {
  click = "click",
  change = "change",
  submit = "submit",
  command = "command",
  url = "url",
}

// Events for Components
export enum events {
  loginReturned = "loginReturned",
  routeChanged = "routeChanged",
  error = "error",
  playerChanged = "playerChanged",
  playerSignin = "playerSignin",
  inboxChanged = "inboxChanged",
  configChanged = "configChanged",
  chatChanged = "chatChanged",
  messagesChanged = "messagesChanged",
  themeChanged = "themeChanged",
  offersChanged = "offersChanged",
  healthChanged = "healthChanged",
  signinError = "signinError",
  envChanged = "envChanged",
  sortChanged = "sortChanged",
}

export interface listener {
  event: framework.events
  callback: (e: CustomEvent) => any
}

// Notify Messages
export interface notifyMessage {
  component: LitElement | LitElement[]
  event: events
  detail: {}
}

// Framework Date
export interface frameworkDate {
  // literals

  // unix timestamp
  unix?: framework.timestamp

  // year (YYYY)
  year?: number

  // month (1-12)
  month?: number

  // month (1-31)
  day?: number

  // hour: 24 hour clock (0-23)
  hour?: number

  // minute (0-59)
  minute?: number

  // second: 0 (truncated by framework.date())
  second?: number

  // js date/time integer
  js?: number

  // js date/time exact (not rounded to minutes)
  jsExact?: number

  // computed values

  // ISO 8601 (YYYY-MM-DD)
  dateHtml?: string

  // month name (November)
  monthName?: string

  // month short name (Nov)
  monthShort?: string

  // day name (Monday)
  dayName?: string

  // day short name (Mon)
  dayShort?: string

  // date short (Dec 12, 2023)
  dateShort?: string

  // hour: 12 hour clock (1-12)
  hour12?: number

  // ampm: (AM/PM)
  ampm?: string

  // date in local format: 3/27/2022
  dateLocal?: string

  // UTC date in a string: Mon, 27 Mar 2022 14:30:00 GMT
  dateString?: string

  // time in local format (1:30:00 PM)
  timeLocal?: string

  // local time in a string: 14:30:00 GMT-0700 (Pacific Daylight Time)
  timeString?: string

  // string from date: Thu Jan 26 2023 08:18:00 GMT-0600 (Central Standard Time)
  string?: string
}

// Timestamp
export type timestamp = number

// Color
export type color = number | string

// Color Array
export type colorArray = color[]

// Hex Digits
// For card codes.
export type hexDigit =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"

// Content
export type content = framework.appComponent | TemplateResult | string | number

// Endpoint
export interface endpoint {
  server?: string
  url: string
  method: string
}

// Asset
// {folder: file}
export interface asset {
  [key: string]: string
}

// Storage
// {key: value}
export interface storage {
  [key: string]: any
}
