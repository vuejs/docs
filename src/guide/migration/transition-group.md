---
title: Elemento root del Transition Group
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## Overview

`<transition-group>` non renderizza più un elemento root da impostazione predefinita, ma può ancora crearne uno con il prop `tag`.

## Sintassi 2.x

In Vue 2, `<transition-group>`, come altri componenti personalizzati, necessitava di un elemento root, che da impostazione predefinita era uno `<span>` ma era personalizzabile tramite la prop `tag`.

```html
<transition-group tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</transition-group>
```

## Sintassi 3.x

Vue 3 supporta i [fragment](/guide/migration/fragments.html), quindi i componenti non _necessitano_ più di un nodo root. Di conseguenza, `<transition-group>` non ne renderizza più alcuno da impostazione predefinita.

- Se hai già il prop `tag` definito nel tuo codice Vue 2, come nell'esempio sopra, tutto funzionerà come prima.
- Se non ne avevi uno definito _e_ il tuo stile o altri comportamenti facevano affidamento sulla presenza dell'elemento radice `<span>` per funzionare correttamente, aggiungi semplicemente `tag="span"` a `<transition-group>`:

```html
<transition-group tag="span">
  <!-- -->
</transition-group>
```

## Vedi anche

- [Alcune classi di transition hanno cambiato nome](/guide/migration/transition.html)
