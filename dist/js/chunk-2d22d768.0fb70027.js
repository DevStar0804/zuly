(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22d768"],{f833:function(e,s,a){"use strict";a.r(s);var t=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"container mt-3"},[a("small",{staticClass:"text-muted"},[e._v(e._s(e.$options.__file))]),a("div",{staticClass:"row m-3"},[a("div",{staticClass:"col-md-4 offset-md-4"},[a("h1",{staticClass:"text-center"},[e._v("Ri-imposta la tua password su Zuly")]),a("h3",{staticClass:"text-center text-muted"},[e._v("(riservato ai negozi)")]),a("form",[a("div",{staticClass:"mb-3"},[a("label",{staticClass:"form-label",attrs:{for:"inputEmail"}},[e._v("Indirizzo email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"inputEmail","aria-describedby":"emailHelp",placeholder:"tua.email@esempio.it"},domProps:{value:e.email},on:{input:function(s){s.target.composing||(e.email=s.target.value)}}}),a("div",{directives:[{name:"show",rawName:"v-show",value:e.errorMessage,expression:"errorMessage"}],staticClass:"alert-danger my-3"},[e._v(e._s(e.errorMessage))]),a("p",{staticClass:"text-muted my-3",attrs:{id:"emailHelp"}},[e._v(e._s(e.successMessage))])]),a("button",{staticClass:"btn btn-primary",attrs:{disabled:e.disabled||""===e.email,type:"button"},on:{click:function(s){return e.requestPassword()}}},[e._v("Invia la richiesta")])])])])])},i=[],r={data(){return{email:"",successMessage:"Manderemo un'email a questo indizzo.",errorMessage:"",disabled:!1}},methods:{async postRequest(){let e={email:this.email};const s=await fetch("/api/passwd",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return s},requestPassword:function(){this.errorMessage="";var e=/^([a-zA-Z0-9_.-]+\+?[a-zA-Z0-9_.-]+)@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;if(!e.test(this.email))return this.errorMessage="Inserisci un indirizzo email valido.",!1;this.postRequest().then(e=>{e.ok?(this.successMessage="Abbiamo mandato un'email all'indirizzo indicato, con le istruzioni per ri-impostare la tua password su Zuly.",this.disabled=!0):this.errorMessage="C'è stato un problema. Riprova più tardi."})}}},o=r,l=a("2877"),n=Object(l["a"])(o,t,i,!1,null,null,null);s["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d22d768.0fb70027.js.map