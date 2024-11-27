// App Slates
// Panels
// by David Bethune
//
// Defines content for the app-panel component.

// DEPENDENCIES
import * as framework from "framework/startup/framework-startup"
// import { framework, app } from "framework/startup/framework-startup"
import { html } from "lit"

// HOME PANELS

export const home: framework.menu = {
  home: {
    img: { software: "slateBio.jpg" },
    desc: html`Howdy!`,
    content: [
      "Thanks for stopping by. I'm David Bethune, a software architect and game designer. I've been building web applications professionally since 1995. I'm also a writer, artist, musician, radio operator, and dog rescuer.",
      "I appreciate your interest in my work and hope you find something of value here. I look forward to hearing from you and learning about your projects, too.",
      html`<img class="d-sign" src="/assets/img/logo/d-sign.png" />`,
    ],
    default: true,
    menu: framework.omitMenuKey(framework.menus.primary, "home"),
  },
}

// SOFTWARE PANELS

export const software: framework.menu = {
  slate: {
    img: { software: "slate-logo.jpg" },
    label:
      "For the past several years, I've built all of my web applications with web components and Lit. The reusability of this approach led to the Slate framework, which you're using right now to view this site. ",
    desc: html`<framework-icon icon="layer-group"></framework-icon
      >Slate&trade;`,
    content: [
      "Slate is a framework for building applications with your own custom web components. It is designed with a simple architecture to allow unlimited freedom in the appearance and behavior of your components without building everything from scratch. Slate is built on top of Lit, a lightweight library for web framework development.",
      "Slate includes powerful conventions and conveniences that simplify working with custom components. It also includes modules for routing, navigation, internationalization, API access, file handling, and other common tasks in web development.",
      "Slate is planned as a free, open source release in 3Q24.",
    ],
    alt: {
      img: { software: "slate-logo.jpg" },
      label:
        "Slate is the combination of my work in web components and my writing on the subject. As part of a series on Medium, I created a basic starter kit for web component development. Slate is the advanced version of that kit.",

      desc: html`<framework-icon icon="layer-group"></framework-icon
        >Slate&trade;`,
      content: [
        "Web components, one of my favorite topics in software develoment, are a modern way to build bespoke, highly-customized user interfaces without relying on external designers or monolithic JavaScript frameworks. Taking a standards-based approach, they work anywhere and are easy to maintain.",
        "The downside of web components is that they can be difficult to build from scratch. Slate is a framework that simplifies the process by providing a set of conventions and conveniences that make it easy to build custom components. It is built on top of Lit, a lightweight library for web framework development.",
        "Instead of providing a set of pre-designed components like React or Angular, Slate gives you the tools to build your own. This allows for unlimited freedom in the appearance and behavior of your web application, without writing all of the underlying plumbing from scratch.",
        "The name of the framework comes from a simple data format, also called a slate, which is available to all components you build. Many aspects of data handling, navigation, routing, parameter passing, and other common tasks are handled automatically by the framework. Styling and content can be shared across components, or customized for each.",
        "Slate and its customization controls are written in Typescript, rather than plain text configuration files. This avoids the use of `magic words` which are hard to find and debug. It brings the benefit of error checking and code completion to your own custom components.",
        "Slate is already in use in a wide variety of apps, from online multiplayer games and digital marketplaces to internal software tools used in video game development. It is planned as a free, open source release in 3Q24.",
      ],
    },
  },

  tower: {
    img: { software: "towerMarket.jpg" },
    label:
      "Towers & Titans is the mobile game for iOS and Android with digital hero and asset trading on a live web marketplace. The site works on all devices and is available in multiple languages.",
    desc: html`Towers & Titans Marketplace`,
    content: [
      "Towers & Titans is an RPG tower defense and hero collection mobile game for iOS and Android. Players can collect and upgrade heroes, devise battle strategies, and compete in real-time PvP battles.",
      "The T&T web app, built with Slate, serves as a companion to the game. Players can view and trade their digital assets like heroes and weapons, check their inventory and stats, and purchase new game items from the shop.",
      "The web app also contains a complete guide to characters and equipment in the game. Like all content on the site, this information is gathered dynamically from the game's servers, so it's always up-to-date.",
    ],
  },
  market: {
    img: { software: "towerMarket.jpg" },
    label:
      "Players can view and trade their characters from the mobile game Towers & Titans in this decentralized web market built with Slate. The site works on all platforms and is available in multiple languages.",
    desc: html`Towers & Titans Market`,
    content: [
      "Towers & Titans is an RPG tower defense and hero collection mobile game for iOS and Android. Players can collect and upgrade heroes, devise battle strategies, and compete in real-time PvP battles.",
      "The T&T web app, built with Slate, serves as a companion to the game. Players can view and trade their digital assets like heroes and weapons, check their inventory and stats, and purchase new game items from the shop.",
      "The web app also contains a complete guide to characters and equipment in the game. Like all content on the site, this information is gathered dynamically from the game's servers, so it's always up-to-date.",
    ],
  },
  portal: {
    img: { software: "tower-portal.jpg" },
    label:
      "Tower Portal is Rumble Entertainment's behind-the-scenes tool for managing players, events, rewards, game assets, and internal user permissions and roles. In this way, it serves as a one stop shop for team members who need to find or update information about the live game.",
    desc: html`Tower Portal`,
    content: [
      "Many game players don't realize the level of software configuration and support that's required for a studio to run a mobile game and live ops.",
      "Before the Towers & Titans website was even built, Tower Portal was already being used to securely manage the game's assets, events, and player data for this fully remote team of 37 people.",
      "Game data accessible to the Portal includes player accounts, progress, wallets, inventory, in-game inboxes, chats, and guilds. Live ops creators have access to event and leaderboard data and can create and manage vouchers for player rewards.",
      "Customer service specialists can debug issues and compensate users in case of problems, and architects can monitor the overall health of system services. Developers can set in-game configuration values from the web and manage them across deployment environments without leaving Portal, and without redeploying the game.",
      "Artists can view and manage art assets and videos, and UI designers can preview fonts and palettes from the game's style book, and managers can control team members' roles and permissions -- all using the company's single sign-on system.",
      "Tower Portal is built with a specialized version of my Slate framework. It runs serverless in the user's browser and contains no proprietary data or code itself, so it's safe to run by any team member, anywhere.",
    ],
  },
  ungallery: {
    img: { software: "ungallery.jpg" },
    desc: html`Ungallery&trade;`,
    label:
      "Ungallery is a new business model for the art industry, based on in-store sales and patent-pending software for on-demand pricing and fabrication. The app shown here is an alpha version with original artists who participated in the program.",
    content: [
      "Ungallery is a patent-pending invention encompassing a novel business model, direct and on-demand fabrication, and in-store sales with gallery personnel. A key function of the invention is accurately pricing the various sizes, media, and framing options which are normally available from original arists and printmakers.",
      "Presently, this work is done by gallery personnel with paper notes and calculators, resulting in fewer options for buyers, guesswork pricing, and lost sales.",
      "Gallery owners often order pieces in a size or medium the buyer doesn't want, creating stale inventory. Conversely, many size and output options are not available simply because the gallerist can't calculate what they should cost in real time without consulting the artist, who is normally not on-site.",
      "Like a new car configurator when you build a car online, Ungallery computes and displays all of the artist's product options while respecting their choices in materials, sizing, and price. In this way, a physical gallery can sell a curated variety of custom media and hanging options that fit each artist's brand and vision.",
    ],
  },
  mimix: {
    img: { software: "msl.jpg" },
    label:
      "Mimix and the MSL language introduce new ways of working with text. In constrast with LLM and AI applications, MSL creates a verifiable record of all writing, references, and their sources. When data is changed, the system seamlessly updates docuuments that need changes.",
    desc: html`<span style="font-weight:900">Mimix</span>&trade; and
      <span style="font-weight:900">MSL</span>&trade;`,
    content: [
      "Mimix and MSL are my inventions in the field of text processing and verification. MSL is a new programming language specifically designed for fact checking, auditing, and research. It automates verifying sources and references and tracking changes from multiple users in large numbers of documents where information cannot be left to chance or LLM 'hallucinations.'",
      "Mimix is the name of my company and ecosystem built around applications of MSL. The company was started in 2018 as an open source effort with a small angel investment.",
      "In its three-and-half-year lifespan, Mimix shipped a working version of the language, a websocket and Typescript UI for communicating with MSL servers, a cloud service with instant deployment, a toolkit for application development, and extensive documentation on the language and its uses. The business was unable to attract funding for continued development and the project is currently on hold.",
    ],
  },
}

