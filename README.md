# v3.vuejs.org

This site is built with [VitePress](https://github.com/vuejs/vitepress) and [@vue/theme](https://github.com/vuejs/vue-theme). Site content is written in Markdown format located in `src`.

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
yarn
# Link workspace in ./theme
yarn link

# in ./docs
yarn link @vue/theme
```

3. Install deps and start VitePress server

```bash
# in ./docs
yarn
yarn serve
```

## Deploying

The site is automatically deployed when commits land in `master`, via [Netlify](https://www.netlify.com/).
