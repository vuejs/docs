## Istruzioni per contribuire

Grazie per prendere visione della `Guida alla scrittura`. Lo scopo della guida è quello di aiutarti a capire come formulare le frasi in modo da rendere la lettura più semplice e fluida.

### Glossario

È necessario utilizzare un glossario per uniformare le traduzioni.
I termini tecnici non devono essere tradotti.
In caso di dubbi, consulta il `glossario` [INSERT-LINK-HERE]().

Se un termine ti crea problemi (perché è troppo ambiguo), apri una `discussione` sul Termine/Frase per prendere una decisione di comune accordo.

### Condivisione del lavoro di traduzione

Tutto il lavoro di traduzione è guidato dalla discussione (issue) `Monitoraggio della traduzione` [INSERT-LINK-HERE](), che elenca tutte le pagine da tradurre con il loro stato (con un `issue` collegato e il suo stato).
Un issue collegato 'aperto' e 'non assegnato' può essere considerato aperto per contributi e può essere preso in carico da chiunque: puoi assegnartelo o lasciare un commento per la presa in carico.
A volte un issue 'aperto' potrebbe essere 'in corso di traduzione' se c'è una `PR collegata`. Questa può essere una buona occasione per fare una revisione della PR.

`Come Contributor`, se una pagina non ha un issue collegato, puoi crearlo dalla lista.

Crea un issue da un'opzione di controllo** [SPIEGARE_MEGLIO]
> Quando passi il mouse sulla riga, clicca sul cerchio.

Inserisci ulteriori informazioni se necessario.

*`Se non sei un Contributor`, puoi creare un issue e menzionare un Contributor per aggiornare il monitoraggio.*
**Vuoi diventare un Contributor?** Contattami o rispondi nella discussione [Italian Translation](https://github.com/vuejs-translations/guidelines/discussions/23)

### Contribuire al progetto (dalla A alla Z)

> **Nota**
È necessario mantenere lo stesso numero di righe tra il file originale e il file tradotto e assicurarsi che ogni numero di riga originale corrisponda al suo numero di riga tradotto.
Ciò ci consentirà di seguire più facilmente le parti di testo che in futuro saranno modificate e di avere versioni riga per riga EN/IT concordanti nelle nostre richieste di pull - così da rendere più semplici le revisioni.

#### Passaggi

1.**Informare**

Comunica qui che intendi tradurre una pagina. Modifica il primo post e cambia lo stato nell'elenco se hai i permessi.

2.**Fare un fork** (se non sei un contributor)

Fai un fork del repository `https://github.com/phox081/docs-it` (questo repository) verso `{your-username}/docs-it` (il tuo).

3.**Creare un branch**

Crea un nuovo ramo {branch} dedicato specificamente alla modifica del tuo file (cf. [Condivisione del lavoro di traduzione](#condivisione-del-lavoro-di-traduzione)).

4.**Iniziare la traduzione**

Inizia a tradurre il tuo file per poter effettuare almeno un primo commit.

5.**Creare una pull request**

Crea una PR {Pull Request} (dal tuo ramo di fork  `{your-username}/docs-it:{branch}` se non sei in contributor) completando la descrizione precompilata verso il ramo principale del repository.
Se il tuo lavoro è lungo, puoi utilizzare lo stato `draft` per segnalare che la tua PR è in `Work in Progress`.

> **Nota**
> La PR può essere considerata pronta quando tutte le checkbox saranno spuntate

6. **Richiedere revisioni**

Quando la tua traduzione è abbastanza matura per una revisione, assegna dei revisori (probabilmente puoi chiedere a coloro che ti hanno aiutato durante la traduzione) per far sapere loro che possono dedicare più tempo alla revisione approfondita del tuo lavoro.

7. **Cicli di revisioni e modifiche**

Così come hai continuamente aggiornato la tua traduzione con nuovi commit prima della revisione, adesso apporta modifiche in base alle osservazioni ricevute durante la revisione per perfezionare il tuo lavoro, sempre tramite nuovi commit. È consigliato coinvolgere almeno 3 revisori.

8. **Fare un Merge**

Una volta che tutto è in ordine e tutte le revisioni sono approvate, il tuo lavoro potrà essere integrato nella traduzione italiana di Vue.
Se sei un contributor, potrai procedere al merge della tua stessa PR. Altrimenti, qualcuno se ne occuperà.


### Diventare un Contributor della traduzione italiana

Essere un Contributor semplifica il processo e permette di evitare i fork lavorando direttamente sui branch. Unisciti al team di traduzione scrivendo: [Italian Translation](https://github.com/vuejs-translations/guidelines/discussions/23). Per i contributor il canale Discord: [vue-doc-it-translation](https://discord.com/channels/486549696584876033/1135155463411998770)

### Estensioni VS Code

Utilizza le seguenti estensioni per evitare errori ortografici:

- streetsidesoftware.code-spell-checker
- streetsidesoftware.code-spell-checker-italian
> "cSpell.language": "en,it",