// GAMES PANELS
export const games: framework.menu = {
  hexxed: {
    img: { software: "hexxedOnline.jpg" },
    label:
      "Hexxed is the patent-pending new card game built on a unique deck design and novel mechanics. The game is available online and as a physical deck.",
    desc: html`<span style="font-weight:900;font-style:italic">HEXXED</span>
      &trade;`,
    content: [
      "Hexxed is the fast, fun card game of scoring six! Invented in dream of mine, the game is playable online and with a physical deck.",
      "The online multiplayer version is free to play, contains no advertising, and is built with the Slate framework. Players can customize their avatars and deck designs and compete in real time against up to 5 other players or AI bots.",
      "A unique, random deck is created for each game with every face employing the patent-pending Hexxed mechanic. Cards feature an evolving sequence of rainbow spectrum card backs. All graphics and animation are realtime SVG, driven by the Slate framework. Continuous auditing allows AI hints, an interactive guided tour, and collective tournament scoring.",
      "The physical Hexxed deck includes custom card faces, unique spectrum backs for every card (like the online version), custom packaging, and instructions, all of of my own design.",
    ],
  },
  hexxedOnline: {
    img: { software: "hexxedOnline.jpg" },
    label:
      "HEXXED Online plays exactly like the card deck version, anywhere! Play with up to 5 friends or add AI players to your game. HEXXED online is free and contains no ads or tracking.",
    desc: html`<span style="font-weight:900;font-style:italic">HEXXED</span>
      &trade; Online`,
    content: [
      "HEXXED is the fast, fun card game of scoring six! Invented in dream of mine, the game is playable free online.",
      "Players can customize their avatars and deck designs and compete in real time against up to 5 other players or AI bots.",

      "HEXXED Online employs the game's patent-pending mechanic. It randomly generates new card faces each game. By employing the mechanic, the app can create infinite Standard or Extended Decks with the expected card distributions.",
      "Cards feature an evolving sequence of rainbow Spectrum Back card backs. All graphics and animation are realtime SVG, driven by the Slate framework. Continuous auditing allows AI hints, an interactive guided tour, and collective tournament scoring.",
      "HEXXED online contains no advertising, and is built with the Slate framework.",
    ],
  },
  hexxedDeck: {
    img: { software: "hexxedBox.jpg" },
    label:
      "HEXXED is the patent-pending new card game built on a unique deck design and novel mechanics. HEXXED card decks support games with 2-6 players and feature unique Spectrum Back designs.",
    desc: html`<span style="font-weight:900;font-style:italic">HEXXED</span>
      &trade; Decks`,
    content: [
      "HEXXED is the fast, fun game of scoring six! HEXXED cards have two colors and two numbers from 1-6. To play, match either of the colors on one of your cards with a color on the discard.",
      "Special combos of six let you play again, or hex another player and make them take three cards. But, be careful. Your curse can come right back to you! The first player to empty their hand wins.",
      "HEXXED is fast moving and easy to learn. The deck features six colors in nine suits of eight cards each, or 72 cards in a Standard Deck.",
      "The physical HEXXED deck includes custom card faces, custom packaging, and instructions, all of of my own design.",
      "The Spectrum Back design adds color and variety to the deck without revealing your cards. Try a HEXXED deck for your original games, magic tricks, and cardistry.",
    ],
  },
  tower: {
    img: { software: "tower-home.jpg" },
    label:
      "Towers & Titans is the mobile ARPG with a dynamic web marketplace. Serving as a hub for new and experienced players, the T&T website contains detailed information on all the game characters as well as allowing players to manage and trade their in-game assets.",
    desc: html`Towers & Titans`,
    content: [
      "Towers & Titans is a new kind of action RPG -- the first to allow players around the world to trade their digital heroes and equipment on a live, web-based marketplace. As the Senior Web Engineer for Rumble Entertainment, this was a clean-sheet project that presented several unique challenges and opportunites.",

      "Serving as part of a larger game development effort, the T&T website is specially designed to work with game resources, drawing from the same assets and data sources as the game itself. This simplifies development for the studio's artists and engineers and ensures consistency in web and game content.",
      "The Towers & Titans website combines results from over 50 APIs and backend game services to create a sophisticated user interface and a seamless experience for players.",
      "The app is built with a specialized version of the Slate framework, which originated with my Hexxed game. Like other Slate apps, the application itself is serverless and runs entirely in the user's browser.",
    ],
  },
  market: {
    img: { software: "titan-details.jpg" },
    label:
      "Players can view and trade their characters from the mobile game Towers & Titans in this decentralized web market built with Slate. The site works on all platforms and is available in multiple languages.",
    desc: html`Tower Market`,
    content: [
      "The Towers & Titans Marketplace is the first website of its kind to allow tower defense players to trade heroes and equipment from the mobile game in a live, web-based market.",
      "The Marketplace app, built with Slate, serves as a companion to the game. Players can manage their Titans and tomes from a comfortable desktop interface. They can equip weapons and armor, review their inventory and stats, and purchase new game items from an expanded web shop.",
      "The site works on all devices, in several languages, and processes real money and blockchain transactions securely and quickly while updating the mobile game in real time. The Marketplace is tested and deployed in a team-based CI/CD process and supports over 1K DAU in the live game.",
      "Despite using a private blockchain for trading, the app requires no wallet setup or configuration to use. Players can browse the market and shop offers without making an account or logging in.",
      "The site also contains a complete guide to characters and equipment in the game. Like all content on the site, this information is gathered dynamically from the game's servers, so it's always up-to-date.",
    ],
  },
  barrelOFish: {
    img: { software: "fishBarrel2CoverWide.jpg" },
    label:
      "Barrel O'Fish was a popular mod for the Steam game Foundation, a medieval city builder. The mod automated the process of creating flexible markets with multiple workers, salespeople, NPC gold transactions, an inventory lifecycle, and extensive decorative elements.",
    desc: html`Barrel O'Fish`,
    content: [
      "Barrel O'Fish was my first attempt at modding someone else's video game, thanks to the open mod.io platform used by Foundation. It was also my first Lua project and my first attempt at creating custom 3D models and textures in Blender.",
      "Barrel O'Fish and its sister mod Berry Basket were not just drop-in mods but programmable, flexible toolkits which could create new, unrelated mods using the in-game IP.",
      "The programming system, called GPS, changed Foundation modding from long text files with repeated scaffolds to a functional design with programmatic controls and features, vastly reducing the amount of code required to mod the game. GPS could mix custom 3D models, textures, and actions with the game's own assets -- even incorporating elements from other mods without editing their code.",
      "In its final evolution, known as Remixer, the project shipped with mutiple, swappable configurations and extensive documentation. The mod series was bundled inside the game UI by the publisher and available to all players. Barrel O'Fish was a top performer in installs in its category and Remixer was used by another modder to create his own popular mod, a landscaping and decoration kit.",
    ],
  },
  mathtownAlley: {
    img: { software: "mathtownAlley.jpg" },
    label:
      "Mathtown Alley is the retro 8-bit style color arcade game for practicing math and learning programming. Animals fall from the sky with numbers overhead. Arrange the characters to make a valid math equation and level up for extra lives!",
    desc: html`Mathtown Alley`,
    content: [
      "Mathtown Alley is a Typescript game created with Microsoft MakeCode, a tool for building handheld and desktop games with both block and text coding.",
      "In the game, animated sprites fall from the sky, each with a number or part of an expression. Players arrange the animals with the console buttons to form a valid math equation. Puzzles are generated in realtime and checked for correctness, with alternate (but correct) solutions also accepted.",
      "Mathtown Alley tracks the players' progress through a session and rewards streaks of correct answers with animations and sound.",
      "The MakeCode platform allows open sharing and editing of the game code, as well as playing on handheld consoles like the PyGamer.",
    ],
  },
}

