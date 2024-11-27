// Slate Framework Modules
// Routing
// by David Bethune
//
// Provides functions to manage browser routing.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// Default Menu
// Returns the default menu
// The default menu is the first one that contains a command with default: true.
export function defaultMenu()
{
  return Object.keys(framework.menus).find(menuKey =>
  {
    const menuItems = framework.menus[menuKey]
    return Object.keys(menuItems).find(itemKey =>
    {
      return framework.commands[itemKey]?.default
    })
  })
}

// Default Route
// The default route is the first command with default: true.
export function defaultRoute()
{
  return Object.keys(framework.commands).find(
    command => framework.commands[command].default
  )
}

// Get Route
// Returns the base route from the URL as a string.
export function getRoute()
{
  return baseRoute(routeFromURL())
}

// Route From URL
// Returns the route from the URL as a framework.route object.
// Example: https://localhost:3000/software/page/1/id/2 => {software: {page: 1, id: 2}
export function routeFromURL()
{
  const [route, ...parameters] = getRouteArray()
  const parametersObject = parameters.reduce((obj, item, index) =>
  {
    index % 2 === 0 ? (obj[item] = parameters[index + 1]) : null
    return obj
  }, {})
  return {
    [route || defaultRoute()]: !Object.keys(parametersObject).length
      ? undefined
      : parametersObject,
  }
}

// Get Route Array
// Get routes from browser (slash-based) as an array.
// Returns empty array if no route.
function getRouteArray()
{
  const [_, ...routeArray] = document.location.pathname.split("/")
  return routeArray.length ? routeArray : []
}

// Base Route
// Returns the base route from the a routing object.
export function baseRoute(route: framework.route)
{
  const [baseRoute] = !route ? [undefined] : Object.keys(route)
  return baseRoute
}

// urlTo
// Sets the browser URL via history.
export function urlTo(route?: string)
{
  history.pushState(null, null, document.location.origin + "/" + (route ?? ""))
}

// Route on Event
// When triggered, kicks off route from URL processing (not event detail).
// Called with bind().
export function routeOnEvent(e: CustomEvent)
{
  framework.setRoute.bind(this)(framework.routeFromURL())
  window.scrollTo(0, 0)
}

// Set Route
// Given a framework.route object sets this.route in a component.
// Called with bind().
export function setRoute(route: framework.route)
{
  const baseRoute = framework.baseRoute(route)
  const parameters = route[baseRoute]

  // New Route
  let newRoute = {...route}

  // Alias? Use it.
  // Aliased item can have click or URL.
  framework.aliases[baseRoute]
    ? (newRoute = {
      [framework.aliases[baseRoute].content as string]: parameters,
    })
    : null

  // New Base Route
  // Uses alias if it was present.
  const newBaseRoute = framework.baseRoute(newRoute)

  // Command entry for new base route.
  const command = framework.commands[newBaseRoute]

  // No command? Error.
  !command ? (newRoute = {error: parameters}) : null

  // Command has an URL? Redirect. Early return.
  if (command?.url)
  {
    document.location = command.url as string
    return
  }

  // Click/Nav Action? Run it.
  command?.click && typeof command.click === "function" ? command.click() : null

  this.route = newRoute
}

// Set Menu
// Given a route, sets this.menu in a component.
// Called with bind().
export function setMenu(menuRoute: framework.route)
{
  // this.menu =
  //   framework.menus[framework.baseRoute(menuRoute)] ??
  //   framework.menus[framework.defaultMenu()]

  this.menu = framework.menus[framework.defaultMenu()]
}

// Route To
// Sets the browser URL to a new route and notifies the router.
export function routeTo(route: string = "")
{
  // Outside URL? Redirect and early return.
  if (route.includes("http"))
  {
    window.location.href = route
    return
  }

  // Update URL for route/param detection in router.
  urlTo(route)

  // Notify gateway
  framework.notify({
    component: framework.components.router,
    event: framework.events.routeChanged,
    detail: route,
  })
}

