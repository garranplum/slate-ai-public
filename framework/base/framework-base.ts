// Slate Framework Components
// Base Component
// by David Bethune
//
// Declares a frameworkComponent class that extends LitElement and provides common properties and styles.
// This class is further extended by appComponent to add app-specific properties and styles.
// The appComponent class is then used as the base class for all other components.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import {LitElement, CSSResultGroup, unsafeCSS} from "lit"
import {customElement, state, property} from "lit/decorators.js"
import frameworkCSS from "framework/css/framework-css.css?inline"

@customElement("framework-component")
export class frameworkComponent extends LitElement
{
  // FRAMEWORK PUBLIC PROPERTIES
  @property({type: Object}) slate: framework.slate
  @property({type: Object}) menu: framework.menu
  @property({type: Object}) route: framework.route = {}
  @property() theme: string

  // FRAMEWORK PRIVATE PROPERTIES
  @state() scratchpad: framework.slate
  @state() listeners: framework.listener[] = []
  @state() isRouteListener: boolean = false
  @state() error: framework.debugLogItem
  @state() log: framework.debugLogItem[] = []

  // FRAMEWORK STYLES
  static styles: CSSResultGroup = unsafeCSS(frameworkCSS)

  // FRAMEWORK FUNCTIONS

  routeBase()
  {
    return framework.baseRoute(this.route)
  }
  routeParameters()
  {
    const baseRoute = framework.baseRoute(this.route)
    return this.route[baseRoute]
  }

  // CONSTRUCTOR WITH PARAMETER
  // Runs once when the component class definition is loaded.
  constructor(slate?: framework.slate)
  {
    super()

    //Accept slate parameter
    this.slate = slate
  }

  // CONNECTED CALLBACK
  // Runs when the component is added to the DOM.
  connectedCallback()
  {
    super.connectedCallback()

    // // Add route listeners if isRouteListener is true in component.
    // if (this.isRouteListener) {
    //   this.listeners.push({
    //     event: framework.events.routeChanged,
    //     callback: framework.routeOnEvent.bind(this),
    //   })
    // }

    // Add listeners.
    this.listeners.map(listener =>
    {
      this.addEventListener(listener.event, listener.callback)
    })
  }

  // DISCONNECTED CALLBACK
  // Runs when the component is removed from the DOM.
  disconnectedCallback()
  {
    super.disconnectedCallback()

    // Remove listeners.
    this.listeners.map(listener =>
    {
      this.removeEventListener(listener.event, listener.callback)
    })
  }
}