// RADIO PANELS
export const radio: framework.menu = {
  id52: {
    img: { radio: "david-id52.jpg" },
    label: html`That's my Icom ID-52A, a portable, dual-band, D-Star digtal, and
    FM transceiver. Behind me is the repeater tower in Conroe which I drove up
    to test.`,
    desc: "K9DTA Radio Technician",
    content: [
      "I'd been interested in amateur (or ham) radio for years, but didn't take the plunge until recently. I received my license, K9DTA, in May 2024 and have been enjoying learning about the hobby.",
      "While it might seem like the internet has obviated any need for radio, in reality many high-tech communications are actually carried on radio signals, like Wi-Fi, Bluetooth, and everything that comes from a satellite.",
      html`Fun fact, the term <span style="font-style:italic">ham</span> was
        originally a criticism, leveled at "ham-fisted" amateur operators who
        were considered unskilled. Today, it's a badge of honor and a great way
        to get a deep-dive in how radio really works.`,
      "What interests me most about the hobby is combining digital methods with RF transmission, and writing better software for radio operation and programming -- an area which is sorely lacking.",
    ],
  },
  konk: {
    img: { radio: "konk-show.jpg" },
    label: html`I lived in Key West for 17 years and hosted several AM, FM, and
    internet radio call-in shows, including this one called Keys Genius which
    featured guests who were "geniuses" in their subject area.`,
    desc: "Key West Radio Host",
    content: [
      "While living in Key West, I was privileged to participate in several community radio experiments, including a twice-weekly call-in show on the fledging KONK AM station.",
      "Wanting to move outside the booth, the station engineer and I began remote recording and broadcasting from community events, music venues, and festivals.",
      html`This developed into a larger effort called
        <span style="font-style:italic">Southernmost Radio Network</span> which
        involved teaching local residents and business owners how to produce,
        edit, and broadcast their own radio and TV content. We also taught live
        classes in-person and on streaming TV on how to use social media for
        business.`,
      html`At the project's peak, I was hosting a daily midnight talk show
        called <span style="font-style:italic">Midnight at the Oasis</span>.
        It's unique feature was an internet-based audio solution that allowed us
        to mix multiple live callers in the same segment. Popular guests
        included Heather Dee Perry and other minor celebrities.`,
    ],
  },
}

