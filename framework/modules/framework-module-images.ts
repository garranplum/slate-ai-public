// Slate Framework Modules
// Images
// by David Bethune
//
// Defines URL functions for bitmaps, video, and SVGs.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// assetUrl
// Given an asset {folder:file}, returns the CDN or local URL.
export function assetUrl(image: framework.asset) {
  const [folder] = Object.keys(image)
  let file = image[folder]
  let lastDot = file.lastIndexOf(".")
  let name = file.substring(0, lastDot)
  let ext = file.substring(lastDot + 1)

  const assetType = Object.keys(framework.settings.app.assetTypes).find(key => {
    return framework.settings.app.assetTypes[key].includes(ext) ? key : null
  })

  const fileUrl = `${framework.settings.app.cdn ?? ""}/${
    framework.settings.app.assetFolders.root
  }/${framework.settings.app.assetFolders[assetType]}/${folder}/${name}.${ext}`

  return fileUrl
}

// mediaType
// Given an asset {folder:file}, returns the file extension.
export function mediaType(image: framework.asset) {
  const [folder] = Object.keys(image)
  let file = image[folder]
  file = file || "generic.png"
  const [_, ext] = file.split(".")
  return ext
}

// isMedia
// Given an asset {folder:file}, returns true if the file is a bitmap, video, or SVG.
export function isMedia(image: framework.asset) {
  const ext = mediaType(image)
  return (
    ext == "png" ||
    ext == "gif" ||
    ext == "jpg" ||
    ext == "mp4" ||
    ext == "webm" ||
    ext == "svg"
  )
}

// isVideo
// Given an asset {folder:file}, returns true if the file is a video.
export function isVideo(image: framework.asset) {
  const ext = mediaType(image)
  return ext == "mp4" || ext == "webm"
}

// isVector
// Given an asset {folder:file}, returns true if the file is a vector.
export function isVector(image: framework.asset) {
  const ext = mediaType(image)
  return ext == "svg"
}
