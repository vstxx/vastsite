(() => {
  const css = `
    /* Onboarding itself is intentionally always pure black. The selected browser
       theme is a product choice, not a preview-page theme. */
    :root,
    html[data-ui-theme="dim"],
    html[data-ui-theme="light"]{
      --bg:#000;--bg-sub:#000;--surface:rgba(255,255,255,.052);--surface-hover:rgba(255,255,255,.086);--surface-solid:#0a0a0c;
      --border:rgba(255,255,255,.09);--border-strong:rgba(255,255,255,.16);--text:#f5f7fb;--muted:#aeb4bf;--faint:#757c88;
      --shadow:0 22px 70px rgba(0,0,0,.30);--button-text:#f5f7fb;color-scheme:dark;
    }
    html,body,.app{background:#000!important;background-image:none!important}
    body{background-color:#000!important}
    .ambient,.grain{display:none!important;opacity:0!important;background:none!important}
    html[data-ui-theme="light"] .vast-button{border-color:rgba(255,255,255,.09);background:rgba(17,16,23,.68);color:var(--text);box-shadow:inset 0 1px 0 rgba(255,255,255,.045),0 8px 24px rgba(0,0,0,.1)}
    html[data-ui-theme="light"] .vast-button:hover:not(:disabled){border-color:color-mix(in srgb,var(--accent) 44%,rgba(255,255,255,.09));background:color-mix(in srgb,var(--accent) 14%,rgba(17,16,23,.68));color:#fff}
    html[data-ui-theme="light"] .vast-button--primary{background:rgba(25,22,34,.76)}
    html[data-ui-theme="light"] .vast-button--primary:hover:not(:disabled){background:#1a1822}
    html[data-ui-theme="light"] .vast-button--selected{background:color-mix(in srgb,var(--accent) 12%,rgba(17,16,23,.68))}
    html[data-ui-theme="light"] .pill{border-color:rgba(255,255,255,.09);background:rgba(17,16,23,.68);color:var(--text);box-shadow:inset 0 1px 0 rgba(255,255,255,.045),0 8px 24px rgba(0,0,0,.1)}
    html[data-ui-theme="light"] .pill:hover{border-color:color-mix(in srgb,var(--accent) 44%,rgba(255,255,255,.09));background:color-mix(in srgb,var(--accent) 14%,rgba(17,16,23,.68));color:#fff}
    html[data-ui-theme="light"] .pill.selected,html[data-ui-theme="light"] .pill.on{background:color-mix(in srgb,var(--accent) 12%,rgba(17,16,23,.68))}
    html[data-ui-theme="light"] .nav-wrap{background:rgba(7,7,8,.90)}

    .page[data-step="0"].active ~ *{}
    .intro-content{position:relative;min-height:min(560px,72vh);display:flex;align-items:center;justify-content:center;overflow:visible}
    .intro-flow-wrap{
      --flow-final-scale:.39;--flow-final-y:-150px;
      position:absolute;left:50%;top:50%;width:min(920px,94vw);display:grid;place-items:center;
      transform:translate3d(-50%,-50%,0) translate3d(0,0,0) scale(1);transform-origin:50% 50%;
      transition:transform .9s cubic-bezier(.16,1,.3,1);will-change:transform;contain:layout paint style;
      backface-visibility:hidden;-webkit-backface-visibility:hidden;
    }
    .intro-flow{
      display:block;width:100%;height:auto;aspect-ratio:4/1;object-fit:contain;background:#000;
      pointer-events:none;user-select:none;transform:translateZ(0);will-change:transform;
      backface-visibility:hidden;-webkit-backface-visibility:hidden;contain:layout paint style;
    }
    .intro-copy{position:absolute;left:50%;top:50%;width:min(980px,96vw);transform:translate3d(-50%,-8%,0);display:flex;flex-direction:column;align-items:center;gap:30px;opacity:0;pointer-events:none;transition:opacity .5s ease,transform .7s cubic-bezier(.16,1,.3,1);will-change:opacity,transform}
    .intro-copy .welcome-title{margin:0;white-space:nowrap}
    .intro-content.intro-settled .intro-flow-wrap{transform:translate3d(-50%,-50%,0) translate3d(0,var(--flow-final-y),0) scale(var(--flow-final-scale))}
    .intro-content.intro-ready .intro-copy{opacity:1;pointer-events:auto;transform:translate3d(-50%,3%,0)}
    .intro-content:not(.intro-ready) .welcome-actions{pointer-events:none}

    .extension-hub-grid{width:min(900px,100%);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    .extension-slot{min-height:126px;padding:15px;border:1px solid var(--border);border-radius:calc(var(--radius)*.55);background:color-mix(in srgb,var(--surface-solid) 68%,transparent);display:flex;flex-direction:column;justify-content:space-between;gap:18px;text-align:left;transition:background .18s ease,border-color .18s ease,border-radius .2s ease,transform .18s ease}
    .extension-slot:hover{background:var(--surface-hover);border-color:var(--border-strong);transform:translateY(-1px)}
    .extension-slot.added{border-color:color-mix(in srgb,var(--accent) 40%,var(--border));background:color-mix(in srgb,var(--accent) 9%,var(--surface-solid))}
    .extension-slot-head{display:flex;align-items:center;gap:11px;min-width:0}.extension-slot-icon{width:36px;height:36px;border:1px solid var(--border);border-radius:calc(var(--radius)*.34);background:var(--surface);display:grid;place-items:center;color:var(--muted);font-size:14px;flex:none}.extension-slot-meta{min-width:0}.extension-slot-title{font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.extension-slot-sub{margin-top:4px;font-size:10px;color:var(--faint)}
    .extension-slot-bottom{display:flex;align-items:center;justify-content:space-between;gap:10px}.hub-label{font-size:9px;color:var(--faint);text-transform:uppercase;letter-spacing:.07em}.extension-slot .vast-button{height:2rem;min-width:5.2rem;padding:0 .72rem;font-size:.72rem}
    .hub-note{font-size:10px;color:var(--faint);margin-top:2px}

    @media(max-width:760px){
      .intro-content{min-height:68vh}.intro-flow-wrap{--flow-final-scale:.31;--flow-final-y:-112px;width:min(920px,96vw)}
      .intro-copy{gap:24px;transform:translate3d(-50%,6%,0)}.intro-content.intro-ready .intro-copy{transform:translate3d(-50%,12%,0)}
      .extension-hub-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    }
    @media(max-width:480px){.extension-hub-grid{grid-template-columns:1fr}.intro-flow-wrap{--flow-final-scale:.28;width:min(920px,98vw)}}
    @media(prefers-reduced-motion:reduce){.intro-flow-wrap,.intro-copy{transition:none!important}.extension-slot{transition:none!important}}
  `;
  const style = document.createElement('style'); style.id='vast-onboarding-v6'; style.textContent=css; document.head.appendChild(style);

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
    intro.innerHTML = `<div class="intro-flow-wrap"><video class="intro-flow" id="introFlow" muted playsinline preload="auto" disablepictureinpicture aria-label="Vast logo animation"></video></div><div class="intro-copy"><h1 class="welcome-title">Set it up your way.</h1><div class="welcome-actions" id="introActions"></div></div>`;
    document.getElementById('introActions').append(useDefaults, configure);
  }

  // The source GIF is not used at runtime. It is transcoded to a ~13 KB 960x240
  // H.264 one-shot. Hardware video decode + transform-only compositor animation
  // is cheaper and more reliable than running a custom WebGL shader every frame.
  let flowUrl = null;
  let flowPromise = null;
  let introRun = 0;
  const loadFlow = () => {
    if (flowPromise) return flowPromise;
    flowPromise = (async () => {
      const response = await fetch('./vastflow.mp4.b64?v=6', {cache:'force-cache'});
      if (!response.ok) throw new Error(`Vast Flow ${response.status}`);
      const text = (await response.text()).trim();
      const raw = atob(text); const bytes = new Uint8Array(raw.length);
      for (let i=0;i<raw.length;i++) bytes[i]=raw.charCodeAt(i);
      flowUrl = URL.createObjectURL(new Blob([bytes],{type:'video/mp4'}));
      return flowUrl;
    })();
    return flowPromise;
  };
  loadFlow();

  const prepareVideo = async video => {
    const url = await loadFlow();
    if (video.dataset.sourceReady === '1') return;
    video.src = url;
    video.dataset.sourceReady = '1';
    video.load();
    if (video.readyState < 3) await new Promise(resolve => {
      const done=()=>{video.removeEventListener('canplay',done);video.removeEventListener('error',done);resolve()};
      video.addEventListener('canplay',done,{once:true});
      video.addEventListener('error',done,{once:true});
    });
  };

  const playIntro = async () => {
    const host=document.querySelector('.intro-content'), video=document.getElementById('introFlow');
    if(!host||!video)return;
    const run=++introRun;
    host.classList.remove('intro-settled','intro-ready');
    try{
      await prepareVideo(video);
      if(run!==introRun)return;
      video.pause();
      video.currentTime=0;
      await video.play();
    }catch(e){/* deterministic fallback below */}
    if(run!==introRun)return;

    const finish=()=>{
      if(run!==introRun||host.classList.contains('intro-settled'))return;
      video.pause();
      host.classList.add('intro-settled');
      setTimeout(()=>{if(run!==introRun)return;host.classList.add('intro-ready')},900);
    };

    if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish();host.classList.add('intro-ready');return}
    video.onended=finish;
    if(video.ended)finish();
    setTimeout(finish,6400);
  };
  playIntro();
  const introPage=document.querySelector('.page[data-step="0"]');
  if(introPage)new MutationObserver(()=>{if(introPage.classList.contains('active'))playIntro()}).observe(introPage,{attributes:true,attributeFilter:['class']});

  // Replace the fixed adblock/password-provider choice with Extension Hub slots.
  const extContent=document.querySelector('.page[data-step="4"] .content');
  const oldAdblock=document.getElementById('adblockToggle');
  const oldProviders=document.getElementById('providerOptions');
  if(oldAdblock)compat.appendChild(oldAdblock);
  if(oldProviders)compat.appendChild(oldProviders);
  const slots=[['✦','Featured extension','Recommended from the Hub'],['◉','Privacy extension','Privacy & security'],['⌘','Productivity extension','Workflow & productivity'],['◫','Appearance extension','Themes & customization'],['↗','Utility extension','Useful browser tools'],['</>','Developer extension','Developer tools']];
  if(extContent){
    extContent.innerHTML=`<h2 class="stagger" style="--delay:10ms">Pick a few extensions.</h2><p class="subtitle stagger" style="--delay:60ms">Install what you want now. Everything else can wait.</p><div class="setup-block"><div class="group stagger" style="--delay:100ms"><div class="group-label">Recommended from Extensions Hub</div><div class="extension-hub-grid" id="extensionHubSlots">${slots.map((x,i)=>`<article class="extension-slot" data-extension-slot="${i}"><div class="extension-slot-head"><div class="extension-slot-icon">${x[0]}</div><div class="extension-slot-meta"><div class="extension-slot-title">${x[1]}</div><div class="extension-slot-sub">${x[2]}</div></div></div><div class="extension-slot-bottom"><span class="hub-label">Extensions Hub</span><button class="vast-button vast-button--secondary" type="button" data-install-extension="${i}">Install</button></div></article>`).join('')}</div><div class="hub-note">Preview slots — production onboarding will populate these directly from Extensions Hub.</div></div></div>`;
  }
  const installed=new Set();
  document.getElementById('extensionHubSlots')?.addEventListener('click',e=>{const b=e.target.closest('[data-install-extension]');if(!b)return;const id=b.dataset.installExtension, card=b.closest('.extension-slot');if(installed.has(id)){installed.delete(id);b.textContent='Install';b.classList.remove('vast-button--selected');b.classList.add('vast-button--secondary');card.classList.remove('added')}else{installed.add(id);b.textContent='Added';b.classList.remove('vast-button--secondary');b.classList.add('vast-button--selected');card.classList.add('added')}});

  // Original renderer still paints its provider into the finish summary. Replace only that chip.
  const summary=document.getElementById('summaryChips');
  if(summary){
    const cleanSummary=()=>{const chips=[...summary.children];if(chips.length>=5){const value=installed.size?`${installed.size} extension${installed.size===1?'':'s'} added`:'Extensions later';if(chips[3].textContent!==value)chips[3].textContent=value}};
    new MutationObserver(cleanSummary).observe(summary,{childList:true,subtree:true});
    cleanSummary();
  }
})();
