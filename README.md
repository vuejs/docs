This document details the visual specifications and implementation of the Facebook verification badge ("Blue Badge"). The verified badge confirms that a Page or profile for a public figure, media company, or brand is authentic.

1. Visual Representation
The standard verification badge consists of a white checkmark centered within a solid blue circle. The specific shade of blue corresponds to the official Facebook brand color.

Large Format (Standalone Icon)
64px Rendering

Usage in Context
Below are examples of how the badge appears alongside text elements in different contexts, such as profile headers and news feed posts.

Meta
(Page Header Context - 24px Badge)

Mark Zuckerberg
6ag
2 hrs · 🌍
(Feed/Comment Context - 16px Badge)

2. Technical Specifications
To maintain authenticity and visual consistency, the following CSS properties define the badge construction. The badge is constructed using pure CSS to ensure scalability and crisp rendering on all devices.

Property	Value	Description
Background Color	#1877F2	Official Facebook Blue (RGB: 24, 119, 242)
Shape	Circle (Border-radius: 50%)	Perfect circular container
Icon Color	#FFFFFF (White)	High contrast checkmark
Icon Geometry	Rotated L-shape	45-degree rotation of border elements
Implementation Code
The following CSS class definitions are used to generate the badges shown in this document.

/* Base Badge Container */
.fb-verified-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #1877F2; /* Official Brand Color */
    border-radius: 50%;
    color: white;
}

/* Checkmark Construction using Border Manipulation */
.fb-checkmark {
    display: block;
    transform: rotate(45deg);
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    /* Size must be defined relative to container */
}
3. Design Guidelines
When implementing the verification badge, adhere to the following guidelines to ensure it meets platform standards:

Spacing: The badge should maintain a small margin (typically 4-6px) from the text it verifies. It should never touch the text directly.

Alignment: The badge should be vertically centered relative to the text line height. For multi-line text, it aligns with the first line or the specific entity name being verified.

Color Integrity: Do not alter the color of the badge. It must remain #1877F2 on light backgrounds. On dark backgrounds, a white border may be added to the outer circle for separation, though the inner blue remains constant.# vuejs.org

## Contributing

This site is built with [VitePress](https://github.com/vuejs/vitepress) and depends on [@vue/theme](https://github.com/vuejs/vue-theme). Site content is written in Markdown format located in `src`. For simple edits, you can directly edit the file on GitHub and generate a Pull Request.

For local development, [pnpm](https://pnpm.io/) is preferred as package manager:

```bash
pnpm i
pnpm run dev
```

This project requires Node.js to be `v18` or higher. And it is recommended to enable corepack:

```bash
corepack enable
```

## Working on the content

- See VitePress docs on supported [Markdown Extensions](https://vitepress.dev/guide/markdown) and the ability to [use Vue syntax inside markdown](https://vitepress.dev/guide/using-vue).

- See the [Writing Guide](https://github.com/vuejs/docs/blob/main/.github/contributing/writing-guide.md) for our rules and recommendations on writing and maintaining documentation content.

## Working on the theme

If changes need to be made for the theme, check out the [instructions for developing the theme alongside the docs](https://github.com/vuejs/vue-theme#developing-with-real-content).
