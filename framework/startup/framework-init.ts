import * as frameworkModules from "framework/exports/framework-exports-modules"
import * as frameworkComponents from "framework/exports/framework-exports-components"
import * as appComponents from "app/exports/app-exports-components"
import * as appCommands from "app/menus/app-menus-command"
import * as appMenus from "app/menus/app-menus-content"


// Hot Module Reload
import.meta.hot ? import.meta.hot.accept((newModule) => {}) : null

// Auto Command Content
// Adds matching panels from framework.slates.panel to commands that don't have content defined.
function autoCommandContent()
{
    const commands = {...appCommands.commands}
    Object.keys(commands).map(baseRoute =>
    {
        // Content key missing or empty array? Show panels matching the base route.
        const autoPanels =
            !commands[baseRoute].content ||
                ![commands[baseRoute].content].flat().length
                ? Object.keys(frameworkModules.slates.panel[baseRoute] ?? {})
                    .filter(panelKey => !["key", "group", "type"].includes(panelKey))
                    .map(panelKey =>
                    {
                        return new appComponents.appPanel(
                            frameworkModules.slates.panel[baseRoute][panelKey]
                        )
                    })
                : null
        commands[baseRoute].content = commands[baseRoute].content ?? autoPanels
    })
    return commands
}

// Auto Panel Menus
// Adds a matching menu from framework.menus to panels that don't have a menu defined.
// Converts panel alt slates to appPanels.
function autoPanelMenus()
{
    const panel = {...frameworkModules.slates.panel}
    Object.keys(panel).map(baseRoute =>
    {
        Object.keys(panel[baseRoute]).map(panelKey =>
        {
            const menu = frameworkModules.menus[baseRoute]?.[panelKey]
            panel[baseRoute][panelKey].menu =
                panel[baseRoute][panelKey].menu ?? menu ?? {}
            panel[baseRoute][panelKey].alt
                ? (panel[baseRoute][panelKey].alt = new appComponents.appPanel(
                    panel[baseRoute][panelKey].alt
                ))
                : null
        })
    })
    return {...appMenus, ...panel}
}

// Create Router
async function createRouter()
{
    // Add the router component the document.
    document.body.appendChild(new frameworkComponents.frameworkRouter())
}

export const commands = autoCommandContent()
const appMenusWithAutoPanels = autoPanelMenus()
export {appMenusWithAutoPanels}

// START FRAMEWORK

// FRAMEWORK VERSION //////////
const version = "1.1"

// Save version in settings.
frameworkModules.settings.common = {
    ...frameworkModules.settings.common,
    version: version,
}

// Console CSS
const consoleCSS = `font-size:1.25em;font-weight:900;`

// Output framework version info.
console.group("%cSlate™", consoleCSS)
console.log(
    `%c${frameworkModules.settings.common.name} s${version}`,
    `${frameworkModules.getCSSColor(
        frameworkModules.colors.debug.system
    )}${consoleCSS}`
)

// START APPLICATION ///////////////

export * from "app/startup/app-startup"

// Output app version info.
console.log(
    `%c${frameworkModules.settings.app.name} v${frameworkModules.settings.app.version}`,
    `${frameworkModules.getCSSColor(
        frameworkModules.colors.debug.system
    )}${consoleCSS}`
)

// Output start time.
console.log(
    `%c${frameworkModules.todaysDate().timeString}`,
    frameworkModules.getCSSColor(frameworkModules.colors.debug.system)
)

// Output Debug info.
console.log(
    `%c${frameworkModules.settings.app.isDebug ? "WARNING: DEBUG ON" : "DEBUG: OFF"
    }`,
    frameworkModules.getCSSColor(
        frameworkModules.settings.app.isDebug
            ? frameworkModules.colors.debug.warning
            : frameworkModules.colors.debug.cookie
    )
)


console.groupEnd()

// Create Router
createRouter()