# vuejs.org

This is the WIP branch of the brand new vuejs.org. **The content is under heavy updates and re-organization so please refrain from submitting PRs to this branch until we have removed this notice.**

## Dev Setup

This site is built with [VitePress](https://github.com/vuejs/vitepress) and [@vue/theme](https://github.com/vuejs/vue-theme). Site content is written in Markdown format located in `src`.

Make sure to use [pnpm](https://pnpm.io/) as the package manager:

```sh
pnpm i
pnpm run dev
```

## Writing

See the [Vue Docs Writing Guide](https://v3.vuejs.org/guide/writing-guide.html) for our rules and recommendations on writing and maintaining documentation.

## Developing

For now, local development requires cloning both this repo and `vuejs/theme`:

1. Clone repositories

```bash
git clone git@github.com:vuejs/docs.git
git clone git@github.com:vuejs/theme.git
```

2. Link theme into docs repo

```bash
# In ./theme
# Install dependencies
pnpm i
# Link workspace in ./theme
pnpm link --global

# in ./docs
pnpm link --global @vue/theme
```

3. Install deps and start VitePress server

```bash
# in ./docs
pnpm i
pnpm run dev
```
