# 소개

## 쿡북 vs 가이드

레시피와 가이드는 무엇이 다릅니까? 왜 이것이 필요한가요?

- **중점**: 가이드에서 우리는 본질을 이야기 합니다. 각 세션은 이전 섹션에 지식이 있다고 가정하고 그 지식 기반으로 작성 되었습니다. 쿡북에서 각 레시피는 자체적으로 독립하여 존제 할 수 있어야 합니다. 이는 레시피가 일반적인 개요를 제공하지 않고 Vue 특정 측면을 집중 할 수 있습니다.

- **더 큰 깊이**: 가이드가 너무 길어지지 않도록 하기 위해 각 기능을 이해하는 데 도움이되는 가능한 가장 간단한 예만 포함하려고합니다. 그리고 그 다음을 계속 진행합니다. 쿡북에서는 흥미로운 방식으로 기능을 결합하여 더 복잡한 예제를 포함 할 수 있습니다. 각 레시피는 가이드의 틈새를 완전히 탐색하기 위해 필요한만큼 길고 상세 할 수도 있습니다.

- **Teaching JavaScript**: 이 가이드에서는 ES5 JavaScript에 대해 중급 이상이라고 가정합니다. 예를 들어 목록을 필터링하는 계산 된 속성에서 `Array.prototype.filter`가 ​​작동하는 방식을 설명하지 않습니다. 그러나 쿡북에는 더 나은 Vue 애플리케이션을 빌드하는 데 도움이되는 맥락에서 필수 JavaScript 기능 (ES6 / 2015 + 포함)을 탐색하고 설명 할 수 있습니다.

- **생태계 탐색** : 고급 기능의 경우 일부 생태계 지식을 가정합니다. 예를 들어 Webpack에서 단일 파일 구성 요소를 사용하려는 경우 Webpack 구성의 Vue가 아닌 부분을 구성하는 방법에 대해서는 설명하지 않습니다. 쿡북에는 이러한 생태계 라이브러리를보다 심도있게 탐색 할 수있는 공간이 있습니다. 적어도 Vue 개발자에게 보편적으로 유용한 범위입니다.

::: tip 이러한 모든 차이점이 있지만 쿡북(cookbook)은 여전히 ​​단계별 설명서가 *아닌* 것을 명심하세요. 대부분의 콘텐츠에서 HTML, CSS, JavaScript, npm / yarn 등과 같은 개념에 대한 기본적인 이해가 필요합니다. etc. :::

## Cookbook Contributions

### What we're looking for

The Cookbook gives developers examples to work off of that both cover common or interesting use cases, and also progressively explain more complex detail. Our goal is to move beyond a simple introductory example, and demonstrate concepts that are more widely applicable, as well as some caveats to the approach.

If you're interested in contributing, please initiate collaboration by filing an issue under the tag **cookbook idea** with your concept so that we can help guide you to a successful pull request. After your idea has been approved, please follow the template below as much as possible. Some sections are required, and some are optional. Following the numerical order is strongly suggested, but not required.

Recipes should generally:

- Solve a specific, common problem
- Start with the simplest possible example
- Introduce complexities one at a time
- Link to other docs, rather than re-explaining concepts
- Describe the problem, rather than assuming familiarity
- Explain the process, rather than just the end result
- Explain the pros and cons of your strategy, including when it is and isn't appropriate
- Mention alternative solutions, if relevant, but leave in-depth explorations to a separate recipe

We request that you follow the template below. We understand, however, that there are times when you may necessarily need to deviate for clarity or flow. Either way, all recipes should at some point discuss the nuance of the choice made using this pattern, preferably in the form of the alternative patterns section.

### Base Example <badge text="required" type="error"></badge>

1. Articulate the problem in a sentence or two.
2. Explain the simplest possible solution in a sentence or two.
3. Show a small code sample.
4. Explain what this accomplishes in a sentence.

### Details about the Value <badge text="required" type="error"></badge>

1. Address common questions that one might have while looking at the example. (Blockquotes are great for this)
2. Show examples of common missteps and how they can be avoided.
3. Show very simple code samples of good and bad patterns.
4. Discuss why this may be a compelling pattern. Links for reference are not required but encouraged.

### Real-World Example <badge text="required" type="error"></badge>

Demonstrate the code that would power a common or interesting use case, either by:

1. Walking through a few terse examples of setup, or
2. Embedding a codepen/jsfiddle example

If you choose to do the latter, you should still talk through what it is and does.

### Additional Context <badge text="optional"></badge>

It's extremely helpful to write a bit about this pattern, where else it would apply, why it works well, and run through a bit of code as you do so or give people further reading materials here.

### When To Avoid This Pattern <badge text="optional"></badge>

This section is not required, but heavily recommended. It won't make sense to write it for something very simple such as toggling classes based on state change, but for more advanced patterns like mixins it's vital. The answer to most questions about development is ["It depends!"](https://codepen.io/rachsmith/pen/YweZbG), this section embraces that. Here, we'll take an honest look at when the pattern is useful and when it should be avoided, or when something else makes more sense.

### Alternative Patterns <badge text="required with avoidance section" type="warning"></badge>

This section is required when you've provided the section above about avoidance. It's important to explore other methods so that people told that something is an antipattern in certain situations are not left wondering. In doing so, consider that the web is a big tent and that many people have different codebase structures and are solving different goals. Is the app large or small? Are they integrating Vue into an existing project, or are they building from scratch? Are their users only trying to achieve one goal or many? Is there a lot of asynchronous data? All of these concerns will impact alternative implementations. A good cookbook recipe gives developers this context.

## Thank you

It takes time to contribute to documentation, and if you spend the time to submit a PR to this section of our docs, you do so with our gratitude.
