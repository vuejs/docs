
    var pageVueRenderFn = function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('header',{attrs:{"sticky":""}},[_c('navbar',{attrs:{"type":"dark"},scopedSlots:_u([{key:"right",fn:function(){return [_c('li',[_c('form',{staticClass:"navbar-form"},[_c('searchbar',{attrs:{"data":searchData,"placeholder":"Search","on-hit":searchCallback,"menu-align-right":""}})],1)])]},proxy:true}])},[_c('dropdown',{staticClass:"nav-link",scopedSlots:_u([{key:"header",fn:function(){return [_v("Essentials")]},proxy:true}])},[_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/docs/essentials/application.html"}},[_v("Creating an Application")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/docs/essentials/template-syntax.html"}},[_v("Template Syntax")])])])],1)],1),_v(" "),_c('div',{attrs:{"id":"flex-body"}},[_c('overlay-source',{attrs:{"id":"site-nav","tag-name":"nav","to":"site-nav"}},[_c('div',{staticClass:"site-nav-top"},[_c('div',{staticClass:"fw-bold mb-2",staticStyle:{"font-size":"1.25rem"}},[_v("Template")])]),_v(" "),_c('div',{staticClass:"nav-component slim-scroll"},[_c('site-nav',[_c('overlay-source',{staticClass:"site-nav-list site-nav-list-root",attrs:{"tag-name":"ul","to":"mb-site-nav"}},[_c('li',{staticClass:"site-nav-custom-list-item site-nav-list-item-0"},[_v("Getting Started")]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Essentials \n\n"),_c('i',{staticClass:"site-nav-dropdown-btn-icon site-nav-rotate-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-dropdown-container-open site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/docs/essentials/application.html"}},[_v("Creating an Application")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/docs/essentials/template-syntax.html"}},[_v("Template Syntax")])])])])]),_v(" "),_c('li',{staticClass:"site-nav-custom-list-item site-nav-list-item-0"},[_v("Components In-Depth")]),_v(" "),_c('li',{staticClass:"site-nav-custom-list-item site-nav-list-item-0"},[_v("Reusability")]),_v(" "),_c('li',{staticClass:"site-nav-custom-list-item site-nav-list-item-0"},[_v("Built-in Components")]),_v(" "),_c('li',{staticClass:"site-nav-custom-list-item site-nav-list-item-0"},[_v("Scaling Up")]),_v(" "),_c('li',{staticClass:"site-nav-custom-list-item site-nav-list-item-0"},[_v("Best Practices")]),_v(" "),_c('li',{staticClass:"site-nav-custom-list-item site-nav-list-item-0"},[_v("TypeScript")]),_v(" "),_c('li',{staticClass:"site-nav-custom-list-item site-nav-list-item-0"},[_v("Extra Topics")])])],1)],1)]),_v(" "),_c('div',{attrs:{"id":"content-wrapper"}},[_m(0),_v(" "),_c('p',[_v("Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data. All Vue templates are syntactically valid HTML that can be parsed by spec-compliant browsers and HTML parsers.")]),_v(" "),_c('p',[_v("Under the hood, Vue compiles the templates into highly-optimized JavaScript code. Combined with the reactivity system, Vue can intelligently figure out the minimal number of components to re-render and apply the minimal amount of DOM manipulations when the app state changes.")]),_v(" "),_c('p',[_v("If you are familiar with Virtual DOM concepts and prefer the raw power of JavaScript, you can also directly write render functions instead of templates, with optional JSX support. However, do note that they do not enjoy the same level of compile-time optimizations as templates.")]),_v(" "),_m(1),_v(" "),_c('p',[_v("The most basic form of data binding is text interpolation using the \"Mustache\" syntax (double curly braces):")]),_v(" "),_m(2),_m(3),_v(" "),_m(4),_v(" "),_m(5),_v(" "),_m(6),_v(" "),_c('div',{staticClass:"demo"},[_c('p',[_v("Using text interpolation: ")]),_v(" "),_c('p',[_v("Using v-html directive: "),_c('span',{domProps:{"innerHTML":_s(rawHtml)}})])]),_v(" "),_m(7),_v(" "),_m(8),_v(" "),_m(9),_v(" "),_m(10),_v(" "),_m(11),_v(" "),_m(12),_m(13),_v(" "),_m(14),_v(" "),_m(15),_v(" "),_m(16),_m(17),_v(" "),_m(18),_v(" "),_m(19),_v(" "),_m(20),_v(" "),_m(21),_v(" "),_m(22),_m(23),_v(" "),_m(24),_v(" "),_c('p',[_v("If you have a JavaScript object representing multiple attributes that looks like this:")]),_v(" "),_m(25),_v(" "),_m(26),_v(" "),_m(27),_v(" "),_m(28),_m(29),_v(" "),_c('p',[_v("So far we've only been binding to simple property keys in our templates. But Vue actually supports the full power of JavaScript expressions inside all data bindings:")]),_v(" "),_m(30),_c('p',[_v("These expressions will be evaluated as JavaScript in the data scope of the current component instance.")]),_v(" "),_c('p',[_v("In Vue templates, JavaScript expressions can be used in the following positions:")]),_v(" "),_m(31),_v(" "),_m(32),_v(" "),_m(33),_v(" "),_m(34),_v(" "),_m(35),_m(36),_v(" "),_c('p',[_v("It is possible to call a component-exposed method inside a binding expression:")]),_v(" "),_m(37),_m(38),_v(" "),_m(39),_v(" "),_m(40),_v(" "),_m(41),_v(" "),_m(42),_v(" "),_m(43),_v(" "),_m(44),_v(" "),_m(45),_m(46),_v(" "),_m(47),_v(" "),_m(48),_v(" "),_m(49),_m(50),_v(" "),_m(51),_v(" "),_m(52),_m(53),_v(" "),_m(54),_v(" "),_c('p',[_v("It is also possible to use a JavaScript expression in a directive argument by wrapping it with square brackets:")]),_v(" "),_m(55),_m(56),_v(" "),_c('p',[_v("Similarly, you can use dynamic arguments to bind a handler to a dynamic event name:")]),_v(" "),_m(57),_m(58),_v(" "),_m(59),_v(" "),_m(60),_v(" "),_m(61),_v(" "),_c('p',[_v("Dynamic argument expressions have some syntax constraints because certain characters, such as spaces and quotes, are invalid inside HTML attribute names. For example, the following is invalid:")]),_v(" "),_m(62),_m(63),_v(" "),_c('p',[_v("When using in-DOM templates (templates directly written in an HTML file), you should also avoid naming keys with uppercase characters, as browsers will coerce attribute names into lowercase:")]),_v(" "),_m(64),_m(65),_v(" "),_m(66),_v(" "),_m(67),_v(" "),_m(68),_m(69),_v(" "),_c('p',[_v("And finally, here's the full directive syntax visualized:")]),_v(" "),_m(70),_v(" "),_c('i',{staticClass:"fa fa-arrow-circle-up fa-lg d-print-none",attrs:{"id":"scroll-top-button","onclick":"handleScrollTop()","aria-hidden":"true"}})]),_v(" "),_c('overlay-source',{attrs:{"id":"page-nav","tag-name":"nav","to":"page-nav"}},[_c('div',{staticClass:"nav-component slim-scroll"})])],1),_v(" "),_m(71)])}
};
    var pageVueStaticRenderFns = [function anonymous(
) {
with(this){return _c('h1',{attrs:{"id":"template-syntax"}},[_c('span',{staticClass:"anchor",attrs:{"id":"template-syntax"}}),_v("Template Syntax"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#template-syntax","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"text-interpolation"}},[_c('span',{staticClass:"anchor",attrs:{"id":"text-interpolation"}}),_v("Text Interpolation"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#text-interpolation","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<span>Message: </span>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("The mustache tag will be replaced with the value of the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("msg")]),_v(" property from the corresponding component instance. It will also be updated whenever the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("msg")]),_v(" property changes.")])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"raw-html"}},[_c('span',{staticClass:"anchor",attrs:{"id":"raw-html"}}),_v("Raw HTML"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#raw-html","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("The double mustaches interpret the data as plain text, not HTML. In order to output real HTML, you will need to use the "),_c('a',{attrs:{"href":"https://vuejs.org/api/built-in-directives.html#v-html"}},[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-html")]),_v(" directive")]),_v(":")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<p>Using text interpolation: </p>\n")]),_c('span',[_v("<p>Using v-html directive: <span v-html=\"rawHtml\"></span></p>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("Here we're encountering something new. The "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-html")]),_v(" attribute you're seeing is called a "),_c('strong',[_v("directive")]),_v(". Directives are prefixed with "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-")]),_v(" to indicate that they are special attributes provided by Vue, and as you may have guessed, they apply special reactive behavior to the rendered DOM. Here, we're basically saying \"keep this element's inner HTML up-to-date with the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("rawHtml")]),_v(" property on the current active instance.\"")])}
},function anonymous(
) {
with(this){return _c('p',[_v("The contents of the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("span")]),_v(" will be replaced with the value of the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("rawHtml")]),_v(" property, interpreted as plain HTML - data bindings are ignored. Note that you cannot use "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-html")]),_v(" to compose template partials, because Vue is not a string-based templating engine. Instead, components are preferred as the fundamental unit for UI reuse and composition.")])}
},function anonymous(
) {
with(this){return _c('p',[_v(":::warning Security Warning\nDynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to "),_c('a',{attrs:{"href":"https://en.wikipedia.org/wiki/Cross-site_scripting"}},[_v("XSS vulnerabilities")]),_v(". Only use "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-html")]),_v(" on trusted content and "),_c('strong',[_v("never")]),_v(" on user-provided content.\n:::")])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"attribute-bindings"}},[_c('span',{staticClass:"anchor",attrs:{"id":"attribute-bindings"}}),_v("Attribute Bindings"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#attribute-bindings","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("Mustaches cannot be used inside HTML attributes. Instead, use a "),_c('a',{attrs:{"href":"https://vuejs.org/api/built-in-directives.html#v-bind"}},[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind")]),_v(" directive")]),_v(":")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<div v-bind:id=\"dynamicId\"></div>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("The "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind")]),_v(" directive instructs Vue to keep the element's "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("id")]),_v(" attribute in sync with the component's "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("dynamicId")]),_v(" property. If the bound value is "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("null")]),_v(" or "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("undefined")]),_v(", then the attribute will be removed from the rendered element.\n0")])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"shorthand"}},[_c('span',{staticClass:"anchor",attrs:{"id":"shorthand"}}),_v("Shorthand"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#shorthand","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("Because "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind")]),_v(" is so commonly used, it has a dedicated shorthand syntax:")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<div :id=\"dynamicId\"></div>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("Attributes that start with "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v(":")]),_v(" may look a bit different from normal HTML, but it is in fact a valid character for attribute names and all Vue-supported browsers can parse it correctly. In addition, they do not appear in the final rendered markup. The shorthand syntax is optional, but you will likely appreciate it when you learn more about its usage later.")])}
},function anonymous(
) {
with(this){return _c('blockquote',[_c('p',[_v("For the rest of the guide, we will be using the shorthand syntax in code examples, as that's the most common usage for Vue developers.")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"boolean-attributes"}},[_c('span',{staticClass:"anchor",attrs:{"id":"boolean-attributes"}}),_v("Boolean Attributes"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#boolean-attributes","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_c('a',{attrs:{"href":"https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes"}},[_v("Boolean attributes")]),_v(" are attributes that can indicate true / false values by their presence on an element. For example, "),_c('a',{attrs:{"href":"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled"}},[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("disabled")])]),_v(" is one of the most commonly used boolean attributes.")])}
},function anonymous(
) {
with(this){return _c('p',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind")]),_v(" works a bit differently in this case:")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<button :disabled=\"isButtonDisabled\">Button</button>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("The "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("disabled")]),_v(" attribute will be included if "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("isButtonDisabled")]),_v(" has a "),_c('a',{attrs:{"href":"https://developer.mozilla.org/en-US/docs/Glossary/Truthy"}},[_v("truthy value")]),_v(". It will also be included if the value is an empty string, maintaining consistency with "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("<button disabled=\"\">")]),_v(". For other "),_c('a',{attrs:{"href":"https://developer.mozilla.org/en-US/docs/Glossary/Falsy"}},[_v("falsy values")]),_v(" the attribute will be omitted.")])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"dynamically-binding-multiple-attributes"}},[_c('span',{staticClass:"anchor",attrs:{"id":"dynamically-binding-multiple-attributes"}}),_v("Dynamically Binding Multiple Attributes"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#dynamically-binding-multiple-attributes","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('div',{staticClass:"composition-api"},[_c('pre',[_c('code',{pre:true,attrs:{"class":"hljs js"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" objectOfAttrs = {\n")]),_c('span',[_v("  "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("id")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("'container'")]),_v(",\n")]),_c('span',[_v("  "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("class")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("'wrapper'")]),_v("\n")]),_c('span',[_v("}\n")])])])])}
},function anonymous(
) {
with(this){return _c('div',{staticClass:"options-api"},[_c('pre',[_c('code',{pre:true,attrs:{"class":"hljs js"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_c('span',{pre:true,attrs:{"class":"hljs-title"}},[_v("data")]),_v("("),_c('span',{pre:true,attrs:{"class":"hljs-params"}}),_v(")")]),_v(" {\n")]),_c('span',[_v("  "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("return")]),_v(" {\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("objectOfAttrs")]),_v(": {\n")]),_c('span',[_v("      "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("id")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("'container'")]),_v(",\n")]),_c('span',[_v("      "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("class")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("'wrapper'")]),_v("\n")]),_c('span',[_v("    }\n")]),_c('span',[_v("  }\n")]),_c('span',[_v("}\n")])])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("You can bind them to a single element by using "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind")]),_v(" without an argument:")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<div v-bind=\"objectOfAttrs\"></div>\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"using-javascript-expressions"}},[_c('span',{staticClass:"anchor",attrs:{"id":"using-javascript-expressions"}}),_v("Using JavaScript Expressions"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#using-javascript-expressions","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("{{ number + 1 }}\n")]),_c('span',[_v("\n")]),_c('span',[_v("{{ ok ? 'YES' : 'NO' }}\n")]),_c('span',[_v("\n")]),_c('span',[_v("{{ message.split('').reverse().join('') }}\n")]),_c('span',[_v("\n")]),_c('span',[_v("<div :id=\"list-${id}\"></div>\n")])])])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Inside text interpolations (mustaches)")]),_v(" "),_c('li',[_v("In the attribute value of any Vue directives (special attributes that start with "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-")]),_v(")")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"expressions-only"}},[_c('span',{staticClass:"anchor",attrs:{"id":"expressions-only"}}),_v("Expressions Only"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#expressions-only","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("Each binding can only contain "),_c('strong',[_v("one single expression")]),_v(". An expression is a piece of code that can be evaluated to a value. A simple check is whether it can be used after "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("return")]),_v(".")])}
},function anonymous(
) {
with(this){return _c('p',[_v("Therefore, the following will "),_c('strong',[_v("NOT")]),_v(" work:")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<!-- this is a statement, not an expression: -->\n")]),_c('span',[_v("{{ var a = 1 }}\n")]),_c('span',[_v("\n")]),_c('span',[_v("<!-- flow control won't work either, use ternary expressions -->\n")]),_c('span',[_v("{{ if (ok) { return message } }}\n")])])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"calling-functions"}},[_c('span',{staticClass:"anchor",attrs:{"id":"calling-functions"}}),_v("Calling Functions"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#calling-functions","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<span :title=\"toTitleDate(date)\">\n")]),_c('span',[_v("  {{ formatDate(date) }}\n")]),_c('span',[_v("</span>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v(":::tip\nFunctions called inside binding expressions will be called every time the component updates, so they should "),_c('strong',[_v("not")]),_v(" have any side effects, such as changing data or triggering asynchronous operations.\n:::")])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"restricted-globals-access"}},[_c('span',{staticClass:"anchor",attrs:{"id":"restricted-globals-access"}}),_v("Restricted Globals Access"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#restricted-globals-access","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("Template expressions are sandboxed and only have access to a "),_c('a',{attrs:{"href":"https://github.com/vuejs/core/blob/main/packages/shared/src/globalsWhitelist.ts#L3"}},[_v("restricted list of globals")]),_v(". The list exposes commonly used built-in globals such as "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("Math")]),_v(" and "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("Date")]),_v(".")])}
},function anonymous(
) {
with(this){return _c('p',[_v("Globals not explicitly included in the list, for example user-attached properties on "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("window")]),_v(", will not be accessible in template expressions. You can, however, explicitly define additional globals for all Vue expressions by adding them to "),_c('a',{attrs:{"href":"https://vuejs.org/api/application.html#app-config-globalproperties"}},[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("app.config.globalProperties")])]),_v(".")])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"directives"}},[_c('span',{staticClass:"anchor",attrs:{"id":"directives"}}),_v("Directives"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#directives","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("Directives are special attributes with the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-")]),_v(" prefix. Vue provides a number of "),_c('a',{attrs:{"href":"https://vuejs.org/api/built-in-directives.html"}},[_v("built-in directives")]),_v(", including "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-html")]),_v(" and "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind")]),_v(" which we have introduced above.")])}
},function anonymous(
) {
with(this){return _c('p',[_v("Directive attribute values are expected to be single JavaScript expressions (with the exception of "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-for")]),_v(", "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-on")]),_v(" and "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-slot")]),_v(", which will be discussed in their respective sections later). A directive's job is to reactively apply updates to the DOM when the value of its expression changes. Take "),_c('a',{attrs:{"href":"https://vuejs.org/api/built-in-directives.html#v-if"}},[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-if")])]),_v(" as an example:")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<p v-if=\"seen\">Now you see me</p>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("Here, the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-if")]),_v(" directive would remove / insert the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("<p>")]),_v(" element based on the truthiness of the value of the expression "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("seen")]),_v(".")])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"arguments"}},[_c('span',{staticClass:"anchor",attrs:{"id":"arguments"}}),_v("Arguments"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#arguments","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("Some directives can take an \"argument\", denoted by a colon after the directive name. For example, the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind")]),_v(" directive is used to reactively update an HTML attribute:")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<a v-bind:href=\"url\"> ... </a>\n")]),_c('span',[_v("\n")]),_c('span',[_v("<!-- shorthand -->\n")]),_c('span',[_v("<a :href=\"url\"> ... </a>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("Here, "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("href")]),_v(" is the argument, which tells the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind")]),_v(" directive to bind the element's "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("href")]),_v(" attribute to the value of the expression "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("url")]),_v(". In the shorthand, everything before the argument (i.e., "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind:")]),_v(") is condensed into a single character, "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v(":")]),_v(".")])}
},function anonymous(
) {
with(this){return _c('p',[_v("Another example is the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-on")]),_v(" directive, which listens to DOM events:")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<a v-on:click=\"doSomething\"> ... </a>\n")]),_c('span',[_v("\n")]),_c('span',[_v("<!-- shorthand -->\n")]),_c('span',[_v("<a @click=\"doSomething\"> ... </a>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("Here, the argument is the event name to listen to: "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("click")]),_v(". "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-on")]),_v(" has a corresponding shorthand, namely the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("@")]),_v(" character. We will talk about event handling in more detail too.")])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"dynamic-arguments"}},[_c('span',{staticClass:"anchor",attrs:{"id":"dynamic-arguments"}}),_v("Dynamic Arguments"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#dynamic-arguments","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<!--\n")]),_c('span',[_v("Note that there are some constraints to the argument expression,\n")]),_c('span',[_v("as explained in the \"Dynamic Argument Value Constraints\" and \"Dynamic Argument Syntax Constraints\" sections below.\n")]),_c('span',[_v("-->\n")]),_c('span',[_v("<a v-bind:[attributeName]=\"url\"> ... </a>\n")]),_c('span',[_v("\n")]),_c('span',[_v("<!-- shorthand -->\n")]),_c('span',[_v("<a :[attributeName]=\"url\"> ... </a>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("Here, "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("attributeName")]),_v(" will be dynamically evaluated as a JavaScript expression, and its evaluated value will be used as the final value for the argument. For example, if your component instance has a data property, "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("attributeName")]),_v(", whose value is "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("\"href\"")]),_v(", then this binding will be equivalent to "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-bind:href")]),_v(".")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<a v-on:[eventName]=\"doSomething\"> ... </a>\n")]),_c('span',[_v("\n")]),_c('span',[_v("<!-- shorthand -->\n")]),_c('span',[_v("<a @[eventName]=\"doSomething\">\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("In this example, when "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("eventName")]),_v("'s value is "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("\"focus\"")]),_v(", "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-on:[eventName]")]),_v(" will be equivalent to "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-on:focus")]),_v(".")])}
},function anonymous(
) {
with(this){return _c('h4',{attrs:{"id":"dynamic-argument-value-constraints"}},[_c('span',{staticClass:"anchor",attrs:{"id":"dynamic-argument-value-constraints"}}),_v("Dynamic Argument Value Constraints"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#dynamic-argument-value-constraints","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("Dynamic arguments are expected to evaluate to a string, with the exception of "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("null")]),_v(". The special value "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("null")]),_v(" can be used to explicitly remove the binding. Any other non-string value will trigger a warning.")])}
},function anonymous(
) {
with(this){return _c('h4',{attrs:{"id":"dynamic-argument-syntax-constraints"}},[_c('span',{staticClass:"anchor",attrs:{"id":"dynamic-argument-syntax-constraints"}}),_v("Dynamic Argument Syntax Constraints"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#dynamic-argument-syntax-constraints","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<!-- This will trigger a compiler warning. -->\n")]),_c('span',[_v("<a :['foo' + bar]=\"value\"> ... </a>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("If you need to pass a complex dynamic argument, it's probably better to use a "),_c('a',{attrs:{"href":"/docs/essentials/computed.html"}},[_v("computed property")]),_v(", which we will cover shortly.")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<a :[someAttr]=\"value\"> ... </a>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("The above will be converted to "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v(":[someattr]")]),_v(" in in-DOM templates. If your component has a "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("someAttr")]),_v(" property instead of "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("someattr")]),_v(", your code won't work. Templates inside Single-File Components are "),_c('strong',[_v("not")]),_v(" subject to this constraint.")])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"modifiers"}},[_c('span',{staticClass:"anchor",attrs:{"id":"modifiers"}}),_v("Modifiers"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#modifiers","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_v("Modifiers are special postfixes denoted by a dot, which indicate that a directive should be bound in some special way. For example, the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v(".prevent")]),_v(" modifier tells the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-on")]),_v(" directive to call "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("event.preventDefault()")]),_v(" on the triggered event:")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("<form @submit.prevent=\"onSubmit\">...</form>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_v("You'll see other examples of modifiers later, "),_c('a',{attrs:{"href":"/docs/essentials/event-handling.html#event-modifiers"}},[_v("for "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-on")])]),_v(" and "),_c('a',{attrs:{"href":"/docs/essentials/forms.html#modifiers"}},[_v("for "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("v-model")])]),_v(", when we explore those features.")])}
},function anonymous(
) {
with(this){return _c('p',[_c('a',{attrs:{"href":"/docs/essentials/images/directive.png","target":"_self"}},[_c('img',{staticClass:"img-fluid",attrs:{"src":"/docs/essentials/images/directive.png","alt":"directive syntax graph"}})])])}
},function anonymous(
) {
with(this){return _c('footer',[_c('div',{staticClass:"text-center"},[_c('small',[_v("[Generated by "),_c('a',{attrs:{"href":"https://markbind.org/"}},[_v("MarkBind 4.0.2")]),_v("]")])])])}
}];
  