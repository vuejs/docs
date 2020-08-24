# 렌더링 메커니즘 및 최적화

> 이 페이지는 Vue의 사용방법이나 필수적으로 읽을 필요는 없습니다.  그러나 내부적인 렌더링에 관해 궁금한 경우 관련 정보를 얻을 수 있습니다.

## Virtual DOM

watchers가 어떻게 components를 어떻게 업데이트 하고 있는지 알게 되고, 변경사항들이 DOM에 어떻게 적용 되는 지 궁금할 수 있습니다. Vue를 포함한 많은 프레임워크들에서 사용하는 버추얼 DOM에 대해 들어보셨을 것 입니다. 가상 DOM은 JavaScript의 업데이트 변경사항을 효과적으로 반영하도록 해줍니다.

<div class="reactivecontent">   <iframe height="500" style="width: 100%;" scrolling="no" title="How does the Virtual DOM work?" src="https://codepen.io/sdras/embed/RwwQapa?height=500&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true"><br>    See the Pen &lt;a href="https://codepen.io/sdras/pen/RwwQapa"&gt;How does the Virtual DOM work?&lt;/a&gt; by Sarah Drasner<br>    (&lt;a href="https://codepen.io/sdras"&gt;@sdras&lt;/a&gt;) on &lt;a href="https://codepen.io"&gt;CodePen&lt;/a&gt;.<br>  </iframe></div>

We make a copy of the DOM in JavaScript called the Virtual DOM, we do this because touching the DOM with JavaScript is computationally expensive. While performing updates in JavaScript is cheap, finding the required DOM nodes and updating them with JS is expensive. So we batch calls, and change the DOM all at once.

가상 DOM은 render 함수가 만든 JavaScript 경량 객체 입니다. 가상 DOM은 엘리먼트, 객체(데이터, 속성, props 등을 포함), 배열을 전달인자로 갖고 있습니다. 이 배열은 전체 엘리먼트 트리를 완성시킬때까지 자식 노드에게 전달되는데 자식들 역시 자신만의 argument를 가지며 더 하위의 자식 노드를 가질수 있습니다

JavaScript로 리스트의 items를 변경할 때 반응형을 사용합니다. JavaScript의  가상 DOM을 모두 변경하고, 가상 DOM과 실제 DOM 사이의 변경 사항을 확인합니다. 그 후 변경된 사항만 업데이트 합니다. 가상 DOM이 UI에 변경사항을 적용 할 수 있도록 허용합니다.
