import{K as E}from"./index-b9mOX-ty.js";const T=o=>{let r;const e=new Set,s=(d,i)=>{const y=typeof d=="function"?d(r):d;if(!Object.is(y,r)){const m=r;r=i??(typeof y!="object"||y===null)?y:Object.assign({},r,y),e.forEach(f=>f(r,m))}},n=()=>r,u={setState:s,getState:n,getInitialState:()=>S,subscribe:d=>(e.add(d),()=>e.delete(d))},S=r=o(s,n,u);return u},N=o=>o?T(o):T,j=o=>o;function J(o,r=j){const e=E.useSyncExternalStore(o.subscribe,()=>r(o.getState()),()=>r(o.getInitialState()));return E.useDebugValue(e),e}const w=o=>{const r=N(o),e=s=>J(r,s);return Object.assign(e,r),e},k=o=>o?w(o):w,R={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},I=new Map,_=o=>{const r=I.get(o);return r?Object.fromEntries(Object.entries(r.stores).map(([e,s])=>[e,s.getState()])):{}},A=(o,r,e)=>{if(o===void 0)return{type:"untracked",connection:r.connect(e)};const s=I.get(e.name);if(s)return{type:"tracked",store:o,...s};const n={connection:r.connect(e),stores:{}};return I.set(e.name,n),{type:"tracked",store:o,...n}},M=(o,r={})=>(e,s,n)=>{const{enabled:l,anonymousActionType:p,store:u,...S}=r;let d;try{d=(l??(R?"production":void 0)!=="production")&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!d)return o(e,s,n);const{connection:i,...y}=A(u,d,S);let m=!0;n.setState=(t,v,a)=>{const c=e(t,v);if(!m)return c;const h=a===void 0?{type:p||"anonymous"}:typeof a=="string"?{type:a}:a;return u===void 0?(i==null||i.send(h,s()),c):(i==null||i.send({...h,type:`${u}/${h.type}`},{..._(S.name),[u]:n.getState()}),c)};const f=(...t)=>{const v=m;m=!1,e(...t),m=v},g=o(n.setState,s,n);if(y.type==="untracked"?i==null||i.init(g):(y.stores[y.store]=n,i==null||i.init(Object.fromEntries(Object.entries(y.stores).map(([t,v])=>[t,t===y.store?g:v.getState()])))),n.dispatchFromDevtools&&typeof n.dispatch=="function"){let t=!1;const v=n.dispatch;n.dispatch=(...a)=>{(R?"production":void 0)!=="production"&&a[0].type==="__setState"&&!t&&(console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'),t=!0),v(...a)}}return i.subscribe(t=>{var v;switch(t.type){case"ACTION":if(typeof t.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return b(t.payload,a=>{if(a.type==="__setState"){if(u===void 0){f(a.state);return}Object.keys(a.state).length!==1&&console.error(`
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);const c=a.state[u];if(c==null)return;JSON.stringify(n.getState())!==JSON.stringify(c)&&f(c);return}n.dispatchFromDevtools&&typeof n.dispatch=="function"&&n.dispatch(a)});case"DISPATCH":switch(t.payload.type){case"RESET":return f(g),u===void 0?i==null?void 0:i.init(n.getState()):i==null?void 0:i.init(_(S.name));case"COMMIT":if(u===void 0){i==null||i.init(n.getState());return}return i==null?void 0:i.init(_(S.name));case"ROLLBACK":return b(t.state,a=>{if(u===void 0){f(a),i==null||i.init(n.getState());return}f(a[u]),i==null||i.init(_(S.name))});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return b(t.state,a=>{if(u===void 0){f(a);return}JSON.stringify(n.getState())!==JSON.stringify(a[u])&&f(a[u])});case"IMPORT_STATE":{const{nextLiftedState:a}=t.payload,c=(v=a.computedStates.slice(-1)[0])==null?void 0:v.state;if(!c)return;f(u===void 0?c:c[u]),i==null||i.send(null,a);return}case"PAUSE_RECORDING":return m=!m}return}}),g},P=M,b=(o,r)=>{let e;try{e=JSON.parse(o)}catch(s){console.error("[zustand devtools middleware] Could not parse the received json",s)}e!==void 0&&r(e)};function U(o,r){let e;try{e=o()}catch{return}return{getItem:n=>{var l;const p=S=>S===null?null:JSON.parse(S,void 0),u=(l=e.getItem(n))!=null?l:null;return u instanceof Promise?u.then(p):p(u)},setItem:(n,l)=>e.setItem(n,JSON.stringify(l,void 0)),removeItem:n=>e.removeItem(n)}}const O=o=>r=>{try{const e=o(r);return e instanceof Promise?e:{then(s){return O(s)(e)},catch(s){return this}}}catch(e){return{then(s){return this},catch(s){return O(s)(e)}}}},x=(o,r)=>(e,s,n)=>{let l={storage:U(()=>localStorage),partialize:t=>t,version:0,merge:(t,v)=>({...v,...t}),...r},p=!1;const u=new Set,S=new Set;let d=l.storage;if(!d)return o((...t)=>{console.warn(`[zustand persist middleware] Unable to update item '${l.name}', the given storage is currently unavailable.`),e(...t)},s,n);const i=()=>{const t=l.partialize({...s()});return d.setItem(l.name,{state:t,version:l.version})},y=n.setState;n.setState=(t,v)=>{y(t,v),i()};const m=o((...t)=>{e(...t),i()},s,n);n.getInitialState=()=>m;let f;const g=()=>{var t,v;if(!d)return;p=!1,u.forEach(c=>{var h;return c((h=s())!=null?h:m)});const a=((v=l.onRehydrateStorage)==null?void 0:v.call(l,(t=s())!=null?t:m))||void 0;return O(d.getItem.bind(d))(l.name).then(c=>{if(c)if(typeof c.version=="number"&&c.version!==l.version){if(l.migrate)return[!0,l.migrate(c.state,c.version)];console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,c.state];return[!1,void 0]}).then(c=>{var h;const[C,D]=c;if(f=l.merge(D,(h=s())!=null?h:m),e(f,!0),C)return i()}).then(()=>{a==null||a(f,void 0),f=s(),p=!0,S.forEach(c=>c(f))}).catch(c=>{a==null||a(void 0,c)})};return n.persist={setOptions:t=>{l={...l,...t},t.storage&&(d=t.storage)},clearStorage:()=>{d==null||d.removeItem(l.name)},getOptions:()=>l,rehydrate:()=>g(),hasHydrated:()=>p,onHydrate:t=>(u.add(t),()=>{u.delete(t)}),onFinishHydration:t=>(S.add(t),()=>{S.delete(t)})},l.skipHydration||g(),f||m},F=x,L=k()(P(F(o=>({balance:0,setBal:r=>o(()=>({balance:r})),memberId:null,setMemberId:r=>o(()=>({memberId:r}))}),{name:"balanceStore"})));export{L as u};
