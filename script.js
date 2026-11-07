(function(){
var $=function(s,e){return(e||document).querySelector(s)},$$=function(s){return[].slice.call(document.querySelectorAll(s))};
var still=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* name letters */
var nm=$('#name'),i=0;nm.innerHTML=nm.getAttribute('aria-label').replace('Punithaa ','Punithaa|').split('|').map(function(w,k){return w.split('').map(function(ch){return'<span class="l" aria-hidden="true" style="--i:'+(i++)+'">'+(ch===' '?'&nbsp;':ch)+'</span>'}).join('')}).join('<br>');

/* typing roles */
var roles=['Full Stack Developer','AI-powered app builder','Hackathon team player','Painter and doodler'],ri=0,ci=0,del=false,t=$('#typed');
function type(){var r=roles[ri];t.textContent=r.slice(0,ci);
  if(!del&&ci===r.length){del=true;return setTimeout(type,1400)}
  if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
  ci+=del?-1:1;setTimeout(type,del?28:60)}
if(still)t.textContent=roles[0];else setTimeout(type,3000);

/* marquee */
var sk=['React','TypeScript','Python','Flask','Supabase','Tailwind','SQL','Git','Vite','C','MySQL','AI apps'],h='';
for(var k=0;k<2;k++)sk.forEach(function(s){h+=s+'<b>✦</b>'});$('#mq').innerHTML=h+h;

/* paint canvas */
var c=$('#paint'),x=c.getContext('2d'),hero=c.parentElement,cols=['#FFC93C','#FF6FAE','#3DDBB0','#FFFFFF'],cc=0,last=null,w,hh,dpr;
function size(){dpr=devicePixelRatio||1;w=hero.clientWidth;hh=hero.clientHeight;c.width=w*dpr;c.height=hh*dpr;x.setTransform(dpr,0,0,dpr,0,0);x.lineCap=x.lineJoin='round'}
size();addEventListener('resize',size);
function stroke(a,b){x.strokeStyle=cols[cc];x.lineWidth=14+Math.random()*26;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke();
  if(Math.random()<.12){x.fillStyle=cols[cc];x.beginPath();x.arc(b.x+(Math.random()-.5)*60,b.y+(Math.random()-.5)*60,3+Math.random()*8,0,7);x.fill()}}
function pos(e){var r=c.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
hero.addEventListener('pointermove',function(e){var p=pos(e);if(last)stroke(last,p);last=p});
hero.addEventListener('pointerdown',function(e){cc=(cc+1)%4;last=pos(e)});
hero.addEventListener('pointerleave',function(){last=null;cc=(cc+1)%4});
$('#clear').onclick=function(){x.clearRect(0,0,w,hh)};
var pts=[[.1,.25],[.35,.15],[.6,.3],[.85,.18],[.9,.5],[.7,.62],[.4,.55],[.15,.6]];
for(var j=1;j<pts.length;j++){cc=j%4;stroke({x:pts[j-1][0]*w,y:pts[j-1][1]*hh},{x:pts[j][0]*w,y:pts[j][1]*hh})}cc=0;

/* scroll reveal + count-up */
function count(el){var n=+el.dataset.n,d=+el.dataset.dec||0,s=performance.now();
  (function f(now){var p=Math.min((now-s)/1200,1);el.textContent=(n*(1-Math.pow(1-p,3))).toFixed(d);if(p<1)requestAnimationFrame(f)})(s)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');var b=$('b[data-n]',e.target);if(b)count(b);io.unobserve(e.target)}})},{threshold:.15});
$$('.rv').forEach(function(e){io.observe(e)});

/* nav highlight, progress bar, timeline line */
var secs=$$('header[id],section[id],footer[id]'),links=$$('nav a'),bar=$('#bar'),tl=$('#tl');
function onScroll(){var m=document.documentElement,s=scrollY;bar.style.transform='scaleX('+(s/(m.scrollHeight-innerHeight||1))+')';
  var cur=secs[0].id;secs.forEach(function(e){if(e.offsetTop<=s+innerHeight*.4)cur=e.id});
  links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)});
  var r=tl.getBoundingClientRect();tl.style.setProperty('--h',Math.max(0,Math.min(100,(innerHeight*.6-r.top)/r.height*100))+'%')}
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* project cards: expand + tilt */
$$('.p').forEach(function(p){
  $('button',p).onclick=function(){var o=p.classList.toggle('open');this.setAttribute('aria-expanded',o);this.lastChild.textContent=o?' Close':' Details'};
  if(!still&&matchMedia('(pointer:fine)').matches){
    p.addEventListener('pointermove',function(e){var r=p.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;p.style.transform='rotateX('+(-py*5)+'deg) rotateY('+(px*5)+'deg)'});
    p.addEventListener('pointerleave',function(){p.style.transform=''})}});

/* magnetic buttons */
if(!still&&matchMedia('(pointer:fine)').matches)$$('.mag').forEach(function(b){
  b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});
  b.addEventListener('pointerleave',function(){b.style.transform=''})});

/* cursor ring */
var cur=$('#cur'),cx=0,cy=0,tx=0,ty=0;
addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;cur.classList.toggle('big',!!e.target.closest('a,button,.sk span,.stat'))});
(function f(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cur.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(f)})();

/* copy email + toast */
$('#copy').onclick=function(){var T=$('#toast');
  try{navigator.clipboard.writeText('sec25cs120@sairamtap.edu.in')}catch(e){}
  T.classList.add('show');setTimeout(function(){T.classList.remove('show')},1800)};

/* theme toggle */
$('#theme').onclick=function(){var d=document.documentElement,dark=d.dataset.theme?d.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;d.dataset.theme=dark?'light':'dark'};
})();
