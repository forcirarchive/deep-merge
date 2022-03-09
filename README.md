<p align="center"></p>
<div align="center">
  <a href="https://www.forcir.com/#gh-light-mode-only" target="_blank">
    <img src="https://cdn.forcir.com/logos/slate.svg" alt="Forcir Logo" height="30">
  </a>
  <a href="https://www.forcir.com/#gh-dark-mode-only" target="_blank">
    <img src="https://cdn.forcir.com/logos/common.svg" alt="Forcir Logo" height="30">
  </a>
</div>
<p align="center"><strong>Strongly-typed deep & recursive object merging</strong></p>

<p align="center">
  <a href="https://github.com/forcir/deep-merge/actions/workflows/ci.yml">
    <img src="https://github.com/forcir/deep-merge/actions/workflows/ci.yml/badge.svg" alt="Continuous Integration">
  </a>
</p>

## Install

> Forcir's internal coding standards require version clamping so we've included an `--exact` flag. For your convenience we've placed that flag at the end so you can optionally omit copying it.

```
yarn add @forcir/deep-merge --exact
```

## Usage

```ts
import { merge } from '@forcir/deep-merge';

const defaults = {
  foo: false,
  bar: false,
  baz: {
    collection: [1, 2],
  },
};

const overrides = {
  bar: true,
  baz: {
    collection: [3, 4],
  },
};

const merged = merge(defaults, overrides);
console.log(merged);

// {
//   foo: false,
//   bar: true,
//   baz: {
//     collection: [1, 2, 3, 4],
//   },
// };
```

## Highlights, FAQs & Notable Details

A very fair first question you might have is _why_. The answer is somewhat organization-specific, but this code also has a change to benefit the TS/JS ecosystem more broadly, so we've chosen to open-source it in hopes that it solves the exact problem for others that we were facing.

This library exports a `merge` function that is the functional equivalent of the lodash `_.defaultsDeep` method. **However**, this library does not rely upon the use of `eval` which makes this library compliant with some defacto runtime standards like the [Vercel Edge Runtime](https://vercel.com/docs/concepts/functions/edge-functions#unsupported-apis).

There are also a few notable details that push this library beyond other options published to NPM:

- Written in TypeScript
- Strongly Typed input and output
- Client-side validated to throw errors if unsafe (modified) objects are provided
- Strongly tested against all primitive types, object-like or manipulated plain objects.
