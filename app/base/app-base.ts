// Slate App Components
// Base Component
// by David Bethune
//
// Declares an appComponent class that extends frameworkComponent and add add-specific properties and styles.
// All web components in the app extend this class and have its properties and styles available.

import { CSSResultGroup, unsafeCSS } from "lit"
import { customElement } from "lit/decorators.js"
import * as framework from "framework/startup/framework-startup"
import appCSS from "app/css/app-css.css?inline"

@customElement("app-component")
export class appComponent extends framework.frameworkComponent {
  // APP-SPECIFIC PUBLIC PROPERTIES

  // APP-SPECIFIC PRIVATE PROPERTIES

  // APP-SPECIFIC STYLES
  static get styles(): CSSResultGroup {
    return [super.styles, unsafeCSS(appCSS)]
  }

  // CONNECTED CALLBACK
  // Runs when the component is added to the DOM.
  connectedCallback() {
    super.connectedCallback()

    this.route = super["route"]
  }
}
