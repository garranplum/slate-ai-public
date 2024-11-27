# Slate AI
| alpha release

<br>

## What It Does
Slate AI is a local dashboard for working with your chat and image conversations with the OpenAI API.

- Organizes chats into tabbed panels with automatic titles and icons. 
- Presents images as captioned storyboard panels which can be rearranged.
- Saves conversations locally as JSON to reload and continue anytime. 
- Exports to markdown files with chat and images intact, no links required.

## Chat Conversations
When you start Slate AI, you're on the **Chat** tab, the place to launch a new conversation on a particular topic.

- Slate AI provides access to the **System Prompt**. This is used to describe the *role* the chat agent should follow.
- Using the system prompt results in more reliable and consistent conversations, a feature which cannot be duplicated using the ChatGPT website and is only available to API key holders.
- A good system prompt starts with "You are a..." and tells, in brief, how the agent should act. "You are a travel planner" is such a prompt.
- You can also add specific requirements here to ensure they're followed each time. We could add, "Each time a city is named, suggest three 5-star restaurants in the area," to the travel planner system prompt, for example.
- The default system prompt, "You are a helpful assistant," is shown in the top box on the Chat tab. You can change this and press **Set System Prompt**, which opens a new tab for the conversation.
- A chat conversation, called a *completion*, is continued by re-submitting the entire conversation thus far and adding the last prompt. This allows later prompts to reference material discussed earlier.
- You can save the conversation as a JSON file using the **JS** button in the top navigation bar.
- You can load and continue the conversation with the **Load** button on the nav bar.
- You can export the conversation to Markdown using the **MD** button in the nav bar.
- The chat tab's UI appearance was created earlier and is one generation behind the images tab, but functions identically.

## Image Conversations & Storyboards
On the **Images** tab, you can create a storyboard of related images under a single master prompt.

- The master prompt, called "Image Guidance," goes in the top box on the images page.
- This is the place to set the overall theme, style, story references, and other attributes that should apply to all images. 
- The guidance is added to each image prompt you write.
- After you set the guidance, a new tab is opened for the images in that series.
- You can save the entire series as a JSON file with the images intact using the **JS** button in the top navigation bar.
- You can load and continue the series with the **Load** button on the nav bar.
- You can export the entire series to Markdown as series of captioned full page images using the **MD** button in the nav bar.

## Image Generations
- To generate a new image, put the prompt in the box at the bottom of the page and click **Generate**.
- The default shape is tall, like a book cover, but this can be changed with the shape buttons at the left of the prompt box.
- Images include two captions. The first is your prompt. The second is the expanded prompt created by OpenAI as part of the DALL-E API. This second prompt was used in the actual image generation.
- You can save the image to your local drive as a PNG file with the **PNG** button.
- You can regenerate the image by putting the same prompt back in the box for editing with the **Recycle** button.
- You can move the image up or down in the storyboard with the *Arrow* buttons.
- Finally, you can delete the image with the trashcan icon.



## Why I Made This
I believe that graphical user interfaces that integrate LLM results are the future of software development. Slate AI is way to test those ideas with my running framework, Slate. Here, LLM calls are used to create titles and buttons as well as filenames for saving and export, a common shortcoming in hosted AI applications.

## What Is Slate?
Slate is web component middleware, a tool that simplifies working with web components and the content and menus they use to create a working application. Slate is used here to combine the LLM results into a UI. This release is not expected to provide a complete demonstration or documentation for Slate, which are forthcoming. See https://davidbethune.com/software/slate for more information on the Slate framework and https://davidbethune.com/writing for articles on web component and AI development.

