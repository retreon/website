---
id: creating-reducers
title: Creating Reducers
---
:::caution
This section assumes you know [how to create actions](creating-actions).
:::

Retreon's `createReducer(...)` export is the counterpart to `createAction(...)`. It takes an initial state and a list of action handlers. We'll see how to define those in a moment.

```ts
const reducer = createReducer(initialState, (handleAction) => [
  // Action handlers go here
])
```

I'm sure you can guess at the first parameter, it just describes the reducer's initial state. The second parameter is where all the magic happens. It describes how that initial state changes over time by subscribing to a list of events (actions) and updating the model in response (reducers).

You can subscribe to actions with the `handleAction(...)` callback. It ties a reducer to an action creator, so whenever that action gets dispatched, your handler is invoked. Any state changes in the handler are immediately applied.

```ts
// Create a counter reducer with a starting value of zero.
createReducer(0, (handleAction) => [
  // Increase by 1 whenever the `increment()` action is dispatched.
  handleAction(increment, (state) => {
    return state + 1
  }),
])
```

The above example only changes state, but it also receives an action `payload`. You may be used to receiving the entire action when writing reducers - be aware the only the payload is provided. This is quite intentional. Your reducer should never depend on `action.meta` (that's the realm of middleware) and the action type is implied. What remains is the payload.

```ts
createReducer(0, (handleAction) => [
  handleAction(incrementBy, (state, quantity) => {
    return state + quantity
  }),
])
```

## Updating State
Immutably updating state has historically been quite difficult, inefficient, and error prone. You end up making more changes than you intended, you may accidentally mutate state, and many libraries are obtusely verbose.

[Immer](https://github.com/immerjs/immer/) makes state changes far more robust (and type safe!) by modeling changes as mutations on draft states. The library has quickly gained widespread adoption and official support by the Redux team. If you're unfamiliar with immer, take a moment to check it out.

Retreon automatically wraps all your reducers with immer. It's safe and encouraged to use mutation syntax.

```ts
createReducer({ count: 0 }, (handleAction) => [
  handleAction(increment, (state) => {
    state.count += 1 // Thanks to immer, all mutation is safe.
  }),
])
```

It may look jarring, but you'll get used to it very quickly.

## Error Handling
If your action creator throws an error, retreon will dispatch an error action. You can listen for error events with `handleAction.error(...)`.

Say you've got an action creator that loads the user's theme preference, light or dark, but you want to handle the case where storage is unavailable. If the action succeeds, you get a theme. If it fails for any reason, you want to gracefully fall back to some default. You would use `handleAction(...)` to successfully set a theme, and `handleAction.error(...)` to use the fallback.

```ts
createReducer({ theme: null }, (handleAction) => [
  handleAction(loadTheme, (state, theme) => {
    state.theme = theme // Success!
  }),

  handleAction.error(loadTheme, (state) => {
    post.theme = DEFAULT_THEME // Failure. Use a fallback.
  }),
])
```

All errors are reported. If the action creator fails for any reason, your error reducer will be notified.

### Error Types
If you're using TypeScript, you may notice that error payloads are always marked `unknown`. That's because `throw` types are inherently unknown - anything can go wrong.

```ts
createReducer(initialState, (handleAction) => [
  handleAction.error(fallibleAction, (state, error) => {
    //                                       ^^^^^ unknown type
  }),
])
```

If you're anticipating a specific error, then use (or create) a custom error class.

```ts
class MyCustomError extends Error {}

createReducer(initialState, (handleAction) => [
  handleAction.error(startRecording, (state, error) => {
    if (error instanceof MyCustomError) {
      // <your logic here>
    }
  }),
])
```

Custom errors are unusual in web development, but that's unfortunate. You can only win by having more descriptive errors. This works particularly well with TypeScript because after the `instanceof` guard, you can safely access any custom fields on the error class. Use this to send arbitrary data to the error handler.
