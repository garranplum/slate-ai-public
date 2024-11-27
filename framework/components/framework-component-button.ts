// Slate Framework Components
// Button
// by David Bethune
//
// Renders a single button from a slate.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import {html, css, CSSResultGroup} from "lit"
import {customElement, state} from "lit/decorators.js"

@customElement("framework-button")
export class frameworkButton extends framework.appComponent
{
  // PUBLIC PROPERTIES

  // PRIVATE PROPERTIES
  @state() changed: boolean = false

  // CSS STYLES
  static get styles(): CSSResultGroup
  {
    return [
      super.styles,
      css`
        .icon {
          display: grid;
          grid-template-rows: 1fr;
          place-content: center;
          width: 1.25em;
          margin-top: 0.2em;
        }

        img {
          width: 1.25em;
        }
      `,
    ]
  }

  // COMPONENT FUNCTIONS

  // HTML TEMPLATES

  // Create button
  button(slate)
  {
    return html`
      <div class="elide" style="padding-right:.25em;">${slate.content}</div>
    `
  }

  // Create icon
  icon(slate)
  {
    return html`
      <div class="icon" style="color:${slate.iconColor}">
        <slate-icon title=${slate.iconLabel} id=${slate.icon}></slate-icon>
      </div>
    `
  }

  // Create Image
  image(slate)
  {
    return html`
      <div class="image">
        <img title=${slate.iconLabel} src=${slate.mediaUrl(slate.img)} />
      </div>
    `
  }

  // RENDER
  // Runs every time the component is redrawn.
  render()
  {
    const columns =
      (this.slate.icon || this.slate.img) && this.slate.content ? 2 : 1

    const hasUrl =
      this.slate.command && framework.commands[this.slate.command]
        ? framework.commands[this.slate.command].url
        : this.slate.url

    return html`
      <a
        tabindex="-1"
        title=${this.slate.label}
        href=${hasUrl ? hasUrl : this.slate.command}
        @click=${e =>
      {
        e.preventDefault()

        if (this.slate.click)
        {
          this.slate.click()
        }

        if (this.slate.command)
        {
          framework.routeTo(this.slate.command)
          return
        }

        if (this.slate.url)
        {
          document.location = this.slate.url
          return
        }
      }}
      >
        <div class="component ${this.slate.class}">
          <style>
            .component {
              display: grid;
              grid-template-columns: ${columns == 2
        ? "min-content 1fr"
        : "1fr"};
              border-radius: 7px;
              padding: 0.25em;
              min-height: 1.5em;
            }
          </style>
          ${[
        this.slate.img
          ? this.image(this.slate)
          : this.slate.icon
            ? this.icon(this.slate)
            : null,
        this.slate.content ? this.button(this.slate) : null,
      ]}
        </div>
      </a>
    `
  }
}
