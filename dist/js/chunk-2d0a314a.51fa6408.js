(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a314a"],{"013f":function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"container mt-3"},[a("small",{staticClass:"text-muted"},[s._v(s._s(s.$options.__file))]),a("div",{staticClass:"col-md-4 offset-md-4"},[a("h1",{staticClass:"text-center"},[s._v("Accedi al back-office di Zuly")]),a("h3",{staticClass:"text-center text-muted"},[s._v("(riservato ai negozi)")]),a("form",[a("div",{staticClass:"mb-3"},[a("label",{staticClass:"form-label",attrs:{for:"inputEmail"}},[s._v("Indirizzo email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"inputEmail",placeholder:"tua.email@esempio.it"},domProps:{value:s.email},on:{input:function(t){t.target.composing||(s.email=t.target.value)}}})]),a("div",{staticClass:"mb-3"},[a("label",{staticClass:"form-label",attrs:{for:"inputPassword"}},[s._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword"},domProps:{value:s.password},on:{input:function(t){t.target.composing||(s.password=t.target.value)}}})]),a("div",{directives:[{name:"show",rawName:"v-show",value:s.errorMessage,expression:"errorMessage"}],staticClass:"alert-danger my-3"},[s._v(s._s(s.errorMessage))]),a("button",{staticClass:"btn btn-primary",attrs:{disabled:""===s.email||""===s.password,type:"button"},on:{click:function(t){return s.login()}}},[s._v("Accedi")])]),a("p",{staticClass:"mt-4"},[s._v("Hai dimenticato la password ? "),a("router-link",{attrs:{to:"/reset_password"}},[s._v("Ri-impostala")]),s._v(".")],1),a("p",[s._v("Il tuo negozio è in Zuly ma non hai ancora un account? fatti invitare dal tuo gestore.")]),s._m(0)])])},i=[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("Il tuo negozio non è ancora in Zuly? "),a("a",{attrs:{href:"https://join.zuly.it/inizia/",target:"_blank"}},[s._v("Aderisci ora")]),s._v(".")])}],o={data(){return{email:"",password:"",errorMessage:""}},methods:{async performLogin(){let s={email:this.email,password:this.password};const t=await fetch("/api/session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});return t},login(){""!==this.email&&""!==this.password?this.performLogin().then(s=>{s.ok?this.$emit("authenticated",!0):(this.errorMessage="Accesso non riuscito",console.log("The email and / or password is incorrect"))}):(this.errorMessage="Inserisci email e password.",console.log("A email and password must be present"))}}},r=o,n=a("2877"),l=Object(n["a"])(r,e,i,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0a314a.51fa6408.js.map