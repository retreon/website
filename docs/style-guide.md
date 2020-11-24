---
id: style-guide
title: Style Guide
---
This is a collection of best practices when using Retreon. They aren't required, but highly recommended.

First, check out [the official Redux guidelines](https://redux.js.org/style-guide/style-guide). Their documentation is excellent and retreon has no reason to duplicate it.

The best practices in this page are meant to extend and complement their suggestions.

## Separate Your Effects
Keep actions, reducers, and effects in separate files.

```
src
├── actions
├── reducers
└── effects
```

Why? Simply because effects can be composed to create richer effects, but you can't do the same with actions. Actions are tightly coupled with redux and `dispatch` (that is their purpose after all), so if you try to use one action within another, you're fighting uphill to re-implement middleware without the tools to do it right.

No. `createAction(...)` should be used as an extremely thin layer over business logic binding it to redux.

Putting effects in their own file encourages natural composition of business logic and keeps effects blissfully ignorant of the redux world outside. In practice, the overhead of a new file is outweighed by the ease of testing effects in isolation, and without any IO, there's nothing left to test in the actions folder.

## Organize by Feature
Organize your effects according to the feature they implement. They don't need to map 1:1 to your action files, just organize them as it makes sense. Pretend you're writing tiny libraries, and each library has its own file.

Reducers should be named after the state they manage. If the reducer is responsible for `state.articles`, it should probably be named `reducers/articles`.

Actions don't have solid rules. Name it as it makes sense. Typically this ends up mirroring the structure of `reducers/`, but just remember that a single action can be handled by multiple reducers, there's no 1:1 mapping. It's okay to have an actions file without a similarly named reducer file.

## Use Consistent Action Types
Action types should be named after the file + the name of the action, expressed in [kebab-case](https://en.wiktionary.org/wiki/kebab_case).

Here's how it might look in a file named `actions/tasks`:
```ts
// actions/tasks.ts
export const rename = createAction('tasks/rename', effects.rename)
export const remove = createAction('tasks/remove', effects.remove)
export const markComplete = createAction('tasks/mark-complete', effects.markComplete)
```

The file `<prefix>/` helps prevent naming collisions across files. Some would recommend using `SHOUTY_SNAKE_CASE` for the action title, although retreon suggests just keeping it consistent. Use kebab-case.

:::info
The documentation rarely uses this pattern in a frugal effort to save screen space and to spare the reader from extraneous context. It is still recommended.
:::
