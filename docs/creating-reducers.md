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
