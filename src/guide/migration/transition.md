---
title: Modifica del nome della classe di transizione
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## Panoramica

La classe di transizione `v-enter` è stata rinominata in `v-enter-from` e la classe di transizione `v-leave` è stata rinominata in `v-leave-from`.

## Sintassi 2.x 

Prima della v2.1.8, avevamo due classi di transizione per ciascuna direzione di transizione: stato iniziale e stato attivo.

Nella v2.1.8, abbiamo introdotto `v-enter-to` per affrontare il gap temporale tra le transizioni di entrata/uscita. Tuttavia, per mantenere la compatibilità con le versioni precedenti, il nome `v-enter` non è stato modificato:

```css
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
```

Questa scelta è stata una fonte di confusione, poiché _enter_ e _leave_ erano generici e non utilizzavano la stessa convenzione di denominazione delle loro controparti hook di classe.

## Aggiornamento 3.x 

Per essere più espliciti e leggibili, abbiamo rinominato queste classi di stato iniziali:

```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

Ora la differenza tra questi stati è molto più chiara.

![Diagramma di Transizione](/images/transitions.svg)

Anche i nomi delle prop relative al componente `<transition>` sono cambiati:

- `leave-class` è stato rinominato in `leave-from-class` (può essere scritto come `leaveFromClass` nelle funzioni di rendering o JSX)
- `enter-class` è stato rinominato in `enter-from-class` (può essere scritto come `enterFromClass` nelle funzioni di rendering o JSX)

## Strategia di migrazione

1. Sostituisci le istanze di `.v-enter` con `.v-enter-from`.
2. Sostituisci le istanze di `.v-leave` con `.v-leave-from`.
3. Sostituisci le istanze dei nomi delle prop di scena correlati, come sopra.

## Vedi anche

- [`<TransitionGroup>` non esegue il rendering di alcun elemento wrapper per impostazione predefinita](/guide/migration/transition-group.html)
