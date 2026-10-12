const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync('assets/rovic-ui.js', 'utf8');
function run(cancelled, nextPointer, keyboard = false, outside = false) {
  const handlers = {};
  const document = { addEventListener: (name, fn) => { handlers[name] = fn; } };
  const window = { addEventListener: (name, fn) => { handlers[name] = fn; } };
  vm.runInNewContext(source.slice(source.indexOf('  let drag;'), source.indexOf('  // Keep the product')), { document, window });
  const slider = { scrollWidth: 900, clientWidth: 300, scrollLeft: 0, contains: el => el === target, classList: { add() {}, remove() {} }, setPointerCapture() {}, hasPointerCapture() { return false; } };
  const target = { closest: s => s === 'slider-element' ? slider : null };
  handlers.pointerdown({target, pointerType:'mouse', button:0, pointerId:1, clientX:100});
  handlers.pointermove({pointerId:1, clientX:70, preventDefault(){}});
  handlers[cancelled ? 'pointercancel' : 'pointerup']({type:cancelled ? 'pointercancel' : 'pointerup',pointerId:1});
  if (nextPointer) handlers.pointerdown({target:{closest:()=>null}, pointerType:'mouse', button:0});
  let prevented = false;
  handlers.click({detail:keyboard?0:1,pointerId:keyboard?-1:1,target:outside?{}:target,preventDefault(){prevented=true;},stopImmediatePropagation(){}});
  return prevented;
}
const theme = fs.readFileSync('assets/theme.js','utf8');
const calls=[];
const context = {theme:{config:{motionReduced:true}}, Motion:{animate:(...args)=>calls.push(args)}, window:{matchMedia:()=>({matches:true})},document:{body:{getAttribute:()=> 'fill'}}};
vm.runInNewContext(theme.slice(theme.indexOf('  theme.HoverButton ='),theme.indexOf('  theme.MagnetButton =')), context);
const button = new context.theme.HoverButton({querySelector:()=>({}),addEventListener(){}});
button.load(); button.onEnterHandler({pointerType:'mouse'});
const results={scope:'Node event simulation of actual local source; not browser or live-store test', normalDragClickSuppressed:run(false,false), cancelledDragThenKeyboardClickSuppressed:run(true,false,true), cancelledDragThenMouseClickSuppressed:run(true,true), completedDragThenKeyboardClickSuppressed:run(false,false,true), unrelatedClickSuppressed:run(false,false,false,true), reducedMotionHoverAnimationCalls:calls.length, reducedMotionHoverDuration:calls[0]?.[2]?.duration};
const assert=require('node:assert/strict');
assert.equal(results.normalDragClickSuppressed,true);
for(const key of ['cancelledDragThenKeyboardClickSuppressed','cancelledDragThenMouseClickSuppressed','completedDragThenKeyboardClickSuppressed','unrelatedClickSuppressed']) assert.equal(results[key],false,key);
assert.equal(results.reducedMotionHoverDuration,0);
for(const root of ['.']) {
 const code=fs.readFileSync(`${root}/assets/theme.js`,'utf8');
 for(const reduced of [true,false]) {
  let options;
  const ctx={BaseElement:class{},window:{matchMedia:()=>({matches:reduced})},theme:{config:{rtl:false}},Flickity:function(el,opts){options=opts;this.on=()=>{};}};
  const start=code.indexOf('class SlideshowElement extends');
  vm.runInNewContext(code.slice(start,code.indexOf("customElements.define('slideshow-element'",start))+'\nglobalThis.Slide=SlideshowElement;',ctx);
  const slide=Object.create(ctx.Slide.prototype);
  slide.children=[{},{}];slide.hasAttribute=()=>true;slide.getAttribute=()=> '7';slide.bindEvents=()=>{};slide.onChange=()=>{};
  slide.init();assert.equal(options.autoPlay,reduced?false:7000);
 }
 const index=JSON.parse(fs.readFileSync(`${root}/templates/index.json`,'utf8').replace(/^\s*\/\*[\s\S]*?\*\//,''));
 assert.equal(index.sections.slideshow.settings.autoplay,false);
 assert.equal(index.sections.slideshow.settings.show_navigation,true);
}
results.slideshowModesAndHeroConfig='passed for GitHub theme';
fs.writeFileSync('ux-motion-audit-results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
