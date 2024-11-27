// Slate Framework Library
// Settings
// by David Bethune
//
// Provides default settings and loads app settings.

// Import Time-Date
// import * as framework from "framework/modules/framework-module-time-date"

// SETTINGS //////////
export const settings = {
  common: {name: "Slate", version: "0"},
  app: {
    name: "Slate App",
    env: "build",
    version: "0",
    language: "en",
    copyright: "",
    cdn: "",
    assetTypes: {
      img: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
      video: ["mp4", "webm", "ogg"],
      audio: ["mp3", "ogg"],
      json: ["json"],
    },
    assetFolders: {
      root: "assets",
      img: "img",
      video: "video",
      audio: "audio",
      json: "json",
    },
    isDebug: false,
    isCookies: false,
    cutoverWidth: "575px",
  },
}
