// Slate Common Modules
// Remote Files
// by David Bethune
//
// Returns JSON asynchronously from a file located at remote URL.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// Get Remote Asset
// Given an asset {folder:file}, returns the JSON from the file.
export async function getRemoteAsset(asset: framework.asset) {
  // Setup fetch options
  const fetchOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "text/html",
    },
    mode: "cors",
    cache: "no-cache",
  }

  console.log("asset", asset)
  console.log("Fetching remote asset:", framework.assetUrl(asset))

  const fetchResults = await fetch(framework.assetUrl(asset), fetchOptions)

  const textResults = await fetchResults.text()

  return await JSON.parse(textResults)
}
