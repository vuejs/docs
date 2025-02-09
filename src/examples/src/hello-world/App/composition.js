import { ref } from 'vue'

export default {
  setup() {
    // "ref" jest reaktywnym źródłem danych, które przechowuje wartość.
    // Technicznie rzecz biorąc, nie musimy opakowywać ciągu znaków za pomocą ref()
    // aby go wyświetlić, ale w następnym przykładzie zobaczymy,
    // dlaczego jest to potrzebne, jeśli kiedykolwiek zamierzamy zmienić
    // wartość.
    const message = ref('Witaj świecie!')

    return {
      message
    }
  }
}
