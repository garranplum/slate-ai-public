// Slate Framework Modules
// Logging
// by David Bethune
//
// Controls logging and debug output.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// Debug Log Item
export interface debugLogItem {
  time?: string
  date?: string
  method?: string
  server?: string
  endpoint?: string
  url?: string
  elapsed?: number
  status?: number
  ok?: boolean
  queryString: string
  body?: {}
  response?: {}
  name?: string
  message?: string
  fetchOptions?: {}
}

// Setup for Debug Log
// Creates closure
export let debugLog: debugLogItem[] = []

// Log
// Closure
export function log(debugLogItem: debugLogItem) {
  const debugItemToWrite = {
    ...debugLogItem,
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
  }

  //debugLog = [...debugLog, debugItemToWrite]

  framework.settings.app.isDebug ? framework.storeSession({ debugLog }) : null

  // Debug on? Display in console.
  if (framework.settings.app.isDebug) {
    console.log(
      `%c${debugItemToWrite.name}`,
      framework.getCSSColor(
        debugItemToWrite.status == 200
          ? framework.colors.debug.apiResponse
          : framework.colors.debug.apiError
      ),
      debugItemToWrite
    )
    // console.log({
    //   logEvents: debugLog.length,
    //   totalElapsed: debugLog.reduce((acc, cur) => {
    //     return acc + cur.elapsed
    //   }, 0),
    // })

    // console.log("debugLog", debugLog)

    const debugLogSummary = logSummary(debugLog)
    // console.log("debugLogSummary", debugLogSummary)
  }
}

const logSummary = dataArray => {
  const summaryObject = dataArray.reduce((acc, data) => {
    if (acc[data.endpoint]) {
      // If the endpoint already exists, increment values
      acc[data.endpoint].totalElapsed += data.elapsed
      acc[data.endpoint].count += 1
      acc[data.endpoint].averageElapsed =
        acc[data.endpoint].totalElapsed / acc[data.endpoint].count
    } else {
      // If the endpoint doesn't exist, create it
      acc[data.endpoint] = {
        totalElapsed: data.elapsed,
        count: 1,
        averageElapsed: data.elapsed,
      }
    }
    return acc
  }, {})

  // Convert object to array
  const summaryArray = Object.keys(summaryObject).map(key => {
    return {
      endpoint: key,
      totalElapsed: summaryObject[key].totalElapsed,
      count: summaryObject[key].count,
      averageElapsed: summaryObject[key].averageElapsed,
    }
  })

  // Sort array by averageElapsed
  summaryArray.sort((a, b) => {
    return b.averageElapsed - a.averageElapsed
  })

  return summaryArray
}
