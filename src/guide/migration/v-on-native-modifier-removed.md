---
title: eliminazione del modificatore v-on.native
badges:
  - breaking
---

# eliminazione del modificatore `v-on.native` <MigrationBadges :badges="$frontmatter.badges" />

## Panoramica

Il modificatore `.native` di `v-on` è stato eliminato.

## Sintassi 2.x

I listener di eventi passati a un componente con `v-on` vengono attivati da impostazione predefinita solo emettendo un evento con `this.$emit`. Per aggiungere invece un listener DOM nativo all'elemento root del componente figlio, è possibile utilizzare il modificatore `.native`:

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click.native="handleNativeClickEvent"
/>
```

## Sintassi 3.x

Il modificatore `.native` di `v-on` è stato eliminato. Allo stesso tempo, la [nuova opzione `emits`](./emits-option.md) permette al componente figlio di definire precisamente quali eventi emettere.

Di conseguenza, Vue ora aggiungerà tutti i listener di eventi che _non_ sono definiti come eventi emessi da componenti figli, come listener di eventi nativi all'elemento root del componente figlio (a meno che `inheritAttrs: false` non sia stato impostato nelle opzioni del componente figlio).

```html
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
```

`MyComponent.vue`

```html
<script>
  export default {
    emits: ['close']
  }
</script>
```

## Strategia di migrazione

- rimuovi tutte le istanze del modificatore `.native`.
- assicurati che tutti i tuoi componenti documentino i loro eventi con l'opzione `emits`.

## Vedi anche

- [RFC rilevante](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md#v-on-listener-fallthrough)
- [Guida alla migrazione - Nuova opzione Emits](./emits-option.md)
- [Guida alla migrazione - Eliminazione di `$listeners`](./listeners-removed.md)
- [Guida alla migrazione - Modifiche nell'API delle funzioni di rendering](./render-function-api.md)
