var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
/* theme */
var root=document.documentElement,tb=$('#th');
function sync(){var l=root.getAttribute('data-theme')==='light';tb.setAttribute('aria-pressed',l);tb.setAttribute('aria-label',l?'Switch to dark theme':'Switch to light theme')}
tb.onclick=function(){var n=root.getAttribute('data-theme')==='light'?'dark':'light';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}sync()};sync();
matchMedia('(prefers-color-scheme: light)').addEventListener('change',function(e){var s=null;try{s=localStorage.getItem('theme')}catch(x){}if(!s){root.setAttribute('data-theme',e.matches?'light':'dark');sync()}});
/* menu */
var bg=$('#bg'),mn=$('#menu');function cm(){mn.classList.remove('open');bg.setAttribute('aria-expanded','false')}
bg.onclick=function(){var o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
mn.addEventListener('click',function(e){if(e.target.tagName==='A')cm()});document.addEventListener('keydown',function(e){if(e.key==='Escape')cm()});
/* active nav + reveal */
try{
var lk=$$('#menu a'),so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)lk.forEach(function(a){a.setAttribute('aria-current',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
$$('main section').forEach(function(s){so.observe(s)});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});$$('.rv').forEach(function(x){io.observe(x)});
}catch(x){$$('.rv').forEach(function(el){el.classList.add('in')})}
/* skills */
var SK=[
{t:'Backend Engineering',d:'The core of my work: designing and building REST APIs with Python and Django, secured and documented for the teams that consume them.',b:['Python','Django','Django REST Framework','RESTful API design','JWT authentication','Django Channels','Postman','Swagger / OpenAPI'],a:[0,1,2,4],n:'Used in the Modalfit Italia, Blog API and Chat projects.'},
{t:'Databases & Infrastructure',d:'Data storage, real-time messaging and the upkeep that keeps sites fast, secure and recoverable.',b:['PostgreSQL','MySQL','SQLite','Redis','Git & GitHub','Speed optimization','Security hardening','Backups'],a:[0,3],n:'Deployment tooling such as Docker, Linux and Celery isn’t listed yet. Add it once you can back it up.',amber:1},
{t:'Web Development & E-commerce',d:'Complete websites, stores and learning platforms, built responsive and optimized for search.',b:['HTML5 & CSS3','JavaScript','PHP','WordPress','Elementor','Divi','WooCommerce','LearnDash LMS','Wix','Yoast SEO'],a:[3,4,6,7],n:'Used in the LMS, Wix store and business website projects.'},
{t:'Product & Systems Thinking',d:'Turning business requirements into software that works end to end, then keeping it healthy after launch.',b:['Technical problem-solving','Requirements to software','End-to-end delivery','Plugin conflict resolution','API documentation','Site maintenance'],a:[0,1,2],n:'10+ projects shipped across APIs, LMS and e-commerce.',amber:1}];
function showSk(i,f){var s=SK[i],p=$('#pn');p.setAttribute('data-n','0'+(i+1));p.setAttribute('aria-labelledby','t'+i);p.className='panel'+(s.amber?' amber':'');
p.innerHTML='<h3></h3><p></p><div class="badges"></div><div class="note"></div>';$('h3',p).textContent=s.t;$('p',p).textContent=s.d;$('.note',p).textContent='// '+s.n;
s.b.forEach(function(x,j){var e=document.createElement('span');e.textContent=x;if(s.a.indexOf(j)>-1)e.className='a';$('.badges',p).appendChild(e)});
$$('.tab').forEach(function(t,k){t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1});if(f)$('#t'+i).focus()}
$$('.tab').forEach(function(t){t.onclick=function(){showSk(+t.dataset.i)};t.onkeydown=function(e){var i=+t.dataset.i;if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();showSk((i+1)%4,1)}if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();showSk((i+3)%4,1)}}});showSk(0);
/* approach */
var ST=[
{t:'Request',h:'Clients call REST endpoints.',p:'Every endpoint is documented so front-end developers and testers can work against a clear contract.',l:['Postman collections','OpenAPI / Swagger docs']},
{t:'API layer',h:'Validate, authenticate, authorize.',p:'Django REST Framework handles serialization and routing, with token auth and role-based permissions where a project needs them.',l:['Django REST Framework','JWT authentication','Role-based permissions','Pagination and filtering']},
{t:'App logic',h:'Business rules live in Django apps.',p:'Domain logic is kept in focused Django apps, such as catalog, cart and orders in the Modalfit Italia API.',l:['Django','Python','Catalog · cart · orders']},
{t:'Database',h:'Structured, persistent data.',p:'Relational data is modeled and stored in PostgreSQL, with SQLite or MySQL used on smaller projects.',l:['PostgreSQL','MySQL / SQLite']},
{t:'Realtime',h:'Broadcast where latency matters.',p:'In the chat project, WebSockets and Redis deliver messages with low latency. This stage applies to that project only.',l:['Django Channels','WebSocket','Redis']}];
var fl=$('#fl'),dt=$('#dt');ST.forEach(function(s,i){var b=document.createElement('button');b.className='step';b.setAttribute('role','tab');b.id='s'+i;b.innerHTML='<small>0'+(i+1)+'</small>'+s.t;b.onclick=function(){showSt(i)};b.onkeydown=function(e){if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();showSt((i+1)%5,1)}if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();showSt((i+4)%5,1)}};fl.appendChild(b)});
function showSt(i,f){var s=ST[i];dt.setAttribute('aria-labelledby','s'+i);dt.innerHTML='<div><h3></h3><p></p></div><ul></ul>';$('h3',dt).textContent=s.h;$('p',dt).textContent=s.p;s.l.forEach(function(x){var li=document.createElement('li');li.textContent=x;$('ul',dt).appendChild(li)});$$('.step').forEach(function(b,k){b.setAttribute('aria-selected',k===i);b.tabIndex=k===i?0:-1});if(f)$('#s'+i).focus()}showSt(0);
/* form */
var F=$('#f'),R=[['n','en','Please enter your name.'],['e','ee','Please enter a valid email address.'],['s','es','Please add a subject.'],['m','em','Please write a message.']];
F.addEventListener('submit',function(ev){ev.preventDefault();var ok=true,st=$('#st');R.forEach(function(r){var i=$('#'+r[0]),v=i.value.trim(),bad=!v||(r[0]==='e'&&!/^\S+@\S+\.\S+$/.test(v));i.setAttribute('aria-invalid',bad);$('#'+r[1]).textContent=bad?r[2]:'';if(bad&&ok){i.focus();ok=false}});
if(!ok){st.textContent='Please fix the highlighted fields.';return}
var sb=$('#sb');sb.disabled=true;sb.textContent='Opening…';st.textContent='Preparing your email…';
setTimeout(function(){location.href='mailto:jemalarega35@gmail.com?subject='+encodeURIComponent($('#s').value)+'&body='+encodeURIComponent('Name: '+$('#n').value+'\nEmail: '+$('#e').value+'\n\n'+$('#m').value);sb.disabled=false;sb.textContent='Compose email →';st.textContent='Your email app should open with the message ready. It is only sent when you press send there.'},500)});