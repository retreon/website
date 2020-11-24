---
title: Advanced Usage
---
Retreon offers an escape hatch for situations where `createAction(...)` just doesn't cut it. You should use this sparingly, not because it's bad, but because it takes you off the beaten path.

Retreon is powered by async generator functions. Every `yield` statement is a dispatch, and the return of `yield` is whatever dispatch returned. In practice, this gives you the full power of [redux-thunk](https://github.com/reduxjs/redux-thunk/) while leveraging the expressiveness of modern JavaScript.

```ts
async function* sequence() {
  yield { type: 'first-action' }
  await someEffect()
  yield { type: 'second-action' }

  return 'result'
}

store.dispatch(sequence()) // Promise { "result" }
```

These are just a few things that async generator functions can do:

- Consume streams or observables into a sequence of dispatches.
- Conditionally quit without dispatching an action.
- Run code _after_ a dispatch.
- Provide progress updates on long-running tasks.

Further, because the result of `dispatch(...)` is returned to `yield`, you can infinitely extend this pattern through redux middleware. How about a special `yield` value that returns redux state? Surprisingly easy:

```ts
// Redux middleware
export const GET_STATE = Symbol('middleware:GET_STATE')

export const middleware = store => next => action => {
  return action === GET_STATE ? store.getState() : next(action)
}
```

```ts
// Actions file
import { GET_STATE } from './middleware'

async function* selectState() {
  const reduxState = yield GET_STATE
}
```

As you can see, generators offer a lot of power. Be careful not to overuse it.

## Action Factories
The first problem you might encounter with async generators is what to dispatch. We've never shown how to create an `"optimistic"` action outside the framework, nor does retreon want to expose those details. Not yet, at least.

The next problem is listening for actions. What do you pass to `handleAction(...)`? The generator? How would it know the action type?

Action factories address both of those problems. It provides a small interface for creating action objects (error, success, optimistic) without needing to know the structure, and you can use it as a handle for `createReducer(...)` while preserving type safety.

You'll use `createAction.factory(...)` to instantiate a handle:

```ts
// Please don't actually call this "factory". Name it by what it does.
export const factory = createAction.factory('action-type')
```

From there, you can dispatch errors, optimistic actions, and success events.

```ts
async function* allActions() {
  yield factory.optimistic('optimistic payload')
  yield factory.success('success payload')
  yield factory.failure(new Error('Something went wrong'))
}
```

Then pass the same handle to the reducer.

```ts
createReducer(initialState, (handleAction) => [
  handleAction.optimistic(factory, () => {}),
  handleAction.error(factory, () => {}),
  handleAction(factory, () => {}),
])
```

**Note for TypeScript**: Define generics to allow optimistic and success payloads. The payload parameters are disabled by default.

```ts
createAction.factory<SuccessPayload, OptimisticPayload>('action-type')
```

### Ordering Rules
To preserve the sanity of your fellow developers, please observe the rules for actions:

- Dispatch EITHER an error OR a success event (never both).
- NEVER dispatch an error twice for the same action.
- NEVER dispatch a success event twice for the same action.
- Optimistic updates must ALWAYS precede success/error events.

If you must dispatch multiple actions of the same type (e.g. in a stream), use "optimistic".
