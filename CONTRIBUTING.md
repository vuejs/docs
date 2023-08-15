# Istruzioni per contribuire

Grazie per prendere visione di questa `Guida alla scrittura`. Lo scopo della guida è quello di aiutarti a capire come formulare le frasi in modo da rendere la lettura più semplice e fluida.

---

## Menu

- [Glossario](#glossario)
- [Condivisione del lavoro di traduzione](#condivisione-del-lavoro-di-traduzione)
- [Contribuire al progetto](#contribuire-al-progetto)
  - [Passaggi](#passaggi)
- [Diventare un Contributor della traduzione italiana](#diventare-un-contributor-della-traduzione-italiana)
- [Estensioni VS Code](#estensioni-vs-code)

---

## Glossario

È necessario utilizzare un glossario per uniformare le traduzioni, in più ricorda che:

- I termini tecnici, in genere, non devono essere tradotti.
- Tutti i nomi di variabili, codici e testi tra parentesi graffe devono rimanere inalterati (preserva l'integrità del codice originale).
- Non tradurre termini specifici di VueJS: Lasciare inalterati i termini tecnici specifici di VueJS, aggiungendo al massimo degli articoli se necessario (mantiene l'autenticità e l'integrità dei termini tecnici legati a VueJS).

In caso di dubbi, consulta il `glossario` [In-Fase-Di-Aggiornamento]().

Se un termine ti crea problemi (perché è troppo ambiguo), apri una `discussione` sul Termine/Frase per prendere una decisione di comune accordo.

---

## Condivisione del lavoro di traduzione

Tutto il lavoro di traduzione è guidato dall'issue [#1 Avanzamento della traduzione - struttura file totale](https://github.com/phox081/docs-it/issues/1), che elenca tutte le pagine da tradurre con il loro stato (con un `issue` collegato e il suo stato).

**Un issue collegato 'aperto' e 'non assegnato'** può essere considerato aperto per contributi e può essere preso in carico da chiunque: **puoi assegnartelo** o lasciare un commento per la presa in carico***.

> NOTA - A volte un issue 'aperto' potrebbe essere 'in corso di traduzione' se c'è una `PR collegata` o l'etichetta/label `traduzione in corso`. ***Questa può essere una buona occasione per seguire il task e fare una revisione della PR***.

`Come Contributor`, se una pagina/file non ha un issue collegato e pensi che sia necessario dividere il lavoro in sotto task, puoi [creare un issue dedicato dalla lista](#creare-un-issue-dalla-lista-di-controllo).

`Se non sei un Contributor`, puoi creare un issue e menzionare un Contributor per aggiornare il monitoraggio.

---

## Vuoi diventare un Contributor?

Contattami, qui su github o tramite altri canali, o rispondi nella discussione [Italian Translation](https://github.com/vuejs-translations/guidelines/discussions/23)

---

## Contribuire al progetto

> **Nota:**
È necessario mantenere lo stesso numero di righe tra il file originale e il file tradotto e assicurarsi che ogni numero di riga originale corrisponda al suo numero di riga tradotto.
Ciò ci consentirà di seguire più facilmente le parti di testo che in futuro saranno modificate e di avere versioni riga per riga EN/IT concordanti nelle nostre richieste di pull - così da rendere più semplici le revisioni.

### Passaggi

1. **Informare**
: Comunica, qui o in altro modo, che intendi tradurre una pagina. Modifica il primo post e cambia lo stato nell'elenco se hai i permessi.

2. **Fare un fork** (se non sei un contributor)
: Fai un fork del repository `https://github.com/phox081/docs-it` (questo repository) verso `{your-username}/docs-it` (il tuo).

3. **Creare un branch**
: Crea un nuovo ramo (branch) dedicato specificamente alla modifica del tuo file (cf. [Condivisione del lavoro di traduzione](#condivisione-del-lavoro-di-traduzione)).

4. **Iniziare la traduzione**
: Inizia a tradurre il tuo file per poter effettuare almeno un primo commit.

5. **Creare una pull request**
: Crea una PR (Pull Request) (dal tuo ramo di fork  `{your-username}/docs-it:{branch}` se non sei un contributor) completando la descrizione precompilata verso il ramo principale del repository.
Se il tuo lavoro è lungo, puoi utilizzare lo stato `draft` per segnalare che la tua PR è in `Work in Progress`.

> **Nota**
> La PR può essere considerata pronta quando tutte le checkbox saranno spuntate

6. **Richiedere revisioni** : Quando la tua traduzione è abbastanza matura per una revisione, assegna dei revisori (in genere i contributor o chi ti ha aiutato durante la traduzione) per far sapere loro che possono dedicare più tempo alla revisione approfondita del tuo lavoro.

7. **Cicli di revisioni e modifiche**
: Così come hai continuamente aggiornato la tua traduzione con nuovi commit prima della revisione, adesso apporta modifiche in base alle osservazioni ricevute durante la revisione per perfezionare il tuo lavoro, sempre tramite nuovi commit. È consigliato coinvolgere almeno 3 revisori.

8. **Fare un Merge**
: Una volta che tutto è in ordine e tutte le revisioni sono approvate, il tuo lavoro potrà essere integrato nella traduzione italiana di Vue.
Se sei un contributor, potrai procedere al merge della tua stessa PR.
e se tutto ok potrai cancellare il tuo BR dal remote. Altrimenti, qualcuno se ne occuperà.

---

## Diventare un Contributor della traduzione italiana

Essere un Contributor semplifica il processo e permette di evitare i fork lavorando direttamente sui branch. Unisciti al team di traduzione scrivendo: [Italian Translation](https://github.com/vuejs-translations/guidelines/discussions/23).

Per i contributor il canale Discord: [vue-doc-it-translation](https://discord.com/channels/486549696584876033/1135155463411998770)

---

## Estensioni VS Code

Utilizza le seguenti estensioni per evitare errori ortografici:

- streetsidesoftware.code-spell-checker
- streetsidesoftware.code-spell-checker-italian

in VS code ricorda di configurare i settings di spell-checker, includendo `it`:
> "cSpell.language": "en,it",

---

### Creare un issue dalla lista di controllo

Partendo dall'issue [#1 Avanzamento della traduzione - struttura file totale](https://github.com/phox081/docs-it/issues/1):

segui la sezione di interesse, se esiste un issue per quella sezione verifica che non sia già in lavorazione.

se, la sezione è troppo grande per poterla completare, o se incontri file troppo lunghi e complessi, puoi creare un nuovo issue nella sezione principale

Per creare un nuovo issue:
> Quando passi il mouse sulla riga, clicca sul ***cerchio a desta della riga***.

Nell'issue appena creato, inserisci ulteriori informazioni/motivazione per la creazione.

Continua con i [Passaggi](#passaggi).

---
