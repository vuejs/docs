# 기초

웹 접근성(a11y 라고도 함)는 장애인, 느린 연결, 노후 되거나 손상된 하드웨어 등 불리한 환경에 있는 사람 등 누구나 사용할 수 있는 웹사이트를 만드는 것을 말합니다. 예를 들어, 비디오에 자막을 추가하면 청각 장애인과 난청인 사람 그리고 시끄러운 환경에서 전화를 할 수 없는 사용자에게 도움이 됩니다. 마찬가지로 텍스트의 대비가 너무 낮지 않은 지 확인하면 시력이 좋지 않은 사용자와 밝은 햇빛에서 휴대전화를 사용하려는 사용자 모두에게 도움이 됩니다.

준비는 되었지만 어떻게 시작해야 할지 모르시나요?

[World Wide Web Consortium (W3C)](https://www.w3.org/)에서 제공하는 [웹 접근성 계획과 관리 가이드](https://www.w3.org/WAI/planning-and-managing/)를 참조하세요.

## Skip link

사용자가 여러 웹 페이지에서 반복되는 콘텐츠를 건너뛸  수 있도록 기본 콘텐츠 영역으로 직접 이동하는 링크를 각 페이지 상단에 추가해야 합니다.

이것은 일반적으로 모든 페이지에 첫 포커스 가능한 요소 되기 때문에 `App.vue` 상단에서 이루어집니다.

```html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink">본문으로 건너띄기</a>
  </li>
</ul>
```

포커스가 되지 않았을 때 이 링크를 숨기려면 다음과 같은 스타일을 추가할 수 있습니다.

```css
.skipLink {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}
.skipLink:focus {
  opacity: 1;
  background-color: white;
  padding: .5em;
  border: 1px solid black;
}
```

사용자가 경로를 변경하면 포커스를 건너 링크로 되돌립니다. 이것은 위에 제공된 `ref`에 포커스를 호출하여 얻을 수 있습니다.

```vue
<script>
export default {
  watch: {
    $route() {
      this.$refs.skipLink.focus();
    }
  }
};
</script>
```

<p class="codepen" data-height="350" data-theme-id="light" data-default-tab="js,result" data-user="mlama007" data-slug-hash="VwepxJa" style="height: 350px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Skip to Main">   <span>See the Pen <a href="https://codepen.io/mlama007/pen/VwepxJa">   Skip to Main</a> by Maria (<a href="https://codepen.io/mlama007">@mlama007</a>)   on <a href="https://codepen.io">CodePen</a>.</span> </p> <script async="" src="https://static.codepen.io/assets/embed/ei.js"></script>

[주 내용으로 링크 건너뛰기 관련 문서 보기](https://www.w3.org/WAI/WCAG21/Techniques/general/G1.html)

## 콘텐츠 구성

접근성의 가장 중요한 부분 중 하나는 디자인이 접근성 구현을 지원할 수 있는지 확인하는 것 입니다. 디자인은 색상대비, 글꼴선택, 글자의 크기, 언어뿐만 아니라 응용 프로그램에서 콘텐츠가 어떻게 구성되는지를 고려해야 합니다.

### 제목(Headings)

사용자는 제목을 사용하여 응용 프로그램을 탐색할 수 있습니다. 응용 프로그램의 모든 부분에 설명이 포함된 제목을 사용하면 사용자는 각 섹션의 내용을 쉽게 예측할 수 있습니다. 제목과 관련하여 권장되는 몇 가지 접근성 사례가 있습니다.

- 랭킹 순서 중첩제목: `<h1>` - `<h6>`
- 섹션내에서 제목을 건너뛰지 마십시오.
- 텍스트에 스타일을 설정하는 대신 실제 제목태그를 사용하여 제목을 제공해야 합니다.

[제목(Headings)에 대해 더 읽어보기](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html)

```html
<main role="main" aria-labelledby="main-title">
  <h1 id="main-title">메인 타이틀</h1>
  <section aria-labelledby="section-title">
    <h2 id="section-title"> 섹션 타이틀 </h2>
    <h3>Section Subtitle</h3>
    <!-- 콘텐츠 -->
  </section>
  <section aria-labelledby="section-title">
    <h2 id="section-title"> 섹션 타이틀 </h2>
    <h3>섹션 서브타이틀</h3>
    <!-- 콘텐츠 -->
    <h3>섹션 서브타이틀</h3>
    <!-- 콘텐츠 -->
  </section>
</main>
```

### 랜드마크(Landmarks)

랜드마크는 애플리케이션 내의 섹션에 대한 프로그래밍 방식으로 접근을 제공합니다. 보조 기술에 의존하는 사용자는 애플리케이션의 각 섹션을 탐색하고 콘텐츠를 건너뛸 수 있습니다. [ARIA 역할](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)을 사용하여 이를 달성할 수 있습니다.

HTML | ARIA 역활 | 랜드마크 목적
--- | --- | ---
header | role="banner" | 주요제목 : 페이지 제목
nav | role="navigation" | 문서 또는 관련 문서를 탐색 할 때 사용하기에 적합한 링크 모음
main | role="main" | 문서의 기본 또는 핵심 콘텐츠입니다.
footer | role="contentinfo" | 상위 문서에 대한 정보 : 각주/저작권/개인 정보 보호 정책 링크
aside | role="complementary" | 주요 콘텐츠를 지원하지만 자체 콘텐츠에 대해 별도의 의미가 있습니다.
*사용불가* | role="search" | 이 섹션에는 응용 프로그램의 검색 기능이 포함되어 있습니다
form | role="form" | 양식 관련 요소 모음
section | role="region" | 관련성이 있고 사용자가 탐색하기를 원하는 콘텐츠입니다. 이 요소에 대한 레이블을 제공해야합니다.

:::tip 팁:[HTML5 시맨틱 요소를 지원하지 않는 레거시 브라우저](https://caniuse.com/#feat=html5semantic)와의 호환성을 극대화하기 위해 중복 랜드 마크 역할 속성을 가진 랜드 마크 HTML 요소를 사용하는 것이 좋습니다. :::

[랜드마크에 대해 자세히 알아보기](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles)
