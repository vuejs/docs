# Computed 속성과 Watch

## Computed 속성

템플릿 내에 표현식을 넣으면 편리하지만, 간단한 연산을 위한 부분입니다. 템플릿 안에서 너무 많은 연산을 하면 코드가 비대해지고 유지보수가 어렵습니다. 중첩된 배열이 있는 객체를 가진 경우에 대한 아래 예제를 봅시다.

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: '존 도우',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
})
```

그리고 `author` 가 이미 책이 있는 지 여부에 따라 다른 메시지를 보여주기를 원합니다.

```html
<div id="computed-basics">
  <p>출판된 책:</p>
  <span>{{ author.books.length > 0 ? '있음' : '없음' }}</span>
</div>
```

이 시점에서는 템플릿은 더이상 단순하고 선언적이지 않습니다.  `author.books` 에 따라 계산을 수행한다는 것을 깨닫기까지 잠시 살펴봐야만 합니다. 템플릿 내에 이 계산을 한번 더 넣으려는 경우, 이 문제는 더 악화됩니다.

그러므로 반응형 데이터를 포함하는 복잡한 로직의 경우, **Computed 속성**을 사용해야 합니다 .

### 기본 예제

```html
<div id="computed-basics">
  <p>출판된 책:</p>
  <span>{{ publishedBooksMessage }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: '존 도우',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // computed getter
    publishedBooksMessage() {
      // 여기서의 `this` 는 vm 인스턴스이다.
      return this.author.books.length > 0 ? '있음' : '없음'
    }
  }
}).mount('#computed-basics')
```

결과:

<common-codepen-snippet title="Computed basic example" slug="NWqzrjr" tab="js,result" :preview="false" />

우리는 여기서 `publishedBooksMessage` 라는 computed 속성을 선언했습니다.

이 어플리케이션에서 `data` 의 `books` 배열의 값을 변경하면, 그에 따라 `publishedBooksMessage` 가 어떻게 변경되는 지 볼 수 있습니다.

일반적인 속성과 마찬가지로 템플릿에서 computed 속성도 데이터 바인딩 할 수 있습니다. Vue 는 `vm.publishedBooksMessage`가 `vm.author.books` 에 의존한다는 것을 알고 있습니다. 그래서 `vm.author.books` 가 변경될 때 `vm.publishedBooksMessage` 에 의존하는 모든 바인딩을 업데이트합니다. 그리고 가장 좋은 부분은 종속성 관계를 선언적으로 만들었다는 것입니다. computed getter 함수에 사이드 이펙트가 없으므로 테스트하거나 이해하기에도 더 쉽습니다.

### Computed 속성의 캐싱 vs 메서드

표현식에서 메서드를 호출하여 동일한 결과를 얻을 수도 있습니다.

```html
<p>{{ calculateBooksMessage() }}</p>
```

```js
// 컴포넌트 내부
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? '있음' : '없음'
  }
}
```

computed 속성 대신에 메서드와 동일한 함수를 정의할 수 있습니다. 최종 결과를 위해, 두가지 접근 방식은 정확히 동일합니다. 그러나 차이점은 **computed 속성은 반응형(reactive) 종속성에 기반하여 캐시된다는 것** 입니다. computed 속성은 반응형 종속성 중 일부가 변경된 경우에만 재평가됩니다. 즉, `author.books` 가 변경되지 않는다면 `publishedBooksMessage` computed 속성에 대해 여러번 접근하더라도 함수를 다시 실행할 필요없이 이전에 계산된 결과를 즉시 반환합니다.

또한 이는 `Date.now()`이 반응형 종속성이 아니기 때문에, 다음 예제의 computed 속성이 업데이트되지 않음을 의미합니다.

```js
computed: {
  now() {
    return Date.now()
  }
}
```

이에 비해 메서드 호출은 다시 렌더링이 발생할 때마다 <strong>항상</strong> 함수를 실행합니다.

캐싱이 필요한 이유는 무엇일까요? 거대한 배열을 반복하고 많은 계산을 수행해야 하는 값 비싼 `list` computed 속성이 있다고 상상해보십시오. 그리고 `list`에 종속적인 다른 computed 속성들이 있다고 가정해봅시다. 캐싱이 없다면, `list`의 getter는 필요한 것보다 훨씬 많이 실행될 것입니다! 캐싱을 원하지 않는 경우라면, `method` 를 사용하십시오.

### Computed 속성의 Setter

Computed 속성은 기본적으로 getter 이지만, 필요할 때엔 setter 도 제공할 수 있습니다.

```js
// ...
computed: {
  fullName: {
    // getter
    get() {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set(newValue) {
      const names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

이제 `vm.fullName = 'John Doe'`를 실행하면, setter가 호출되고 `vm.firstName`과 `vm.lastName`이 그에 따라 업데이트 됩니다.

## Watch 속성

대부분의 경우 computed 속성이 더 적절하지만, 사용자 지정 감시자(watcher) 가 필요한 경우도 있습니다. 이것이 Vue 가 `watch` 옵션을 통해 데이터의 변경에 대응하는 방법을 제공하는 이유입니다. 이는 데이터 변경에 대한 응답으로 비동기 혹은 비용이 많이 드는 작업을 수행하려는 경우가 가장 유용합니다.

아래 예제를 봅시다.

```html
<div id="watch-example">
  <p>
    예/아니오 질문을 물어보세요.
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</div>
```

```html
<!-- 이미 Ajax 라이브러리의 풍부한 생태계와 범용 유틸리티 메소드 컬렉션이 있기 때문에, -->
<!-- Vue 코어는 다시 만들지 않아 작게 유지됩니다. -->
<!-- 이것은 이미 익숙한 것을 선택할 수 있는 자유를 줍니다. -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script>
  const watchExampleVM = Vue.createApp({
    data() {
      return {
        question: '',
        answer: '질문은 보통 물음표를 포합합니다. ;-)'
      }
    },
    watch: {
      // question 이 변경될 때마다, 이 함수가 실행될 것 입니다.
      question(newQuestion, oldQuestion) {
        if (newQuestion.indexOf('?') > -1) {
          this.getAnswer()
        }
      }
    },
    methods: {
      getAnswer() {
        this.answer = '생각중...'
        axios
          .get('https://yesno.wtf/api')
          .then(response => {
            this.answer = response.data.answer
          })
          .catch(error => {
            this.answer = '에러! API에 닿지 못했습니다. ' + error
          })
      }
    }
  }).mount('#watch-example')
</script>
```

결과:

<common-codepen-snippet title="Watch basic example" slug="GRJGqXp" tab="result" :preview="false" />

이 경우 `watch` 옵션을 사용하면 비동기 작업 (API 접근)을 수행하고, 이 작업을 수행하기 위한 조건을 설정할 수 있습니다. computed 속성은 이러한 기능을 수행할 수 없습니다.

추가로 `watch` 옵션 외에도 명령형 [vm.$watch API](../api/instance-methods.html#watch)를 사용할 수 있습니다.

### Computed 속성 vs Watch 속성

Vue는 현재 활성화된 인스턴스에서 데이터 변경을 관찰하고 이에 반응하는 좀 더 일반적인 방법인  **watch 속성**을 제공합니다. 다른 데이터를 기반으로 변경해야 하는 데이터가 있는 경우, `watch` 를 과도하게 쓰고자 하는 유혹이 있습니다. 특히 AngularJS 기반에서 온 경우 그렇습니다. 그러나 명령형 `watch` 콜백보다 computed 속성을 쓰는 것이 더 나은 경우가 많습니다. 아래 예제를 봅시다.

```html
<div id="demo">{{ fullName }}</div>
```

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    }
  },
  watch: {
    firstName(val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName(val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
}).mount('#demo')
```

위 코드는 명령형이고 또 코드를 반복합니다.<br>아래의 computed 속성을 사용하는 방식과 비교해보세요.

```js
const vm = Vue.createApp({
  data() {
    return {
      firstName: 'Foo',
      lastName: 'Bar'
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}).mount('#demo')
```

훨씬 낫지 않습니까?
