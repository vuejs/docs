# 소개

## 컴포지션 API가 필요한 이유

::: tip Note 
해당 문서에서 여기까지 읽으셨다면, [Vue의 기초](introduction.md)와 [컴포넌트 생성하기](component-basics.md)에 익숙해야합니다. 
:::

Vue 컴포넌트를 만들면 재사용 가능한 코드 조각으로 결합되어진 인터페이스의 반복가능한 부분들을 추출할 수 있습니다. 이것만으로도 어플리케이션에서 유지관리성과 유연성을 얻을 수 있습니다. 그러나, 우리들은 어플리케이션이 엄청 커서 수 백개의 컴포넌트를 생각하면 충분하지 않다는 것을 경험적으로 느꼈습니다. 이러한 대규모 어플리케이션을 다룰 때는 코드 공유와 재사용이 특히 중요합니다.

앱에서 특정 사용자의 레포지토리 목록을 보여준다고 가정해봅시다. 또한, 검색과 필터 기능을 적용하려고 합니다. 이 화면을 처리하는 컴포넌트는 다음과 같습니다:

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  data () {
    return {
      repositories: [], // 1
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      // `this.user`를 사용해서 유저 레포지토리 가져오기
    }, // 2
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

이 컴포넌트가 맡은 여러가지 일들:

1. 사용자 이름에 대한 외부 API로 레포지토리 가져오기와 사용자가 변경 될 때마다 갱신하기
2. `searchQuery` 문자열을 사용하여 레포지토리 검색하기
3. `filters` 객체를 사용하여 레포지토리 필터링하기

대부분의 경우 컴포넌트의 옵션들(`data`, `computed`, `methods`, `watch`) 로 논리를 구성할 수 있습니다. 하지만, 컴포넌트가 커지면 **논리적 관심사** 목록도 또한 커집니다. 이로 인해 특히 처음부터 작성하지 않은 사람들에게는 읽고 이해하기 어려운 컴포넌트로 여겨질 수 있습니다.

![Vue Option API: Code grouped by option type](https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png)

**논리적 관심사**를 그룹화된 색상으로 표현한 커다란 컴포넌트의 예입니다.

이러한 단편화로 인해 복잡한 컴포넌트를 이해하고 유지하기가 어렵니다. 옵션의 분리는 근본적인 논리적 관심사를 애매하게 만듭니다. 또한, 하나의 논리적 문제에 대해 작업을 할 때, 관련 코드의 옵션 블록을 지속적으로 "점프"해야합니다.<br>([역주] options-based API의 경우 prop, data, computed, hook 등의 옵션(또는 속성)의 규칙을 지켜서 작성해야합니다. 코드를 이해하기 위해 관련 옵션들을 위, 아래로 이동(스크롤)하여 코드를 보는 행동을 "점프"라고 표현하고 있습니다. 논리적인 관점 단위로 개발을 하려고 해도 이 옵션의 규칙을 지켜야하고 더 많은 논리 주제가 추가될 수록 코드의 양이 많아져 가독성이 떨어지고 유지보수성이 낮아집니다. 이를 보완할 수 있는 방법으로 Composition API를 제시하고 있습니다.)

동일한 논리적 관심사와 관련있는 코드를 함께 배치할 수 있다면 더 좋을 것입니다. 이것이 바로 Composition API가 할 수 있는 일입니다.

## Composition API 기초

이제 우리는 **왜**, **어떻게** 해야할지를 알았습니다. Composition API 작업을 시작하려면, 우선 실제로 사용할 수 있는 장소가 필요합니다. Vue 컴포넌트에서는 이 위치를 `setup` 이라고 부릅니다.<br>([역주] setup을 번역하지 않은 이유는 실제로 Composition API 내에서 setup()함수를 사용하기 때문입니다.)

### `setup` 컴포넌트 옵션

새로운 `setup` 컴포넌트 옵션은 컴포넌트가 생성되기 **전**에, `props`가 한번 resolved될 때 실행됩니다. 그리고 composition API의 진입점 역할을 합니다.

::: warning 
`setup`이 실행될 때, 컴포넌트 인스턴스가 아직 생성되지않아 `setup`옵션 내에 `this`가 존재하지 않습니다. 즉, `props`를 제외하고, 컴포넌트 내 다른 속성에 접근할 수 없습니다 – **local state**, **computed properties** 또는 **methods**. 
:::

`setup` 옵션은 [나중에](composition-api-setup.html#arguments) 언급할 `props` 와 `context`에 접근하는 펑션이어야합니다. 또한, `setup`에서 반환된 모든 것은 컴포넌트의 템플릿뿐만 아니라 나머지 컴포넌트 (computed properties, methods, 라이프사이클 훅 등)에 노출됩니다.

컴포넌트에 `setup`을 추가해봅시다:

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup(props) {
    console.log(props) // { user: '' }

    return {} // 여기서 반환된 내용은 컴포넌트의 "rest"에서 사용할 수 있습니다
  }
  // 컴포넌트의 "rest" 부분
}
```

이제 첫번째 논리적 관심사를 추출해보겠습니다. (원본 스니펫에서 "1"이라고 표시).

> 1. 해당 사용자 이름에 추정되는 외부 API에서 레포지토리 가져오기와 사용자가 변경 될 때마다 새로고침하기

가장 분명한 부분부터 시작하겠습니다:

- 레포지토리 목록
- 레포지토리 목록을 업데이트하는 펑션
- 다른 컴포넌트 옵션으로 접근할 수 있도록 리스트와 펑션 반환

```js
// src/components/UserRepositories.vue `setup` 펑션
import { fetchUserRepositories } from '@/api/repositories'

// 컴포넌트 내부
setup (props) {
  let repositories = []
  const getUserRepositories = async () => {
    repositories = await fetchUserRepositories(props.user)
  }

  return {
    repositories,
    getUserRepositories // 반환된 함수는 메소드와 동일하게 동작합니다
  }
}
```

`repositories` 변수는 아직 반응형이 아니기 때문에 아직 작동하지 않는 것을 빼면 시작점입니다. 즉, 사용자 관점에서는 레포지토리 목록은 비어있습니다. 고쳐봅시다!

### `ref`가 있는 반응성 변수

Vue 3.0에서는 다음과 같이 새로운 `ref` 펑션을 사용하여 어디서나 변수를 반응성있도록 만들 수 있습니다:

```js
import { ref } from 'vue'

const counter = ref(0)
```

`ref`는 전달인자를 받고, 반응성 변수의 값에 접근하거나 변경할 수 있는 `value` 속성을 가진 객체를 반환합니다:

```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

객체 안에 값을 감싸는 것은 불필요할 수 있지만, JavaScript 에서 다른 데이터 타입에 걸쳐 동작을 통일시켜야합니다. JavaScript에서는 `Number` 나 `String` 과 같은 원시 타입(primitive types)은 참조에 의한 전달(pass by reference)이 아니라 값에 의한 전달(pass by value)이기 때문입니다:

![Pass by reference vs pass by value](https://blog.penjee.com/wp-content/uploads/2015/02/pass-by-reference-vs-pass-by-value-animation.gif)

모든 값을 감싸는 래퍼 객체(wrapper object)를 가지고 있으면 어딘가에서 반응성을 잃어버릴 염려없이 전체 앱에서 안전하게 전달할 수 있습니다.

::: tip Note 
다시말해, `ref` 는 값에 **반응형 참조**를 만듭니다. **참조** 작업의 개념은 Composition API 전체에서 종종 사용될 것입니다. 
:::

예시로 넘어와서, 반응성이 있는 `repositories` 변수를 생성해봅시다:

```js
// src/components/UserRepositories.vue `setup` 펑션
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

// 컴포넌트 내부
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  return {
    repositories,
    getUserRepositories
  }
}
```

끝났습니다! 이제는 `getUserRepositories`를 호출할 때 마다 `repositories`는 변경될 것이고, 변경사항을 반영하기 위해서 화면은 업데이트될 것입니다. 컴포넌트는 이제 다음과 같아야합니다:

```js
// src/components/UserRepositories.vue
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup (props) {
    const repositories = ref([])
    const getUserRepositories = async () => {
      repositories.value = await fetchUserRepositories(props.user)
    }

    return {
      repositories,
      getUserRepositories
    }
  },
  data () {
    return {
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

첫번째 논리적 관심사 중 몇 가지를 `setup` 메소드 안에 서로 가까이 옮겼습니다. 이제 남은 것은 `mounted` 에서 `getUserRepositories` 를 호출하는 것과 `user` props가 변경될 때마다 감시자(watcher)를 세팅하는 것입니다.

라이프사이클 훅으로 시작할 것입니다.

### `setup` 안에 라이프사이클 훅 등록

Options API와 비교하여 Composition API 형태를 완벽하게 만들기 위해서, `setup` 안에 라이프사이클 훅을 등록하는 방법도 필요합니다. Vue로부터 export한 몇가지 새로운 펑션 덕분에 가능합니다. Composition API의 라이프사이클 훅은 Options API의 라이프사이클 훅의 이름과 동일하지만, 접두사 `on`이 붙습니다. 예) `mounted` -> `onMounted`.

이 펑션은 컴포넌트에 의해 훅이 호출될 때, 실행될 콜백을 받습니다.

`setup` 펑션에 라이프사이클 훅을 추가해봅시다:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted } from 'vue'

// 컴포넌트 내부
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  onMounted(getUserRepositories) // `mounted`에서 `getUserRepositories` 호출

  return {
    repositories,
    getUserRepositories
  }
}
```

이제 `user` prop의 변경사항에 대해 반응이 필요합니다. 이를 위해 독립적인 `watch` 펑션을 사용해야합니다.

### `watch`를 사용하여 변화에 반응하기

`watch` 옵션을 사용하여 컴포넌트 내부의 `user` 속성에 감시자를 설정하는 것과 마찬가지로, Vue에서 import한 `watch`펑션을 사용하여 동일한 작업을 수행할 수 있습니다. 3가지 전달인자를 허용합니다:

- 감시를 원하는 **반응성 참조**나 게터 펑션<br> (source)
- 콜백 (`(value, oldValue, onInvalidate) => void` 형태의 callback)
- 선택적인 구성 옵션 (immediate나 deep과 같은 watchOptions)

**작동 방식을 간단히 살펴보겠습니다.**

```js
import { ref, watch } from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
  console.log('새로운 counter 값: ' + counter.value)
})
```

`counter`가 수정 될 때마다 (예: `counter.value = 5`), watch는 트리거하고 두번째 전달인자인 콜백을 실행합니다. 이 경우 콘솔에 `'새로운 counter 값: 5'`라고 로그가 남겨집니다.

**아래는 Options API에 해당하는 코드입니다:**

```js
export default {
  data() {
    return {
      counter: 0
    }
  },
  watch: {
    counter(newValue, oldValue) {
      console.log('새로운 counter 값: ' + this.counter)
    }
  }
}
```

`watch`에 대한 자세한 내용은 [심층 가이드]()를 참조하세요.

**이제 예시를 적용해봅시다:**

```js
// src/components/UserRepositories.vue `setup` 펑션
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs } from 'vue'

// 컴포넌트 내부
setup (props) {
  // `props.user`에 참조 .value속성에 접근하여 `user.value`로 변경
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // `props.user`의 참조 value에 접근하기 위해서 `user.value`로 변경
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // props로 받고 반응성참조가 된 user에 감시자를 세팅
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

`setup` 상단에 `toRefs`가 사용된 것을 보셨을 것입니다. 이는 감시자가 `user` prop에 대한 변경사항에 반응을 보장하기 위한것이다.

이러한 변경 사항이 적용되면, 첫번째 논리적 관심사 전체가 한 곳으로 이동되었습니다. 이제는 두번째 관심사 (computed 속성으로 `searchQuery`를 기반으로 한 필터링)에 대해 동일한 작업을 할 수 있습니다.

### 독립형 `computed` 속성

`ref`와 `watch`와 마찬가지로, computed 속성은 Vue에서 import한 `computed` 펑션으로 Vue 컴포넌트 외부에서도 computed 속성을 사용할 수 있습니다. counter 예제로 돌아가봅시다:

```js
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```

여기, `computed` 펑션은`computed`의 첫번째 인자를 전달된 게터와 같은 콜백의 결과에 대한 *읽기 전용* **반응성 참조**를 리턴합니다. 새로 생성된 computed 변수의 **value**에 접근하려면, `ref`와 마찬가지로 `.value` 속성을 사용해야합니다.<br>([역주] 함수에서 반환될 때나 속성으로 할당될 때 반응성을 잃어버리기 때문에, 실제 값을 객체(.value 속성 존재)에 래핑하고 해당 객체를 리턴하여 사용하는 ref()와 사용법이 동일합니다.)

검색 기능을 `setup`안으로 옮겨보겠습니다:

```js
// src/components/UserRepositories.vue `setup` 펑션
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs, computed } from 'vue'

// 컴포넌트 내부
setup (props) {
  // `toRefs`를 사용하여 props의 `user`속성에 반응성 참조를 생성
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // `props.user`에 참조 .value속성에 접근하여 `user.value`로 변경
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // props로 받고 반응성참조가 된 user에 감시자를 세팅
  watch(user, getUserRepositories)

  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(
      repository => repository.name.includes(searchQuery.value)
    )
  })

  return {
    repositories,
    getUserRepositories,
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
```

다른 **논리적 관심사**에 대해서도 동일한 작업을 할 수 있지만, *단순히 코드를 `setup`옵션으로 옮기고 매우 크게 만드는 것 아닌가요? *라고 질문을 할 수 있습니다. 네. 사실입니다. 그렇기 때문에, 다른 일을 수행하기 전에 위 코드를 독립형 **composition function**으로 추출해야합니다. `useUserRepositories`를 생성하는 것부터 시작해봅시다:

```js
// src/composables/useUserRepositories.js

import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs } from 'vue'

