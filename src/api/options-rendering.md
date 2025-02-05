# Options: Rendering {#options-rendering}

## template {#template}

Szablon ciągu znaków dla komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **Szczegóły**

  Szablon dostarczony za pomocą opcji `template` zostanie skompilowany w locie w czasie wykonywania. Jest to obsługiwane tylko wtedy, gdy używana jest kompilacja Vue, która zawiera kompilator szablonów. Kompilator szablonów **NIE** jest zawarty w kompilacjach Vue, które mają w nazwie słowo `runtime`, np. `vue.runtime.esm-bundler.js`. Więcej szczegółów na temat różnych kompilacji można znaleźć w [dist file guide](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use).

  Jeśli ciąg zaczyna się od `#`, zostanie użyty jako `querySelector` i użyje `innerHTML` wybranego elementu jako ciągu szablonu. Pozwala to na tworzenie szablonu źródłowego przy użyciu natywnych elementów `<template>`.

  Jeśli opcja `render` jest również obecna w tym samym komponencie, `template` zostanie zignorowane.

  Jeśli główny komponent aplikacji nie ma określonej opcji `template` lub `render`, Vue spróbuje użyć `innerHTML` zamontowanego elementu jako szablonu.

  :::warning Uwaga dotycząca bezpieczeństwa
  Używaj tylko zaufanych źródeł szablonów. Nie używaj zawartości dostarczonej przez użytkownika jako szablonu. Więcej szczegółów można znaleźć w [Security Guide](/guide/best-practices/security#rule-no-1-never-use-non-trusted-templates).
  :::

## render {#render}

Funkcja, która programowo zwraca wirtualne drzewo DOM komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **Szczegóły**

  `render` jest alternatywą dla szablonów łańcuchowych, która pozwala wykorzystać pełną programistyczną moc JavaScript do zadeklarowania wyjścia renderowania komponentu.

  Wstępnie skompilowane szablony, na przykład te w komponentach jednoplikowych, są kompilowane do opcji `render` w czasie kompilacji. Jeśli zarówno `render` jak i `template` są obecne w komponencie, `render` będzie miał wyższy priorytet.

- **Zobacz również**
  - [Rendering Mechanism](/guide/extras/rendering-mechanism)
  - [Render Functions](/guide/extras/render-function)

## compilerOptions {#compileroptions}

Konfiguracja opcji kompilatora środowiska uruchomieniowego dla szablonu komponentu.

- **Typ**

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // default: 'condense'
      delimiters?: [string, string] // default: ['{{', '}}']
      comments?: boolean // default: false
    }
  }
  ```

- **Szczegóły**

  Ta opcja konfiguracyjna jest respektowana tylko podczas korzystania z pełnej kompilacji (tj. samodzielnego `vue.js`, który może kompilować szablony w przeglądarce). Obsługuje te same opcje co app-level [app.config.compilerOptions](/api/application#app-config-compileroptions) i ma wyższy priorytet dla bieżącego komponentu.

- **Zobacz również** [app.config.compilerOptions](/api/application#app-config-compileroptions)

## slots<sup class="vt-badge ts"/> {#slots}

Opcja wspomagająca wnioskowanie o typie podczas programowego używania slotów w funkcjach renderowania. Obsługiwana tylko w wersji 3.3+.

- **Szczegóły**

  Wartość runtime tej opcji nie jest używana. Rzeczywiste typy powinny być zadeklarowane poprzez rzutowanie typów przy użyciu helpera typu `SlotsType`:

  ```ts
  import { SlotsType } from 'vue'

  defineComponent({
    slots: Object as SlotsType<{
      default: { foo: string; bar: number }
      item: { data: number }
    }>,
    setup(props, { slots }) {
      expectType<
        undefined | ((scope: { foo: string; bar: number }) => any)
      >(slots.default)
      expectType<undefined | ((scope: { data: number }) => any)>(
        slots.item
      )
    }
  })
  ```