// Routed Component
// Injects the route into a framework component.
export function routedComponent(
  component: framework.frameworkComponent,
  route: framework.route
)
{
  const routedComponent = component
  routedComponent.route = route
  return routedComponent
}

// Menu Keys
export function menuKeys(filter: (key: string) => boolean)
{
  return Object.keys(framework.slates).filter(filter)
}

// Notify Gateway of Back Button
// Immediately executing.
window.onpopstate = event =>
{
  framework.notify({
    component: framework.components.router,
    event: framework.events.routeChanged,
    detail: {},
  })
}

// Route Parameters
// Returns the parameters from a route object.
export function routeParameters(route: framework.route)
{
  const baseRoute = framework.baseRoute(route)
  return route[baseRoute]
}

// Has Parameter
// Returns true if the parameter is in the URL.
export function hasParameter(parameter: string)
{
  return getRouteArray().includes(parameter)
}

// Has Value
// Returns true if the parameter has a value following it in the URL.
export function hasValue(parameter: string)
{
  const route = getRouteArray()
  const index = route.indexOf(parameter)
  return index > -1 && route[index + 1] != undefined
}

// Get Parameter
// Returns the parameter value from the URL.
export function getParameter(parameter: string)
{
  const route = getRouteArray()
  const index = route.indexOf(parameter)
  return index > -1 ? route[index + 1] : null
}

// Consume Parameter
// Returns all the values following the parameter
export function consumeParameter(parameter: string)
{
  const route = getRouteArray()
  const index = route.indexOf(parameter)
  return index > -1 ? route.slice(index + 1) : []
}

// Add Parameter
// Returns the path with the parameter added if it doesn't already exist in the route.
export function addParameter(parameter: string, path?: string)
{
  const route: string[] = path ? path.split("/") : getRouteArray()
  if (!route.includes(parameter))
  {
    return route.concat(parameter).join("/")
  }
  return path
}

// Remove Parameter
// Returns the path with the parameter removed.
export function removeParameter(parameter: string, path?: string)
{
  const route: string[] = path ? path.split("/") : getRouteArray()

  const parameterIndex = route.indexOf(parameter)
  const parameterValueIndex = parameterIndex + 1
  return route
    .filter(
      (path, index) => index != parameterIndex && index != parameterValueIndex
    )
    .join("/")
}

// Remove All Parameters
// Returns the path with all parameters following the specified parameter removed.
export function removeAllParameters(parameter: string)
{
  const route = getRouteArray()
  const parameterIndex = route.indexOf(parameter)
  const parameterValueIndex = parameterIndex + 1
  if (parameterIndex === -1)
  {
    return undefined
  }
  return route.filter((path, index) => index < parameterIndex).join("/")
}

// Get Path Parameters
// Decomposes the path into a JSON object of parameters and values.
export function getPathParameters(url: string): Record<string, string>
{
  const path = new URL(url).pathname
  const pathSegments = path.split("/").slice(1)
  const params: Record<string, string> = {}
  for (let i = 2; i < pathSegments.length; i += 2)
  {
    params[pathSegments[i - 1]] = pathSegments[i]
  }
  return params
}

// Has Command
// Returns the first command if the URL contains one.
export function hasCommand()
{
  const urlCommands = Object.keys(framework.commands)
    .map(command =>
    {
      return hasParameter(command) ? command : null
    })
    .filter(command => command != null)
  return urlCommands.length > 0 ? urlCommands[0] : null
}

// Document Title
export function documentTitle(title: string = ""): void
{
  const windowTitle = `${framework.settings.app.name} ${framework.text(
    `menu.${framework.getRoute()}`
  )} | ${title}`
  document.title = windowTitle

  // Set Discord/Slack Title
  document
    .querySelector('meta[name="twitter:title"]')
    .setAttribute("content", windowTitle)

  document
    .querySelector('meta[property="og:title"]')
    .setAttribute("content", windowTitle)

  document
    .querySelector('meta[property="og:site_name"]')
    .setAttribute("content", windowTitle)
}
