// Slate Framework
// Framework Startup
// by David Bethune
//
// Provides a unified loader for common modules, styles, and components as well as app-specific modules, styles, and components.
// Example of "cross-loading." By importing this single module, all modules and components are available.

// MODULES
// Modules contain only TS code without UI elements.
// Modules must be loaded first for their exports to be available to components.

// FRAMEWORK MODULES
// Makes all modules from the framework library available.
export * from "framework/exports/framework-exports-modules"

// APP-SPECIFIC MODULES
// These are available only to this app.
export * from "app/exports/app-exports-modules"

// COMPONENTS
// Components are Lit web components, defined in framework-element and extended in app-element.

// BASE COMPONENTS
// All components inherit from app-element, which inherits from framework-element.
// The framework-element must be defined first.

// Framework Element
// This provides common properties and styles for all framework apps.
export * from "framework/base/framework-base"

// Slate Element
// This adds or overrides properties and styles in common-element.
export * from "app/base/app-base"

// FRAMEWORK COMPONENTS
// These are available to all apps using the common library.

//Export Framework Components
export * from "framework/exports/framework-exports-components"

// APP COMPONENTS
// These are available only to this app.
export * from "app/exports/app-exports-components"

// CONTENT ///////////////
// All content is app-specific.

export * from "app/menus/app-menus-command"
export * from "app/menus/app-menus-content"

// Import the initializer to ensure it runs
import "framework/startup/framework-init";




