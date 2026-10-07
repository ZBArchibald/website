// shared page background: injects the carpet layers and the top-right
// controls, then wires up replay and the info popover. Load it right after
// <body> opens so the background is in place before the page paints.
(function(){
  document.body.insertAdjacentHTML('afterbegin',`
<div class="controls">
  <div class="ctrl-wrap redo-wrap">
    <button class="ctrl" id="redoBtn" aria-label="Replay animation" title="Replay animation">
      <svg viewBox="0 0 24 24" fill="none" stroke="#141210" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>
    </button>
  </div>
  <div class="ctrl-wrap info-wrap">
    <button class="ctrl" id="infoBtn" aria-label="About the background">
      <svg viewBox="0 0 24 24" fill="none" stroke="#141210" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="7.5" r="0.4" fill="#141210" stroke="#141210" stroke-width="1.6"/></svg>
    </button>
    <div class="pop" id="infoPop" role="dialog" aria-label="About the background">
      The background is a tiling of the Sierpiński carpet, drawn iteration by iteration.
      <a href="https://en.wikipedia.org/wiki/Sierpi%C5%84ski_carpet" target="_blank" rel="noopener">Read on Wikipedia ↗</a>
    </div>
  </div>
</div>

<div class="carpet-wrap" aria-hidden="true">
  <div class="layer d1"></div>
  <div class="layer d2"></div>
  <div class="layer d3"></div>
  <div class="layer d4"></div>
  <div class="layer d5"></div>
</div>
`);

  // redo: restart the carpet layer animations
  const redoBtn=document.getElementById('redoBtn');
  redoBtn.addEventListener('click',()=>{
    document.querySelectorAll('.carpet-wrap .layer').forEach(el=>{
      el.style.animation='none';
      // force reflow so re-adding the class restarts it
      void el.offsetWidth;
      el.style.animation='';
    });
  });

  // info popup: tap/click toggles, click outside closes (works on mobile + desktop)
  (function(){
    const btn=document.getElementById('infoBtn');
    const pop=document.getElementById('infoPop');
    if(!btn||!pop) return;
    btn.addEventListener('click',(e)=>{e.stopPropagation();pop.classList.toggle('open');});
    pop.addEventListener('click',(e)=>e.stopPropagation());
    document.addEventListener('click',()=>pop.classList.remove('open'));
  })();
})();
