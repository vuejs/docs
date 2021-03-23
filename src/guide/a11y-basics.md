# Nozioni di base

L'accessibilità Web (nota anche come a11y) si riferisce alla pratica di creare siti Web che possono essere utilizzati da chiunque, ad esempio una persona con disabilità, una connessione lenta, hardware obsoleto o guasto o semplicemente qualcuno in un ambiente sfavorevole. Ad esempio, l'aggiunta di sottotitoli a un video aiuterebbe sia i tuoi utenti sordi e ipoudenti che i tuoi utenti che si trovano in un ambiente rumoroso e non possono sentire il loro telefono. Allo stesso modo, assicurarti che il tuo testo non abbia un contrasto troppo basso aiuterà sia i tuoi utenti ipovedenti che i tuoi utenti che stanno cercando di usare il loro telefono in pieno sole.

Pronto per iniziare ma non sai da dove?

Consulta la [Guida alla pianificazione e alla gestione dell'accessibilità web](https://www.w3.org/WAI/planning-and-managing/) fornita da [World Wide Web Consortium (W3C)](https://www.w3.org/)

## Salta collegamento

Dovresti aggiungere un collegamento nella parte superiore di ogni pagina che vada direttamente all'area del contenuto principale in modo che gli utenti possano saltare i contenuti ripetuti su più pagine Web.

In genere questo viene fatto nella parte superiore di `App.vue` poiché sarà il primo elemento attivabile in tutte le tue pagine:

``` html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink">Vai al contenuto principale</a>
  </li>
</ul>
```

Per nascondere il collegamento a meno che non sia attivo, puoi aggiungere il seguente stile:

``` css
.skipLink {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skipLink:focus {
  opacity: 1;
  background-color: white;
  padding: .5em;
  border: 1px solid black;
}
```

Quando un utente cambia percorso, riporta lo stato attivo sul collegamento. Puoi farlo richiamando il focus su `ref` come nell'esempio:

``` vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.skipLink.focus();
    }
  }
};
</script>
```

<common-codepen-snippet title="Vai al contenuto principale" slug="VwepxJa" :height="350" tab="js,result" :team="false" user="mlama007" name="Maria" theme="light" :preview="false" :editable="false" />

[Leggi la documentazione sul salto di collegamento verso il contenuto principale](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## Struttura i tuoi contenuti

Uno degli elementi più importanti dell'accessibilità è assicurarsi che il design possa supportare un'implementazione accessibile. Il design dovrebbe considerare non solo il contrasto del colore, la selezione dei caratteri, le dimensioni del testo e la lingua, ma anche il modo in cui il contenuto è strutturato nell'applicazione.

### Titoli

Gli utenti possono navigare in un'applicazione attraverso i titoli. La presenza di intestazioni descrittive per ogni sezione dell'applicazione rende più facile per gli utenti prevedere il contenuto di ciascuna sezione. Quando si tratta di titoli, ci sono un paio di pratiche di accessibilità consigliate:

- Annida le intestazioni nel loro ordine di classifica: `<h1>` - `<h6>`
- Non saltare i titoli all'interno di una sezione
- Utilizza i tag di intestazione invece di applicare stili al testo per dare l'aspetto visivo dei titoli

[Ulteriori informazioni sui titoli](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```html
<main role="main" aria-labelledby="main-title">
   <h1 id="main-title"> Titolo principale </h1>
   <section aria-labelledby="section-title">
     <h2 id="section-title"> Titolo della sezione </h2>
     <h3> Sottotitolo sezione </h3>
     <!-- Contenuto -->
   </section>
   <section aria-labelledby="section-title">
     <h2 id="section-title"> Titolo della sezione </h2>
     <h3> Sottotitolo sezione </h3>
     <!-- Contenuto -->
     <h3> Sottotitolo sezione </h3>
     <!-- Contenuto -->
   </section>
</main>
```

### Punti di riferimento [Landmarks]

I punti di riferimento `landmark` forniscono l'accesso a livello di codice alle sezioni all'interno di un'applicazione. Gli utenti che si affidano alla tecnologia assistiva possono navigare in ogni sezione dell'applicazione e saltarne il contenuto. Puoi usare gli [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) per raggiungere questo obiettivo.

| HTML            | ARIA Role                              | Scopo del punto di riferimento                                                                                                                   |
| --------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| header          | role="banner"                          | Intestazione principale: titolo della pagina                                                                                       |
| nav             | role="navigation"                      | Raccolta di collegamenti utilizzabili durante la navigazione nel documento o nei documenti correlati                               |
| main            | role="main"                            | Il contenuto principale o centrale del documento.                                                                                  |
| footer          | role="contentinfo"                     | Informazioni sul documento principale: note a piè di pagina, copyright, collegamenti alla dichiarazione sulla privacy              |
| aside           | role="complementary"                   | Relativo al contenuto principale e dal contenuto rilevante, ma comunque separato                                                   |
| _Not available_   | role="search"                          | Questa sezione contiene la funzionalità di ricerca dell'applicazione                                                               |
| form            | role="form"                            | Raccolta di elementi associati al form                                                                                             |
| section         | role="region"                          | Contenuti pertinenti e a cui gli utenti vorranno probabilmente accedere. Una etichetta deve essere fornita per questo elemento     |

:::tip Tip:
Si consiglia di utilizzare elementi HTML di riferimento con attributi `role` ridondanti per massimizzare la compatibilità con i [navigatori che non supportano gli elementi semantici HTML5](https://caniuse.com/#feat=html5semantic).
:::

[Ulteriori informazioni sui punti di riferimento [landmark]](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)

