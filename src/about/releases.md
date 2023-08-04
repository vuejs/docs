---
outline: deep
---

<script setup>
import { ref, onMounted } from 'vue'

const version = ref()

onMounted(async () => {
  const res = await fetch('https://api.github.com/repos/vuejs/core/releases/latest')
  version.value = (await res.json()).name
})
</script>

# Releases {#releases}

<p v-if="version">
L'ultima versione stabile di Vue è la <strong>{{ version }}</strong>.
</p>
<p v-else>
Controllo l'ultima versione...
</p>

Il registro completo delle versioni passate è disponibile su [GitHub](https://github.com/vuejs/core/blob/main/CHANGELOG.md).

## Ciclo di releases {#release-cycle}

Vue non prevede un ciclo di rilascio di releases fisso.

- Le patch vengono rilasciate quando ce n'è la necessità.

- Gli update minori contengono sempre nuove features, con un intervallo tipico di 3-6 mesi l'uno dall'altro. Ogni update attraversa una fase beta pre-release.

- Update più corposi verranno annunciati in anticipo, e attraverseranno una fase di discussione oltre che una fase alpha / beta pre-rilascio.

## Casi particolari: Semantic Versioning {#semantic-versioning-edge-cases}

Gli update di Vue prevedono una [Semantic Versioning](https://semver.org/) con alcune eccezioni.

### Definizioni TypeScript {#typescript-definitions}

Potremmo introdurre modifiche incompatibili alle definizioni di TypeScript tra una versione minor e l'altra. Questo perché:

1. A volte perfino TypeScript stesso introduce modifiche incompatibili tra le versioni minor, e potremmo dover adattare i tipi per supportare le versioni più recenti di TypeScript.

2. Occasionalmente potremmo dover adottare funzionalità che sono disponibili solo in una versione più recente di TypeScript, alzando così la versione minima richiesta di TypeScript.

Se stai usando TypeScript, puoi utilizzare un intervallo di versioni semver che blocchi l'attuale versione minor e eseguire manualmente l'aggiornamento quando viene rilasciata una nuova versione minor di Vue.

### Compatibilità del codice compilato con una runtime meno recente {#compiled-code-compatibility-with-older-runtime}

Una nuova versione **minor** del compilatore Vue potrebbe generare codice che non è compatibile con la runtime Vue di una versione minor precedente. Ad esempio, il codice generato dal compilatore Vue 3.2 potrebbe non essere completamente compatibile se consumato dalla runtime Vue della versione 3.1.

Questo è un problema che riguarda solo gli autori di librerie, perché nelle applicazioni, la versione del compilatore è sempre la stessa. Un mismatch di versione può verificarsi solo se si distribuisce il codice del componente Vue precompilato come pacchetto e un consumatore lo utilizza in un progetto che utilizza una versione più vecchia di Vue. Quindi, il tuo pacchetto potrebbe dover dichiarare una versione minima di Vue richiesta.

## Pre-rilasci {#pre-releases}

Gli update minori di solito passano attraverso un numero non fisso di versioni beta. Gli update più grandi passeranno attraverso una fase alpha e una fase beta.

Gli update pre-rilascio sono per i test di integrazione e stabilità, e per i primi utenti che desiderano fornire feedback sulle funzionalità non ancora stabili. Non utilizzare le versioni pre-rilascio in production. Tutte le versioni pre-rilascio sono considerate non stabili, quindi assicurati di specificare le versioni corrette quando utilizzi le versioni pre-rilascio.

## Deprecare features {#deprecations}

Periodicamente potremmo deprecare funzionalità che hanno delle nuove e migliori soluzioni, nelle versioni minori. Le funzionalità deprecate continueranno a funzionare e verranno rimosse nella prossima versione maggiore dopo essere entrate nello "stato deprecato".

## RFCs {#rfcs}

Le nuove funzionalità con una sostanziale superficie API e cambiamenti importanti a Vue seguiranno il processo di **Richiesta di Commenti** (RFC). Il processo RFC è pensato per fornire un percorso coerente e controllato affinché le nuove funzionalità possano entrare nel framework e dare agli utenti l'opportunità di partecipare e offrire feedback nel processo di progettazione.

Il processo RFC viene condotto nella repository [vuejs/rfcs](https://github.com/vuejs/rfcs) su GitHub.

## Funzionalità sperimentali {#experimental-features}

Alcune funzionalità vengono rilasciate e documentate in una versione stabile di Vue, ma sono contrassegnate come sperimentali. Le funzionalità sperimentali sono tipicamente caratterizzate da una discussione RFC con la risoluzione della maggior parte dei problemi di progettazione sulla carta, ma che ancora mancano di feedback dall'uso nel mondo reale.

L'obiettivo delle funzionalità sperimentali è quello di consentire agli utenti di fornire feedback testandole in un ambiente di produzione, senza dover utilizzare una versione instabile di Vue. Le funzionalità sperimentali stesse sono considerate instabili e dovrebbero essere utilizzate solo in modo controllato, con l'aspettativa che la funzionalità possa cambiare tra le diverse tipologie di rilascio.
