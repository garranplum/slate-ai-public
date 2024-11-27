// Slate Framework Modules
// AI Interfaces
// By David Bethune

import OpenAI from "openai"
import {s} from "vite/dist/node/types.d-aGj9QkWt"

// OpenAI

// Models
// Capabilities and billing are based on the model used.
export type openAIModel = "gpt-4o-mini"
export type openAIImageModel = "dall-e-3"
export type openAIImageSize = "1024x1024" | "1024x1792" | "1792x1024"
export const openAIImageShape = {
    square: "1024x1024" as openAIImageSize,
    tall: "1024x1792" as openAIImageSize,
    wide: "1792x1024" as openAIImageSize
}

// Roles
// System role messages guide the overall output. User messages are prompts. Assistant messages are replies.
// Images are pseudo messages for image responses.
export type openAIRole = "system" | "user" | "assistant" | "image"


// // Content Item
// // The content item itself must match its type.
// type contentItem<T extends openAIContent> = T extends openAITextContent ?
//     openAITextContent :
//     T extends openAIImgContent ?
//     openAIImgContent :
//     never

// OpenAI Message
// A single message has a role and a single content item.
export interface OpenAIMessage
{
    role: openAIRole
    content: string | OpenAI.ImagesResponse
}

// // System Message
// // A system message is always text and always starts the completion.
// export interface OpenAISystemMessage extends OpenAIMessage
// {
//     role: "system"
//     content: string
// }

// User Message
// One or more user messages, either text or images, make up the rest of the completion.
export interface OpenAIUserMessage extends OpenAIMessage
{
    role: "user"
    content: string
}

// Assistant Message
// Each reply contains one or more assistant messages, called choices.
export interface OpenAIAssistantMessage extends OpenAIMessage
{
    role: "assistant"
    content: string
    refusal?: string | null
}

// Image Message
// A pseudo message type for image responses.
// Removed before completions are sent to the API.
export interface OpenAIImageMessage extends OpenAIMessage
{
    role: "image"
    content
}


// Reply
// A reply contains ID and usage information and a list of choices.
export interface OpenAIReply
{
    id: string,
    object: "chat.completion",
    created: number,
    model: string,
    choices: OpenAIChoice[],
    usage?: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number,
        completion_tokens_details?: {
            reasoning_tokens: number
        }
    },
    system_fingerprint?: string
}


// Choice
// A choice is a single assistant message with an index number and a finish reason.
interface OpenAIChoice
{
    index: number,
    message: OpenAIAssistantMessage,
    finish_reason: OpenAIStopReason
}

// Stop Reasons
// A completion is stopped naturally, by a token limit, by content moderation, or by the need for a tool call.
type OpenAIStopReason = "stop" | "length" | "content_filter" | "tool_calls" | "function_call"


// OpenAI Completion
// A completion requires a model and a message list.
// It starts with a single system message, followed by the sequence of all user and assistant messages.
export interface OpenAICompletion
{

    // Model & Messages
    // Used in submitting completions.
    model: openAIModel | openAIImageModel
    messages: (OpenAI.ChatCompletionMessageParam | OpenAIImageMessage)[]

    // Audit & Tab Info
    // These are use for the UI and removed on API calls.
    audit?: {}
    tab?: {
        id?: string
        type?: "text" | "image"
        label?: string
        icon?: string
    }
}

