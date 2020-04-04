# Reactivity in Depth

Now it’s time to take a deep dive! One of Vue’s most distinct features is the unobtrusive reactivity system. Models are proxied JavaScript objects. When you modify them, the view updates. It makes state management simple and intuitive, but it’s also important to understand how it works to avoid some common gotchas. In this section, we are going to dig into some of the lower-level details of Vue’s reactivity system.

## What is Reactivity?

This term comes up in programming quite a bit these days! But what do people mean when they say it? Well, reactivity is a programming paradigm that allows us to adjust to changes in a declarative manner. The canonical example that people usually show, because it’s a great one, is an excel spreadsheet.

[//]: # 'TODO: add in sheets example'

If you put the number two in the first cel, and the number 3 in the second and asked for the SUM, the spreadsheet would give it to you. No surprises there. But if you update that first number, the SUM automagically updates too!

JavaScript doesn’t usually work like this-- If we were to write something comparable in JavaScript:

```js
var val1 = 2
var val2 = 3
var sum = val1 + val2

//sum
// 5

val1 = 3

//sum
//5
```

If we update the first value, the sum is not adjusted.

So how would we do this in JavaScript?

- Detect when there’s a change in one of the values
- Track the function that changes it
- Trigger the function so it can update the final value
