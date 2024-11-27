// Slate Framework Modules
// Notify
// by David Bethune
//
// Provides functions to dispatch events to web components.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// Notify
// Dispatch an event to a web component or array of them.
// Used to update components when data changes.
export function notify(notifyMessage: framework.notifyMessage) {
  const components = Array.isArray(notifyMessage.component)
    ? notifyMessage.component
    : [notifyMessage.component]
  const { event, detail } = notifyMessage

  // Map all components in the array
  components.map(component => {
    // Setup Event Options & Payload (detail)
    let eventOptions: CustomEventInit = {
      bubbles: true,
      composed: true,
      detail,
    }

    // Create HTML Event of Desired Type
    let notifyEvent = new CustomEvent(event, eventOptions)

    // Dispatch HTML Event
    component.dispatchEvent(notifyEvent)
  })
}

// Notify All
// Dispatch an event to all web components.
export function notifyAll(
  notifyMessage: Omit<framework.notifyMessage, "component">
) {
  const component = Object.keys(framework.components).map(key => {
    return framework.components[key]
  })
  const { event, detail } = notifyMessage
  notify({
    component,
    event,
    detail,
  })
}
