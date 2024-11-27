// Slate Command Content
// By David Bethune

// Dependencies
import * as framework from "framework/startup/framework-startup"


// Command Constants
export const commands: framework.menu = {
  chat: {
    default: true,
    content: [
      new framework.appTextConversation({}),
    ],
  },
  images: {
    content: [
      new framework.appImageConversation({}),
    ],
  },
  load: {},
  help: {
    content: [
      new framework.frameworkMarkdown(),
    ],
  },
  error: {},
}

// Alias Constants
export const aliases: framework.menu = {}
