## 브랜치 설명 
* master 브랜치는 vuejs/docs-next 와 싱크용으로 사용됩니다. 
* upMaster는 vuejs/docs-next 로 PR 생성용으로 사용됩니다. 
* rootKoKr은 v3.vuejs-korea.org 사이트 소스로 사용됩니다. 


## 번역 

master 브랜치는 업스크림인 vuejs/docs-next 의 master의 내용을 주기적으로 머지 합니다. 

해당 소스의 영어 원문을 참고 하셔서(diff로 변경사항을 파악해서) 번역을 해주시면 됩니다. 

실제 번역 결과는  rootKoKr의 파일들에 적용되어야 합니다. rootKoKr 브랜치의 파일들로 [한글 사이트](https://v3.ko.vuejs.org)가 갱신되게 됩니다. 

번역과 관련된 대화는 [Vue.js Korea 슬랙](https://vuejs-korea.slack.com) 에서 진행중입니다. 자유롭게 방문해 주시면 됩니다. 





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


