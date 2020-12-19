(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{516:function(e,t,a){var n={"./locale":267,"./locale.js":267};function r(e){var t=i(e);return a(t)}function i(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=i,e.exports=r,r.id=516},80:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return u})),a.d(t,"metadata",(function(){return b})),a.d(t,"rightToc",(function(){return h})),a.d(t,"default",(function(){return m}));var n=a(3),r=a(7),i=a(0),o=a.n(i),c=a(104),s=a(300),l=a.n(s);function d(e){var t=e.children;return Object(i.useEffect)(l.a.contentLoaded,[]),o.a.createElement("div",{className:"mermaid"},t)}var u={title:"Creating Reducers"},b={unversionedId:"creating-reducers",id:"creating-reducers",isDocsHomePage:!1,title:"Creating Reducers",description:"This section assumes you know how to create actions.",source:"@site/docs/creating-reducers.md",slug:"/creating-reducers",permalink:"/creating-reducers",editUrl:"https://github.com/retreon/website/edit/main/docs/creating-reducers.md",version:"current",sidebar:"someSidebar",previous:{title:"Creating Actions",permalink:"/creating-actions"},next:{title:"Advanced Usage",permalink:"/advanced-usage"}},h=[{value:"Updating State",id:"updating-state",children:[]},{value:"Error Handling",id:"error-handling",children:[{value:"Error Types",id:"error-types",children:[]}]},{value:"Async Actions",id:"async-actions",children:[]}],p={rightToc:h};function m(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(c.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(c.b)("h5",{parentName:"div"},Object(c.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(c.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"}),Object(c.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})))),"caution")),Object(c.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(c.b)("p",{parentName:"div"},"This section assumes you know ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"creating-actions"}),"how to create actions"),"."))),Object(c.b)("p",null,"Retreon's ",Object(c.b)("inlineCode",{parentName:"p"},"createReducer(...)")," export is the counterpart to ",Object(c.b)("inlineCode",{parentName:"p"},"createAction(...)"),". It takes an initial state and a list of action handlers. We'll see how to define those in a moment."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"const reducer = createReducer(initialState, (handleAction) => [\n  // Action handlers go here\n])\n")),Object(c.b)("p",null,"I'm sure you can guess at the first parameter, it just describes the reducer's initial state. The second parameter is where all the magic happens. It describes how that initial state changes over time by subscribing to a list of events (actions) and updating the model in response (reducers)."),Object(c.b)("p",null,"You can subscribe to actions with the ",Object(c.b)("inlineCode",{parentName:"p"},"handleAction(...)")," callback. It ties a reducer to an action creator, so whenever that action gets dispatched, your handler is invoked. Any state changes in the handler are immediately applied."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"// Create a counter reducer with a starting value of zero.\ncreateReducer(0, (handleAction) => [\n  // Increase by 1 whenever the `increment()` action is dispatched.\n  handleAction(increment, (state) => {\n    return state + 1\n  }),\n])\n")),Object(c.b)("p",null,"The above example only changes state, but it also receives an action ",Object(c.b)("inlineCode",{parentName:"p"},"payload"),". You may be used to receiving the entire action when writing reducers - be aware the only the payload is provided. This is quite intentional. Your reducer should never depend on ",Object(c.b)("inlineCode",{parentName:"p"},"action.meta")," (that's the realm of middleware) and the action type is implied. What remains is the payload."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"createReducer(0, (handleAction) => [\n  handleAction(incrementBy, (state, quantity) => {\n    return state + quantity\n  }),\n])\n")),Object(c.b)("h2",{id:"updating-state"},"Updating State"),Object(c.b)("p",null,"Immutably updating state has historically been quite difficult, inefficient, and error prone. You end up making more changes than you intended, you may accidentally mutate state, and many libraries are obtusely verbose."),Object(c.b)("p",null,Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/immerjs/immer/"}),"Immer")," makes state changes far more robust (and type safe!) by modeling changes as mutations on draft states. The library has quickly gained widespread adoption and official support by the Redux team. If you're unfamiliar with immer, take a moment to check it out."),Object(c.b)("p",null,"Retreon automatically wraps all your reducers with immer. It's safe and encouraged to use mutation syntax."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"createReducer({ count: 0 }, (handleAction) => [\n  handleAction(increment, (state) => {\n    state.count += 1 // Thanks to immer, all mutation is safe.\n  }),\n])\n")),Object(c.b)("p",null,"It may look jarring, but you'll get used to it very quickly."),Object(c.b)("h2",{id:"error-handling"},"Error Handling"),Object(c.b)("p",null,"If your action creator throws an error, retreon will dispatch an error action. You can listen for error events with ",Object(c.b)("inlineCode",{parentName:"p"},"handleAction.error(...)"),"."),Object(c.b)("p",null,"Say you've got an action creator that loads the user's theme preference, light or dark, but you want to handle the case where storage is unavailable. If the action succeeds, you get a theme. If it fails for any reason, you want to gracefully fall back to some default. You would use ",Object(c.b)("inlineCode",{parentName:"p"},"handleAction(...)")," to successfully set a theme, and ",Object(c.b)("inlineCode",{parentName:"p"},"handleAction.error(...)")," to use the fallback."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"createReducer({ theme: null }, (handleAction) => [\n  handleAction(loadTheme, (state, theme) => {\n    state.theme = theme // Success!\n  }),\n\n  handleAction.error(loadTheme, (state) => {\n    post.theme = DEFAULT_THEME // Failure. Use a fallback.\n  }),\n])\n")),Object(c.b)("p",null,"All errors are reported. If the action creator fails for any reason, your error reducer will be notified."),Object(c.b)("h3",{id:"error-types"},"Error Types"),Object(c.b)("p",null,"If you're using TypeScript, you may notice that error payloads are always marked ",Object(c.b)("inlineCode",{parentName:"p"},"unknown"),". That's because ",Object(c.b)("inlineCode",{parentName:"p"},"throw")," types are inherently unknown - anything can go wrong."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"createReducer(initialState, (handleAction) => [\n  handleAction.error(fallibleAction, (state, error) => {\n    //                                       ^^^^^ unknown type\n  }),\n])\n")),Object(c.b)("p",null,"If you're anticipating a specific error, then use (or create) a custom error class."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"class MyCustomError extends Error {}\n\ncreateReducer(initialState, (handleAction) => [\n  handleAction.error(startRecording, (state, error) => {\n    if (error instanceof MyCustomError) {\n      // <your logic here>\n    }\n  }),\n])\n")),Object(c.b)("p",null,"Custom errors are unusual in web development, but that's unfortunate. You can only win by having more descriptive errors. This works particularly well with TypeScript because after the ",Object(c.b)("inlineCode",{parentName:"p"},"instanceof")," guard, you can safely access any custom fields on the error class. Use this to send arbitrary data to the error handler."),Object(c.b)("h2",{id:"async-actions"},"Async Actions"),Object(c.b)("p",null,"You can handle async actions the same way you would synchronous actions. Reducers for async actions are called when they finish, but occasionally you'll want something more immediate: a loading flag, an optimistic patch, an instant deletion. That's why retreon provides a hook for when an action starts, called ",Object(c.b)("inlineCode",{parentName:"p"},"handleAction.optimistic(...)"),"."),Object(c.b)(d,{mdxType:"Mermaid"},"graph LR; handleAction.optimistic--\x3ehandleAction; handleAction.optimistic--\x3ehandleAction.error;"),Object(c.b)("p",null,"Optimistic reducers use the action input as the payload (that is, whatever you passed to the action when it was called)."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"createReducer(initialState, (handleAction) => [\n  handleAction.optimistic(fetchUserDetails, (state) => {\n    state.loading = true // The request is in progress.\n  }),\n\n  handleAction(fetchUserDetails, (state, user) => {\n    state.loading = false // The request is finished!\n    state.users[user.id] = user\n  }),\n])\n")))}m.isMDXComponent=!0}}]);