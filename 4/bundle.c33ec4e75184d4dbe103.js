(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",d="year",u="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},_=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:_,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+_(i,2,"0")+":"+_(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,a=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:d,w:o,d:a,D:u,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",$={};$[y]=v;var g="$isDayjsObject",b=function(e){return e instanceof T||!(!e||!e[g])},M=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();$[r]&&(s=r),n&&($[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;$[o]=t,s=o}return!i&&s&&(y=s),s||!i&&y},D=function(e,t){if(b(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new T(n)},O=m;O.l=M,O.i=b,O.w=function(e,t){return D(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var T=function(){function v(e){this.$L=M(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var _=v.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(O.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return O},_.isValid=function(){return!(this.$d.toString()===p)},_.isSame=function(e,t){var n=D(e);return this.startOf(t)<=n&&n<=this.endOf(t)},_.isAfter=function(e,t){return D(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<D(e)},_.$g=function(e,t,n){return O.u(e)?this[t]:this.set(n,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var n=this,c=!!O.u(t)||t,p=O.p(e),f=function(e,t){var i=O.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(a)},h=function(e,t){return O.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,_=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case d:return c?f(1,0):f(31,11);case l:return c?f(1,_):f(0,_+1);case o:var $=this.$locale().weekStart||0,g=(v<$?v+7:v)-$;return f(c?m-g:m+(6-g),_);case a:case u:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,t){var o,c=O.p(e),p="set"+(this.$u?"UTC":""),f=(o={},o[a]=p+"Date",o[u]=p+"Date",o[l]=p+"Month",o[d]=p+"FullYear",o[r]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[c],h=c===a?this.$D+(t-this.$W):t;if(c===l||c===d){var v=this.clone().set(u,1);v.$d[f](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[O.p(e)]()},_.add=function(n,c){var u,p=this;n=Number(n);var f=O.p(c),h=function(e){var t=D(p);return O.w(t.date(t.date()+Math.round(e*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===d)return this.set(d,this.$y+n);if(f===a)return h(1);if(f===o)return h(7);var v=(u={},u[s]=e,u[r]=t,u[i]=1e3,u)[f]||1,_=this.$d.getTime()+n*v;return O.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=O.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,d=n.meridiem,u=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},f=function(e){return O.s(r%12||12,e,"0")},v=d||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(h,(function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return O.s(t.$y,4,"0");case"M":return o+1;case"MM":return O.s(o+1,2,"0");case"MMM":return u(n.monthsShort,o,c,3);case"MMMM":return u(c,o);case"D":return t.$D;case"DD":return O.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return u(n.weekdaysMin,t.$W,l,2);case"ddd":return u(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(r);case"HH":return O.s(r,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return v(r,a,!0);case"A":return v(r,a,!1);case"m":return String(a);case"mm":return O.s(a,2,"0");case"s":return String(t.$s);case"ss":return O.s(t.$s,2,"0");case"SSS":return O.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(n,u,p){var f,h=this,v=O.p(u),_=D(n),m=(_.utcOffset()-this.utcOffset())*e,y=this-_,$=function(){return O.m(h,_)};switch(v){case d:f=$()/12;break;case l:f=$();break;case c:f=$()/3;break;case o:f=(y-m)/6048e5;break;case a:f=(y-m)/864e5;break;case r:f=y/t;break;case s:f=y/e;break;case i:f=y/1e3;break;default:f=y}return p?f:O.a(f)},_.daysInMonth=function(){return this.endOf(l).$D},_.$locale=function(){return $[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=M(e,t,!0);return i&&(n.$L=i),n},_.clone=function(){return O.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},v}(),w=T.prototype;return D.prototype=w,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",d],["$D",u]].forEach((function(e){w[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),D.extend=function(e,t){return e.$i||(e(t,T,D),e.$i=!0),D},D.locale=M,D.isDayjs=b,D.unix=function(e){return D(1e3*e)},D.en=$[y],D.Ls=$,D.p={},D}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};(()=>{"use strict";n.d(i,{t:()=>g,P:()=>b});function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class s{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class a{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var o=n(484),l=n.n(o);function c(e,t){return e?l()(e).format(t):""}const d="HH:mm",u="DD/MM/YY HH:mm",p=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],f=p[0],h=()=>({type:f,offers:[]});class v{constructor({point:e,destination:t,destinations:n,offers:i,addedOffers:s}){this.point=e,this.destination=t,this.destinations=n,this.offers=i,this.addedOffers=s}getTemplate(){return function(e=(()=>({basePrice:0,dateFrom:(new Date).toISOString(),dateTo:(new Date).toISOString(),destination:"",isFavorite:!1,offers:[],type:f}))(),t={description:"",name:"",pictures:[]},n,i=h()){const{id:s,type:r,basePrice:a,dateFrom:o,dateTo:l}=e,{name:d,description:v,pictures:_}=t,m=c(o,u),y=c(l,u);return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-${s}">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${r}.png" alt="Event ${r} icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${s}" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${$=p,g=r,$.map((e=>`\n    <div class="event__type-item">\n      <input id="event-type-${e}-1" class="event__type-input  visually-hidden"  type="radio" name="event-type" value="${e}" ${g===e?"checked":""}>\n      <label class="event__type-label  event__type-label--${e}"  for="event-type-${e}-1">${e}</label>\n    </div>`)).join("")}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-${s}">\n              ${r}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-${s}" type="text" name="event-destination" value="${d}" list="destination-list-${s}">\n            <datalist id="destination-list-${s}">\n              ${(e=>e.map((({name:e})=>`\n    <option value="${e}"></option>`)).join(""))(n)}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-${s}">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-${s}" type="text" name="event-start-time" value="${m}">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-${s}">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-${s}" type="text" name="event-end-time" value="${y}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-${s}">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-${s}" type="text" name="event-price" value="${a}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">\n            ${(e=>e?"Delete":"Cancel")(s)}\n          </button>\n          ${(e=>e?'\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>':"")(s)}\n        </header>\n        <section class="event__details">\n\n          ${((e,t,n)=>{let i=e.find((e=>e.type===n));return i||(i=h()),i.offers.length?`\n    <section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n      <div class="event__available-offers">\n        ${((e,t,n)=>e.offers.map((({id:e,title:i,price:s})=>{const r=t.offers.includes(e)?"checked":"";return`\n      <div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e}" type="checkbox" name="event-offer-${n}-${e}" ${r}/>\n        <label class="event__offer-label" for="event-offer-${e}">\n          <span class="event__offer-title">${i} ${e}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${s}</span>\n        </label>\n      </div>`})).join(""))(i,t,n)}\n      </div>\n    </section>`:""})(i,e,r)}\n\n          ${((e,t,n)=>{return e||n.length?`\n    <section class="event__section  event__section--destination">\n      ${((e,t)=>e?`\n    <h3 class="event__section-title  event__section-title--destination">${t}</h3>\n    <p class="event__destination-description">${e}</p>`:"")(e,t)}\n      ${i=n,i.length?`\n  <div class="event__photos-container">\n    <div class="event__photos-tape">\n      ${i.map((({src:e})=>`\n      <img class="event__photo" src="${e}" alt="Event photo">`)).join("")}\n    </div>\n  </div>`:""}\n    </section>`:"";var i})(v,d,_)}\n        </section>\n      </form>\n    </li>`;var $,g}(this.point,this.destination,this.destinations,this.offers,this.addedOffers)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class _{constructor({point:e,destination:t,offers:n}){this.point=e,this.destination=t,this.offers=n}getTemplate(){return function(e,t,n){const{type:i,basePrice:s,dateFrom:r,dateTo:a,isFavorite:o}=e,{name:l}=t,u=c(r,"MMM DD");return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${c(r,"YYYY-MM-DD")}">${u}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event ${i} icon">\n        </div>\n        <h3 class="event__title">${i} ${l}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${r}">${c(r,d)}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${a}">${c(a,d)}</time>\n          </p>\n          <p class="event__duration">30M</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${s}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${(e=>e.map((({title:e,price:t})=>`\n  <li class="event__offer">\n    <span class="event__offer-title">${e}</span>\n    &plus;&euro;&nbsp;\n    <span class="event__offer-price">${t}</span>\n  </li>`)).join(""))(n)}\n        </ul>\n        <button class="event__favorite-btn event__favorite-btn${p=o,(e=>Boolean(e))(p)?"--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`;var p}(this.point,this.destination,this.offers)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const m=[{id:"1",basePrice:100,dateFrom:"2024-09-07T15:40:00",dateTo:"2024-09-07T16:00:00",destination:"1",isFavorite:!1,offers:["1","2"],type:"taxi"},{id:"2",basePrice:1e3,dateFrom:"2024-09-11T12:30:00",dateTo:"2024-09-11T18:00:00",destination:"2",isFavorite:!0,offers:[],type:"flight"},{id:"3",basePrice:500,dateFrom:"2024-10-01T10:00:00",dateTo:"2024-10-02T12:00:00",destination:"3",isFavorite:!1,offers:["1"],type:"drive"},{id:"4",basePrice:2e3,dateFrom:"2024-10-05T20:20:00",dateTo:"2024-10-06T17:10:00",destination:"4",isFavorite:!1,offers:["1","2"],type:"train"},{id:"5",basePrice:1e4,dateFrom:"2024-11-25T15:00:00",dateTo:"2024-12-20T12:00:00",destination:"5",isFavorite:!0,offers:["1"],type:"ship"}],y=[{id:"1",description:"London is the capital of the United Kingdom. The city is home to many attractions, such as Buckingham Palace and the Tower",name:"London",pictures:[{src:"http://placehold.it/300x200",description:"London img 1"},{src:"http://placehold.it/300x200",description:"London img 2"},{src:"http://placehold.it/300x200",description:"London img 3"},{src:"http://placehold.it/300x200",description:"London img 4"},{src:"http://placehold.it/300x200",description:"London img 5"}]},{id:"2",description:"Moscow is the capital of the Russian Federation. The city is home to many attractions, such as Red Square and the Kremlin",name:"Moscow",pictures:[{src:"http://placehold.it/300x200",description:"Moscow img 1"}]},{id:"3",description:"",name:"Petropavlovsk-Kamchatsky",pictures:[]},{id:"4",description:"Krasnodar is a city in Russia. The city is home to many attractions, including the Krasnodar Museum of Local Lore and Krasnaya Polyana Park",name:"Krasnodar",pictures:[{src:"http://placehold.it/300x200",description:"Krasnodar img 1"},{src:"http://placehold.it/300x200",description:"Krasnodar img 2"}]},{id:"5",description:"",name:"Antarctica",pictures:[]}],$=[{type:"taxi",offers:[{id:"1",title:"Offer taxt. Upgrade to a premium class",price:120},{id:"2",title:"Offer taxt. Upgrade to a business class",price:150},{id:"3",title:"Offer taxt. The silent driver",price:500}]},{type:"flight",offers:[]},{type:"drive",offers:[{id:"1",title:"Offer drive. Green eye taxi",price:0}]},{type:"train",offers:[{id:"1",title:"Offer train. Branded tea",price:15},{id:"2",title:"Offer train. The compartment car",price:90},{id:"3",title:"Offer train. Stop on demand",price:15e3}]},{type:"ship",offers:[{id:"1",title:"Offer ship. Sail away into the sunset",price:0}]}],g=document.querySelector(".trip-controls__filters"),b=document.querySelector(".trip-events"),M=new class{constructor(){this.points=m,this.offers=$,this.destinations=y}getPoints(){return this.points}getOffers(){return this.offers}getDestinations(){return this.destinations}getOfferByType(e){return this.getOffers().find((t=>t.type===e))}getOfferById(e,t){return this.getOfferByType(e).offers.filter((e=>t.find((t=>t===e.id))))}getDestinationById(e){return this.getDestinations().find((t=>t.id===e))}},D=new class{listComponent=new a;constructor({pointsModel:e}){this.pointsModel=e}init(){this.listPoints=[...this.pointsModel.getPoints()],t(new s,g),t(new r,b),t(this.listComponent,b),t(new v({destinations:this.pointsModel.getDestinations(),offers:this.pointsModel.getOffers()}),this.listComponent.getElement()),t(new v({point:this.listPoints[0],destination:this.pointsModel.getDestinationById(this.listPoints[0].destination),destinations:this.pointsModel.getDestinations(),offers:this.pointsModel.getOffers()}),this.listComponent.getElement()),this.listPoints.forEach((e=>{t(new _({point:e,destination:this.pointsModel.getDestinationById(e.destination),offers:this.pointsModel.getOfferById(e.type,e.offers)}),this.listComponent.getElement())}))}}({pointsModel:M});D.init()})()})();
//# sourceMappingURL=bundle.c33ec4e75184d4dbe103.js.map