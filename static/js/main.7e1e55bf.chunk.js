(this.webpackJsonpeducation=this.webpackJsonpeducation||[]).push([[0],{11:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),i=n(4),a=n.n(i),o=(n(9),n(2)),r=n.p+"static/media/arrow_down.e10072cb.svg",l=n(0),d=function(e){var t=e.movePos,n=Object(c.useState)(!1),s=Object(o.a)(n,2),i=s[0],a=s[1];return Object(c.useEffect)((function(){1===t&&setTimeout((function(){a(!0)}),1e3)})),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("div",{className:"top ".concat(0!==t?"move":""," ").concat(2===t?"move2":""),children:[Object(l.jsx)("p",{className:"title",children:"Interaktive Grammatik"}),Object(l.jsx)("p",{className:"subtitle",children:"Position des Verbs im Aussagesatz"})]}),i?"":Object(l.jsxs)("p",{className:"text ".concat(0!==t?"hidden":""),children:["Wo steht das Verb im Aussagesatz? Daf\xfcr gibt es eine Regel.",Object(l.jsx)("br",{}),"Diese Regel kannst du in dieser Lektion lernen oder wiederholen."]})]})},u=function(e){var t=e.movePos,n=e.changePos,s=e.item,i=e.changeItem,a=Object(c.useState)(!0),r=Object(o.a)(a,2),d=r[0],u=r[1],j=Object(c.useState)(!0),m=Object(o.a)(j,2),b=m[0],O=m[1];return Object(c.useEffect)((function(){u(!0)}),[t]),Object(c.useEffect)((function(){setTimeout((function(){O(!0)}),750)}),[b]),Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{className:"next ".concat(1===t?"nextShow":""," ").concat(2===t?"nextShow2":"").concat(3===t?"nextShow3":"","\n        ").concat(2===t||3===t?"nextAnimation":""),children:b&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("div",{className:"titles ".concat(3===t?"titles-full":""),children:[Object(l.jsx)("div",{onClick:function(){0!==s&&(O(!1),n(1),setTimeout((function(){u(!1),i(0)}),1e3))},className:"title ".concat(0===s?"active":""," ").concat(2===t?"titleReduce":""," "),style:{transition:d?"1s":"0s",transform:3===t?"translateY(0%)":"translateY(-".concat(100*s,"%)")},children:"1. VERB MARKIEREN"}),Object(l.jsx)("div",{className:"title ".concat(1===s?"active":""," ").concat(2===t?"titleReduce":""),style:{transition:d?"1s":"0s",transform:3===t?"translateY(0%)":"translateY(-".concat(100*s,"%)")},onClick:function(){1!==s&&(O(!1),n(1),setTimeout((function(){u(!1),i(1)}),1e3))},children:"2. POSITION DES VERBS FINDEN"}),Object(l.jsx)("div",{className:"title ".concat(2===s?"active":""," ").concat(2===t?"titleReduce":""),style:{transition:d?"1s":"0s",transform:3===t?"translateY(0%)":"translateY(-".concat(100*s,"%)")},onClick:function(){2!==s&&(O(!1),n(1),setTimeout((function(){u(!1),i(2)}),1e3))},children:"3. REGEL FORMULIEREN"}),Object(l.jsx)("div",{className:"title ".concat(3===s?"active":""," ").concat(2===t?"titleReduce":""),style:{transition:d?"1s":"0s",transform:3===t?"translateY(0%)":"translateY(-".concat(100*s,"%)")},onClick:function(){3!==s&&(O(!1),n(1),setTimeout((function(){u(!1),i(3)}),1e3))},children:"4. \xdcbung 1"}),Object(l.jsx)("div",{className:"title ".concat(4===s?"active":""," ").concat(2===t?"titleReduce":""),style:{transition:d?"1s":"0s",transform:3===t?"translateY(0%)":"translateY(-".concat(100*s,"%)")},onClick:function(){4!==s&&(O(!1),n(1),setTimeout((function(){u(!1),i(4)}),1e3))},children:"5. \xdcbung 2"})]}),Object(l.jsx)("div",{className:"subtitle",style:{opacity:2===t||3===t?"0":"1",transition:"0.5s"},children:0===s?"WO STEHT DAS VERB?":1===s?"Welche Position hat das Verb? ":2===s?"Wie heisst die Regel?":"Was wei\xdft du?"}),Object(l.jsx)("p",{style:{opacity:2===t||3===t?"0":"1",transition:"0.5s"},children:0===s?"Hier arbeitest du mit S\xe4tzen und markierst das Verb. Am Ende siehst du eine Audio-Bilder-Geschichte.":1===s?"In diesem Schritt ordnest du die S\xe4tze.":2===s?"Du hast viel mit S\xe4tzen gearbeitet und kannst selbst eine Regel formulieren.":3===s?"In dieser \xdcbung bildest du S\xe4tze und siehst Bilder.":"In dieser \xdcbung bildest du S\xe4tze."})]})})})},j=function(){var e=Object(c.useState)(0),t=Object(o.a)(e,2),n=t[0],s=t[1],i=Object(c.useState)(!1),a=Object(o.a)(i,2),j=a[0],m=a[1],b=Object(c.useState)(0),O=Object(o.a)(b,2),h=O[0],f=O[1];Object(c.useEffect)((function(){1===n&&setTimeout((function(){m(!1)}),1e3)}),[n]);var x=function(){s(2===n?3:2)};return Object(l.jsxs)("div",{className:"menu ".concat(2===n?"menu-small":3===n?"menu-medium":""),style:{height:window.innerHeight},onClick:function(){2===n&&x()},children:[Object(l.jsx)(d,{movePos:n}),0!==n&&Object(l.jsx)(u,{item:h,changeItem:function(e){return f(e)},movePos:n,changePos:function(e){s(e)}}),Object(l.jsx)("div",{onClick:function(){console.log("tes"),s(3===n?0:n+1),m(!0)},className:"button ".concat(j?"buttonHidden":""),children:"WEITER"}),Object(l.jsxs)("div",{className:"info ".concat(1===n||2===n?"info-small":""),children:["DEUTSCHE ",Object(l.jsx)("br",{}),"GRAMMATIK"]}),Object(l.jsxs)("div",{className:"bottom ".concat(2===n?"bottomHide":""),children:[Object(l.jsx)("p",{children:"Credits"}),Object(l.jsx)("p",{children:"Impressum"})]}),Object(l.jsx)("div",{className:"arrow",onClick:x,children:Object(l.jsx)("img",{className:"image ".concat(2===n||3===n?"imageShow":""),style:{transform:3===n?"rotate(180deg)":"rotate(0)"},src:r,alt:""})})]})};var m=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)(j,{})})};a.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(m,{})}),document.getElementById("root"))},9:function(e,t,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.7e1e55bf.chunk.js.map