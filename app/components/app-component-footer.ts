// Slate App Components
// Footer
// by David Bethune
//
// Provides footer icons, links, and legal disclosure.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import { html, css, CSSResultGroup } from "lit"
import { customElement, state } from "lit/decorators.js"

@customElement("app-footer")
export class appFooter extends framework.appComponent {
  // PUBLIC PROPERTIES

  // PRIVATE PROPERTIES
  @state() socialFile: any
  @state() linksFile: any

  // HTML TEMPLATES

  madeWithButton() {
    const buttonComponent = framework.routedComponent(
      new framework.appButton(framework.slates.button.slate.madeWith),
      this.route
    )

    return buttonComponent
    // return html`<div class="madeWithHolder">${buttonComponent}</div>`
  }

  copyrightPart() {
    return html`<div class="copyrightContainer">
      <div class="copyright">
        &copy;${framework.todaysDate().year} ${framework.settings.app.copyright}
        v${framework.settings.app.version}
      </div>
    </div>`
  }

  // RENDER
  // Runs every time the component is redrawn.

  render() {
    const componentParts = [
      framework.routedComponent(
        new framework.appNav(framework.menus.footer),
        this.route
      ),

      this.copyrightPart(),
    ]

    return [html`<div class="footer">${componentParts}</div>`]
  }
}
