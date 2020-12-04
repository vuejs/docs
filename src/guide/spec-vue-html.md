# VueHTML Language Specification

## Overview

The VueHTML Language is a domain specific language built by extending [HTML5](https://html.spec.whatwg.org/) for declaratively defining render logic of Vue components.

## Scope

_This section is non-normative._

This specification is limited to defining the VueHTML DSL by inheriting everything from [HTML5 specification](https://html.spec.whatwg.org/) unless explicitly defined. 

## Terms and definitions

For the purposes of this document, the following terms and definitions apply.

## The elements of VueHTML

VueHTML includes all elements defined by [HTML5](https://html.spec.whatwg.org/#toc-semantics) with following additions or exceptions.

### The DOCTYPE

A **DOCTYPE** is not required.

If DOCTYPE is present, it should be parsed as comment using the [bogus comment state specification](https://html.spec.whatwg.org/#bogus-comment-state).

### The slot element

> TODO

### The template element

> TODO

### The component element

> TODO

## Directives

> TODO

## Parsing VueHTML documents

> TODO: Extend https://html.spec.whatwg.org/#parsing specification to add directive and component parsing.
