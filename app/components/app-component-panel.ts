// Slate App Components
// Panel
// by David Bethune
//
// Given a slate, draws a panel media and text content.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { styleMap } from "lit/directives/style-map.js"

@customElement("app-panel")
export class appPanel extends framework.appComponent {
  // COMPONENT FUNCTIONS

  // Photo Credit Extractor
  // Extracts photo credit from slate.
  photoCredit(slate: framework.slate) {
    const photoUrl = framework.assetUrl(slate.img as framework.asset)

    //Remove everything before the last slash
    const photoFilename = photoUrl.split("/").pop()

    // Remove the extension
    const [photoTitle, _] = photoFilename.split(".")

    return slate.img
      ? html`<div class="photoCredit">
          <div>Photo: ${photoTitle} by David Bethune</div>
        </div>`
      : null
  }

  // CONSTRUCTOR
  // Runs once when the component class definition is loaded.
  constructor(slate) {
    super(slate)
  }

  // RENDER
  // Runs every time the component is redrawn.

  render() {
    // Use passed slate to create component.
    const slate = this.slate

    // Image Part
    // Contains the image from the slate.
    const imagePart = slate.img
      ? html`<div>
          <img src=${framework.assetUrl(slate.img)} />
        </div>`
      : null

    // Label Part
    // Creates a div matching "${slate.class} label"
    // Contains slate.label.
    const labelPart = slate.desc
      ? html`<div class="label">${slate.label}</div>`
      : null

    // Left Side
    // Contains imagePart and labelPart.
    const leftSide = html`<div>${[imagePart, labelPart]}</div>`

    // Description Part
    // Creates a div matching "${slate.class} desc"
    // Contains slate.desc.
    const descPart = slate.desc
      ? html`<div class="desc">${slate.desc}</div>`
      : null

    // Content Part
    // Creates a div matching "${slate.class}  content"
    // Contains one div for each item in slate.content.
    const contentPart = html`<div class="content">
      ${[slate.content].flat().map(content => html`<div>${content}</div>`)}
    </div>`

    // Menu Part
    // Creates a div matching "${slate.class}  menu"
    // Contains a framework.appNav, passed slate.menu.
    const menuPart = slate.menu
      ? html`<div class="menu">
          ${framework.routedComponent(
            new framework.appNav(slate.menu),
            this.route
          )}
        </div>`
      : null

    // Right Side
    // Contains descPart, contentPart, and menuPart.
    const rightSide = html`<div>${[descPart, contentPart, menuPart]}</div>`

    // Outgoing Component
    // Contains leftSide and rightSide.
    const componentParts = [leftSide, rightSide]

    // Class Map
    // Uses the slate.class or "panel" default.
    const componentClassMap = {
      [slate.class ?? "panel"]: true,
    }

    // Return Component
    // Uses slate.class
    return html`<div class=${classMap(componentClassMap)}>
      ${componentParts}
    </div>`
  }
}
