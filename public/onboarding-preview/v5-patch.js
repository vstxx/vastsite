(() => {
  const css = `
    .page[data-step="0"].active ~ *{}
    .intro-content{position:relative;min-height:min(560px,72vh);display:flex;align-items:center;justify-content:center;overflow:visible}
    .intro-flow-wrap{position:absolute;left:50%;top:50%;width:min(920px,94vw);transform:translate(-50%,-50%);display:grid;place-items:center;transition:width .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1);will-change:transform,width}
    .intro-flow{display:block;width:100%;height:auto;mix-blend-mode:screen;pointer-events:none;user-select:none}
    .intro-copy{position:absolute;left:50%;top:50%;width:min(980px,96vw);transform:translate(-50%,-8%);display:flex;flex-direction:column;align-items:center;gap:30px;opacity:0;pointer-events:none;transition:opacity .5s ease,transform .7s cubic-bezier(.16,1,.3,1)}
    .intro-copy .welcome-title{margin:0;white-space:nowrap}
    .intro-content.intro-settled .intro-flow-wrap{width:min(250px,50vw);transform:translate(-50%,calc(-50% - 150px))}
    .intro-content.intro-ready .intro-copy{opacity:1;pointer-events:auto;transform:translate(-50%,3%)}
    .intro-content:not(.intro-ready) .welcome-actions{pointer-events:none}
    body.intro-running .ambient,body.intro-running .grain{opacity:0!important}
    body.intro-running{background:#000}
    .extension-hub-grid{width:min(900px,100%);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    .extension-slot{min-height:126px;padding:15px;border:1px solid var(--border);border-radius:calc(var(--radius)*.55);background:color-mix(in srgb,var(--surface-solid) 68%,transparent);display:flex;flex-direction:column;justify-content:space-between;gap:18px;text-align:left;transition:background .18s ease,border-color .18s ease,border-radius .2s ease,transform .18s ease}
    .extension-slot:hover{background:var(--surface-hover);border-color:var(--border-strong);transform:translateY(-1px)}
    .extension-slot.added{border-color:color-mix(in srgb,var(--accent) 40%,var(--border));background:color-mix(in srgb,var(--accent) 9%,var(--surface-solid))}
    .extension-slot-head{display:flex;align-items:center;gap:11px;min-width:0}.extension-slot-icon{width:36px;height:36px;border:1px solid var(--border);border-radius:calc(var(--radius)*.34);background:var(--surface);display:grid;place-items:center;color:var(--muted);font-size:14px;flex:none}.extension-slot-meta{min-width:0}.extension-slot-title{font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.extension-slot-sub{margin-top:4px;font-size:10px;color:var(--faint)}
    .extension-slot-bottom{display:flex;align-items:center;justify-content:space-between;gap:10px}.hub-label{font-size:9px;color:var(--faint);text-transform:uppercase;letter-spacing:.07em}.extension-slot .vast-button{height:2rem;min-width:5.2rem;padding:0 .72rem;font-size:.72rem}
    .hub-note{font-size:10px;color:var(--faint);margin-top:2px}
    @media(max-width:760px){.intro-content{min-height:68vh}.intro-content.intro-settled .intro-flow-wrap{width:min(205px,56vw);transform:translate(-50%,calc(-50% - 112px))}.intro-copy{gap:24px;transform:translate(-50%,6%)}.intro-content.intro-ready .intro-copy{transform:translate(-50%,12%)}.extension-hub-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:480px){.extension-hub-grid{grid-template-columns:1fr}.intro-flow-wrap{width:98vw}.intro-content.intro-settled .intro-flow-wrap{width:min(180px,58vw)}}
    @media(prefers-reduced-motion:reduce){.intro-flow-wrap,.intro-copy{transition:none!important}.extension-slot{transition:none!important}}
  `;
  const style = document.createElement('style'); style.id='vast-onboarding-v5'; style.textContent=css; document.head.appendChild(style);

  // Keep the original controls alive off-screen because the preview's existing
  // state renderer still references them after this visual replacement.
  const compat = document.createElement('div');
  compat.hidden = true;
  document.body.appendChild(compat);

  // Intro: preserve the real existing action buttons so their original handlers stay intact.
  const intro = document.querySelector('.page[data-step="0"] .content');
  const useDefaults = document.getElementById('useDefaults');
  const configure = document.getElementById('configure');
  if (intro && useDefaults && configure) {
    intro.classList.add('intro-content');
    intro.innerHTML = `<div class="intro-flow-wrap"><video class="intro-flow" id="introFlow" muted playsinline preload="auto" aria-label="Vast logo animation"></video></div><div class="intro-copy"><h1 class="welcome-title">Set it up your way.</h1><div class="welcome-actions" id="introActions"></div></div>`;
    document.getElementById('introActions').append(useDefaults, configure);
  }

  let flowUrl = null;
  let introRun = 0;
  const loadFlow = async () => {
    if (flowUrl) return flowUrl;
    const text = (await (await fetch('./vastflow.webm.b64?v=5', {cache:'force-cache'})).text()).trim();
    const raw = atob(text); const bytes = new Uint8Array(raw.length);
    for (let i=0;i<raw.length;i++) bytes[i]=raw.charCodeAt(i);
    flowUrl = URL.createObjectURL(new Blob([bytes],{type:'video/webm'}));
    return flowUrl;
  };
  const playIntro = async () => {
    const host=document.querySelector('.intro-content'), video=document.getElementById('introFlow');
    if(!host||!video)return;
    const run=++introRun;
    host.classList.remove('intro-settled','intro-ready');
    document.body.classList.add('intro-running');
    try{video.pause();video.currentTime=0;video.src=await loadFlow();await video.play();}catch(e){/* fall through to final state */}
    if(run!==introRun)return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){host.classList.add('intro-settled','intro-ready');document.body.classList.remove('intro-running');return}
    const finish=()=>{if(run!==introRun)return;host.classList.add('intro-settled');setTimeout(()=>{if(run!==introRun)return;host.classList.add('intro-ready');document.body.classList.remove('intro-running')},900)};
    if(video.ended)finish();else video.onended=finish;
    setTimeout(()=>{if(run===introRun&&!host.classList.contains('intro-settled'))finish()},6700);
  };
  playIntro();
  const introPage=document.querySelector('.page[data-step="0"]');
  if(introPage)new MutationObserver(()=>{if(introPage.classList.contains('active'))playIntro()}).observe(introPage,{attributes:true,attributeFilter:['class']});

  // Replace the fixed adblock/password-provider choice with Extension Hub slots.
  const extContent=document.querySelector('.page[data-step="4"] .content');
  const oldAdblock=document.getElementById('adblockToggle');
  const oldProviders=document.getElementById('providerOptions');
  if(oldAdblock)compat.appendChild(oldAdblock)
  if(oldProviders)compat.appendChild(oldProviders)
  const slots=[['✦','Featured extension','Recommended from the Hub'],['◉','Privacy extension','Privacy & security'],['⌘','Productivity extension','Workflow & productivity'],['◫','Appearance extension','Themes & customization'],['↗','Utility extension','Useful browser tools'],['</>','Developer extension','Developer tools']];
  if(extContent){
    extContent.innerHTML=`<h2 class="stagger" style="--delay:10ms">Pick a few extensions.</h2><p class="subtitle stagger" style="--delay:60ms">Install what you want now. Everything else can wait.</p><div class="setup-block"><div class="group stagger" style="--delay:100ms"><div class="group-label">Recommended from Extensions Hub</div><div class="extension-hub-grid" id="extensionHubSlots">${slots.map((x,i)=>`<article class="extension-slot" data-extension-slot="${i}"><div class="extension-slot-head"><div class="extension-slot-icon">${x[0]}</div><div class="extension-slot-meta"><div class="extension-slot-title">${x[1]}</div><div class="extension-slot-sub">${x[2]}</div></div></div><div class="extension-slot-bottom"><span class="hub-label">Extensions Hub</span><button class="vast-button vast-button--secondary" type="button" data-install-extension="${i}">Install</button></div></article>`).join('')}</div><div class="hub-note">Preview slots — production onboarding will populate these directly from Extensions Hub.</div></div></div>`;
  }
  const installed=new Set();
  document.getElementById('extensionHubSlots')?.addEventListener('click',e=>{const b=e.target.closest('[data-install-extension]');if(!b)return;const id=b.dataset.installExtension, card=b.closest('.extension-slot');if(installed.has(id)){installed.delete(id);b.textContent='Install';b.classList.remove('vast-button--selected');b.classList.add('vast-button--secondary');card.classList.remove('added')}else{installed.add(id);b.textContent='Added';b.classList.remove('vast-button--secondary');b.classList.add('vast-button--selected');card.classList.add('added')}});

  // Original renderer still paints its provider into the finish summary. Replace only that chip.
  const summary=document.getElementById('summaryChips');
  if(summary){
    const cleanSummary=()=>{const chips=[...summary.children];if(chips.length>=5){chips[3].textContent=installed.size?`${installed.size} extension${installed.size===1?'':'s'} added`:'Extensions later'}};
    new MutationObserver(cleanSummary).observe(summary,{childList:true,subtree:true});
    cleanSummary();
  }
})();
