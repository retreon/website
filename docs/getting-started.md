---
title: Getting Started
slug: /
---

Redux is a phenomenally powerful tool, and it can be a true joy to work with. But it takes time to find good tooling and develop healthy patterns.

Retreon aims to provide good patterns and strong types out of the box, including tools for async actions and error handling. Retreon is [FSA compliant](https://github.com/redux-utilities/flux-standard-action#readme).

Here's a taste:

```ts
// actions.ts
const changeTheme = createAction('change-theme', (theme: Theme) => {
  localStorage.setItem('theme-preference', theme);
  return theme
})
```

```ts
// reducer.ts
const reducer = createReducer({ theme: 'light' }, handleAction => [
  handleAction(changeTheme, (state, theme) => {
    state.theme = theme
  }),
])
```

If you prefer to learn by example, take a gander at [the examples directory](https://github.com/retreon/retreon/tree/master/examples), or check out [TodoMVC](https://github.com/retreon/todomvc/) to see a functioning application.

Be aware that retreon is designed for TypeScript, and while it works fine in vanilla JS, you lose a lot of value. All the examples are written assuming you're using TypeScript.

## Installation
Retreon can be installed through npm.

```bash
# NPM
npm install retreon

# Yarn
yarn add retreon
```

Retreon depends on middleware to implement async actions and error handling. Once it's installed, register it with your redux store:

```ts
// Wherever you create your redux store...
import { middleware } from 'retreon'

createStore(reducer, applyMiddleware(middleware))
```
