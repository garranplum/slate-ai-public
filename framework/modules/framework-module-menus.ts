// Slate Framework Modules
// Menus
// by David Bethune
//
// Provides functions for working with menus.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"

// Menus
import * as menuItems from "app/menus/app-menus-content"

export const menus = {...menuItems}

export function omitMenuKey(menu: framework.menu, key: string)
{
  const ommittedIndex = Object.keys(menu).indexOf(key)
  const {[key]: _, ...rest} = menu
  const restWithOffset = {}
  Object.keys(rest).map(key =>
  {
    restWithOffset[key] = {...rest[key]}
    Object.keys(menu).indexOf(key) > ommittedIndex
      ? (restWithOffset[key].offset = 1)
      : null
  })
  return restWithOffset
}
