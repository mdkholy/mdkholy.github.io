(self.webpackChunk_mohatt_website=self.webpackChunk_mohatt_website||[]).push([[998],{4227:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var l=n(9496),a=n(6373),r=n.n(a);function s({children:e,spacing:t,className:n}){return l.createElement("div",{className:r()("btn-group",{"btn-group-glue":!t},n)},e)}},9966:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var l=n(9496),a=n(8154),r=n(4227),s=n(2680);function c({children:e,title:t,actions:n,className:c}){return l.createElement(a.Z,{className:c},l.createElement("header",{className:"mt-8 mb-12 max-w-lg"},l.createElement("h2",{className:"italic text-3xl leading-relaxed text-typo"},t),l.createElement("div",{className:"mt-8 text-2xl leading-normal text-typo-dim"},e)),l.createElement("footer",null,l.createElement(r.Z,{spacing:!0},n&&n.map((e=>l.createElement(s.Z,{color:"primary",to:e.to,outline:e.alt,key:e.to},e.title))))))}},4103:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var l=n(3178),a=n(9496);var r=n(6373),s=n.n(r);function c({words:e,loop:t,typeSpeed:n,deleteSpeed:l,delay:r}){const{0:s,1:c}=(0,a.useState)(n),{0:i,1:o}=(0,a.useState)(""),{0:u,1:m}=(0,a.useState)(!1),{0:p,1:d}=(0,a.useState)(0),f=()=>{const a=t?p%e.length:p,s=e[a];if(u?(c(l),o(s.substring(0,i.length-1))):(c(n),o(s.substring(0,i.length+1))),u||i!==s)u&&""===i&&(m(!1),d(p+1));else{if(!t&&p>=e.length-1)return;m(!0),c(r)}};return(0,a.useEffect)((()=>{const e=setTimeout((()=>f()),s);return()=>clearTimeout(e)}),[f,s]),a.createElement(a.Fragment,null,i)}function i({words:e=[],loop:t=!1,speed:n=100,delay:l=1500,backspace:r=null,cursor:i="|",className:o}){const u=function(){const{0:e,1:t}=(0,a.useState)(!1);return(0,a.useEffect)((()=>{t(!0)}),[]),e}();return a.createElement("span",{className:s()("typewriter",o)},u?a.createElement(c,{words:e,loop:t,typeSpeed:n,deleteSpeed:r||n,delay:l}):e[0],i&&u&&a.createElement("span",{className:"typewriter-cursor"},i))}var o=a.memo(i),u=n(9966);let m=function(e){function t(){return e.apply(this,arguments)||this}return(0,l.Z)(t,e),t.prototype.view=function(){this.title=this.props.data.page.title,this.snippet="Hi, I’m Mohamed,";const e=a.createElement(a.Fragment,null,"I move pixels and lines of",a.createElement("br",null),"code to craft ",a.createElement(o,{words:["high quality","user-friendly","efficient","modern","beautiful"],loop:!0,speed:50,backspace:30,delay:4e3,className:"text-primary"}),a.createElement("br",null),"digital experiences");return a.createElement(u.Z,{title:e,actions:[{title:"Skills",to:"skills",alt:!0},{title:"Get In Touch",to:"home"}]},"I'm a full-stack web developer with a broad range of skills and expertise in most web development related fields.")},t}(n(5024).Z)}}]);
//# sourceMappingURL=component---src-templates-home-js-93a0e1bf53226cc0dcd7.js.map