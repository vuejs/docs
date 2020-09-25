---
title: v-if vs. v-for Precedence
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## Overview

- **BREAKING**: If used on the same element, `v-if` will have higher precedence than `v-for`

## Introduction

Two of the most commonly used directives in Vue.js are `v-if` and `v-for`. So it's no surprise that there comes a time when developers want to use both together. While this is not a recommended practice, there may be times when this is necessary, so we wanted to provide guidance for how it works.

## 2.x Syntax

In 2.x, when using `v-if` and `v-for` on the same element, `v-for` would take precedence.

## 3.x Syntax

In 3.x, `v-if` will always have the higher precedence than `v-for`.

## Migration Strategy

It is recommended to avoid using both on the same element due to the syntax ambiguity.

Rather than managing this at the template level, one method for accomplishing this is to create a computed property that filters out a list for the visible elements.
