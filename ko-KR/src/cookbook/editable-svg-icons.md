# 편집가능한 SVG 아이콘 시스템

## 기본 예제

SVG 아이콘 시스템을 만드는 방법에는 여러가지 방법이 있습니다. 그 중에서 Vue의 기능을 활용하는 한 가지 방법은 편집 가능한 인라인 아이콘을 컴포넌트로 만드는 것입니다. 이 작업 방식의 장점은 다음과 같습니다:

- 즉석에서 쉽게 편집할 수 있습니다.
- 애니메이션이 가능합니다.
- 기본적인 props와 defaults를 사용하여, 일반적인 크기로 유지하거나 필요한 경우에는 변경할 수 있습니다.
- 인라인이므로 HTTP 요청이 필요없습니다.
- 동적으로 접근할 수 있습니다.

우선, 모든 아이콘에 대한 폴더를 만들고, 쉽게 검색할 수 있도록 표준화된 방식으로 이름을 지정합니다:

- `components/icons/IconBox.vue`
- `components/icons/IconCalendar.vue`
- `components/icons/IconEnvelope.vue`

다음은 전체 설정을 볼 수 있는 예제 저장소입니다: [https://github.com/sdras/vue-sample-svg-icons/](https://github.com/sdras/vue-sample-svg-icons/)

![Documentation site](https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/screendocs.jpg)

slot을 사용하는 기본 아이콘 (`IconBase.vue`) 컴포넌트를 만듭니다.

```html
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>
```

이 기본 아이콘을 그대로 사용할 수 있습니다. 아이콘의 `viewBox`에 따라 기본 아이콘 컴포넌트의 `viewBox`만 업데이트하면 됩니다. 아래에서는 props를 동적으로 업데이트할 수 있도록 `width`, `height`, `iconColor`과 아이콘의 이름인 iconName를 props로 설정하였습니다. iconName은 접근성을 위해서 `<title>`컨텐츠(보간값)와 `id` 모두에 사용됩니다.

스크립트는 다음과 같습니다. 우리가 달리 명시하지 않는 한 아이콘은 일관되게 렌더링되도록 몇 가지 기본값을 가질 것입니다:

```js
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
```

채우기(fill)의 기본 값인 `currentColor` 속성은 아이콘이 주변 텍스트의 색상을 상속하도록 합니다. 원하는 경우 props로 다른 색상을 전달할 수도 있습니다.

아이콘 내부에 경로를 포함하는 `IconWrite.vue`의 유일한 내용으로 다음과 같이 사용할 수 있습니다:

```html
<icon-base icon-name="write"><icon-write /></icon-base>
```

이제, 아이콘의 여러 사이즈를 만들고 싶다면 매우 쉽게 할 수 있습니다:

```html
<p>
  <!-- 더 작은 `width`와 `height`를 props로 전달할 수 있습니다 -->
  <icon-base width="12" height="12" icon-name="write"><icon-write /></icon-base>
  <!-- 또는 기본값 18을 사용할 수 있습니다 -->
  <icon-base icon-name="write"><icon-write /></icon-base>
  <!-- 또는 조금 더 크게 사용할 수도 있습니다 :) -->
  <icon-base width="30" height="30" icon-name="write"><icon-write /></icon-base>
</p>
```

 <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/Screen%20Shot%202018-01-01%20at%204.51.40%20PM.png" class="">

## 애니메이션 가능한 아이콘

컴포넌트에 아이콘을 유지하면 특히 상호작용에서 애니메이션을 적용할 때 매우 편리합니다. 인라인 SVG는 모든 방법의 상호작용을 가장 잘 지원합니다. 다음은 클릭 시 애니메이션으로 표시되는 아이콘의 매우 기본적인 예제입니다:

```html
<template>
  <svg
    @click="startScissors"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
    aria-labelledby="scissors"
    role="presentation"
  >
    <title id="scissors" lang="en">Scissors Animated Icon</title>
    <path id="bk" fill="#fff" d="M0 0h100v100H0z" />
    <g ref="leftscissor">
      <path d="M..." />
      ...
    </g>
    <g ref="rightscissor">
      <path d="M..." />
      ...
    </g>
  </svg>
</template>
```

```js
import { TweenMax, Sine } from 'gsap'

export default {
  methods: {
    startScissors() {
      this.scissorAnim(this.$refs.rightscissor, 30)
      this.scissorAnim(this.$refs.leftscissor, -30)
    },
    scissorAnim(el, rot) {
      TweenMax.to(el, 0.25, {
        rotation: rot,
        repeat: 3,
        yoyo: true,
        svgOrigin: '50 45',
        ease: Sine.easeInOut
      })
    }
  }
}
```

이동해야하는 path 그룹에 `refs`를 적용하고, scissors의 양쪽이 나란히 이동해야하므로, `refs`를 전달할 위치에 재사용할 수 있는 함수를 만들 것입니다. GreenSock을 사용하면 브라우저에서 애니메이션 지원 및 `transform-origin` 문제를 해결하는데 도움이 됩니다.

<p data-height="300" data-theme-id="0" data-slug-hash="dJRpgY" data-default-tab="result" data-user="Vue" data-embed-version="2" data-pen-title="Editable SVG Icon System: Animated icon" class="codepen">See the Pen <a href="https://codepen.io/team/Vue/pen/dJRpgY/">Editable SVG Icon System: Animated icon</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

<p style="margin-top:-30px">아주 쉽게 완성됩니다! 그리고 즉시 업데이트 하기 쉽습니다.</p>

[여기](https://github.com/sdras/vue-sample-svg-icons/) 저장소에 더 많은 애니메이션 예제를 볼 수 있습니다.

## 추가 참고 사항

디자이너의 마음이 바뀔 수 있습니다. 또한 제품의 요구사항도 변경됩니다. 전체 아이콘 시스템에 대한 논리를 하나의 기본 컴포넌트에 유지하면 모든 아이콘을 빠르게 업데이트하고 전체 시스템에 전파할 수 있습니다. 아이콘 로더(icon loader)를 사용하더라도 일부 상황에서는 전역 변경을 위해 모든 SVG를 다시 생성하거나 편집해야 합니다. 이 방법을 사용하면 시간과 고통을 줄일 수 있습니다.

## 이 패턴을 피해야 할 때

이러한 유형의 SVG 아이콘 시스템은 사이트 전체에서 여러 아이콘이 다양한 방식으로 사용될 때 매우 유용합니다. 한 페이지에서 동일한 아이콘을 여러번 반복하는 경우(예: 거대한 테이블의 각 행마다 삭제 아이콘이 있는 경우) 모든 스프라이트를 스프라이트 시트로 컴파일하고 `<use>`태그를 사용하여 로드하는 것이 더 합리적일 수 있습니다.

## 대체 패턴

SVG 아이콘 관리에 도움이 되는 기타 도구는 다음과 같습니다:

- [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)
- [svgo-loader](https://github.com/rpominov/svgo-loader)

이러한 도구는 컴파일 타임에 SVG를 번들로 제공하지만, `<use>`태그는 더 복잡한 작업을 수행할 때 이상한 크로스 브라우저(cross-browser) 문제를 가질 수 있으므로, 런타임 중에 편집하기가 조금 더 어렵습니다. 또한 2개의 중접된 `viewBox` 속성과 2개의 좌표계가 남습니다. 이런 부분은 구현을 조금 더 복잡하게 만듭니다.
