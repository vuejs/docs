---
title: Precedenza v-if su v-for
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## Panoramica

- ** BREAKING **: Se usato sullo stesso elemento, `v-if` avrà la precedenza su `v-for`

## Introduzione

Due delle direttive più comunemente usate in Vue.js sono `v-if` e` v-for`. Quindi non sorprende che arrivi un momento in cui gli sviluppatori vogliono usarli entrambi insieme. Sebbene questa non sia una pratica consigliata, a volte potrebbe essere necessario, quindi volevamo fornire una guida su come funziona.

## Sintassi 2.x 

Nella versione 2.x, quando si usano `v-if` e `v-for` sullo stesso elemento, `v-for` ha la precedenza.

## Sintassi 3.x 

Nella versione 3.x, `v-if` avrà sempre la precedenza su `v-for`.

## Strategia di migrazione

Si consiglia di evitare di utilizzare entrambi sullo stesso elemento a causa dell'ambiguità della sintassi.

Piuttosto che gestirlo a livello di template, è preferibile creare una `computed property` che filtri gli elementi visibili in un elenco.

## Vedi anche

- [Rappresentazione di un elenco - Visualizzazione dei risultati filtrati/ordinati](/guide/list.html#displaying-filtered-sorted-results)
- [Rappresentazione di un elenco - `v-for` con `v-if`](/guide/list.html#v-for-with-v-if)
