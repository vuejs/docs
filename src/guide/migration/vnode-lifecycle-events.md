---
badges:
  - breaking
---

# Eventi del ciclo di vita di VNode <MigrationBadges :badges="$frontmatter.badges" />

## Panoramica

In Vue 2, era possibile utilizzare gli eventi delle fasi chiave nel ciclo di vita di un componente. Questi eventi avevano nomi che iniziavano con il prefisso `hook:`, seguito dal nome del ciclo di vita corrispondente.

In Vue 3, questo prefisso è stato cambiato in "vnode-". Inoltre, questi eventi sono ora disponibili per gli elementi HTML e per i componenti.

## 2.x Sintassi

In Vue 2, il nome dell'evento è lo stesso della fase del ciclo di vita equivalente, preceduto da `hook:`:

```html
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

## 3.x Sintassi

In Vue 3, il nome dell'evento è preceduto da `vnode-`:

```html
<template>
  <child-component @vnode-updated="onUpdated">
</template>
```

O semplicemente `vnode` se stai usando la notazione camel case:

```html
<template>
  <child-component @vnodeUpdated="onUpdated">
</template>
```

## Strategia di migrazione

Nella maggior parte dei casi dovrebbe solo richiedere la modifica del prefisso. Le fasi del ciclo di vita `beforeDestroy` e `destroyed` sono stati rinominati rispettivamente in `beforeUnmount` e `unmounted`, quindi anche i nomi degli eventi corrispondenti dovranno essere aggiornati.

## Vedi anche

- [Guida alla migrazione - API Eventi](/guide/migration/events-api.html)
