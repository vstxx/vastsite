(() => {
  const css = `
    /* Canonical Vast theme tokens, mirrored from src/renderer/styles/index.css. */
    :root{
      --bg:#050507;--bg-sub:#090a0e;
      --surface:rgba(255,255,255,.055);--surface-2:rgba(255,255,255,.09);--surface-solid:rgba(12,13,18,.98);--surface-hover:rgba(255,255,255,.09);
      --border-subtle:rgba(255,255,255,.08);--border:rgba(255,255,255,.14);--border-strong:rgba(255,255,255,.22);
      --text:#f5f7fb;--muted:#b4bbc8;--faint:#929aaa;--disabled:#717887;--button-text:#f5f7fb;
      --panel:rgba(8,9,13,.90);--shadow:0 14px 40px rgba(0,0,0,.30);color-scheme:dark;
    }
    html[data-ui-theme="dim"]{
      --bg:#151515;--bg-sub:#1b1b1b;
      --surface:rgba(255,255,255,.065);--surface-2:rgba(255,255,255,.10);--surface-solid:#292929;--surface-hover:rgba(255,255,255,.08);
      --border-subtle:rgba(255,255,255,.08);--border:rgba(255,255,255,.14);--border-strong:rgba(255,255,255,.22);
      --text:#f2f2f2;--muted:#b8b8b8;--faint:#999;--disabled:#737373;--button-text:#f2f2f2;
      --panel:rgba(27,27,27,.94);--shadow:0 6px 18px rgba(0,0,0,.15);color-scheme:dark;
    }
    html[data-ui-theme="light"]{
      --bg:#e9edf3;--bg-sub:#dde3eb;
      --surface:#f7f9fc;--surface-2:#fff;--surface-solid:#fff;--surface-hover:rgba(15,23,42,.075);
      --border-subtle:rgba(15,23,42,.15);--border:rgba(15,23,42,.24);--border-strong:rgba(15,23,42,.38);
      --text:#101827;--muted:#455269;--faint:#5c687b;--disabled:#8490a2;--button-text:#101827;
      --panel:#f8fafc;--shadow:0 14px 38px rgba(15,23,42,.14);color-scheme:light;
    }

    html,body{background:var(--bg)!important;color:var(--text)!important;transition:background .32s ease,color .24s ease}
    .app{background:
      radial-gradient(circle at 18% 0%,rgba(116,231,255,.08),transparent 30%),
      radial-gradient(circle at 90% 10%,rgba(183,167,255,.08),transparent 28%),
      var(--bg)!important;
      color:var(--text)!important;transition:background .32s ease,color .24s ease}
    html[data-ui-theme="dim"] .app{background:#151515!important}
    html[data-ui-theme="light"] .app{background:#e9edf3!important}
    .ambient,.grain{display:none!important}

    .vast-button,.pill{
      border-color:color-mix(in srgb,var(--border) 44%,transparent)!important;
      background:color-mix(in srgb,var(--surface) 76%,transparent)!important;
      color:var(--text)!important;
      box-shadow:inset 0 1px 0 color-mix(in srgb,var(--text) 4%,transparent),var(--shadow)!important;
    }
    .vast-button:hover:not(:disabled),.pill:hover{
      border-color:color-mix(in srgb,var(--accent) 44%,var(--border))!important;
      background:color-mix(in srgb,var(--accent) 12%,var(--surface-2))!important;
      color:var(--text)!important;
    }
    .vast-button--primary{
      border-color:color-mix(in srgb,var(--accent) 24%,var(--border))!important;
      background:color-mix(in srgb,var(--accent) 7%,var(--surface-2))!important;
    }
    .vast-button--primary:hover:not(:disabled){background:color-mix(in srgb,var(--accent) 12%,var(--surface-2))!important}
    .vast-button--selected,.pill.selected,.pill.on{
      border-color:color-mix(in srgb,var(--accent) 34%,var(--border))!important;
      background:color-mix(in srgb,var(--accent) 12%,var(--surface-2))!important;
      color:color-mix(in srgb,var(--accent) 76%,var(--text))!important;
    }
    html[data-ui-theme="light"] .vast-button,html[data-ui-theme="light"] .pill{
      background:#fff!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;
      box-shadow:0 5px 16px rgba(15,23,42,.10)!important;
    }
    html[data-ui-theme="light"] .vast-button:hover:not(:disabled),html[data-ui-theme="light"] .pill:hover{background:#eef2f7!important}
    html[data-ui-theme="light"] .vast-button--primary,html[data-ui-theme="light"] .vast-button--selected,html[data-ui-theme="light"] .pill.selected,html[data-ui-theme="light"] .pill.on{background:color-mix(in srgb,var(--accent) 15%,white)!important}

    .choice,.row,.extension-card,.extension-slot{border-color:var(--border)!important;background:color-mix(in srgb,var(--surface-solid) 94%,transparent)!important;color:var(--text)!important}
    .choice:hover,.row:hover,.extension-card:hover,.extension-slot:hover{background:var(--surface-hover)!important;border-color:var(--border-strong)!important}
    .choice.selected,.extension-card.installed,.extension-slot.added{border-color:color-mix(in srgb,var(--accent) 46%,var(--border))!important;background:color-mix(in srgb,var(--accent) 9%,var(--surface-solid))!important}
    html[data-ui-theme="light"] .choice,html[data-ui-theme="light"] .row,html[data-ui-theme="light"] .extension-card,html[data-ui-theme="light"] .extension-slot{background:#f8fafc!important;box-shadow:0 5px 16px rgba(15,23,42,.07)!important}
    html[data-ui-theme="light"] .choice:hover,html[data-ui-theme="light"] .row:hover,html[data-ui-theme="light"] .extension-card:hover,html[data-ui-theme="light"] .extension-slot:hover{background:#fff!important}

    .toggle{border-color:var(--border)!important;background:var(--surface)!important}.toggle::after{background:var(--muted)!important}.toggle.on{border-color:color-mix(in srgb,var(--accent) 40%,var(--border))!important;background:color-mix(in srgb,var(--accent) 26%,transparent)!important}.toggle.on::after{background:var(--accent)!important}
    .summary-chip{border-color:var(--border)!important;background:var(--surface)!important;color:var(--muted)!important}
    .nav-wrap{border-color:var(--border)!important;background:color-mix(in srgb,var(--panel) 92%,transparent)!important;box-shadow:var(--shadow)!important}
    html[data-ui-theme="dim"] .nav-wrap{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    html[data-ui-theme="light"] .nav-wrap{background:#f8fafc!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    .progress{background:color-mix(in srgb,var(--border-subtle) 68%,transparent)!important}
    .group-label,.choice-desc,.row-desc,.extension-slot-sub,.hub-label,.hub-note{color:var(--faint)!important}
    .subtitle,.muted{color:var(--muted)!important}

    .theme-dark{background:#050507!important}.theme-dim{background:#151515!important}.theme-light{background:#e9edf3!important}

    .intro-content{min-height:min(520px,70vh);display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:30px}
    .intro-logo{width:96px;height:96px;object-fit:contain;display:block;filter:drop-shadow(0 18px 44px color-mix(in srgb,var(--accent) 18%,transparent))}
    .intro-content .welcome-title{margin:0;white-space:nowrap}
    .intro-actions{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}

    .extension-hub-grid{width:min(900px,100%);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    .extension-slot{min-height:126px;padding:15px;border-radius:calc(var(--radius)*.55);display:flex;flex-direction:column;justify-content:space-between;gap:18px;text-align:left;transition:background .18s ease,border-color .18s ease,border-radius .2s ease,transform .18s ease}
    .extension-slot:hover{transform:translateY(-1px)}
    .extension-slot-head{display:flex;align-items:center;gap:11px;min-width:0}.extension-slot-icon{width:36px;height:36px;border:1px solid var(--border);border-radius:calc(var(--radius)*.34);background:var(--surface);display:grid;place-items:center;color:var(--muted);font-size:14px;flex:none}.extension-slot-meta{min-width:0}.extension-slot-title{font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.extension-slot-sub{margin-top:4px;font-size:10px}
    .extension-slot-bottom{display:flex;align-items:center;justify-content:space-between;gap:10px}.hub-label{font-size:9px;text-transform:uppercase;letter-spacing:.07em}.extension-slot .vast-button{height:2rem;min-width:5.2rem;padding:0 .72rem;font-size:.72rem}.hub-note{font-size:10px;margin-top:2px}

    @media(max-width:760px){.intro-content{min-height:66vh;gap:24px}.intro-logo{width:82px;height:82px}.extension-hub-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:480px){.extension-hub-grid{grid-template-columns:1fr}.intro-logo{width:76px;height:76px}}
  `;
  const style = document.createElement('style');
  style.id='vast-onboarding-v7';
  style.textContent=css;
  document.head.appendChild(style);

  const compat=document.createElement('div');
  compat.hidden=true;
  document.body.appendChild(compat);

  const intro=document.querySelector('.page[data-step="0"] .content');
  const useDefaults=document.getElementById('useDefaults');
  const configure=document.getElementById('configure');
  if(intro&&useDefaults&&configure){
    intro.classList.add('intro-content');
    intro.innerHTML=`<img class="intro-logo" src="/logos/vasticon.png" alt="Vast"><h1 class="welcome-title">Set it up your way.</h1><div class="intro-actions" id="introActions"></div>`;
    document.getElementById('introActions').append(useDefaults,configure);
  }

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
  document.getElementById('extensionHubSlots')?.addEventListener('click',e=>{
    const b=e.target.closest('[data-install-extension]');if(!b)return;
    const id=b.dataset.installExtension,card=b.closest('.extension-slot');
    if(installed.has(id)){installed.delete(id);b.textContent='Install';b.classList.remove('vast-button--selected');b.classList.add('vast-button--secondary');card.classList.remove('added')}
    else{installed.add(id);b.textContent='Added';b.classList.remove('vast-button--secondary');b.classList.add('vast-button--selected');card.classList.add('added')}
  });

  const summary=document.getElementById('summaryChips');
  if(summary){
    const cleanSummary=()=>{const chips=[...summary.children];if(chips.length>=5){const value=installed.size?`${installed.size} extension${installed.size===1?'':'s'} added`:'Extensions later';if(chips[3].textContent!==value)chips[3].textContent=value}};
    new MutationObserver(cleanSummary).observe(summary,{childList:true,subtree:true});
    cleanSummary();
  }
})();
