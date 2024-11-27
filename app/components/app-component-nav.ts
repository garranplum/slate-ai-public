// Slate App Components
// Nav
// by David Bethune
//
// Provides top-line navigation.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import {html} from "lit"
import {customElement, property} from "lit/decorators.js"
import {classMap} from "lit/directives/class-map.js"

@customElement("app-nav")
export class appNav extends framework.appComponent
{
  // PUBLIC PROPERTIES
  @property({type: Object}) menu: framework.menu
  @property({type: String}) addClass: string

  // HTML TEMPLATES

  linksPart(menu: framework.menu, addClass)
  {
    const linkList = Object.keys(menu ?? []).map((key, index) =>
    {
      const offset =
        (menu[key].offset as number) ??
        Object.keys(framework.menus.primary).indexOf(this.routeBase()) + 1
      const colorIndex = index + offset
      const slate: framework.slate = {
        ...menu[key],
        index: colorIndex,
        active: this.routeBase() == menu[key].command,
        command: menu[key].command as string ?? key,
        content: menu[key].content as framework.content ?? framework.unCamelCase(key),
        click: menu[key].click as Function
      }
      return framework.routedComponent(
        new framework.appButton(slate),
        this.route
      )
    })

    const componentClassMap = {
      nav: true,
      [addClass]: Boolean(addClass),
    }

    return html`<div class=${classMap(componentClassMap)}>${linkList}</div>`
  }

  // CONSTRUCTOR
  // Runs once when the component class definition is loaded.
  constructor(menu: framework.menu)
  {
    super()
    this.menu = menu
  }

  // RENDER
  // Runs every time the component is redrawn.

  render()
  {
    return this.linksPart(this.menu, this.addClass)
  }
}
