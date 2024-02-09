var f=Object.defineProperty;var p=(s,e,o)=>e in s?f(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o;var r=(s,e,o)=>(p(s,typeof e!="symbol"?e+"":e,o),o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function o(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(i){if(i.ep)return;i.ep=!0;const l=o(i);fetch(i.href,l)}})();class u{constructor(e,o,n,i=40,l=0){r(this,"position",{x:0,y:0});r(this,"radius",0);r(this,"color");r(this,"delay");r(this,"during");r(this,"count");this.position.x=e,this.position.y=o,this.color=n,this.during=i,this.delay=l,this.count=0-this.delay}get ttd(){return this.during}draw(e){this.count>0&&(e.moveTo(this.position.x,this.position.y),e.beginPath(),e.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,!1),e.fillStyle=this.color,e.fill(),e.closePath())}update(){this.count++,this.count>0&&(this.radius+=4,this.count>=this.during&&(this.during=0))}}class a{static nextInt(e,o){let n=0,i=0;o===void 0&&e!==void 0?e>0?n=e:i=e:e===void 0?n=1:(n=o,i=e);const l=n-i+1;return i+Math.floor(Math.random()*l)}static choice(e){const o=e.length-1;return e[a.nextInt(o)]}}class w{constructor(e){r(this,"canvas");r(this,"ctx");r(this,"limitTotal",3);r(this,"timeTick",0);r(this,"timeToc",0);r(this,"timeTotal",40);r(this,"lastPoint",{x:0,y:0});r(this,"circles");r(this,"down",!1);r(this,"colors",["#facc89","#f29b76","#89abda","#85ccc9","#8ac998","#cce199","#8957a1","#f19fc2"]);r(this,"loop",()=>{if(window.requestAnimationFrame(this.loop),!!this.down){this.timeTick>=this.timeTotal&&(this.timeTick=0,this.timeToc++),this.timeToc>=this.limitTotal&&(this.down=!1,this.timeTick=0,this.timeToc=0),this.ctx.clearRect(0,0,this.width,this.height);for(let e=0;e<this.circles.length;e++)this.circles[e].ttd<=0?this.circles.splice(e,1):(this.circles[e].draw(this.ctx),this.circles[e].update())}});this.canvas=e,this.ctx=e.getContext("2d"),this.circles=[],this.loop()}get width(){return this.canvas.width}get height(){return this.canvas.height}click(e,o){this.down=!0,this.lastPoint.x=e,this.lastPoint.y=o,this.circles.push(new u(e,o,a.choice(this.colors),1600)),this.circles.push(new u(e,o,a.choice(this.colors),1600,10)),this.circles.push(new u(e,o,a.choice(this.colors),1600,20)),this.circles.push(new u(e,o,a.choice(this.colors),1600,30)),this.circles.push(new u(e,o,"#202023",1600,40))}}window.requestAnimationFrame=(()=>window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||(s=>window.setTimeout(s,1e3/60)))();const g=new FontFace("fusion-pixel",'url("https://www.lollipopnougat.top/hsf/2023/chinesey/assets/fusion-pixel-a04ed25a.woff2")');function T(){const s=location.href.split("?n=")[1];let e="";if(s){const o=/&/g;if(o.test(s))e=decodeURI(s.replace(o,"%"));else{const n=[];for(let i=0;i<s.length;i+=2)n.push(s.substring(i,i+2));n.unshift(""),e=decodeURI(n.join("%"))}}else e="我的朋友";document.querySelector(".headline").innerText=e}window.onload=async()=>{T();const s=document.querySelector("#bgm"),e=document.querySelector(".cover"),o=document.querySelector("#canvas"),n=document.querySelector(".sub"),i=document.querySelector(".logos"),l=document.querySelector(".cover-tip"),h=["扬眉兔气","前兔似锦","大展宏兔","平安喜乐","兔然暴富","兔年大吉"].map(t=>t.split(""));o.width=window.innerWidth,o.height=window.innerHeight;const c=new w(o);document.onmousedown=t=>{c.click(t.clientX,t.clientY)},document.addEventListener("touchstart",t=>{c.click(t.touches[0].pageX,t.touches[0].pageY)});const d=()=>{s.play(),setTimeout(()=>{e.style.display="none"},2e3),setTimeout(()=>{i.children[0].className="rabbit-show"},250),setTimeout(()=>{i.children[1].className="rabbit-show"},1070),setTimeout(()=>{i.children[2].className="rabbit-show"},1870),setTimeout(()=>{for(let t=0;t<4;t++)n.children[t].innerText=h[0][t]},2850),setTimeout(()=>{for(let t=0;t<4;t++)n.children[t].innerText=h[1][t]},5400),setTimeout(()=>{for(let t=0;t<4;t++)n.children[t].innerText=h[2][t]},7e3),setTimeout(()=>{c.click(c.width/4,c.height/4);for(let t=0;t<4;t++)n.children[t].innerText=h[3][t]},8500),setTimeout(()=>{c.click(c.width/2,c.height/2);for(let t=0;t<4;t++)n.children[t].innerText=h[4][t]},9e3),setTimeout(()=>{c.click(c.width/1.2,c.height/1.2);for(let t=0;t<4;t++)n.children[t].innerText=h[5][t]},9500),setTimeout(()=>{c.click(c.width/1.2,c.height/2),c.click(c.width/2,c.height/2),c.click(c.width/4,c.height/2)},24300)},m=await g.load();document.fonts.add(m),l.innerText="点击任意位置继续",e.onclick=()=>{s.readyState==HTMLMediaElement.HAVE_ENOUGH_DATA||s.readyState==HTMLMediaElement.HAVE_FUTURE_DATA?d():s.addEventListener("canplaythrough",()=>{d()}),e.className="cover cover-moved"}};
