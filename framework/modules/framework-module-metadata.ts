// Slate Framework Modules
// Metadata
// by David Bethune
//
// Provides functions to set metadata for social sharing.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// Set Window Title
export function setWindowTitle(title: string) {
  // Set Window Title
  const windowTitle = `${framework.text(`app.title`)} | ${title}`

  document.title = windowTitle

  // Set Discord/Slack Title
  document
    .querySelector('meta[name="twitter:title"]')
    .setAttribute("content", windowTitle)

  document
    .querySelector('meta[property="og:title"]')
    .setAttribute("content", windowTitle)

  document
    .querySelector('meta[property="og:site_name"]')
    .setAttribute("content", windowTitle)

  //Update URL
  setWindowURL()
}

// Set Window/Share URL
export function setWindowURL() {
  document
    .querySelector('meta[property="og:url"]')
    .setAttribute("content", document.location.href)
}

// Set Window/Share Image
export function setWindowImage(asset: framework.asset) {
  document
    .querySelector('meta[property="og:image"]')
    .setAttribute("content", framework.assetUrl(asset))

  document
    .querySelector('meta[name="twitter:image"]')
    .setAttribute("content", framework.assetUrl(asset))
}
