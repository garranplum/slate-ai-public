// Slate Framework Components
// Image
// by David Bethune
//
// Draws an image from a mediaUrl.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import { html, css, CSSResultGroup } from "lit"
import { customElement, property, state } from "lit/decorators.js"

@customElement("framework-image")
export class frameworkImage extends framework.appComponent {
  // PUBLIC PROPERTIES
  @property({ type: Object }) asset: framework.asset

  // PRIVATE PROPERTIES

  // CSS STYLES
  static get styles(): CSSResultGroup {
    return [super.styles, css``]
  }

  // COMPONENT FUNCTIONS

  // MESSAGE HANDLERS

  // HTML TEMPLATES

  imagePart() {
    return html` <style>
        img {
          width: 100%;
          min-width: 100%;
          object-fit: cover;
        }
      </style>

      <img src=${framework.assetUrl(this.asset)} />`
  }

  // RENDER
  // Runs every time the component is redrawn.

  render() {
    const componentParts = [this.imagePart()]

    return [html`${componentParts}`]
  }
}
