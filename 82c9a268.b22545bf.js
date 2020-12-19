(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{72:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return o})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(7),c=(n(0),n(104)),s={title:"Creating Actions"},i={unversionedId:"creating-actions",id:"creating-actions",isDocsHomePage:!1,title:"Creating Actions",description:"Action creators are defined ahead of time and passed around as functions. The simplest action has only a type:",source:"@site/docs/creating-actions.md",slug:"/creating-actions",permalink:"/creating-actions",editUrl:"https://github.com/retreon/website/edit/main/docs/creating-actions.md",version:"current",sidebar:"someSidebar",previous:{title:"Getting Started",permalink:"/"},next:{title:"Creating Reducers",permalink:"/creating-reducers"}},o=[{value:"Side Effects",id:"side-effects",children:[]},{value:"Async Actions",id:"async-actions",children:[]},{value:"Error Management",id:"error-management",children:[]},{value:"Iterators as Action Creators",id:"iterators-as-action-creators",children:[]}],l={rightToc:o};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Action creators are defined ahead of time and passed around as functions. The simplest action has only a type:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"const increment = createAction('increment')\n\nstore.dispatch(increment())\n// Dispatches { type: 'increment' }\n")),Object(c.b)("p",null,"The format may feel familiar. Many redux tools use this pattern, namely ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/redux-utilities/redux-actions"}),"redux-actions"),", which had a strong influence on retreon."),Object(c.b)("p",null,"Now, plain actions have limited usefulness. Actions typically send more data into the reducer. We do this through ",Object(c.b)("inlineCode",{parentName:"p"},"action.payload")," which can contain arbitrary data."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"const incrementBy = createAction<number>('increment-by')\n\nstore.dispatch(incrementBy(15))\n// Dispatches {\n//   type: 'increment-by',\n//   payload: 15,\n// }\n")),Object(c.b)("p",null,"The action payload is whatever parameter you pass (",Object(c.b)("inlineCode",{parentName:"p"},"15"),"), and the type of the payload is declared using a generic (",Object(c.b)("inlineCode",{parentName:"p"},"<number>"),")."),Object(c.b)("p",null,"TypeScript ",Object(c.b)("strong",{parentName:"p"},"will not")," let you pass a payload without defining the type."),Object(c.b)("h2",{id:"side-effects"},"Side Effects"),Object(c.b)("p",null,"Side effects belong with action creators. Associating an effect with an action means it automatically generates ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/LogRocket/redux-logger"}),"an audit log"),", ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/vidit-sh/redux-sentry-middleware"}),"simplifies bug reproduction"),", and helps keep view state synchronized with redux."),Object(c.b)("p",null,"Wrap an effect with an action creator by passing it to ",Object(c.b)("inlineCode",{parentName:"p"},"createAction(...)"),":"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"createAction('change-theme', (theme: 'light' | 'dark') => {\n  // This runs when the action is dispatched.\n  localStorage.setItem('theme', theme)\n\n  return theme\n})\n")),Object(c.b)("p",null,"Whatever the effect returns becomes the action payload."),Object(c.b)("h2",{id:"async-actions"},"Async Actions"),Object(c.b)("p",null,"If your side effect returns a promise everything works exactly the same, except you would use ",Object(c.b)("inlineCode",{parentName:"p"},"createAction.async(...)")," instead."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"createAction.async('fetch-user', (userId: string) => {\n  const response = await fetch(`/users/${userId}/`)\n  const user: User = await response.json()\n\n  return user\n})\n")),Object(c.b)("p",null,"Marking it ",Object(c.b)("inlineCode",{parentName:"p"},"async")," has several advantages. You get optimistic reducer updates and rejection error handling out of the box."),Object(c.b)("h2",{id:"error-management"},"Error Management"),Object(c.b)("p",null,"What happens if the side effect goes wrong? Just throw an error. Retreon detects thrown exceptions and automatically dispatches an update to redux."),Object(c.b)("p",null,"Say you're trying to access a key in ",Object(c.b)("inlineCode",{parentName:"p"},"localStorage"),", but the client's browser rejects access as part of their security policy."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"createAction('save-preferences', (prefs: Preferences) => {\n  localStorage.setItem('preferences', JSON.stringify(prefs))\n//^^^^^^^^^^^^ DOMException: The operation is insecure.\n})\n")),Object(c.b)("p",null,"If the action creator throws an exception, retreon will take notice and dispatch a corresponding error action, giving reducers a chance to cleanly recover."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"store.dispatch(savePreferences(prefs))\n// Dispatches {\n//   type: 'save-preferences',\n//   error: true,\n//   payload: DOMException,\n// }\n")),Object(c.b)("p",null,"Note that retreon doesn't swallow errors - you'll still see the exception in your console."),Object(c.b)("h2",{id:"iterators-as-action-creators"},"Iterators as Action Creators"),Object(c.b)("p",null,"If you've played around with retreon, you might've noticed that all the action creators return ",Object(c.b)("a",Object(a.a)({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator"}),"generator functions"),". That's why retreon requires middleware. It enables some powerful patterns, including the basis for error handling and the multiple dispatch of async actions."),Object(c.b)("p",null,"It can also make testing slightly more cumbersome. It's recommended to test your actions and reducers against a real redux store, using the real middleware. Only your effects should be mocked."),Object(c.b)("p",null,"Generators as action creators are a powerful and advanced pattern. Unless you're doing something very unusual, you probably won't need it."))}p.isMDXComponent=!0}}]);