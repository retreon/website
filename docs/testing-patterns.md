---
id: testing-patterns
title: Testing Patterns
---
:::info
Unit testing patterns are still in flux. This is all subject to change.
:::

Retreon recommends testing your actions and reducers against a real redux store. Create a new store each test, run your actions, then assert on the new state.

This works particularly well when you [separate effects from actions](/style-guide#separate-your-effects), and then you can mock the IO boundary and simulate different scenarios.

```ts
jest.mock('../effects')

test('fetch user details', async () => {
  effects.fetchUserDetails.mockResolvedValue({ user })

  await store.dispatch(actions.fetchUserDetails(user.id))
  expect(store.getState()).toMatchObject({
    users: { [user.id]: user },
  })
})

test('fetch user details with error notice on request failure', async () => {
  effects.fetchUserDetails.mockRejectedValue(new Error('Request failed.'))

  await store.dispatch(actions.fetchUserDetails(user.id))
  expect(store.getState()).toMatchObject({
    loadingState: 'error',
  })
})
```
