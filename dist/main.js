(()=>{"use strict";var e={1016:(e,t,n)=>{n.d(t,{A:()=>Be});var r=n(1601),a=n.n(r),l=n(6314),o=n.n(l),i=n(4417),s=n.n(i),c=new URL(n(7935),n.b),d=new URL(n(1409),n.b),p=new URL(n(3232),n.b),h=new URL(n(1265),n.b),u=new URL(n(6267),n.b),m=new URL(n(186),n.b),f=new URL(n(9745),n.b),b=new URL(n(8490),n.b),g=new URL(n(2573),n.b),v=new URL(n(4496),n.b),w=new URL(n(8956),n.b),L=new URL(n(9221),n.b),x=new URL(n(6092),n.b),y=new URL(n(4184),n.b),C=new URL(n(5513),n.b),E=new URL(n(3062),n.b),k=new URL(n(4875),n.b),$=new URL(n(5134),n.b),R=new URL(n(7335),n.b),U=new URL(n(6153),n.b),P=new URL(n(9e3),n.b),S=new URL(n(9593),n.b),T=new URL(n(5523),n.b),G=new URL(n(7986),n.b),M=new URL(n(4041),n.b),z=new URL(n(7538),n.b),O=new URL(n(1605),n.b),A=new URL(n(6318),n.b),I=new URL(n(3933),n.b),N=new URL(n(6291),n.b),D=new URL(n(9702),n.b),q=new URL(n(1906),n.b),H=new URL(n(4347),n.b),j=new URL(n(1216),n.b),_=new URL(n(4437),n.b),B=new URL(n(3160),n.b),F=new URL(n(8341),n.b),J=new URL(n(2076),n.b),Q=new URL(n(3860),n.b),W=new URL(n(6943),n.b),K=new URL(n(6168),n.b),V=new URL(n(227),n.b),X=new URL(n(756),n.b),Y=new URL(n(9334),n.b),Z=o()(a()),ee=s()(c),te=s()(d),ne=s()(p),re=s()(h),ae=s()(u),le=s()(m),oe=s()(f),ie=s()(b),se=s()(g),ce=s()(v),de=s()(w),pe=s()(L),he=s()(x),ue=s()(y),me=s()(C),fe=s()(E),be=s()(k),ge=s()($),ve=s()(R),we=s()(U),Le=s()(P),xe=s()(S),ye=s()(T),Ce=s()(G),Ee=s()(M),ke=s()(z),$e=s()(O),Re=s()(A),Ue=s()(I),Pe=s()(N),Se=s()(D),Te=s()(q),Ge=s()(H),Me=s()(j),ze=s()(_),Oe=s()(B),Ae=s()(F),Ie=s()(J),Ne=s()(Q),De=s()(W),qe=s()(K),He=s()(V),je=s()(X),_e=s()(Y);Z.push([e.id,`:root {\n  --cell-size: 64px;\n}\n\nhtml, body {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  background: #000;\n  font-size: 16px;\n}\n\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  color: #212529;\n  background-color: #f8f9fa;\n  text-align: center;\n  vertical-align: middle;\n  padding: .375rem .75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: .25rem;\n  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n  border: none;\n}\n\n.controls {\n  text-align: center;\n  margin: 50px 0;\n}\n\n.board-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n\n.board {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-column-gap: 2px;\n  grid-row-gap: 2px;\n}\n\n.cell {\n  position: relative;\n}\n\n.cell.selected::before {\n  content: '';\n  display: block;\n  border: 4px;\n  border-radius: 32px;\n  box-sizing: border-box;\n  width: var(--cell-size);\n  height: var(--cell-size);\n  opacity: 0.9;\n  position: absolute;\n}\n\n.cell.selected-yellow::before {\n  border-color: #ff0;\n  border-style: solid;\n}\n\n.cell.selected-green::before {\n  border-color: #0f0;\n  border-style: dashed;\n}\n\n.cell.selected-red::before {\n  border-color: #f00;\n  border-style: dashed;\n}\n\n.board.prairie {\n  --map-tile-top-left-url: url(${ee});\n  --map-tile-top-url: url(${te});\n  --map-tile-top-right-url: url(${ne});\n  --map-tile-bottom-left-url: url(${re});\n  --map-tile-bottom-url: url(${ae});\n  --map-tile-bottom-right-url: url(${le});\n  --map-tile-left-url: url(${oe});\n  --map-tile-right-url: url(${ie});\n  --map-tile-center-url: url(${se});\n}\n\n.board.desert {\n  --map-tile-top-left-url: url(${ce});\n  --map-tile-top-url: url(${de});\n  --map-tile-top-right-url: url(${pe});\n  --map-tile-bottom-left-url: url(${he});\n  --map-tile-bottom-url: url(${ue});\n  --map-tile-bottom-right-url: url(${me});\n  --map-tile-left-url: url(${fe});\n  --map-tile-right-url: url(${be});\n  --map-tile-center-url: url(${ge});\n}\n\n.board.arctic {\n  --map-tile-top-left-url: url(${ve});\n  --map-tile-top-url: url(${we});\n  --map-tile-top-right-url: url(${Le});\n  --map-tile-bottom-left-url: url(${xe});\n  --map-tile-bottom-url: url(${ye});\n  --map-tile-bottom-right-url: url(${Ce});\n  --map-tile-left-url: url(${Ee});\n  --map-tile-right-url: url(${ke});\n  --map-tile-center-url: url(${$e});\n}\n\n.board.mountain {\n  --map-tile-top-left-url: url(${Re});\n  --map-tile-top-url: url(${Ue});\n  --map-tile-top-right-url: url(${Pe});\n  --map-tile-bottom-left-url: url(${Se});\n  --map-tile-bottom-url: url(${Te});\n  --map-tile-bottom-right-url: url(${Ge});\n  --map-tile-left-url: url(${Me});\n  --map-tile-right-url: url(${ze});\n  --map-tile-center-url: url(${Oe});\n}\n\n.map-tile {\n  width: var(--cell-size);\n  height: var(--cell-size);\n}\n\n.map-tile-top-left {\n  background: var(--map-tile-top-left-url);\n}\n\n.map-tile-top {\n  background: var(--map-tile-top-url);\n}\n\n.map-tile-top-right {\n  background: var(--map-tile-top-right-url);\n}\n\n.map-tile-bottom-left {\n  background: var(--map-tile-bottom-left-url);\n}\n\n.map-tile-bottom {\n  background: var(--map-tile-bottom-url);\n}\n\n.map-tile-bottom-right {\n  background: var(--map-tile-bottom-right-url);\n}\n\n.map-tile-left {\n  background: var(--map-tile-left-url);\n}\n\n.map-tile-right {\n  background: var(--map-tile-right-url);\n}\n\n.map-tile-center {\n  background: var(--map-tile-center-url);\n}\n\n.character {\n  width: var(--cell-size);\n  height: var(--cell-size);\n  position: absolute;\n  z-index: 99;\n}\n\n.character.generic {\n  background: url(${Ae});\n}\n\n.character.bowman {\n  background: url(${Ie});\n}\n\n.character.daemon {\n  background: url(${Ne});\n}\n\n.character.magician {\n  background: url(${De});\n}\n\n.character.swordsman {\n  background: url(${qe});\n}\n\n.character.undead {\n  background: url(${He});\n}\n\n.character.vampire {\n  background: url(${je});\n}\n\n.character.zombie {\n  background: url(${_e});\n}\n\n.health-level {\n  top: 2px;\n  left: 7px;\n  position: absolute;\n  width: 50px;\n  height: 4px;\n  background: #000;\n}\n\n.health-level-indicator {\n  height: 4px;\n}\n\n.health-level-indicator-high {\n  background: #0f0;\n}\n\n.health-level-indicator-normal {\n  background: #ff0;\n}\n\n.health-level-indicator-critical {\n  background: #f00;\n}\n\n.damage {\n  position: absolute;\n  width: var(--cell-size);\n  text-align: center;\n  z-index: 999;\n  color: #f00;\n  font-weight: bold;\n  animation: 500ms fade ease-out;\n}\n\n@keyframes fade {\n  from {\n    opacity: 0;\n    top: calc(var(--cell-size) * 0.5);\n    font-size: 1rem;\n  }\n  to {\n    opacity: 1;\n    top: -20px;\n    font-size: 1.5rem;\n  }\n}\n`,""]);const Be=Z},6314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,a,l){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(o[s]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);r&&o[d[0]]||(void 0!==l&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=l),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),t.push(d))}},t}},4417:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]|(%20)/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},1601:e=>{e.exports=function(e){return e[1]}},5072:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var l={},o=[],i=0;i<e.length;i++){var s=e[i],c=r.base?s[0]+r.base:s[0],d=l[c]||0,p="".concat(c," ").concat(d);l[c]=d+1;var h=n(p),u={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==h)t[h].references++,t[h].updater(u);else{var m=a(u,r);r.byIndex=i,t.splice(i,0,{identifier:p,updater:m,references:1})}o.push(p)}return o}function a(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,a){var l=r(e=e||[],a=a||{});return function(e){e=e||[];for(var o=0;o<l.length;o++){var i=n(l[o]);t[i].references--}for(var s=r(e,a),c=0;c<l.length;c++){var d=n(l[c]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}l=s}}},7659:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},5056:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},7825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var a=void 0!==n.layer;a&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,a&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var l=n.sourceMap;l&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(l))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},1113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},9593:(e,t,n)=>{e.exports=n.p+"b27323cf850ed820855c.png"},7986:(e,t,n)=>{e.exports=n.p+"ac9d74f57639792774bc.png"},5523:(e,t,n)=>{e.exports=n.p+"63aae58e4690953a3857.png"},1605:(e,t,n)=>{e.exports=n.p+"246277b8ca590816b3e8.png"},4041:(e,t,n)=>{e.exports=n.p+"3d9503e0a850fda86f82.png"},7538:(e,t,n)=>{e.exports=n.p+"22e7c5ede3f747cbe27a.png"},7335:(e,t,n)=>{e.exports=n.p+"eab6a2cc5e89a4dd8e3f.png"},9e3:(e,t,n)=>{e.exports=n.p+"d31d84c693f649766aee.png"},6153:(e,t,n)=>{e.exports=n.p+"e0aa3daf6d08c62c96d9.png"},2076:(e,t,n)=>{e.exports=n.p+"cec542854b228e61547a.png"},3860:(e,t,n)=>{e.exports=n.p+"cf170a9fea1051b7424a.png"},8341:(e,t,n)=>{e.exports=n.p+"0a77fc47d727eab6fd39.png"},6943:(e,t,n)=>{e.exports=n.p+"c0fa2b75539f94144dc4.png"},6168:(e,t,n)=>{e.exports=n.p+"2007ec00c1d9f997e704.png"},227:(e,t,n)=>{e.exports=n.p+"f5c75398bcb5931f9f3c.png"},756:(e,t,n)=>{e.exports=n.p+"bf0ed0dca1d1e6091d42.png"},9334:(e,t,n)=>{e.exports=n.p+"296dfeac15e2377fc1dc.png"},6092:(e,t,n)=>{e.exports=n.p+"13edb269e39172ddd74f.png"},5513:(e,t,n)=>{e.exports=n.p+"5cf9c17d6a1ea7106a6c.png"},4184:(e,t,n)=>{e.exports=n.p+"f1703771380a9959d979.png"},5134:(e,t,n)=>{e.exports=n.p+"51e2a5de56bd631452fe.png"},3062:(e,t,n)=>{e.exports=n.p+"eb1f6e4f87b977012684.png"},4875:(e,t,n)=>{e.exports=n.p+"2c19971f327b288278bb.png"},4496:(e,t,n)=>{e.exports=n.p+"258d884122fabfc2f312.png"},9221:(e,t,n)=>{e.exports=n.p+"2f1e1970c2c20cf3a8d5.png"},8956:(e,t,n)=>{e.exports=n.p+"dc3f97e7bbcd5ea1ded9.png"},9702:(e,t,n)=>{e.exports=n.p+"1d70f1dab2dd418c3612.png"},4347:(e,t,n)=>{e.exports=n.p+"6bacb8e25ed9ecf726bf.png"},1906:(e,t,n)=>{e.exports=n.p+"f462d2ed6eedca1e4fd9.png"},3160:(e,t,n)=>{e.exports=n.p+"6f6f7c09bde970b2e41b.png"},1216:(e,t,n)=>{e.exports=n.p+"c75f062dddba6e98fdc6.png"},4437:(e,t,n)=>{e.exports=n.p+"26fdc25019c24e87f11a.png"},6318:(e,t,n)=>{e.exports=n.p+"ef1b0ea8c4e545d9aadc.png"},6291:(e,t,n)=>{e.exports=n.p+"a1d2321024649b9d8f5f.png"},3933:(e,t,n)=>{e.exports=n.p+"8b928c3eb136543e573a.png"},1265:(e,t,n)=>{e.exports=n.p+"26b5f224d8750119922d.png"},186:(e,t,n)=>{e.exports=n.p+"2429af6d3a5796e3c34b.png"},6267:(e,t,n)=>{e.exports=n.p+"07d5e8127645225478b6.png"},2573:(e,t,n)=>{e.exports=n.p+"0089a610e6611f679b50.png"},9745:(e,t,n)=>{e.exports=n.p+"546abb060a0837550fd1.png"},8490:(e,t,n)=>{e.exports=n.p+"6a84ae91f5d985ddc9ee.png"},7935:(e,t,n)=>{e.exports=n.p+"46d63299c3420c030b4e.png"},3232:(e,t,n)=>{e.exports=n.p+"0ac7f8258ec7166dc957.png"},1409:(e,t,n)=>{e.exports=n.p+"946aeb948db6313f1d85.png"}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var l=t[r]={id:r,exports:{}};return e[r](l,l.exports,n),l.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var a=r.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=r[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.b=document.baseURI||self.location.href,n.nc=void 0,(()=>{var e=n(5072),t=n.n(e),r=n(7825),a=n.n(r),l=n(7659),o=n.n(l),i=n(5056),s=n.n(i),c=n(540),d=n.n(c),p=n(1113),h=n.n(p),u=n(1016),m={};function f(e,t){const n=Math.pow(t,2);switch(!0){case 0===e:return"top-left";case e===t-1:return"top-right";case e===n-t:return"bottom-left";case e===n-1:return"bottom-right";case e>0&&e<t-1:return"top";case e>=n-t&&e<n:return"bottom";case e%t==0&&0!==e&&e!==n-t:return"left";case(e+1)%t==0&&e!==t-1&&e!==n-1:return"right";default:return"center"}}m.styleTagTransform=h(),m.setAttributes=s(),m.insert=o().bind(null,"head"),m.domAPI=a(),m.insertStyleElement=d(),t()(u.A,m),u.A&&u.A.locals&&u.A.locals;class b{constructor(){this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(e){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(e=>this.onNewGameClick(e))),this.saveGameEl.addEventListener("click",(e=>this.onSaveGameClick(e))),this.loadGameEl.addEventListener("click",(e=>this.onLoadGameClick(e))),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e);for(let e=0;e<this.boardSize**2;e+=1){const t=document.createElement("div");t.classList.add("cell","map-tile",`map-tile-${f(e,this.boardSize)}`),t.addEventListener("mouseenter",(e=>this.onCellEnter(e))),t.addEventListener("mouseleave",(e=>this.onCellLeave(e))),t.addEventListener("click",(e=>this.onCellClick(e))),this.boardEl.appendChild(t)}this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const n of e){const e=this.boardEl.children[n.position],r=document.createElement("div");r.classList.add("character",n.character.type);const a=document.createElement("div");a.classList.add("health-level");const l=document.createElement("div");l.classList.add("health-level-indicator","health-level-indicator-"+((t=n.character.health)<15?"critical":t<50?"normal":"high")),l.style.width=`${n.character.health}%`,a.appendChild(l),r.appendChild(a),e.appendChild(r)}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((e=>e.call(null,t)))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((e=>e.call(null,t)))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((e=>e.call(null,t)))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach((e=>e.call(null)))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach((e=>e.call(null)))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach((e=>e.call(null)))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e,t="yellow"){this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter((e=>e.startsWith("selected"))))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise((n=>{const r=this.cells[e],a=document.createElement("span");a.textContent=t,a.classList.add("damage"),r.appendChild(a),a.addEventListener("animationend",(()=>{r.removeChild(a),n()}))}))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}const g="prairie";class v{constructor(e,t="generic"){if(this.level=e,this.attack=0,this.defence=0,this.health=50,this.type=t,new.target===v)throw new Error("Нельзя создавать объект класса родителя")}get characterInfo(){return`🎖${this.level} ⚔${this.attack} 🛡${this.defence} ❤${this.health}`}}class w{constructor(e,t){if(!(e instanceof v))throw new Error("character must be instance of Character or its children");if("number"!=typeof t)throw new Error("position must be a number");this.character=e,this.position=t}}class L extends v{constructor(e){super(e,"bowman"),this.level=e,this.attack=25,this.defence=25}}class x extends v{constructor(e){super(e,"daemon"),this.level=e,this.attack=10,this.defence=10}}class y extends v{constructor(e){super(e,"magician"),this.level=e,this.attack=10,this.defence=40}}class C extends v{constructor(e){super(e,"swordsman"),this.level=e,this.attack=40,this.defence=10}}class E extends v{constructor(e){super(e,"undead"),this.level=e,this.attack=40,this.defence=10}}class k extends v{constructor(e){super(e,"vampire"),this.level=e,this.attack=25,this.defence=25}}class ${constructor(e=[]){this.members=new Set(e)}add(e){if(this.members.has(e))throw new Error("Персонаж уже существует");this.members.add(e)}addAll(...e){for(const t of e)this.members.add(t)}get characters(){return Array.from(this.members)}}function R(e,t,n){const r=[],a=function*(e,t){for(;;){const n=Math.floor(Math.random()*e.length),r=Math.floor(Math.random()*t)+1,a=e[n];yield new a(r)}}(e,t);for(let e=0;e<n;e++)r.push(a.next().value);return new $(r)}const U=new b;U.bindToDOM(document.querySelector("#game-container"));const P=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}(localStorage),S=new class{constructor(e,t){this.gamePlay=e,this.stateService=t,this.arrayOfPlayers=[],this.humanTypes=[L,C,y],this.computerTypes=[x,E,k]}generateRandomPosition(e,t,n){let r;do{r=Math.floor(Math.random()*e)*e+t[Math.floor(Math.random()*t.length)]}while(n.has(r));return n.add(r),r}isHumanCharacter(e){return this.humanTypes.some((t=>e.character instanceof t))}init(){this.gamePlay.drawUi(g);const e=R(this.humanTypes,3,2),t=R(this.computerTypes,3,2),n=new Set,r=new w(e.characters[0],this.generateRandomPosition(8,[0,1],n)),a=new w(e.characters[1],this.generateRandomPosition(8,[0,1],n)),l=new w(t.characters[0],this.generateRandomPosition(8,[6,7],n)),o=new w(t.characters[1],this.generateRandomPosition(8,[6,7],n));this.arrayOfPlayers.push(r,a,l,o),this.gamePlay.redrawPositions(this.arrayOfPlayers),this.addEventListeners()}addEventListeners(){this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this))}onCellClick(e){const t=this.gamePlay.cells[e].querySelector(".character"),n=this.arrayOfPlayers.find((t=>t.position===e));if(t&&this.isHumanCharacter(n))return this.selectedCell&&this.gamePlay.deselectCell(this.selectedCell.position),this.gamePlay.selectCell(e),void(this.selectedCell=n);b.showError("Это не персонаж игрока!")}onCellEnter(e){const t=this.gamePlay.cells[e].querySelector(".character"),n=this.arrayOfPlayers.find((t=>t.position===e));t&&this.gamePlay.showCellTooltip(n.character.characterInfo,e)}onCellLeave(e){this.gamePlay.hideCellTooltip(e)}}(U,P);S.init()})()})();