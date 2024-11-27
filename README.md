# Slate AI
| alpha release

<br>

## What It Does
Slate AI is a local dashboard for working with your chat and image conversations with the OpenAI API.

- Organizes chats into tabbed panels with automatic titles and icons. 
- Presents images as captioned storyboard panels which can be rearranged.
- Saves conversations locally as JSON to reload and continue anytime. 
- Exports to markdown files with chat and images intact, no links required.

## Requirements
Slate AI uses your OpenAI key to make LLM calls on your account. This key must be added to a local `.env` file before the tool will work. Neither the key nor your chats are sent anywhere other than OpenAI and the tool contains no telemetry.

## Safety
By using the tool, you acknowledge that you alone are responsible for the use of OpenAI resources under your account and that the creator of this software has no access to your account information or ability to submit chats completions on your behalf. All chat completions submitted with this tool are tracked by OpenAI using your account credentials.

## Installation for Windows

1. Clone the repo to a local directory of your choice.
1. In a terminal window, run `npm install`.
1. Using an editor, create a file named `.env` and save it in the root directory where you cloned the repo.

## .env File Contents
This file should contain a single line beginning with `VITE_OPENAI_API_KEY=` and ending with your Open AI API key.

```
VITE_OPENAI_API_KEY=YourKeyGoesHere
```

## Running
1. In a terminal window, navigate to the root folder where you installed the app.
1. Run `npx vite`.
1. In a browser, navigate to `http://localhost:3000`

## User Documentation
Once the app is running, vist http://localhost:3000/help for usage documentation.