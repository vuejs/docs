---
title: Props Varsayılan Fonksiyonların `this` erişimi
badges:
  - kırıcı
---


# Props’da yer alan varsayılan fonksiyonların `this` nesnesine erişimi <MigrationBadges :badges="$frontmatter.badges" />

Props’da yer alan varsayılan değer fabrika fonksiyonları artık this nesnesine erişime sahip değil.

Bunun yerine:

- Komponent tarafından alınan ham props değerleri varsayılan fonksiyona parametre olarak aktarılıyor;

- Varsayılan fonksiyonlar içerisinde [inject](../composition-api-provide-inject.md) API kullanılabilir.

```js
import { inject } from 'vue'

export default {
  props: {
    theme: {
      default (props) {
        // `props` komponente aktarılan ham değerlerdir,
        // herhangi bir tip / varsayılan zorlamada önce
        // enjekte edilen niteliklere erişim sağlamak üzere `inject` de kullanılabilir
        return inject('theme', 'default-theme')
      }
    }
  }
} 
```