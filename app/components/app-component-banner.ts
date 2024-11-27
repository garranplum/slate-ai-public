// Slate App Components
// Banner
// by David Bethune
//
// Given a slate, draws banner with a background image and overlay content.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { styleMap } from "lit/directives/style-map.js"

@customElement("app-banner")
export class appBanner extends framework.appComponent {
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

    const componentParts = [
      html`<div class="${slate.labelClass}">${slate.label}</div>`,
      slate.desc
        ? html`<div class="${slate.descClass}">${slate.desc}</div>`
        : null,
      this.photoCredit(slate),
    ]

    // Class Map
    const componentClassMap = {
      component: true,
      banner: true,
      thickBanner: Boolean(!this.routeParameters()),
      thinBanner: Boolean(this.routeParameters()),
      [slate.class]: slate.class,
    }

    // Style Map
    const componentStyleMap = {
      backgroundImage: this.slate.img
        ? `url("${framework.assetUrl(slate.img as framework.asset)}")`
        : "none",
    }

    // Return Component
    return html`<div
      class=${classMap(componentClassMap)}
      style=${styleMap(componentStyleMap)}
    >
      ${componentParts}
    </div>`
  }
}
