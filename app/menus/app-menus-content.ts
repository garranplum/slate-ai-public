// Slate Menus
// By David Bethune

// Defines commands available in menus.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import {html} from "lit"

// EXPORTED CONSTANTS

// OVERALL NAVIGATION

// PRIMARY NAV
export const primary: framework.menu = {
  chat: {
    icon: "messages",
    content: "Chat",
    type: "bar",
    class: "barButton barTop primary",
    offset: 0,
  },
  images: {
    icon: "images",
    content: "Images",
    type: "bar",
    class: "barButton barTop primary",
    offset: 0,
  },
  load: {
    icon: "folder-open",
    content: "Load",
    type: "bar",
    class: "barButton barTop primary",
    offset: 0,
    click: framework.loadCompletion,
  },
  help: {
    icon: "question-circle",
    content: "Help",
    type: "bar",
    class: "barButton barTop primary",
    offset: 0,
  },
}

// FOOTER NAV
export const footer: framework.menu = {

  slate: {
    icon: "layer-group",
    content: html`Slate&trade;`,
    command: "software/slate",
    class: "madeWith",
    desc: "Made with Slate. A web framework by David Bethune.",
  },
}


