// App Slates
// Banners
// by David Bethune
//
// Defines content for the app-banner component.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import {html} from "lit"

// EXPORTED CONSTANTS



export const error: framework.menu = {
  error: {
    class: "bannerCredited",
    labelClass: "bigFat thinDropShadow",
    img: {art: "The Artist.jpg"},
    label: html`<div>Oops!</div>`,
    desc: [
      html`<div>I apologize. Something went wrong.</div>`,
      html`<div>Please contact me if I can be of assistance.</div>`,
    ],
    descClass: "mediumSubhead thinDropShadow centerVertical",
  },
}