export default function useUserRepositories(user) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

그리고 검색 기능:

```js
// src/composables/useRepositoryNameSearch.js

import { ref, onMounted, watch, toRefs } from 'vue'

export default function useRepositoryNameSearch(repositories) {
  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(repository => {
      return repository.name.includes(searchQuery.value)
    })
  })

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
```

**이제 이 2가지 기능을 별도의 파일로 만들면, 컴포넌트에서 사용할 수 있습니다. 이 작업을 수행하는 방법은 다음과 같습니다:**

```js
// src/components/UserRepositories.vue
import useUserRepositories from '@/composables/useUserRepositories'
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'
import { toRefs } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup (props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    return {
      // 필터링되지 않은 repositories는 실제로 신경쓰지 않기 때문에
      // `repositories`이름으로 필터링된 결과를 노출시킬 수 있습니다
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories,
      searchQuery,
    }
  },
  data () {
    return {
      filters: { ... }, // 3
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
  },
  methods: {
    updateFilters () { ... }, // 3
  }
}
```

이 시점에서 이미 무엇을 해야할지 알고 있으므로, 끝으로 건너뛰고 남은 필터링 기능을 마이그레이션하겠습니다. 이 가이드의 핵심이 아니기때문에, 구현의 세부사항은 얻을 필요는 없습니다.

```js
// src/components/UserRepositories.vue
import { toRefs } from 'vue'
import useUserRepositories from '@/composables/useUserRepositories'
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'
import useRepositoryFilters from '@/composables/useRepositoryFilters'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup(props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    const {
      filters,
      updateFilters,
      filteredRepositories
    } = useRepositoryFilters(repositoriesMatchingSearchQuery)

    return {
      // 필터링되지 않은 repositories는 실제로 신경쓰지 않기 때문에
      // `repositories`이름으로 필터링된 결과를 노출시킬 수 있습니다
      repositories: filteredRepositories,
      getUserRepositories,
      searchQuery,
      filters,
      updateFilters
    }
  }
}
```

이제 끝났습니다!

여기서는 Composition API의 겉핥기만 했을뿐이며, 이를 통해 무엇을 할 수 있는지를 기억하세요. 자세한 내용은 설명서를 참조하세요.<br>([참고링크] https://composition-api.vuejs.org/)
