// Slate App Components
// Text Conversation
// by David Bethune
//
// Given a completion, displays the system prompt, user prompts, and assistant replies in a conversation format.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import {html} from "lit"
import {unsafeHTML} from "lit/directives/unsafe-html.js"
import {customElement, property, state} from "lit/decorators.js"
import {classMap} from "lit/directives/class-map.js"
import {marked} from "marked"

// Test Completion
// Normally unused.
// const testCompletion = {
//     "model": "gpt-4o-mini",
//     "messages": [
//         {
//             "role": "system",
//             "content": "You are a helpful assistant."
//         },
//         {
//             "role": "user",
//             "content": "What is the capital of Uruguay?"
//         },
//         {
//             "role": "assistant",
//             "content": "The capital of Uruguay is Montevideo."
//         },
//         {
//             "role": "user",
//             "content": "What is its elevation?"
//         },
//         {
//             "role": "assistant",
//             "content": "Montevideo, the capital of Uruguay, has an elevation of approximately 43 meters (141 feet) above sea level."
//         }
//     ]
// }

@customElement("app-text-conversation")
export class appTextConversation extends framework.appComponent
{
    // PUBLIC PROPERTIES
    @property({type: Object}) completion: framework.OpenAICompletion = framework.defaultTextCompletion

    // PRIVATE PROPERTIES
    @state() isProcessing: boolean = false
    @state() isChanging: boolean = false

    // CONSTRUCTOR
    // Runs once when the component class definition is loaded.
    constructor({slate, completion}: {slate?: framework.slate, completion?: framework.OpenAICompletion})
    {
        super(slate ?? {})
        this.completion = completion ?? {...framework.defaultTextCompletion}
    }

    // COMPONENT FUNCTIONS
    // Scroll to Message Pair
    // Scrolls to a message pair in the conversation.
    // Default is -1, last message.
    scrollToMessagePair(index = -1)
    {

        // Use requestAnimationFrame to ensure the browser has rendered the updated DOM
        requestAnimationFrame(() =>
        {
            // Scroll the last div with class="messagePair" into view
            const messagePairs = this.shadowRoot.querySelectorAll(".messagePair")

            const scrollToIndex = index === -1 ? messagePairs.length - 1 : index
            messagePairs[scrollToIndex].scrollIntoView()

        })

    }

    // HTML TEMPLATES
    markdownViewer(markdown)
    {
        return unsafeHTML(markdown ? (marked.parse(markdown) as string) : null)
    }

    imageViewer(image)
    {
        const {b64_json, caption} = image
        const dataUrl = `data:image/png;base64,${b64_json}`
        return html`<img src=${dataUrl} alt=${caption} />`
    }

    // System Div
    systemDiv(completion: framework.OpenAICompletion)
    {
        // First message in a completion is the system prompt.
        const [systemMessage, ..._] = completion.messages

        // Actual typing box for system message.
        const systemTextArea = html`<textarea id="systemInput" .value=${systemMessage.content} name="systemInput"></textarea>`

        const systemPromptSlate: framework.slate =
        {
            icon: this.isChanging ? "rabbit" : "book-open",
            content: this.isChanging ? "Done!" : "Set System Prompt",
            command: "load",
            class: "barButton barSide primary",
            type: "bar",
            index: 4,
            click: async (e) =>
            {
                e.preventDefault()

                // Get the form that has the system prompt.
                const form = this.shadowRoot.querySelector("#systemPromptForm") as HTMLFormElement

                // Get the input box.
                const inputBox = form.systemInput

                this.isChanging = true

                setTimeout(() => {this.isChanging = false}, 800)


                // No change? Early return.
                if (systemMessage.content === inputBox.value) return

                console.log("System Prompt Changed", inputBox.value)

                const newCompletion = completion = {
                    ...framework.defaultTextCompletion,
                    messages: [
                        {role: "system", content: inputBox.value},
                    ],
                }

                // Open completion in a new tab.
                framework.completionToTab(newCompletion)

                // Reset input box to previous value.
                inputBox.value = systemMessage.content

            }
        }


        const systemPromptButton = new framework.appButton(systemPromptSlate)
        const itemControls = html`<div class="itemControls">${systemPromptButton}</div>`

        // Submit button for the system message.
        const systemSubmitButton = html`<button type="submit">Set System Prompt</button>`

        // Form that contains the system message text area and submit button.
        const systemForm = html`<form id="systemPromptForm">${[systemTextArea, itemControls]}</form>`

        // Outer div for the system area.
        return framework.classDiv("system", systemForm)
    }

    // Results Div
    resultsDiv(completion: framework.OpenAICompletion)
    {
        // MESSAGE DIVS
        // Create a div with the role class for each message.

        // Messages after the first in a completion are user or assistant messages.
        const [_, ...userOrAssistantMessages] = completion.messages

        // Create message divs.
        // For assistant messages, use the markdown viewer to render the message content.
        // For image messages, use the image viewer.
        const messageDivs = userOrAssistantMessages.map((message) =>
        {
            return framework.classDiv(message.role, message.role === "assistant" ? this.markdownViewer(message.content) : message.role == "image" ? this.imageViewer(message.content) : message.content)
        })

        // Outer div for the results area.
        return framework.classDiv("results", messageDivs)
    }

