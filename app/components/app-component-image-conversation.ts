// Slate App Components
// Image Conversation
// by David Bethune
//
// Given a completion, displays the system prompt, user prompts, and image replies in a conversation format.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
import {html} from "lit"
import {unsafeHTML} from "lit/directives/unsafe-html.js"
import {customElement, property, state} from "lit/decorators.js"
import {classMap} from "lit/directives/class-map.js"
import {marked} from "marked"

@customElement("app-image-conversation")
export class appImageConversation extends framework.appComponent
{

    // PUBLIC PROPERTIES
    @property({type: Object}) completion: framework.OpenAICompletion = framework.defaultImageCompletion

    // PRIVATE PROPERTIES
    @state() imageShape: string = "Tall"
    @state() isProcessing: boolean = false
    @state() isChanging: boolean = false

    // CONSTRUCTOR
    // Runs once when the component class definition is loaded.
    constructor({slate, completion}: {slate?: framework.slate, completion?: framework.OpenAICompletion})
    {
        super(slate ?? {})
        completion ? this.completion = completion : null
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

    imageViewer({prompt, content, index})
    {
        const {b64_json: image, revised_prompt: caption} = content
        const dataUrl = `data:image/png;base64,${image}`



        // Img Tag
        const imgTag = html`<img src=${dataUrl} alt=${prompt} />`

        // Caption Div
        const captionDiv = html`<div class="caption">${prompt}
        <br/><br/>
        <span class="extendedPrompt">${caption}</span>
       </div>`

        // Image Download Slate
        const imageDownloadSlate: framework.slate = {
            icon: "download",
            content: "PNG",
            command: "saveJSON",
            type: "bar",
            index: 7,
            class: "barButton barSide primary",
            click: async (e) =>
            {
                // Summary Completion
                const summaryCompletion: framework.OpenAICompletion = {
                    model: framework.defaults.text.model,
                    messages: [
                        {role: "user", content: prompt}
                    ]
                }

                // Create label.
                const label = await framework.oneShotCompletion({systemText: "Write a 3-7 word label to summarize the image prompt. Do not output more than 7 words. Do not add quotes or punctuation. Use Title case.", completion: summaryCompletion})

                framework.downloadLink(image, `${label}.png`, "image/png")
            }
        }

        // Regen Slate
        const regenSlate: framework.slate = {
            icon: "recycle",
            command: "load",
            type: "bar",
            index: 8,
            class: "barButton barSide primary",
            click: async (e) =>
            {
                const generateForm = this.shadowRoot.querySelector("#generateImageForm") as HTMLFormElement
                const inputBox = generateForm.promptInput
                inputBox.value = prompt
                inputBox.scrollIntoView()
            }
        }

        // Move Up Slate
        const moveUpSlate: framework.slate = {
            icon: "up-from-line",
            command: "saveJSON",
            type: "bar",
            index: 4,
            class: `barButton barSide primary ${index === 0 ? "disabled" : ""}`,
            click: async (e) =>
            {

                if (index === 0) return

                const removedMessages = this.completion.messages.toSpliced(index * 2 + 1, 2)

                const addedMessages = removedMessages.toSpliced(index * 2 - 1, 0, this.completion.messages[index * 2 + 1], this.completion.messages[index * 2 + 2])

                this.completion = {
                    ...this.completion,
                    messages: addedMessages
                }

                // Update the completion for the save buttons.
                framework.createSaveButtons(this.completion)

                // Ensure the component has finished updating
                await this.updateComplete

                // Scroll to the moved message pair.
                this.scrollToMessagePair(index - 1)


            }
        }

        // Move Down Slate
        const moveDownSlate: framework.slate = {
            icon: "down-from-line",
            command: "saveJSON",
            type: "bar",
            index: 4,
            class: `barButton barSide primary ${index * 2 + 3 == this.completion.messages.length ? "disabled" : ""}`,
            click: async (e) =>
            {

                if (index * 2 + 3 == this.completion.messages.length) return

                const removedMessages = this.completion.messages.toSpliced(index * 2 + 1, 2)

                const addedMessages = removedMessages.toSpliced(index * 2 + 3, 0, this.completion.messages[index * 2 + 1], this.completion.messages[index * 2 + 2])

                this.completion = {
                    ...this.completion,
                    messages: addedMessages
                }

                // Update the completion for the save buttons.
                framework.createSaveButtons(this.completion)

                // Ensure the component has finished updating
                await this.updateComplete

                // Scroll to the moved message pair.
                this.scrollToMessagePair(index + 1)
            }
        }

        // Delete Slate
        const deleteSlate: framework.slate = {
            icon: "trash",
            command: "saveJSON",
            type: "bar",
            index: 0,
            class: "barButton barSide primary",
            click: async (e) =>
            {

                const removedMessages = this.completion.messages.toSpliced(index * 2 + 1, 2)

                this.completion = {
                    ...this.completion,
                    messages: removedMessages
                }

                // Update the completion for the save buttons.
                framework.createSaveButtons(this.completion)
            }
        }

        const imageDownloadButton = new framework.appButton(imageDownloadSlate)
        const regenButton = new framework.appButton(regenSlate)
        const moveUpButton = new framework.appButton(moveUpSlate)
        const moveDownButton = new framework.appButton(moveDownSlate)
        const deleteButton = new framework.appButton(deleteSlate)

        const itemControls = html`<div class="itemControls">${[imageDownloadButton, regenButton, moveUpButton, moveDownButton, deleteButton]}</div>`

        const imageViewerParts = [imgTag, itemControls, captionDiv,]
        return imageViewerParts
    }

    // System Div
    systemDiv(completion: framework.OpenAICompletion)
    {
        // First message in a completion is the system prompt.
        const [systemMessage, ..._] = completion.messages

        // Actual typing box for system message.
        const systemTextArea = html`<textarea id="systemInput" .value=${systemMessage.content} name="systemInput" @change=${(e) =>
        {
            this.completion.messages[0].content = e.target.value
        }
            }></textarea>`

        const systemPromptSlate: framework.slate =
        {
            icon: this.isChanging ? "rabbit" : "wand-magic-sparkles",
            content: this.isChanging ? "Done!" : "Set Image Guidance",
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

                const newCompletion = completion = {
                    ...completion,
                    messages: [
                        {role: "system", content: inputBox.value},
                        ...completion.messages.slice(1)
                    ]
                }
                inputBox.value = framework.defaults.image.systemPromptText
                this.completion.messages[0].content = framework.defaults.image.systemPromptText
                completion.messages.length == 1 ? framework.completionToTab(newCompletion) : this.completion = newCompletion
            }
        }


        const systemPromptButton = new framework.appButton(systemPromptSlate)
        const itemControls = html`<div class="itemControls">${systemPromptButton}</div>`


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
        const messageDivs = userOrAssistantMessages
            .filter((_, index) => !(index % 2))
            .map((message, index) =>
            {

                const {content} = message

                const userMessageDiv = html`
                <div class="user">
                    ${content}
                </div>`

                const assistantMessage = userOrAssistantMessages[index * 2 + 1]

                const assistantMessageDiv = html`
                <div class=${assistantMessage.role}>
                ${assistantMessage.role === "image" ? this.imageViewer({prompt: content, content: assistantMessage.content, index}) :
                        this.markdownViewer(assistantMessage.content)
                    }
                </div>`

                const messagePairDiv = html`<div class="messagePair">
                ${[assistantMessage.role != "image" ? userMessageDiv : null, assistantMessageDiv]}
                    </div>`

                return messagePairDiv
            })

        // Outer div for the results area.
        return framework.classDiv("results", messageDivs)
    }