// CHARITY PANELS
export const charity: framework.menu = {
  charity: {
    img: { charity: "opa.jpg" },
    label:
      "Operation Pets Alive is a 501(c)3 nonprofit organization in The Woodlands, TX, dedicated to promoting a no-kill community. Volunteers foster and adopt out dogs and cats which were otherwise rejected from shelters or abandoned.",
    desc: "Operation Pets Alive",
    content: [
      "Dogs are a big part of my life, and I've been part of the animal rescue community since childhood.",
      html`Here in The Woodlands, I volunteer with Operation Pets Alive to help
      adopt out dogs which were rejected by shelters, "returned" by foster
      parents, or found abandoned.`,
      "The group holds adoption events at local PetSmart and Petco locations every two weeks, and also has a network of foster homes for dogs and cats.",
      "If you're considering a pet, check out a local no-kill shelter or rescue group near you. You'll be glad you did!",
    ],
  },
}

// WRITING PANELS
export const writing: framework.menu = {
  erebus: {
    img: { writing: "erebus.jpg" },
    label:
      "The Erebus disaster is one of the most interesting and disturbing events in aviation history, and in software development. Ultimately, the crash was caused by over-reliance on software to solve problems without sufficient human oversight.",
    desc: "Programmed To Death",
    content: [
      "In November 1979, one of the world’s most advanced aircraft flew itself to Antarctica and into the side of the active volcano Mount Erebus, entirely under computer control. All 257 people aboard perished.",
      "How did an airline with a flawless safety record come to erroneously rely on technology with such catastrophic results? This article, one of my most popular, looks at the Erebus Disaster from a software standpoint to see what lessons it might hold.",
    ],
  },
  behindCurtain: {
    img: { writing: "behind-curtain.jpg" },
    label:
      "This early write-up on ChatGPT helps break down some of the myths surrounding the technology. While its underpinnings haven't changed, the results are better than ever and I use it every day!",
    desc: "Behind the Curtain",
    content: [
      "ChatGPT is the hottest topic on the internet right now, eliciting bold claims from proponents and terrifying predictions from naysayers. In order to truly understand the debate, let’s look at the real magic behind the roadshow.",
      "In this article, I examine how it works to give the results it gives, how those can be useful, and also how (and why) they can be misleading, unhelpful, and pointless.",
    ],
  },
  lastNight: {
    img: { writing: "last-night.jpg" },
    label:
      "This early experience of coding with an AI pair programmer was surprising at the time, but not today! I use this technoloy to save me time every day and I'm finding new ways to use it all the time.",
    desc: "Last Night an AI Saved My Life",
    content: [
      html`An experience I had recently with ChatGPT reminded me of the 80’s
        song,
        <span style="font-style:italic">Last Night a DJ Saved My Life</span>.
        And while it didn’t literally save my life, it might portend how I and
        other developers can use these tools to save our jobs.`,
      "This article explores an early version of interactive coding with an LLM plug-in for VS Code. Today, I use Github Copilot's built-in chat feature to ask questions about my code or find the syntax for changes I want.",
      "Today's tools can't be used to develop entire applications, but this functionality is coming soon with apps like Github Workspace.",
    ],
  },
  functionalIntro: {
    img: { writing: "functional-intro.jpg" },
    label:
      "I had the good fortune to meet John Backus, the inventor of functional programming (and FORTRAN) when I was at IBM. It took many years for the ideas to sink in, but today I consider the technique among my best tools for software development.",
    desc: "Functional Programming in Typescript",
    content: [
      "Functional style programming was introduced by John Backus at IBM in 1978 but remains largely misunderstood. Today, we can easily use as much or as little functional programming as we want — with Typescript.",
      "In this 3-part series, I explain what functional is and how it came to be. I examine the benefits and show how to use functional style to write new programs and improve old ones in JavaScript and TS.",
    ],
  },
  webComponents: {
    img: { writing: "web-component-intro.jpg" },
    label:
      "Web components, a standardized way of building custom applications in the browser, are the basis of many of my software projects, including the Slate framework that powers this site.",
    desc: "Getting Started with Web Components",
    content: [
      "Lit, from Google, is a simple way to start working with web components. These are an upgraded form of HTML that solves many of the problems addressed by frameworks like Angular, React, and Vue.",
      "What’s different is that Lit also solves many of the problems those frameworks create. Read on to see why I call Lit the anti-framework and why I think you should strongly consider it for your next clean-sheet project.",
    ],
  },
  learnTS: {
    img: { writing: "learning-ts.jpg" },
    label:
      "This step-by-step series introduces programmers to Typescript by building a sample application with web components and Lit.",
    desc: "Learing Typescript with Web Components",
    content: [
      "In my 3-part series on Getting Started with Web components & Lit, we created a sample application to show how custom web components work. In this spin-off, we’ll use these components as containers to demonstrate some of the basics of web application development with Typescript.",
      "This series covers properties, values, data binding, and working with arrays and JSON objects.",
    ],
  },
  driveBy: {
    img: { writing: "drive-by.jpg" },
    label:
      "In a former life, I was a car salesman and, eventually, finance manager of a dealership. What I learned about the industry then has sadly not changed much, but the tech reckoning is coming for the car business in the form of EVs and new sales and service methods.",
    desc: "Drive-By",
    content: [
      "The automobile business, a uniquely American proposition, has been despised by most and misunderstood by all since its inception more than 100 years ago. Like any new and magical technology, mass production of gas-powered cars created millions of jobs for working people and billions in profits for company owners.",
      " Today, a combination of engineering and software technologies marks the end of the auto industry as we know it. In this article, we’ll look at how the business came to be dependent on technologies that are no longer needed and soon won’t exist — while at the same time ignoring the new technology that would bring its doom.",
    ],
  },
}

