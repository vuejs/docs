# Vue Single File Component Language Specification

## Overview

> TODO: Write a non-normative overview of SFC.

## Scope

_This section is non-normative._

This specification is limited to providing a markup language to collocate multiple languages used for defining Vue components.

## Terms and definitions

For the purposes of this document, the following terms and definitions apply.

### SFC

An HTML like text file with `.vue` extension. SFC stands for Single File Component.

### Block

Top level elements in an SFC.

### Language Region

Programming language of inner text of a block. There are three pre-defined language regions: `<script>` block defaults to **JavaScript**, `<template>` block defaults to **VueHTML**, and `<style>` block defaults to `CSS`. Language region can be overridden using `lang` attribute on the block tags. e.g. `<script lang="ts">` is a **TypeScript** language region.

## The blocks of SFC

At least one `<script>` or `<template>` block MUST exist.

### The script block

The `<script>` block defines the ES module exported from an SFC. An SFC can have at most two `<script>` blocks: `<script>` and `<script setup>`.

#### Attributes

##### lang

overrides the language region of the block. Default language region of `<script>` block is **JavaScript**. 

Allowed values: `js`, `ts`, or any other programming language file extension.
##### src

relative path of an external file to be used as contents of `<script>` block.

Allowed values: a relative TypeScript or JavaScript file path. 

_The `src` is disallowed when using `<script setup>`._

##### setup

sets `<script>` block in Vue composition API mode which allows concise JavaScript/TypeScript syntax and reactive variable declaration.
            
Allowed values: none (e.g. `<script setup>`), arguments of generated `setup()` function (e.g. `<script setup="props">` or `<script setup="props, { slots }">`)

#### Options API mode

Only one `<script>` block is allowed. 

The `<script>` block acts as a normal JavaScript/TypeScript file, used to define component options as per Vue options API. The `<script>` block MUST have a default export.

#### Composition API mode

An optional `<script>` block and a `<script setup>` block is allowed. 

The `<script setup>` block acts is compiler enhanced JavaScript/TypeScript which defines `setup()` function of Vue composition API.

The `<script>` block (when included with `<script setup>`) defines module scope script.

### The template block

The `<template>` block defines the view rendered by the SFC. At most one `<template>` block is allowed.

#### Attributes

##### lang

overrides the language region of the block. Default language region of `<template>` block is **VueHTML**, a DSL defined by [VueHTML Language Specification](#file-vue-html-md)

Allowed values: `vue-html`, `pug` or any other markup language.

##### functional

**(deprecated)** sets Vue compiler to generate functional component.

##### src

relative path of an external file to be used as contents of `<template>` block.

Allowed values: a relative VueHTML file path. 

### The style block

The `<style>` block defines the stylesheets used by the SFC. Any number of `<style>` blocks can be defined in SFC.

#### Attributes

##### lang

overrides the language region of the block. Default language region of `<style>` block is **CSS**.

Allowed values: `css`, `scss`, `sass`, `styl`, `stylus`, `less`, `postcss` or any other style language.

##### scoped

sets Vue compiler to generate component scoped stylesheet using scope identifier attribute.

Allowed values: none.

_The `scoped` attribute is disallowed when using `<style module>`._

##### module

sets Vue compiler to generate component scoped stylesheet using CSS modules. The module names are provided as `$style` variable in `<script>` and `<template>` blocks. The `$style` variable can be overridden by providing a custom name, e.g., `<style module="CSS">`.

Allowed values: none, or a valid JavaScript identifier.

_The `module` attribute is disallowed when using `<style scoped>`._

##### src

relative path of an external file to be used as contents of `<style>` block.

Allowed values: a relative CSS or any other style language file path. 

## Extensibility

_This section is non-normative._

SFC defines three standard block elements: `<template>`, `<script>`, and `<style>`. But the spec allows other custom block elements.

Known non-standard blocks:

1. `<docs>` — Language Region: `markdown`
1. `<i18n>` - Language Region: `json`, Used by: [vue-i18n](https://kazupon.github.io/vue-i18n)
1. `<page-query>` - Language Region: `graphql`, Used by: [Gridsome](https://gridsome.org/docs/querying-data)
1. `<preview>` - Language Region: `vue-html`, Used by: [Preview](https://github.com/znck/preview)
