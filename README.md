# v3.vuejs.org

This site is built with [VuePress](https://vuepress.vuejs.org/). Site content is written in Markdown format located in `src`.

## Writing

See the [Vue Docs Writing Guide](https://v3.vuejs.org/guide/writing-guide.html) for our rules and recommendations on writing and maintaining documentation.

## Developing

1. Clone repository

```bash
git clone git@github.com:vuejs/docs-next.git
```

2. Install dependencies

```bash
yarn # or npm install
```

3. Start local development environment

```bash
yarn serve # or npm run serve
```

## Deploying

The site is automatically deployed when commits land in `master`, via [Netlify](https://www.netlify.com/).

## 브랜치 설명 관련 
* master 브랜치는 vuejs/docs-next 와 싱크용으로 사용됩니다. 
* upMaster는 vuejs/docs-next 로 PR 생성용으로 사용됩니다. 
* rootKoKr은 v3.vuejs-korea.org 사이트 소스로 사용됩니다. 

따라서 번역을 하실 분들은 rootKoKr로 PR을 보내주시면 됩니다. 
