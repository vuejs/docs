import { ref } from 'vue'

export default {
  setup() {
    // Una "ref" es una fuente de datos reactiva que
    // almacena un valor.
    // Técnicamente, no necesitamos envolver el string
    // con ref() para poder mostrarlo, pero veremos en
    // el siguiente ejemplo por qué es necesario si
    // alguna vez pretendemos cambiar el valor.
    const message = ref('¡Hola Mundo!')

    return {
      message
    }
  }
}
