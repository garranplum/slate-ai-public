// Slate Framework Modules
// Slates
// by David Bethune
//
// Loads slate definitions.

// STATIC IMPORTS

// Button Slates
import * as button from "app/slates/app-slates-button"

// Banner Slates
import * as banner from "app/slates/app-slates-banner"

// Panel Slates
import * as panel from "app/slates/app-slates-panel"

// All Slates
const allSlates = {
  button,
  banner,
  panel,
}

// Add keys and types to slates.
// Enables functions which only receive a slate to find its relatives.

// Iterate over each slate type.
Object.keys(allSlates).map(type => {
  // Iterate over each group of slates w/in the type.
  Object.keys(allSlates[type]).map(group => {
    // Iterate over each slate in the group.
    Object.keys(allSlates[type][group]).map(key => {
      // Add the type, group, and key to the slate.
      allSlates[type][group][key] = {
        ...allSlates[type][group][key],
        type,
        group,
        key,
      }
    })
  })
})

export const slates = allSlates