// CONTACT PANELS
export const contact: framework.menu = {
  contact: {
    img: { art: "david-mural.jpg" },
    desc: html`Contact`,
    label:
      "My museum show, The Magic City at Stara Kopalnia in Wałbrzych, Poland, coincided with the presumed discovery of a gold train from WWII. This mural was painted on an outside wall of the former coal mine turned cultural institution.",
    content: [
      html`I'd love to hear from you! Please feel free to email me at
        <span style="font-style:italic">david@</span> this website. I'm always
        interested in new projects, collaborations, and opportunities to learn
        and grow.`,
    ],
    menu: { linkedIn: framework.menus.footer.linkedIn },
  },
}

// MUSIC PANELS
export const music: framework.menu = {
  synths: {
    img: { music: "synths.jpg" },
    desc: html`Synths`,
    label:
      "I've been a fan of synthesizers since my junior high school music teacher rolled out a Phantom-V in class and let us use it. I've been hooked ever since.",
    content: [
      "I love EDM and one of my favorite things is to jam along with a track on my Roland V-Synth. I've had this vintage analog modeling synth since it was released more than 20 years ago. I still play it every day.",
      "More recently, I added an NI Maschine to control numerous software synths like the Arturia V-Collection, adding many more sounds and options to how I can play. Although it looks like a drum box, the Maschine is surprisingly useful for playing melodies and chords.",
    ],
  },
  sittinOnTop: {
    img: { music: "sittin-on-top.jpg" },
    desc: html`DJ SkyCaptain | Sittin' on Top`,
    label:
      "This song is a mashup of three EDM tracks which I put together in my home studio.",
    content: [
      "Mashups have always been an interesting genre to me. They're great if done well, and unlistenable if not.",
      html`This was one of my first, featuring three tracks which are in the
        same key: <span style="font-style:italic">Top of the World</span> by
        Brandy featuring Mase,
        <span style="font-style:italic">This Time by DJ Antoine</span>, and
        <span style="font-style:italic">Everything</span> by Ron Reeser.`,
    ],
  },
  kimiNoUwasa: {
    img: { music: "kimi-no-uwasa.jpg" },
    desc: html`DJ SkyCaptain | Kimi No Uwasa`,
    label: html`Kimi No Uwasa (Japanese: "Your Rumor") is a mashup of a synth
    track and a robot singing demo by Yamaha called Vocaloid.`,
    content: [
      "In 2016, Yamaha, famous for their sound chips and synthesizers used in numerous computers and music devices, released a new product called Vocaloid. The tool allowed creating singing voices from text input.",
      html`The robot voice in this demo, Kaito, sings a slow, wistful song
        called Kimi No Uwasa, "Your Rumor". With this mashup, it became an
        electronic track. One interesting aspect is the use of
        <span style="font-style:italic">polytempo</span>, in which the speed of
        the music changes over time.`,
    ],
  },
}

