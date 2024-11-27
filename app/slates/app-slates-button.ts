// App Slates
// Banners
// by David Bethune
//
// Defines content for the app-banner component.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import { html } from "lit"

// EXPORTED CONSTANTS

export const slate: framework.menu = {
  madeWith: {
    icon: "layer-group",
    content: html`Slate&trade;`,
    command: "software/slate",
    class: "madeWith",
    desc: "Made with Slate. A web framework by David Bethune.",
  },
}
