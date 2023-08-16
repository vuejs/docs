# Repository per contribuire alla traduzione italiana di vuejs.org

Questo progetto è un fork di `vuejs/docs` con lo scopo di centralizzare gli sforzi per la sua traduzione in italiano.

Si prega di fare riferimento:

- per far partire il progetto, alla sezione [Contribuire](#contribuire---contributing) originale della VueDoc
- per la traduzione, alle [indicazioni per la contribuzione](CONTRIBUTING.md) così da poter dare il tuo contributo nel modo più efficace.

È anche importante prendere conoscenza delle [linee guida per la traduzione della documentazione](https://github.com/vuejs-translations/guidelines), indicate dal core team di vue.

## Contribuire alla traduzione italiana

Leggi il documento [CONTRIBUTING.md](CONTRIBUTING.md) per saperne di più.

---
---

## vuejs.org

## Contribuire - Contributing

Questo sito è costruito con [VitePress](https://github.com/vuejs/vitepress) e dipende da [@vue/theme](https://github.com/vuejs/vue-theme). Il contenuto del sito è scritto in formato Markdown e si trova in `src`. Per modifiche semplici, puoi modificare direttamente il file su GitHub e generare una Pull Request.

Per lo sviluppo locale è preferibile utilizzare [pnpm](https://pnpm.io/) come gestore di pacchetti:

```bash
pnpm i
pnpm run dev
```

Questo progetto richiede che Node.js sia alla versione `v14.0.0` o superiore, perché il codice utilizza nuove funzionalità di JavaScript, come l'optional chaining.


## Lavorare sui contenuti

- Consulta la documentazione di VitePress sulle [Estensioni Markdown supportate](https://vitepress.dev/guide/markdown) e la possibilità di [usare la sintassi Vue all'interno di markdown](https://vitepress.dev/guide/using-vue).

- Consulta la [Guida alla Scrittura](https://github.com/vuejs/docs/blob/main/.github/contributing/writing-guide.md) per le regole e raccomandazioni sulla scrittura e manutenzione dei contenuti della documentazione.

## Lavorare sul tema

Se devi apportare modifiche al tema, consulta le [istruzioni per sviluppare il tema insieme alla documentazione](https://github.com/vuejs/vue-theme#developing-with-real-content).