// ART PANELS
export const art: framework.menu = {
  magicCity: {
    img: { art: "magic-city-show.jpg" },
    desc: html`The Magic City`,
    label:
      "These multiple exposure photographs, taken in the Wynwood district of Miami, were displayed on large canvases in my solo show in Poland. The dramatic hanging technique resulted from the prohibition against attaching anything to the walls of the historic building.",
    content: [
      html`In 2015, I was honored with a solo museum show called
        <span style="font-style:italic">The Magic City</span> at Stara Kopalnia
        in Wałbrzych, Poland, the largest modern tourist attraction in the
        country.`,
      html`The show consisted of 21 canvases, each 40x60", hung from the ceiling
      of a the 100 year old coal mine which had recently reopened as a museum
      and cultural center after significant investment from the European Union.`,
      "I was the first international artist to show there, receiving national press coverage in Poland as well as TV and radio interviews from journalists in the US and Europe.",
    ],
  },
  book: {
    img: { art: "wynwood-book.jpg" },
    desc: html`Wynwood: Street Art of Miami`,
    label:
      "The hardback edition of my artist's book, Wynwood: Street Art of Miami, was published in 2014. The book features my in-camera multiple exposure photos of one of the world's largest graffiti districts.",
    content: [
      html`With three authors in my family, it had long been an inspiration to
        write and publish my own book.
        <span style="font-style:italic">Wynwood: Street Art of Miami</span> is
        the product of that effort. Released in coordination with The Magic City
        show, it includes 29 full-bleed photos on special crystal paper with a
        wraparound full color cover.`,
      "The text is a personal biographical essay about my art and its influences, written in parallel text in English and Spanish. The book was selected for inclusion in the permanent collection of the Library of Congress and is available on Amazon.",
    ],
  },
  racket: {
    img: { writing: "art-racket.jpg" },
    desc: "Art is a Racket",
    label:
      "While taking a break from software development, I learned the art industry by selling my work in galleries, then working in them, then becoming a Gallery Director.",
    content: [
      "During a sabbatical from my tech career, I worked in a massive art gallery catering to wealthy tourists. Later, I was the director of a small gallery in Key West, FL. During both of these experiences I found that the art world operated quite differently from what either customers or artists believed.",
      html`In this exposé of the two art markets that exist in the world today,
        the <span style="font-style:italic">primary</span> and
        <span style="font-style:italic">secondary</span>, I explain the problems
        with the current system and how it leads to lost art and lost profits
        for everyone involved. The essay would go on to become the founding
        argument for the Ungallery business model.`,
    ],
  },
}

