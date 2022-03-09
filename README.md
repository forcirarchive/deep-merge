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

## Highlights

- Strongly tested with 100% coverage (statements, branches, functions AND LOC).
- Type safe input, type safe returns
-

## FAQs & Notable Details

A very fair first question you might have is _why_. The answer is somewhat organization-specific, but this code also has a change to benefit the TS/JS ecosystem more broadly, so we've chosen to open-source it in hopes that it solves the exact problem for others that we were facing.

- Does not rely upon `lodash` (this library is the functional equivalent of `_.defaultsDeep`) and therefore does not rely upon the use of `eval` making this library compliant with some more defacto-standards like the [Vercel Edge Runtime](https://vercel.com/docs/concepts/functions/edge-functions#unsupported-apis)