    // Prompt Div
    promptDiv(completion: framework.OpenAICompletion)
    {
        // Actual typing box where the prompt goes.
        const promptTextArea = html`<textarea id="promptInput" name="promptInput"></textarea>`

        const imageShapeSlates: framework.slate[] = [

            {
                icon: "image-portrait",
                content: "Tall",
                command: "load",
                type: "bar",
                index: 10,
                click: async (e) => {}
            },
            {
                icon: "image-landscape",
                content: "Wide",
                command: "load",
                type: "bar",
                index: 11,
                click: async (e) => {}
            },
            {
                icon: "image-user",
                content: "Square",
                command: "load",
                type: "bar",
                index: 9,
                click: async (e) => {}
            }
        ]

        const imageShapeButtons = imageShapeSlates.map((slate) =>
        {
            return new framework.appButton({
                ...slate,
                class: `barButton barSide primary ${this.imageShape === slate.content ? "active" : ""}`,
                click: async (e) =>
                {
                    this.imageShape = slate.content as string
                }
            })
        })


        // Generate Button Slate
        const generateSlate: framework.slate = {
            icon: this.isProcessing ? "hourglass" : "image",
            content: this.isProcessing ? "Working ..." : "Generate",
            command: "load",
            type: "bar",
            index: 15,
            class: `barButton barSide primary ${this.isProcessing ? "disabled" : ""}`,
            click: async (e) =>
            {
                e.preventDefault()

                if (this.isProcessing) return

                this.isProcessing = true

                const form = this.shadowRoot.querySelector("#generateImageForm") as HTMLFormElement

                // Get the input box.
                const inputBox = form.promptInput

                const imagePrompt = inputBox.value
                const prompt = `${completion.messages[0].content}\n\n${imagePrompt}`

                const testResult = await framework.OpenAIImage({prompt, size: framework.openAIImageShape[this.imageShape.toLowerCase()], model: "dall-e-3"})

                this.isProcessing = false

                const [content] = testResult.data

                const newImageMessage = {
                    role: "image",
                    content
                }

                const updatedCompletion = {
                    ...this.completion,
                    messages: [
                        ...this.completion.messages,
                        {role: "user", content: imagePrompt},
                        newImageMessage],
                } as framework.OpenAICompletion


                // If we're not on a dedicated tab for this conversation, open one.
                !completion.tab.id ?
                    framework.completionToTab(updatedCompletion)
                    : this.completion = updatedCompletion
                inputBox.value = ""

                // Ensure the component has finished updating
                await this.updateComplete


                // Scroll the last div with class="messagePair" into view
                this.scrollToMessagePair()

                // Update the completion for the save buttons.
                framework.createSaveButtons(updatedCompletion)



            }
        }

        const imageGenerateButton = new framework.appButton(generateSlate)
        const itemControls = html`<div class="itemControls">${[...imageShapeButtons, imageGenerateButton]}</div>`

        // Form that contains the prompt text area and submit button.
        const promptForm = html`
        <form id="generateImageForm">${[promptTextArea, itemControls]}</form>`

        // Outer div for the prompt area.     
        return framework.classDiv("prompt", promptForm)
    }

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

        console.log("route", this.route)
        // Use passed slate to create component.
        const slate = this.slate

        // Test Completion
        // Uncomment to load w/ test completion.
        // this.completion = testCompletion as framework.OpenAICompletion

        // Outgoing Component
        // Contains input form and results area.
        const componentParts = [
            this.systemDiv(this.completion),
            this.resultsDiv(this.completion),
            this.promptDiv(this.completion),
        ]

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
