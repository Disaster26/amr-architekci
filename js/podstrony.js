/* AMR - wspolny skrypt podstron: menu, odkrywanie zdjec, galeria pelnoekranowa */
(function(){
 var H=document.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function d2(n){return n<10?'0'+n:''+n}

 /* menu */
 var przel=document.querySelector('[data-otw]');
 function menu(o){H.classList.toggle('otw',o);if(przel)przel.setAttribute('aria-expanded',o?'true':'false')}
 if(przel)przel.addEventListener('click',function(){menu(!H.classList.contains('otw'))});
 document.querySelectorAll('.pelne a').forEach(function(a){a.addEventListener('click',function(){menu(false)})});
 addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});

 /* odkrywanie zdjec przy przewijaniu (tylko clip-path, tresc zawsze w DOM) */
 var el=document.querySelectorAll('.odkryj');
 if('IntersectionObserver' in window&&!RM){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{rootMargin:'0px 0px -6% 0px'});el.forEach(function(e){io.observe(e)})}
 else el.forEach(function(e){e.classList.add('on')});

 /* galeria pelnoekranowa: AMR.galeria({t,m,z:[{s,a,p}]}, start) ; s = sciezka bez .webp */
 var lb=document.getElementById('lb');if(!lb)return;
 var lI=document.getElementById('lbI'),lT=document.getElementById('lbT'),lM=document.getElementById('lbM'),lN=document.getElementById('lbN'),lA=document.getElementById('lbA'),lP=document.getElementById('lbP'),mini=document.getElementById('lbMini'),cur=null,k=0,ost=null;
 function src(z,m){return z.s+(m&&!z.bez?'-m':'')+'.webp'}
 function rys(){var z=cur.z[k];lI.classList.add('zmiana');var nw=new Image();nw.onload=function(){lI.src=nw.src;lI.classList.remove('zmiana')};nw.src=src(z);lI.alt=(z.p||cur.t);if(z.h){lI.style.height='min(100%,'+Math.round(z.h*1.7)+'px)';lI.style.width='auto'}else{lI.style.height='';lI.style.width=''}lN.textContent=d2(k+1)+' / '+d2(cur.z.length);lA.hidden=!z.a;lA.textContent=z.a||'';if(lP){lP.textContent=z.p||'';lP.hidden=!z.p}
  [].forEach.call(mini.children,function(b,j){b.classList.toggle('on',j===k);if(j===k)b.scrollIntoView({inline:'center',block:'nearest',behavior:RM?'auto':'smooth'})});
  if(cur.z.length>1){new Image().src=src(cur.z[(k+1)%cur.z.length]);new Image().src=src(cur.z[(k-1+cur.z.length)%cur.z.length])}}
 function otw(g,st){cur=g;k=st||0;ost=document.activeElement;lT.textContent=g.t;lM.textContent=g.m?' · '+g.m:'';mini.innerHTML='';
  g.z.forEach(function(z,j){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Zdjęcie '+(j+1));var im=document.createElement('img');im.alt='';im.loading='lazy';im.src=src(z,1);b.appendChild(im);b.onclick=function(){k=j;rys()};mini.appendChild(b)});
  lb.classList.add('on');document.body.style.overflow='hidden';rys();document.getElementById('lbZ').focus({preventScroll:true})}
 function zam(){lb.classList.remove('on');document.body.style.overflow='';if(ost&&ost.focus)ost.focus({preventScroll:true})}
 function kr(d){k=(k+d+cur.z.length)%cur.z.length;rys()}
 document.getElementById('lbZ').onclick=zam;
 document.getElementById('lbL').onclick=function(){kr(-1)};
 document.getElementById('lbR').onclick=function(){kr(1)};
 lb.addEventListener('click',function(e){if(e.target.classList.contains('lb-s'))zam()});
 addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')zam();else if(e.key==='ArrowLeft')kr(-1);else if(e.key==='ArrowRight')kr(1)});
 var x0=null,y0=0;
 lb.addEventListener('touchstart',function(e){if(e.target.closest('.lb-mini'))return;x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
 lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))kr(dx<0?1:-1);else if(dy>90)zam();x0=null});
 window.AMR={galeria:otw,zamknij:zam};
})();

/* mapa dojazdu (OSM odwrocone do ciemnej), uruchamiana gdy jest #mapa */
window.AMRmapa=function(){
 var el=document.getElementById('mapa');if(!el||!window.L)return;
 var zrob=function(){var P=[51.26825,22.50471];
  var m=L.map(el,{center:P,zoom:16,maxZoom:19,scrollWheelZoom:false,zoomControl:false});
  L.control.zoom({position:'bottomright'}).addTo(m);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(m);
  L.marker(P,{icon:L.divIcon({className:'',html:'<div class="znacznik"><i></i></div>',iconSize:[18,18],iconAnchor:[9,9]}),keyboard:false}).addTo(m);
  m.on('click',function(){m.scrollWheelZoom.enable()});m.on('mouseout',function(){m.scrollWheelZoom.disable()});};
 if('IntersectionObserver' in window){var o=new IntersectionObserver(function(e){if(e[0].isIntersecting){o.disconnect();zrob()}},{rootMargin:'300px'});o.observe(el)}else zrob();
};
