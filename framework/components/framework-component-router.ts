// Slate Framework Components
// Button
// by David Bethune
//

// Provides a router which determines context for loading the viewer component.

//Dependencies
import * as framework from "framework/startup/framework-startup"
import {html, css, CSSResultGroup} from "lit"
import {customElement, state} from "lit/decorators.js"

@customElement("framework-router")
export class frameworkRouter extends framework.appComponent
{
  //PUBLIC PROPERTIES //////////

  //PRIVATE PROPERTIES /////////
  @state() error: framework.debugLogItem
  @state() users
  @state() routingIntent: string
  @state() isHamburger: boolean = false

  // CSS STYLES
  static get styles(): CSSResultGroup
  {
    return [super.styles]
  }

  // COMPONENT FUNCTIONS

  // // isRouteChanged
  // // Returns true if the URL route is different from this.route.
  // isRouteChanged() {
  //   const urlPath = document.location.pathname
  //   let newRoute = framework.isDefaultRoute()
  //     ? framework.getDefaultRoute("default")
  //     : framework.getRoute()
  //   console.log(" NEW ROUTE?", newRoute)
  //   console.log("IS DEFAULT ROUTE?", framework.isDefaultRoute())
  //   return false
  // }

  // // Get Route
  // // Gets current or default route and parameters.
  // // Gets player if present.
  // // Redirects on missing properties.
  // getRoute(e) {
  //   // Remember current route to detect change.
  //   const currentRoute = this.route

  //   // No route in message? Get default route.
  //   let newRoute = framework.isDefaultRoute()
  //     ? framework.defaultRoute("default")
  //     : e.detail

  //   this.parameters = framework.getParameters()

  //   // Route changed? Nuke log.
  //   if (
  //     newRoute != currentRoute &&
  //     currentRoute != "debug" &&
  //     newRoute != "debug"
  //   ) {
  //     framework.deleteSession("debugLog")
  //   }

  //   // Alias? Substitute it.
  //   if (framework.aliases[newRoute]) {
  //     newRoute = framework.aliases[newRoute].content as string
  //     framework.routeTo(newRoute)
  //     return
  //   }

  //   // Final Route
  //   this.route = newRoute

  //   console.log("NEW ROUTE", this.route)

  //   // Click/Nav Action? Run it.
  //   framework.commands[newRoute]?.click
  //     ? framework.commands[newRoute].click()
  //     : null

  //   // Show key instead of "NO" for missing text.
  //   // Magic words
  //   const pageTitle =
  //     framework.text(`menu.${this.route}`).substring(0, 2) == "NO"
  //       ? this.route
  //       : framework.text(`menu.${this.route}`)

  //   // Set Window Title
  //   const windowTitle = `${framework.text(`app.name`)} ${pageTitle} ${
  //     this.parameters.length > 0 ? ` | ${this.parameters.join("/")}` : ""
  //   }`

  //   document.title = windowTitle

  //   // Set Discord/Slack Title
  //   document
  //     .querySelector('meta[name="twitter:title"]')
  //     .setAttribute("content", windowTitle)

  //   document
  //     .querySelector('meta[property="og:title"]')
  //     .setAttribute("content", windowTitle)

  //   document
  //     .querySelector('meta[property="og:site_name"]')
  //     .setAttribute("content", windowTitle)
  // }

  // HTML TEMPLATES

  // Header Holder
  // Provides an empty container under the nav to push remaining content down.
  headerHolder(route)
  {
    return html` <div class="headerHolder">${this.navPart(route)}</div>`
  }

  // Nav Part
  navPart(route)
  {
    const appNavComponent = new framework.appNav(this.menu)
    appNavComponent.addClass = "topNav"
    return framework.routedComponent(appNavComponent, route)
  }

  // Content
  // Creates components with routing from the command's content.
  contentPart(route: framework.route)
  {
    // Get base route (first path entry after domain)
    const baseRoute = framework.baseRoute(route)

    // Get first param of base route
    const [firstRouteParam] = Object.keys(route[baseRoute] ?? {})

    // Find a submenu in the base route command that matches the first route param
    const baseCommand = framework.commands[baseRoute]
    const routeSubMenu = (baseCommand?.menu ?? {})[firstRouteParam]

    // Display either the submenu content or the base route content

    // Auto Banners
    // Banners matching the base route? Show them.
    const autoBanners = framework.slates.banner[baseRoute]
      ? Object.keys(framework.slates.banner[baseRoute])
        .filter(panelKey => !["key", "type"].includes(panelKey))
        .map(panelKey =>
        {
          return new framework.appBanner(
            framework.slates.banner[baseRoute][panelKey]
          )
        })
      : []

    // Assemble Display Content
    // Add auto banners.
    // If a submenu is present in the current route and it has content (including auto content), use it.
    // If not, try the auto panel's alt content.
    // Finally, use the base route command's content.
    // Flatten to support inner arrays of content.
    // Filter to remove any empty content.
    const displayContent = [
      autoBanners,
      routeSubMenu?.content ??
      framework.slates.panel[baseRoute]?.[firstRouteParam]?.alt ??
      framework.commands[baseRoute].content,
    ]
      .flat()
      .filter(content => content)

    // Create a component for each content item
    const contentComponents = displayContent.map(content =>
    {
      return framework.routedComponent(
        content as framework.frameworkComponent,
        route
      )
    })
    return contentComponents
  }

  // Footer Part
  footerPart(route)
  {
    return framework.routedComponent(new framework.appFooter(), this.route)
  }

  // CONSTRUCTOR
  // Runs once when the component class definition is loaded.
  constructor()
  {
    super()

    // Register Component
    framework.components.router = this

    // Route Listener
    this.listeners = [
      {
        event: framework.events.routeChanged,
        callback: framework.routeOnEvent.bind(this),
      },
    ]

    // Language in session? Use it.
    const lang = framework.getSession("language")
    if (lang)
    {
      framework.settings.app.language = lang
    }

    // Set Route From URL
    framework.setRoute.bind(this)(framework.routeFromURL())

    // Set Menu from Route
    framework.setMenu.bind(this)(this.route)
  }

  // RENDER
  // Runs every time the component is redrawn.
  render()
  {
    // // Check for debug and apply it.
    // if (framework.hasParameter("debug")) {
    //   // Set off?
    //   if (framework.getParameter("debug") == "off") {
    //     framework.settings.app.isDebug = false
    //     framework.storeSession({ debug: false })
    //   }

    //   // Set on?
    //   if (!framework.hasValue("debug")) {
    //     framework.settings.app.isDebug = true
    //     framework.storeSession({ debug: true })
    //   }

    //   framework.routeTo(framework.removeParameter("debug"))
    // }

    const componentParts = [
      this.headerHolder(this.route),
      this.contentPart(this.route),
      this.footerPart(this.route),
    ]

    return html`<div class="router">${componentParts}</div>`
  }
}
