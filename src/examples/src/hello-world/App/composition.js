import { ref } from 'vue'

export default {
  setup() {
    // Un "ref" è una fonte di dati reattiva che memorizza un valore.
    // Tecnicamente, non abbiamo bisogno di racchiudere la stringa con ref()
    // per poterla visualizzare, ma vedremo nel prossimo esempio
    // perché è necessario se volessimo cambiarne
    // il valore.
    const message = ref('Ciao Mondo!')

    return {
      message
    }
  }
}