// AI PANELS

export const ai: framework.menu = {
  fastFoodDecoder: {
    img: { software: "fast-food-decoder.jpg" },
    label:
      "Ever wondered what's really in fast food? Fast Food Decoder is a Custom GPT that can find the ingredients and nutrition information for any popular fast food item. It even outputs JSON data for your own projects.",
    desc: "Fast Food Decoder",
    content: [
      html`Fast Food Decoder is a project created with Open AI's Custom GPT
        tool. It uses a
        <span style="font-style:italic">chain-of-thought</span> prompt to
        generate ingredient lists and nutrition information for common fast food
        items. The tool can also compare menu items between restaurants and
        portion sizes.`,
      "The decoder consults both the restaurant's website and independent nutrition databases to provide a complete picture of what's in fast food and why, with a narrative explanation of how ingredients contribute to the product qualites and nutritional profile.",
    ],
  },
  jsonTranslator: {
    img: { software: "json-translator.jpg" },
    label:
      "JSON Language Translator is a custom GPT that translates text found in JSON files, a technique commonly used to allow an app to operate in multiple languages.",
    desc: "JSON Language Translator",
    content: [
      "Web applications often use JSON files to store text in multiple languages. This allows the app to operate in different languages without changing the code. The JSON Language Translator is a custom GPT that can translate text found in JSON files.",
      "JSON files can be complex, with nested arrays and other JSON objects, any of which might contain text that needs to be translated. The app handles this correctly while preserving the key names and structure of your original documents, either full JSON files or just sections containing new or changed text.",
    ],
  },
  titanOracle: {
    img: { software: "titan-oracle.jpg" },
    label:
      "Titan Oracle is a Custom GPT designed to create public-facing content for the Towers & Titans mobile game. The Oracle can answer questions and generate marketing copy using actual game data files as its source.",
    desc: "Titan Oracle",
    content: [
      "Titan Oracle is a project created with Open AI's Custom GPT tool. It serves as an authoritative reference to the Towers & Titans mobile game and can be used by the team to generate marketing copy, answer player questions, and provide complex and correct information using the game's actual source data.",
      "The Oracle was created to solve a common problem with LLM applications -- namely, how to ensure that the answers include correct, current information about the game's evolving heroes and their abilities and stats. When fictional lore is desired, the Oracle can write it, incorporating real character names and attributes.",
      "The tool can answer simple questions as well as generate complete marketing copy like event details, rewards, and email campaigns. All of the copy includes the real names and values from the game's data files, so it's always up-to-date. The system has been trained to connect the dots between linked keys and values in the data files to produce human-readable, narrative output.",
    ],
  },
  bedrockMemory: {
    img: { software: "bedrock-memory.jpg" },
    label:
      "Bedrock Memory is a simple concentration game with custom, AI-generated art. The goal was to have a set of cards with a consistent theme, recognizable images, and lots of opportunities for confusion!",
    desc: "Bedrock Memory",
    content: [
      "This project was created for a take-home job interview test to code a simple game in Typescript from scratch. While the company provided art with the project, it was just basic boxes and quite unexciting.",
      "A typical LLM would have been able to generate custom images, but they wouldn't be consistent in theme or palette, and there was no way to ensure that images would be similar enough to be challenging to remember when hidden.",
      "To make the game more interesting, I generated a set of 36 consistent, similar images using a shared prompt. The game selects a random set of 8, then duplicates them to create a 16-card game.",
      "In this way, every random layout (like this example shown fully revealed) contains enough similarities to make the game more difficult to beat.",
      "To deliver the game, I used the Slate framework. This made it easy to create a simple, single page app that scales well to all devices and doesn't require extensive scaffolding to build.",
    ],
  },
  radioDecoder: {
    img: { software: "radio-decoder.jpg" },
    label:
      "Radio Decoder is a custom GPT that understands amateur radio technology and licensing. It makes sense out of confusing manufacturer websites and allows easy comparison between ham radios.",
    desc: "Radio Decoder",
    content: [
      "Amateur (or ham) radio can be a fascinating but confusing hobby to explore. It's full of jargon, including multiple names and concepts for the same basic ideas. To make things worse, manufacturer websites and product write-ups often leave out critical details.",
      "Radio Decoder starts out with an understanding of the FCC licensing requirements and the permitted uses of each band of frequencies. It uses this information to parse website content and extract consistent, clear information from reviews, manuals, and product descriptions. It can quickly compare multiple radios across the amateur services that interest you.",
      "Like all my decoder apps, Radio Decoder outputs JSON data for use in other projects in addition to narrative content. The data includes a unique, human-readable product key and product details such as the bands, modes, and licenses usable on the device.",
    ],
  },

  skincareDecoder: {
    img: { software: "skincare-decoder.jpg" },
    label:
      "Skincare Decoder is a custom GPT that takes the mystery out of skincare ingredients. Ask about a bath or beauty product and get a detailed ingredient list with explanations, including JSON data for your own projects.",
    desc: "Skincare Decoder",
    content: [
      html`Skincare Decoder is a project created with Open AI's Custom GPT tool.
        It uses a custom
        <span style="font-style:italic">chain-of-thought</span> prompt to
        generate detailed ingredient lists for skincare, bath and beauty
        products.`,
      "Unlike a simple prompt you'd write yourself with ChatGPT, Skincare Decoder collects information from multiple sources, including manufacturer websites and authoritative skincare ingredient databases online.",
      "The tool can compare ingredients across multiple products and cross-reference specific skincare concerns to the releveant product ingredients to make personalized recommendations.",
    ],
  },
}
