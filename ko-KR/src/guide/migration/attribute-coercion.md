---
badges:
- breaking
---

# 속성 강제 규칙(Attribute Coercion Behavior)<migrationbadges badges="$frontmatter.badges"></migrationbadges>

::: 낮은 수준의 API 변경으로 개발자 대부분에게 영향을 주지 않습니다. :::

## 개요

변경내용:

- 열거형 속성(*enumerated attributes)의 내부 개념을 삭제하고 그 특성을 일반 *non-boolean* 속성과 동일하게 처리합니다
- ***BREAKING***: 값이 *boolean*  `false`인 경우, 속성을 삭제하지 않습니다. 대신 attr="false"로 설정되며, 속성을 삭제하려면 `null` 또는 `undefined`를 사용합니다.

더 자세한 설명은 계속 읽으십시오!

## 2.x 구문

2.x에서 `v-bind` 값을 제어하는 방법:

- 일부 속성과 엘리먼트(*요소)는 Vue에서 항상 쌍으로 대응하는 IDL 속성(특성)을 사용: [`<input>`, `<select>`, `<progress>`등의 `value`](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L11-L18).

- "[*boolean 속성](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L33-L40)" 및 [xlinks](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L44-L46)의 경우 Vue에서 "거짓"([`undefined`, `null`, `false`](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L52-L54))인 경우는 삭제하고 그렇지 않으면 추가합니다. ([여기](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L66-L77)와 [여기](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L81-L85)를 참조)

