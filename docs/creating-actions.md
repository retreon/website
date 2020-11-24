---
title: Creating Actions
---

Action creators are defined ahead of time and passed around as functions. The simplest action has only a type:

```ts
const increment = createAction('increment')

store.dispatch(increment())
// Dispatches { type: 'increment' }
```

The format may feel familiar. Many redux tools use this pattern, namely [redux-actions](https://github.com/redux-utilities/redux-actions), which had a strong influence on retreon.

Now, plain actions have limited usefulness. Actions typically send more data into the reducer. We do this through `action.payload` which can contain arbitrary data.

```ts
const incrementBy = createAction<number>('increment-by')

store.dispatch(incrementBy(15))
// Dispatches {
//   type: 'increment-by',
//   payload: 15,
// }
```

The action payload is whatever parameter you pass (`15`), and the type of the payload is declared using a generic (`<number>`).

TypeScript **will not** let you pass a payload without defining the type.

## Side Effects
Side effects belong with action creators. Associating an effect with an action means it automatically generates [an audit log](https://github.com/LogRocket/redux-logger), [simplifies bug reproduction](https://github.com/vidit-sh/redux-sentry-middleware), and helps keep view state synchronized with redux.

Wrap an effect with an action creator by passing it to `createAction(...)`:

```ts
createAction('change-theme', (theme: 'light' | 'dark') => {
  // This runs when the action is dispatched.
  localStorage.setItem('theme', theme)

  return theme
})
```

Whatever the effect returns becomes the action payload.

## Async Actions
If your side effect returns a promise everything works exactly the same, except you would use `createAction.async(...)` instead.

```ts
createAction.async('fetch-user', (userId: string) => {
  const response = await fetch(`/users/${userId}/`)
  const user: User = await response.json()

  return user
})
```

Marking it `async` has several advantages. You get optimistic reducer updates and rejection error handling out of the box.

## Error Management
What happens if the side effect goes wrong? Just throw an error. Retreon detects thrown exceptions and automatically dispatches an update to redux.

Say you're trying to access a key in `localStorage`, but the client's browser rejects access as part of their security policy.

```ts
createAction('save-preferences', (prefs: Preferences) => {
  localStorage.setItem('preferences', JSON.stringify(prefs))
//^^^^^^^^^^^^ DOMException: The operation is insecure.
})
```

If the action creator throws an exception, retreon will take notice and dispatch a corresponding error action, giving reducers a chance to cleanly recover.

```ts
store.dispatch(savePreferences(prefs))
// Dispatches {
//   type: 'save-preferences',
//   error: true,
//   payload: DOMException,
// }
```

Note that retreon doesn't swallow errors - you'll still see the exception in your console.

## Iterators as Action Creators
If you've played around with retreon, you might've noticed that all the action creators return [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator). That's why retreon requires middleware. It enables some powerful patterns, including the basis for error handling and the multiple dispatch of async actions.

It can also make testing slightly more cumbersome. It's recommended to test your actions and reducers against a real redux store, using the real middleware. Only your effects should be mocked.

<!-- TODO: Link to testing conventions. Not yet written. -->

Generators as action creators are a powerful and advanced pattern. Unless you're doing something very unusual, you probably won't need it.
