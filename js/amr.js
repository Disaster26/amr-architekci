/* AMR - wspolny skrypt: warianty kolorow, menu, odkrywanie zdjec, galeria, mapa (generowany: gen4.py) */
(function(){
 var H=document.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var PAL=[{"id": "czern", "n": "Ciepła czerń", "t": "c", "pas": "#0A0A0A", "tlo": "#151413", "tx": "#C9C4BC", "ak": "#B79C6E"}, {"id": "grafit", "n": "Grafit", "t": "c", "pas": "#0B0B0B", "tlo": "#141414", "tx": "#C7C7C7", "ak": "#BDBDBD"}, {"id": "stal", "n": "Stal", "t": "c", "pas": "#0A0C0E", "tlo": "#131517", "tx": "#C5CACF", "ak": "#93A4B2"}, {"id": "antracyt", "n": "Ciepły antracyt", "t": "c", "pas": "#1A1816", "tlo": "#24211F", "tx": "#D2CCC2", "ak": "#C6A87C"}, {"id": "granat", "n": "Granat nocny", "t": "c", "pas": "#080C14", "tlo": "#0F1521", "tx": "#C3CAD6", "ak": "#C2A770"}, {"id": "oliwka", "n": "Oliwka", "t": "c", "pas": "#0B0C09", "tlo": "#151712", "tx": "#C8CABD", "ak": "#A9B27F"}, {"id": "mosiadz", "n": "Czerń i mosiądz", "t": "c", "pas": "#050505", "tlo": "#0D0D0C", "tx": "#CFC8BA", "ak": "#C9A45C"}, {"id": "papier", "n": "Ciepły papier", "t": "j", "pas": "#E2DCD1", "tlo": "#EBE6DD", "tx": "#3A352F", "ak": "#765B2C"}, {"id": "beton", "n": "Jasny beton", "t": "j", "pas": "#D8D9D8", "tlo": "#E2E3E2", "tx": "#353738", "ak": "#475763"}, {"id": "piasek", "n": "Piasek", "t": "j", "pas": "#DCD2C1", "tlo": "#E7DECE", "tx": "#3A3228", "ak": "#6E4C22"}],DOM='czern';
 function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
 function d2(n){return n<10?'0'+n:''+n}
 function pal(id){for(var i=0;i<PAL.length;i++)if(PAL[i].id===id)return PAL[i];return null}
 if(!pal(H.dataset.kolor))H.dataset.kolor=DOM;
 var meta=document.querySelector('meta[name=theme-color]');
 function koloruj(id){var p=pal(id)||pal(DOM);H.dataset.kolor=p.id;ls('amr-kolor',p.id);if(meta)meta.content=p.pas;zazn()}

 /* menu */
 var przel=document.querySelector('[data-otw]');
 function menu(o){H.classList.toggle('otw',o);if(przel)przel.setAttribute('aria-expanded',o?'true':'false')}
 if(przel)przel.addEventListener('click',function(){menu(!H.classList.contains('otw'))});
 document.querySelectorAll('.pelne a,.bok a').forEach(function(a){a.addEventListener('click',function(){menu(false)})});
 addEventListener('keydown',function(e){if(e.key==='Escape'){menu(false);pan(false)}});

 /* panel "Do wyboru" */
 function sw(p){return '<span class="wz" style="background:'+p.tlo+'"><i style="background:'+p.tx+'"></i><i style="background:'+p.ak+'"></i></span>'}
 var W=document.createElement('div');W.className='warianty';W.id='warianty';
 var h='<button type="button" class="w-przel" aria-expanded="false" aria-controls="wPanel"><b class="wz-akt"></b><span class="w-t">Kolory</span></button><div class="w-panel" id="wPanel" role="dialog" aria-label="Do wyboru: kolory i menu"><h3>Kolory strony</h3><div class="w-k">';
 PAL.forEach(function(p){h+='<button type="button" data-c="'+p.id+'">'+sw(p)+p.n+'</button>'});
 h+='</div><div class="w-sep"></div><h3>Menu</h3><div class="w-m"><button type="button" data-m="a" aria-label="Menu A: w pasku">A</button><button type="button" data-m="b" aria-label="Menu B: na cały ekran">B</button><button type="button" data-m="c" aria-label="Menu C: z boku">C</button></div></div>';
 W.innerHTML=h;var HW=document.querySelector('.pas-g .wrap');(HW||document.body).appendChild(W);
 var WP=W.querySelector('.w-przel');
 function pan(o){W.classList.toggle('otw',o);WP.setAttribute('aria-expanded',o?'true':'false')}
 WP.addEventListener('click',function(e){e.stopPropagation();pan(!W.classList.contains('otw'))});
 document.addEventListener('click',function(e){if(!W.contains(e.target))pan(false)});
 function zazn(){var p=pal(H.dataset.kolor);W.querySelector('.wz-akt').outerHTML=sw(p).replace('class="wz"','class="wz wz-akt"');
  W.querySelectorAll('[data-c]').forEach(function(b){var on=b.dataset.c===p.id;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on?'true':'false')});
  W.querySelectorAll('[data-m]').forEach(function(b){var on=b.dataset.m===H.dataset.menu;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on?'true':'false')})}
 W.querySelectorAll('[data-c]').forEach(function(b){b.addEventListener('click',function(){koloruj(b.dataset.c)})});
 W.querySelectorAll('[data-m]').forEach(function(b){b.addEventListener('click',function(){menu(false);H.dataset.menu=b.dataset.m;ls('amr-menu',b.dataset.m);zazn();pan(false);if(b.dataset.m!=='a')setTimeout(function(){menu(true)},150)})});
 if(['a','b','c'].indexOf(H.dataset.menu)<0)H.dataset.menu='a';
 koloruj(H.dataset.kolor);

 /* odkrywanie zdjec (tylko clip-path) */
 var el=document.querySelectorAll('.odkryj');
 if('IntersectionObserver' in window&&!RM){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{rootMargin:'0px 0px -5% 0px'});el.forEach(function(e){io.observe(e)})}
 else el.forEach(function(e){e.classList.add('on')});

 /* galeria: AMR.galeria({t,m,z:[{s,a,p,l}]}, start) ; s = sciezka bez .webp */
 var lb=document.getElementById('lb');if(!lb)return;
 var lI=document.getElementById('lbI'),lT=document.getElementById('lbT'),lM=document.getElementById('lbM'),lN=document.getElementById('lbN'),lA=document.getElementById('lbA'),lP=document.getElementById('lbP'),mini=document.getElementById('lbMini'),cur=null,k=0,ost=null;
 function src(z,m){if(m)return z.s+'-m.webp';return z.s+(z.l&&innerWidth*(devicePixelRatio||1)<1700?'-l':'')+'.webp'}
 function rys(){var z=cur.z[k];lI.classList.add('zmiana');var nw=new Image();nw.onload=function(){lI.src=nw.src;lI.classList.remove('zmiana')};nw.src=src(z);lI.alt=(z.p||cur.t);lN.textContent=d2(k+1)+' / '+d2(cur.z.length);lA.hidden=!z.a;lA.textContent=z.a||'';lP.textContent=z.p||'';lP.hidden=!z.p;
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
 document.querySelectorAll('[data-g]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();var G=window.AMRG||{};if(G[b.dataset.g])otw(G[b.dataset.g],+(b.dataset.i||0))})});
})();

/* mapa dojazdu (OSM; filtr kafelkow zalezy od wariantu kolorow) */
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
