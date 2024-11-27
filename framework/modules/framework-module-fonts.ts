// Slate Framework Modules
// Fonts
// by David Bethune
//
// Loads fonts via the document API.

// Make a module
export {}

// Inter
import interFont from "framework/fonts/inter/Inter.var.woff2"
const inter = new FontFace("Inter", `url(${interFont}) format('woff2')`, {
  style: "normal",
  weight: "100 900",
})
inter.load().then(face => {
  document.fonts["add"](face)
})
