// Slate Framework Components
// Markdown
// by David Bethune
//
// Renders markdown content using the marked library.

//Dependencies
import * as framework from "framework/startup/framework-startup"
import {html, css, CSSResultGroup, unsafeCSS} from "lit"
import {unsafeHTML} from "lit/directives/unsafe-html.js"
import {customElement, property, state} from "lit/decorators.js"
import {marked} from "marked"
import markdownCSS from "app/css/app-markdown.css?inline"
import {object} from "firebase-functions/v1/storage"

@customElement("framework-markdown")
export class frameworkMarkdown extends framework.appComponent
{
  //PUBLIC PROPERTIES //////////

  //PRIVATE PROPERTIES /////////

  @state() settings: []
  @state() mdFile: string
  @state() markdown: string = ""

  //CSS PROPERTIES //////////

  //Use shared styles
  static get styles(): CSSResultGroup
  {
    return [super.styles, unsafeCSS(markdownCSS)]
  }

  // Component Functions
  async getMarkdownFile(filename)
  {
    // Setup fetch options
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "text/html",
      },
      mode: "cors",
      cache: "default",
    }

    const url = `/markdown/${filename}`

    const fetchResults = await fetch(url, fetchOptions)
    const textResults = await fetchResults.text()

    return textResults
  }

  // HTML Templates
  markdownViewer(markdown)
  {
    return unsafeHTML(markdown ? (marked.parse(this.markdown) as string) : null)
  }

  // PROPERTY DEPENDENCIES
  // These properties require further updates when they change.
  async willUpdate(changedProperties)
  {
    if (changedProperties.has("route"))
    {
      const helpRoute = this.route.help || {doc: "help"}
      const [helpFolder] = Object.keys(helpRoute)
      const helpFile = helpRoute[helpFolder]
      const finalFilename = `${helpFolder}/${helpFile}.md`
      this.markdown = await this.getMarkdownFile(finalFilename
      )
    }
  }

  //Show this component on screen
  render()
  {
    return html`<div class="component">
      ${[this.markdownViewer(this.markdown)]}
    </div>`
  }
}
