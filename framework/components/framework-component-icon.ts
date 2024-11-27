// Slate Framework Components
// Icon
// by David Bethune
//
// Provides access to SVG icon sets.

//Lit Dependencies
import {html, svg} from "lit"
import {customElement, property} from "lit/decorators.js"

//Icon SVG Sets
import * as fa from "framework/icons/framework-icons"
import * as framework from "framework/startup/framework-startup"

@customElement("framework-icon")
export class frameworkIcon extends framework.appComponent
{
  //PUBLIC PROPERTIES
  @property() color: string = "currentColor"
  @property() hover: string
  @property({type: Number}) size: number = 1
  @property() viewBox: string
  @property() title: string
  @property() icon: string

  // HTML TEMPLATES
  singleIconPart(icon: string)
  {
    //Destructure class to find icon set and name
    let [set, name] = icon.split(" ")
    if (!name)
    {
      name = set
      set = "fas"
    }

    //Retrieve icon from set by regular or alternate name
    let matchingIcon: any[] = fa[set][name]

    //Get icon info (array) from fa set

    //Handle matchingIcon not found (by name or alternate) with i in a circle.
    if (!matchingIcon)
    {
      matchingIcon = fa.fas["circle-info"]
    }

    // //Handle matchingIcon not found (by name or alternate) with red triangle bang
    // if (!matchingIcon)
    // {
    //   matchingIcon = fa.fas["triangle-exclamation"]
    //   this.color = "#ec2026"
    //   this.title = `Could not find icon "${this.icon}".`
    // }

    //Destructure array to find SVG info
    let [width, height, , , dValue] = matchingIcon

    //Build viewBox value with width and height
    let viewBox = `0 0 ${width} ${height}`

    // Determine aspect ratio for min width
    const aspectRatio = width / height

    //Create SVG without Hover
    let svgPart = svg`
        <svg viewBox=${viewBox} title=${this.title} class="icon ${this.icon}" style="max-height:${this.size}em;min-width:${this.size}em;fill:${this.color};">
            <path d="${dValue}"></path>
            <title>${this.title}</title>
        </svg>
        `

    //Return SVG
    return svgPart
  }

  // CONSTRUCTOR
  // Runs once when the component class definition is loaded.
  constructor(icon: string)
  {
    super()
    this.icon = icon
  }

  // RENDER
  // Runs every time the component is redrawn.
  render()
  {
    // No icon? Default to question block.
    !this.icon ? (this.icon = "message-exclamation") : null

    return this.singleIconPart(this.icon)
  }
}
