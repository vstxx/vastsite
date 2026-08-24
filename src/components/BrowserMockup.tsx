type TabConfig = {
  label: string;
  iconColor?: string;
  iconText?: string;
  active?: boolean;
  useMark?: boolean;
};

const TABS: TabConfig[] = [
  { label: 'Repositories', iconColor: '#e6edf3' },
  { label: 'YouTube', iconColor: '#ff0000' },
  { label: 'New tab', iconColor: '#465064', iconText: 'N', active: true },
];

export default function BrowserMockup() {
  return (
    <div
      data-browser-shot-source="true"
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#07070d',
        boxShadow:
          '0 60px 120px rgba(0,0,0,0.95), 0 20px 40px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.07)',
        userSelect: 'none',
        width: '100%',
      }}
    >
      {/* Top chrome */}
      <div
        style={{
          height: '38px',
          background: '#09090f',
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          overflow: 'hidden',
        }}
      >
        {/* Workspace selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginRight: '6px',
            padding: '0 10px',
            height: '24px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 500,
            color: 'rgba(236,239,248,0.92)',
            background: 'rgba(255,255,255,0.055)',
            border: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#55b6ff',
              flexShrink: 0,
              boxShadow: '0 0 6px rgba(85,182,255,0.65)',
            }}
          />
          Research
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.42)" strokeWidth="2.5" style={{ marginLeft: '1px' }}>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {TABS.map(({ label, iconColor, iconText, active, useMark }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 12px',
              height: '26px',
              marginRight: '4px',
              fontSize: '11px',
              color: active ? 'rgba(244,247,255,0.94)' : 'rgba(228,228,235,0.34)',
              background: active ? 'rgba(28,31,41,0.98)' : 'rgba(255,255,255,0.035)',
              borderRadius: '8px',
              border: active
                ? '1px solid rgba(100,175,255,0.42)'
                : '1px solid rgba(255,255,255,0.05)',
              minWidth: 0,
              flexShrink: 0,
              maxWidth: active ? '116px' : '128px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              boxShadow: active
                ? 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(15,39,68,0.12)'
                : 'inset 0 1px 0 rgba(255,255,255,0.02)',
            }}
          >
            {useMark ? (
              <img
                src="/logos/v-v.png"
                alt=""
                style={{
                  width: '12px',
                  height: '12px',
                  objectFit: 'contain',
                  opacity: active ? 0.76 : 0.4,
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: iconColor,
                  flexShrink: 0,
                  opacity: active ? 0.9 : 0.75,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: '7px',
                  fontWeight: 700,
                }}
              >
                {iconText}
              </div>
            )}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
          </div>
        ))}

        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '6px',
            color: 'rgba(255,255,255,0.36)',
            flexShrink: 0,
          }}
        >
          +
        </div>

        <div style={{ flex: 1 }} />

        {/* Windows controls */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, height: '38px' }}>
          {(['─', '⬜', '✕'] as const).map((title, i) => (
            <div
              key={i}
              style={{
                width: i === 2 ? '44px' : '40px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: i === 2 ? '10px' : '9px',
                color: 'rgba(255,255,255,0.22)',
              }}
            >
              {title}
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div
        style={{
          height: '42px',
          background: '#0f1018',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', color: 'rgba(255,255,255,0.18)' }}>
          <div style={{ padding: '4px 4px', display: 'flex', alignItems: 'center', opacity: 0.4 }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ padding: '4px 4px', display: 'flex', alignItems: 'center', opacity: 0.22 }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Reload */}
        <div style={{ color: 'rgba(255,255,255,0.20)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M23 4v6h-6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div
          style={{
            flex: 1,
            height: '30px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(123,83,191,0.26)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: '8px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span style={{ fontSize: '12px', color: 'rgba(228,228,235,0.22)', letterSpacing: '-0.01em', flex: 1 }}>
            Search or enter address
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.8">
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          </svg>
        </div>

        <div style={{ display: 'flex', gap: '10px', color: 'rgba(255,255,255,0.2)', alignItems: 'center', flexShrink: 0 }}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
          </svg>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="19" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* New tab page */}
      <div
        style={{
          minHeight: 'clamp(340px, 35vw, 430px)',
          background:
            'radial-gradient(ellipse 32% 22% at 50% 34%, rgba(96,72,156,0.15) 0%, rgba(42,31,68,0.12) 16%, rgba(13,12,20,0.92) 44%, #08080d 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(56px, 7vw, 84px) 24px',
          gap: 0,
        }}
      >
        <img
          src="/logos/vast.png"
          alt="Vast"
          style={{
            height: 'clamp(22px, 2.7vw, 32px)',
            width: 'auto',
            objectFit: 'contain',
            opacity: 0.92,
            marginBottom: '14px',
          }}
        />

        <div
          style={{
            fontSize: '10px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.34)',
            marginBottom: '8px',
            letterSpacing: '0.01em',
          }}
        >
          Research workspace
        </div>

        <div
          style={{
            fontSize: 'clamp(18px, 2.1vw, 24px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.82)',
            marginBottom: '6px',
            fontFamily: 'InterDisplay, system-ui, sans-serif',
          }}
        >
          13:01
        </div>

        <div
          style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.24)',
            marginBottom: 'clamp(24px, 3.2vw, 32px)',
            letterSpacing: '0.01em',
          }}
        >
          Tuesday 2 June
        </div>

        <div
          style={{
            width: 'clamp(320px, 58%, 640px)',
            height: '42px',
            background: 'rgba(255,255,255,0.048)',
            border: '1px solid rgba(255,255,255,0.075)',
            borderRadius: '21px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '10px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.015)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.22)', letterSpacing: '-0.01em' }}>
            Search or enter address
          </span>
        </div>
      </div>
    </div>
  );
}
