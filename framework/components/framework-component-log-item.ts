// Slate Framework Components
// Log Item
// by David Bethune
//
// Given a slate.debugLogItem, displays an error message panel.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import { html } from "lit/static-html.js"
import { css, TemplateResult, CSSResultGroup, nothing } from "lit"
import { customElement, property, state } from "lit/decorators.js"

@customElement("framework-log-item")
export class frameworkLogItem extends framework.appComponent {
  // PUBLIC PROPERTIES
  @property({ type: Object }) item: framework.debugLogItem
  @property({ type: Boolean }) visible: boolean = false

  // PRIVATE PROPERTIES

  // CSS STYLES
  static get styles(): CSSResultGroup {
    return [super.styles, css``]
  }

  // COMPONENT FUNCTIONS

  // HTML TEMPLATES

  //JSON Viewer
  jsonViewer(json) {
    const jsonCopy = { ...json }
    return Object.keys(jsonCopy).map(key => {
      Array.isArray(jsonCopy[key])
        ? (jsonCopy[key] = `[${jsonCopy[key].join(",")}]`)
        : null
      const isObject = typeof json[key] == "object"
      const isArray = Array.isArray(json[key])
      return [
        html`
          <slate-input
            .slate=${{
              icon: isObject ? "caret-right" : "hashtag",
              color: isObject ? "blue" : undefined,
              content: isObject ? key : json[key],
              contentLabel: key,
              button: [],
            }}
          ></slate-input>
        `,
        typeof json[key] == "object" ? this.jsonViewer(json[key]) : nothing,
      ]
    })
  }

  // Log Item Panel
  // Wraps a JSON viewer in a panel.
  logItemPanel(debugLogItem: framework.debugLogItem): TemplateResult {
    const thisComponent = this
    const baseColor = `${framework.getColor(debugLogItem.ok ? 8 : 0)}`
    const brightness = thisComponent.visible ? "EE" : "AA"
    return html`
      <slate-button
        .slate=${{
          icon: "chart-network",
          content: debugLogItem.name,
          color: `${baseColor}${brightness}`,
          click: () => {
            thisComponent.visible = !thisComponent.visible
          },
        }}
      ></slate-button>
      ${this.visible ? this.jsonViewer(debugLogItem) : null}
    `
  }

  // RENDER
  // Runs every time the component is redrawn.
  render() {
    return html`
      <div class="component">${[this.logItemPanel(this.item)]}</div>
    `
  }
}
