// Slate Framework Modules
// AI
// by David Bethune
//
// Provides async access to OpenAI API calls.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import {html} from "lit"

// OpenAI import
import OpenAI from "openai"

// Providers
export const providers = {
    OpenAI: {
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    },
    xAI: {
        apiKey: import.meta.env.VITE_XAI_API_KEY,
    }
}

// ProviderKey
type providerKey = keyof typeof providers

// Default Provider
export const defaultProvider: providerKey = "OpenAI"

// API Key
const openai = new OpenAI({apiKey: providers[defaultProvider].apiKey, dangerouslyAllowBrowser: true})

// Defaults
export const defaults = {
    text: {
        model: "gpt-4o-mini" as framework.openAIModel,
        systemPromptText: "You are a helpful assistant."
    },
    image: {
        model: "dall-e-3" as framework.openAIImageModel,
        size: "1024x1024" as framework.openAIImageSize,
        systemPromptText: ""
    }
}

// Default Completions
export const defaultTextCompletion: framework.OpenAICompletion = {
    model: defaults.text.model,
    messages: [
        {role: "system", content: defaults.text.systemPromptText}
    ],
    tab: {
        type: "text"
    }
} as framework.OpenAICompletion

export const defaultImageCompletion: framework.OpenAICompletion = {
    model: defaults.image.model,
    messages: [
        {role: "system", content: defaults.image.systemPromptText}
    ],
    tab: {
        type: "image"
    }
} as framework.OpenAICompletion

// FUNCTIONS THAT RETURN STRINGS
// IMMEDIATE

// Response Text
// Extracts response text from results and returns it as a string.
export function responseText(response)
{
    const [firstChoice] = response.choices
    return firstChoice.message.content

}


// FUNCTIONS THAT RETURN STRINGS
// ASYNC

// One Shot
// Returns response text from system text and user text.
export async function oneShot({systemText, content, model = defaults.text.model}: {systemText: string, content: string, model?: framework.openAIModel}): Promise<string>
{
    const initialCompletion: framework.OpenAICompletion = {
        model,
        messages: [
            {role: "system", content: systemText},
            {role: "user", content}
        ]
    }
    const resultingCompletion = await OpenAICompletion(initialCompletion)
    return responseText(resultingCompletion.response)
}

// One Shot Completion
// Turns a completion into text and submits it as a one shot.
export async function oneShotCompletion({systemText, completion}: {systemText: string, completion: framework.OpenAICompletion}): Promise<string>
{
    const submitCompletion = cleanCompletion(completion)
    return await oneShot({systemText, content: JSON.stringify(submitCompletion.messages)})
}

// One Shot Assistant
// Creates a new one shot from the default system prompt and user text.
export async function oneShotAssistant(content: string): Promise<string>
{
    return await oneShot({systemText: defaults.text.systemPromptText, content})
}

// Iconizer
// Finds a FontAwesome icon that matches a string and returns its ID.
export async function iconizer(content: string): Promise<string>
{
    const systemText = `Find the FontAwesome icon that best matches the supplied label text. Return only the first portion of the ID after the prefix and dash. If that contains a dash, don't return it or anything after it.`
    return oneShot({systemText, content})
}

// FUNCTIONS THAT RETURN COMPLETIONS
// IMMEDIATE

// Clean Completion
// Removes audit, tab, and image information from a completion.
export function cleanCompletion(completion: framework.OpenAICompletion)
{
    const {audit: _audit, tab: _tab, ...cleanedCompletion} = completion
    const filteredMessages = cleanedCompletion.messages.filter(message => message.role !== "image")

    return {...cleanedCompletion, messages: filteredMessages}
}

// Add User Message
// Returns a new completion that's a copy of the passed one with the user's message added at the end.
function addUserMessage({completion, message}: {completion: framework.OpenAICompletion, message: framework.OpenAIUserMessage}): framework.OpenAICompletion
{
    return {
        ...completion,
        messages: [
            ...completion.messages,
            message
        ]
    }
}

// Add Assistant Message
// Returns a new completion that's a copy of the passed one with the assistant's message(s) added at the end.
// Allows the conversation to continue including the assistant's output so far.
function addAssistantMessage({completion, response}: {completion: framework.OpenAICompletion, response: framework.OpenAIReply}): framework.OpenAICompletion
{
    return {
        ...completion,
        messages: [
            ...completion.messages,
            ...response.choices.map(choice => ({role: "assistant", content: choice.message.content} as framework.OpenAIAssistantMessage)),
        ]
    }
}

// FUNCTIONS THAT RETURN COMPLETIONS
// ASYNC

