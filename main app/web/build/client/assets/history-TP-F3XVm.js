import{s as f,r,j as e}from"./index-b9mOX-ty.js";import{C as p,a as g,b as u,c as T}from"./card-QBdUXyHB.js";import{T as b,a as C,b as d,c as o,d as D,e as n}from"./table-Dj3FhNY7.js";import{B as N}from"./button-BjFBEIeJ.js";import{u as I}from"./store-DN2nkw-m.js";import{a as S,C as A}from"./chevron-up-Br7yyuhK.js";import"./utils-DnNDQBbQ.js";import"./index-DVjGZTE2.js";import"./createLucideIcon-CP5-0Dwr.js";function P(){const i=f(),l=I(t=>t.memberId),[m,x]=r.useState([]);r.useEffect(()=>{(async()=>{const a=localStorage.getItem("accessToken");if(!a){i("/login");return}const c=await(await fetch(window.ENV.API_URL+`/api/v1/loyalty/${l}/transactions`,{method:"GET",headers:{Authorization:`Bearer ${a}`}})).json();console.log("fetched transactions",c.transactions),x(c.transactions)})()},[]);const[s,h]=r.useState("desc"),j=[...m].sort((t,a)=>s==="desc"?new Date(a.createdAt).getTime()-new Date(t.createdAt).getTime():new Date(t.createdAt).getTime()-new Date(a.createdAt).getTime()),w=()=>{h(s==="desc"?"asc":"desc")};return e.jsxs(p,{className:"w-full max-w-4xl mx-auto",children:[e.jsx(g,{children:e.jsx(u,{className:"text-2xl font-bold",children:"Transactions History"})}),e.jsx(T,{children:e.jsxs(b,{children:[e.jsx(C,{children:e.jsxs(d,{children:[e.jsx(o,{className:"w-[180px]",children:e.jsxs(N,{variant:"ghost",onClick:w,className:"font-bold",children:["Date",s==="desc"?e.jsx(S,{className:"ml-2 h-4 w-4"}):e.jsx(A,{className:"ml-2 h-4 w-4"})]})}),e.jsx(o,{children:"Description"}),e.jsx(o,{className:"text-right",children:"Points"})]})}),e.jsx(D,{children:j.map(t=>e.jsxs(d,{children:[e.jsx(n,{className:"font-medium",children:new Date(t.createdAt).toLocaleDateString()}),e.jsx(n,{children:t.description}),e.jsxs(n,{className:`text-right ${t.rewardId===10||t.rewardId===11?"text-green-600":"text-red-600"}`,children:[t.rewardId===10||t.rewardId===11?"+":"-",Math.abs(t.amount).toLocaleString()]})]},t.id))})]})})]})}export{P as default};