    // Prompt Div
    promptDiv(completion: framework.OpenAICompletion)
    {
        // Actual typing box where the prompt goes.
        const promptTextArea = html`<textarea id="promptInput" name="promptInput"></textarea>`

        // Submit Prompt Button Slate
        const submitPromptSlate: framework.slate = {
            icon: this.isProcessing ? "hourglass" : "pencil",
            content: this.isProcessing ? "Working ..." : "Prompt",
            command: "load",
            type: "bar",
            index: 15,
            class: `barButton barSide primary ${this.isProcessing ? "disabled" : ""}`,
            click: async (e) =>
            {
                e.preventDefault()

                if (this.isProcessing) return

                this.isProcessing = true

                const form = this.shadowRoot.querySelector("#submitPromptForm") as HTMLFormElement

                // Get the input box.
                const inputBox = form.promptInput

                // Run the completion with the new prompt.
                const updatedCompletion = await framework.promptCompletion({completion, content: inputBox.value})

                // If we're not on a dedicated tab for this conversation, open one.
                !completion.tab.id ?
                    framework.completionToTab(updatedCompletion)
                    :
                    this.completion = updatedCompletion
                inputBox.value = ""

                // Ensure the component has finished updating
                await this.updateComplete

                // Scroll the last div with class="messagePair" into view
                this.scrollToMessagePair()

                // Update the completion for the save buttons.
                framework.createSaveButtons(updatedCompletion)

                inputBox.value = ""

            }

        }

        const submitPromptButton = new framework.appButton(submitPromptSlate)
        const itemControls = html`<div class="itemControls">${[submitPromptButton]}</div>`

        // Form that contains the prompt text area and submit button.
        const promptForm = html`
        <form id="submitPromptForm">${[promptTextArea, itemControls]}</form>`

        // Outer div for the prompt area.     
        return framework.classDiv("prompt", promptForm)
    }





    // // Submit button for the prompt.
    // const promptSubmitButton = html`<button type="submit" id="textPrompt">Submit Your Prompt</button>`

    // const imageGenerateButton = html`<button type="submit" id="imagePrompt">Generate Image</button>`

    // // Form that contains the prompt text area and submit button.
    // const promptForm = html`
    // <form @submit=${async (e) =>
    //     {
    //         e.preventDefault()

    //         // Get the input box.
    //         const inputBox = e.target.promptInput

    //         // Determine which submit button was pressed.
    //         const submitter = e.submitter

    //         // Text Prompt Submitter
    //         if (submitter.id === "textPrompt")
    //         {// Run the completion with the new prompt.
    //             const updatedCompletion = await framework.promptCompletion({completion, content: inputBox.value})

    //             // If we're not on a dedicated tab for this conversation, open one.
    //             !completion.tab.id ?
    //                 framework.completionToTab(updatedCompletion)
    //                 :
    //                 this.completion = updatedCompletion
    //             inputBox.value = ""

    //             // Update the completion for the save buttons.
    //             framework.createSaveButtons(updatedCompletion)

    //             // Early Return
    //             return
    //         }

    //         // Image Prompt Submitter
    //         if (submitter.id === "imagePrompt")
    //         {
    //             const prompt = inputBox.value
    //             const testResult = await framework.OpenAIImage({prompt, size: framework.openAIImageShape.tall})
    //             const [testResultData] = testResult.data
    //             const b64String = testResultData.b64_json

    //             const label = await framework.oneShot({systemText: "Write a 2-5 word label to summarize the image prompt. Do not output more than 5 words. Do not add quotes or punctuation. Use Title case.", content: prompt})

    //             const newImageMessage = {
    //                 role: "image",
    //                 content: testResultData
    //             }

    //             this.completion = {
    //                 ...this.completion,
    //                 messages: [...this.completion.messages,
    //                 {role: "user", content: prompt},
    //                     newImageMessage]
    //             } as framework.OpenAICompletion

    //             inputBox.value = ""

    //             framework.downloadLink(b64String, `${label}.png`, "image/png")

    //         }
    //     }
    //     }>${[promptTextArea, promptSubmitButton, imageGenerateButton]}</form>`



    // // Outer div for the prompt area.     
    // return framework.classDiv("prompt", promptForm)


    // CONNECTED CALLBACK
    // Runs when the component is added to the DOM.
    // Adds the save buttons to the nav bar for this completion.
    connectedCallback()
    {
        super.connectedCallback()

        framework.createSaveButtons(this.completion)
    }

    // RENDER
    // Runs every time the component is redrawn.
    render()
    {
        // Use passed slate to create component.
        const slate = this.slate

        // Test Completion
        // Uncomment to load w/ test completion.
        // this.completion = testCompletion as framework.OpenAICompletion

        // If a conversation exists, create commands to light the Save buttons.
        // Otherwise, remove the commands to dim the buttons.
        if (this.completion.messages.length > 1)
        {
            framework.commands.saveJSON = {}
            framework.commands.saveMD = {}
        } else
        {
            delete framework.commands.saveJSON
            delete framework.commands.saveMD
        }

        // Outgoing Component
        // Contains input form and results area.
        const componentParts = [
            this.systemDiv(this.completion),
            this.resultsDiv(this.completion),
            this.promptDiv(this.completion)]

        // Class Map
        // Uses the slate.class or "input-box" default.
        const componentClassMap = {
            [slate.class ?? "input-box"]: true,
        }

        // Return Component
        // Uses slate.class
        return html`<div class=${classMap(componentClassMap)}>
      ${componentParts}
    </div>`
    }
}