// Prompt Completion
// Given a completion and user text, runs the completion with a new user message.
// Adds the response's assistant message to the completion and returns it.
export async function promptCompletion({completion, content}: {completion: framework.OpenAICompletion, content: string}): Promise<framework.OpenAICompletion>
{
    // Add the user message to the completion
    const newCompletion = addUserMessage({completion, message: {role: "user", content}})

    // Submit the completion to the API
    const {response} = await OpenAICompletion(newCompletion)

    // Remove the choices to leave audit information.
    // Includes ID, date submitted, and token usage.
    const {choices: _, ...auditItem} = response

    // Remove ID (duplicated) and object (unused) from the audit item.
    delete auditItem.id
    delete auditItem.object

    // Add the assistant's response
    const updatedCompletion = addAssistantMessage({completion: newCompletion, response})

    // Add the audit item to the audit trail.
    updatedCompletion.audit = {
        ...updatedCompletion.audit,
        [response.id]: auditItem
    }

    // Return the updated completion    
    return updatedCompletion
}

// FUNCTIONS THAT RETURN IMAGE RESPONSES
// ASYNC

// OpenAI Image
// Calls the OpenAI API images.create endpoint with the passed prompt.
export async function OpenAIImage({prompt, model = defaults.image.model, size = defaults.image.size}: {prompt: string, model?: framework.openAIImageModel, size?: framework.openAIImageSize}): Promise<OpenAI.ImagesResponse>
{

    const response: OpenAI.ImagesResponse = await openai.images.generate({
        model,
        response_format: "b64_json",
        prompt,
        size
    })

    return response
}

// FUNCTIONS THAT RETURN TUPLES
// ASYNC

// OpenAI Completion
// Calls the OpenAI API completions.create endpoint with the passed completion.
// Returns {completion, response}. The returned completion is unchanged.
async function OpenAICompletion(completion: framework.OpenAICompletion): Promise<{completion: framework.OpenAICompletion, response}>
{
    // Don't send audit or tab information
    const processCompletion = cleanCompletion(completion)

    // Submit the completion to the API
    const response = await openai.chat.completions.create(processCompletion)

    // Return the original completion unchanged and the response
    return {completion, response}
}

// FUNCTIONS THAT CREATE MENU BUTTONS
// IMMEDIATE

export function createSaveButtons(completion: framework.OpenAICompletion)
{

    // Create a save JS button on the primary nav
    framework.menus.primary["saveJSON"] = {
        icon: "download",
        content: "JS",
        type: "bar",
        class: "barButton barTop primary",
        offset: 0,
        click: async (e) =>
        {
            e.preventDefault()
            framework.saveCompletionJSON(completion)
        }
    }

    // Create a save MD button on the primary nav
    framework.menus.primary["saveMD"] = {
        icon: "download",
        content: "MD",
        type: "bar",
        class: "barButton barTop primary",
        offset: 0,
        click: async (e) =>
        {
            e.preventDefault()
            framework.saveCompletionMD(completion)
        }
    }

    // If a conversation exists, create commands to light the Save buttons.
    // Otherwise, remove the commands to dim the buttons.
    if (completion.messages.length > 1)
    {
        framework.commands.saveJSON = {}
        framework.commands.saveMD = {}
    } else
    {
        delete framework.commands.saveJSON
        delete framework.commands.saveMD
    }

    // Notify router.
    framework.notify({
        component: framework.components.router,
        event: framework.events.routeChanged,
        detail: null,
    })
}

// FUNCTIONS THAT PERFORM NAVIGATION
// ASYNC

// Completion To Tab
// Summarizes the completion, adds a navigation tab, and navigates to it.
export async function completionToTab(completion: framework.OpenAICompletion)
{
    // Extract completion ID or generate one.
    const id = completion.tab?.id ?? framework.generateUUID()


    // Store the completion in session storage under its ID.
    // framework.storeSession({[completionID]: loadedJSON})

    const summaryCompletion = {
        ...completion,
        model: framework.defaults.text.model,
    }

    // Extract label or create one.
    const label = completion.tab?.label || await framework.oneShotCompletion({systemText: "Write a 2-5 word label to summarize the overall conversation. Do not output more than 5 words. Do not add quotes or punctuation. Use Title case.", completion: summaryCompletion})

    // Extract icon or create one.
    const icon = completion.tab?.icon || await iconizer(label)

    // Add the latest ID, summary label, and icon to the tab section.
    const completionWithTab: framework.OpenAICompletion = {
        ...completion,
        tab: {
            ...completion.tab,
            id,
            label,
            icon
        }
    }

    // Create a new command and component containing the completion.
    framework.commands[id] =
    {
        type: "completion",
        content: [
            completion.tab.type == "image" ?
                new framework.appImageConversation({slate: {}, completion: completionWithTab}) :
                new framework.appTextConversation({slate: {}, completion: completionWithTab})
        ],
    }


    // Delete Button
    // Removes the completion tab and navigates to the previous or next tab, or new.
    const deleteButton: framework.slate =
    {
        content: html`
    <div class="closeIcon"> 
        <framework-icon icon="square-xmark" @click=${async (e) =>
            {
                // Extract only the completion tabs.
                const completionTabs = Object.keys(framework.commands).filter((key) => framework.commands[key].type === "completion")

                // Find the index of the tab we are deleting and the ones before and after it.
                const deleteIndex = completionTabs.indexOf(id)
                const previousIndex = deleteIndex - 1
                const nextIndex = deleteIndex + 1

                // Calculate which tab to navigate to after deletion.
                // If the previous tab exists, navigate to it. Otherwise, navigate to the next tab if it exists.
                // Otherwise, use -1 to signal the "new" tab.
                const navigateToIndex = previousIndex >= 0 ? previousIndex : nextIndex < completionTabs.length ? nextIndex : -1

                // Find the completion ID of the tab to navigate to, or new on the -1 signal.
                const navigateToTab = navigateToIndex ? completionTabs[navigateToIndex] : "new"

                // Delete the completion tab and its primary nav button.
                delete framework.commands[id]
                delete framework.menus.primary[id]

                // Navigate to the completion or new tab.
                framework.routeTo(navigateToTab)

            }}>>
        </framework-icon>
    </div>`}


    // Create a new tab on the primary nav for the command.
    framework.menus.primary[id] = {
        icon: icon,
        content: label,
        type: "bar",
        class: "barButton barTop primary",
        offset: 0,
        command: id,
        buttons: [deleteButton]
    }

    framework.routeTo(id)
}