- "[열거형 속성(enumerated attributes)](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L20)"(현재 `contenteditable`, `draggable`, `spellcheck`)의 경우 Vue에서 속성을 문자열로 [강제](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/util/attrs.js#L24-L31) 변환하려고 합니다. ([vuejs/vue#9397](https://github.com/vuejs/vue/issues/9397) 이슈를 통해 수정되어 `contenteditable`로 특수하게 처리합니다)

- 다른 속성의 경우 "거짓" 값(`undefined`, `null`, `false`)을 제거하고 다른 값을 그대로 설정합니다. ([여기](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L92-L113) 참조)

다음 표에서는 Vue가 "열거형 속성(enumerated attributes)"을 어떻게 일반 non-boolean 속성으로 변환하는지 설명합니다.

표현식 | `foo` <sup>일반</sup> | `draggable` <sup>열거형(*enumerated attributes)</sup>
--- | --- | ---
`:attr="null"` | / | `draggable="false"`
`:attr="undefined"` | / | /
`:attr="true"` | `foo="true"` | `draggable="true"`
`:attr="false"` | / | `draggable="false"`
`:attr="0"` | `foo="0"` | `draggable="true"`
`attr=""` | `foo=""` | `draggable="true"`
`attr="foo"` | `foo="foo"` | `draggable="true"`
`attr` | `foo=""` | `draggable="true"`

위의 표에서 볼 수 있듯이 현재 구현(2.x)에서는 `true`에서 '`true`'로 변환되지만, `false`의 경우는 속성을 삭제합니다. 이로 인해 충돌이 발생하여 사용자는 `aria-*`, `aria-selected`, `aria-hidden`등의 속성을 이용하여 매우 일반적인 방법으로 boolean 값을 수동으로 강제 변환해야 했습니다.

## 3.x 구문

열거형 속성(*enumerated attributes)의 내부 개념을 삭제하고 그 특성을 일반적인 *non-boolean* HTML 속성과 동일하게 처리합니다

- 일반적인 non-boolean 속성과 "열거형 속성(enumerated attributes)"의 불일치를 해결합니다
- `contenteditable`과 같은 속성에 `'true'`, `'false'`와 향후 추가되는 키워드를 사용할 수 있습니다.

*non-boolean* 속성의 경우 Vue에서 속성이 `false`인 경우 삭제를 중단하고 대신 `'false'`를 강제합니다.

- 이렇게 하면 `true`와 `false`의 불일치가 해결되고 `aria-*` 속성의 출력이 쉬워집니다

다음 표는 새로운 동작을 설명합니다.

표현식 | `foo` <sup>일반</sup> | `draggable` <sup>열거형(*enumerated attributes)</sup>
--- | --- | ---
`:attr="null"` | / | / <sup>†</sup>
`:attr="undefined"` | / | /
`:attr="true"` | `foo="true"` | `draggable="true"`
`:attr="false"` | `foo="false"` <sup>†</sup> | `draggable="false"`
`:attr="0"` | `foo="0"` | `draggable="0"` <sup>†</sup>
`attr=""` | `foo=""` | `draggable=""` <sup>†</sup>
`attr="foo"` | `foo="foo"` | `draggable="foo"` <sup>†</sup>
`attr` | `foo=""` | `draggable=""` <sup>†</sup>

<small>†: 변경점</small>

boolean 속성은 강제는 변경되지 않습니다.

## 마이그레이션 방법

### 열거형 속성(Enumerated attributes)

열거된 속성이 없고 `attr="false"`는 다음과 같이 다른 IDL 속성값 (실제 상태를 반영함)을 생성할 수 있습니다.

열거된 속성 없음(Absent enumerated attr) | IDL 속성 & 값
--- | ---
`contenteditable` | `contentEditable` → `'inherit'`
`draggable` | `draggable` → `false`
`spellcheck` | `spellcheck` → `true`

이전 동작(2.x)을 유지하며 `false`를 `'false'`로 강제합니다. Vue 3.x에서는 `contenteditable`, `spellcheck` 를 위해 `v-bind`를 사용하여 `false`와 `'false'`를 해석해야합니다.

2.x에서 열거된 속성(*enumerated attributes)에 대해 유효하지 않은 값이 `'true'` 로 강제 변환되었습니다. 이것은 일반적으로 의도하지 않은 것이며, 대규모에 의존 할 가능성은 작습니다. 3.x에서는 `true` 또는 `'true'`를 명시적으로 지정해야 합니다.

### 속성을 삭제하는 대신 `false`를 `'false'`로 강제

3.x에서는 `null` 또는 `undefined` 를 사용하여 속성을 제거합니다.

### 2.x & 3.x 동작 비교

<table>
  <thead>
    <tr>
      <th>속성</th>
      <th> <code>v-bind</code> 값 <sup>2.x</sup> </th>
      <th> <code>v-bind</code> 값 <sup>3.x</sup> </th>
      <th>HTML 출력</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">2.x "열거된 속성(*Enumerated attrs)"<br><small><code>contenteditable</code>, <code>draggable</code>, <code>spellcheck</code></small> </td>
      <td> <code>undefined</code>, <code>false</code> </td>
      <td> <code>undefined</code>, <code>null</code> </td>
      <td><i>제거</i></td>
    </tr>
    <tr>
      <td>         <code>true</code>, <code>'true'</code>, <code>''</code>, <code>1</code>,         <code>'foo'</code> </td>
      <td> <code>true</code>, <code>'true'</code> </td>
      <td><code>"true"</code></td>
    </tr>
    <tr>
      <td> <code>null</code>, <code>'false'</code> </td>
      <td> <code>false</code>, <code>'false'</code> </td>
      <td><code>"false"</code></td>
    </tr>
    <tr>
      <td rowspan="2">기타 non-boolean 속성(*Other non-boolean attrs)<br><small>예. <code>aria-checked</code>, <code>tabindex</code>, <code>alt</code>, 등.</small> </td>
      <td> <code>undefined</code>, <code>null</code>, <code>false</code> </td>
      <td> <code>undefined</code>, <code>null</code> </td>
      <td><i>제거</i></td>
    </tr>
    <tr>
      <td><code>'false'</code></td>
      <td> <code>false</code>, <code>'false'</code> </td>
      <td><code>"false"</code></td>
    </tr>
  </tbody>
</table>