// FILE FUNCTIONS

// LOAD COMPLETION
// Load completion from JSON file and navigate to it.
export async function loadCompletion(e)
{
    framework.fileChooser(async (e) =>
    {
        // Load JSON from file.
        const completion = await framework.uploadJSON(e) as framework.OpenAICompletion

        // Extract completion ID or generate one.
        const id = completion.tab?.id ?? framework.generateUUID()

        // Create a summary to use as a label.
        const label = completion.tab?.label ?? await framework.oneShotCompletion({systemText: "Write a 2-5 word label to summarize the overall conversation. Do not output more than 5 words. Do not add quotes or punctuation. Use Title case.", completion})

        // Save ID and label to tab.
        completion.tab = completion.tab ?? {id, label}

        // Find existing tab, if any.
        const matchingTab = framework.commands[id]

        // Route to existing or new tab.
        matchingTab ? framework.routeTo(id) : framework.completionToTab(completion)
    })
}

// SAVE COMPLETION JSON
export async function saveCompletionJSON(completion: framework.OpenAICompletion)
{

    // Extract completion ID or generate one.
    const id = completion.tab?.id ?? framework.generateUUID()

    // Setup summary completion.
    const summaryCompletion = {
        ...framework.cleanCompletion(completion),
        model: framework.defaults.text.model,
    }

    // Create a summary to use as a label.
    const label = await framework.oneShotCompletion({systemText: "Write a 2-5 word label to summarize the text. Do not output more than 5 words. Do not add quotes or punctuation. Use Title case.", completion: summaryCompletion})

    // Create icon from label.
    const icon = completion.tab?.icon || await framework.iconizer(label)

    // Add a tab section with the latest ID, new summary label, and new icon.
    const completionWithTab: framework.OpenAICompletion = {
        ...completion,
        tab: {
            ...completion.tab,
            id,
            label,
            icon
        }
    }

    // Download JSON with summary as filename.
    framework.downloadJSON(completionWithTab, `${label}.json`)

    return
}

// SAVE COMPLETION MARKDOWN
export async function saveCompletionMD(completion: framework.OpenAICompletion)
{
    // Extract completion ID or generate one.
    const id = completion.tab?.id ?? framework.generateUUID()

    // Get summary from menu.
    const summary = framework.menus.primary[id].content

    // Create markdown text for each message in the completion.
    const messageMarkdown = completion.messages.map((message) =>
    {
        // System Message
        if (message.role === "system")
        {
            return `## System\n${message.content}`
        }

        // User Message
        if (message.role === "user")
        {
            return `## ${message.content}`
        }

        // Assistant Message
        if (message.role === "assistant")
        {
            return `${message.content}`
        }

        // Image Message
        if (message.role === "image")
        {
            const {b64_json} = message.content
            const dataUrl = `data:image/png;base64,${b64_json}`
            return `![](${dataUrl})`
        }
    })

    // Add the summary headline at the start of the array.
    const summaryAndMessagesMarkdown = [`# ${summary}`, ...messageMarkdown]

    // Turn the array into text with two newlines between each message.
    const markdownText = summaryAndMessagesMarkdown.join("\n\n")

    // Download text with summary filename and md extension.
    framework.downloadText(markdownText, `${summary}.md`)
}

// TEST CONTENT

// const prompt1 = "Who designed the pyramid at the Musée du Louvre and when was it constructed?"
// const prompt2 = "When was the main building built and who designed that?"
// const prompt3 = "What's the nearest Métro station?"

// const result1 = await oneShotAssistant(prompt1)
// console.log("RESULT 1", result1)

// const result2 = await oneShotAssistant(prompt2)
// console.log("RESULT 2", result2)

// const result3 = await oneShotAssistant(prompt3)
// console.log("RESULT 3", result3)
