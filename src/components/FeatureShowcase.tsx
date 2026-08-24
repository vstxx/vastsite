const features = [
  'Session Timeline with snapshot browsing and restoration',
  'Isolated/private workspaces',
  'Per-workspace tabs and tab groups',
  'Workspace switching from the command palette',
  'Automatic previous-session restoration',
  'Session snapshots',
  'Capture selected page text as a quote',
  'Workspace-linked notes',
  'Page-linked notes',
  'Search across tabs, history, and bookmarks',
  'Validated shortcut configuration',
  'No analytics or telemetry',
  'Local-first data storage',
  'Sandboxed web content',
  'Context-isolated application interface',
  'Narrow, validated IPC bridge',
  'HTTPS-only mode',
  'Per-site permission overrides',
  'Redacted diagnostics reports',
  'Separate local password vault',
  'OS-backed encryption through Electron Safe Storage',
  'User-confirmed autofill',
  'Automatic inactive-tab hibernation',
  'Hard application RAM budget',
  'Automatic live-webview limiting',
  'Smart Unload dashboard',
  'Local, user-visible macros',
  'Workspace-opened triggers',
  'Time-based triggers while Vast is running',
  'Local macro run history and logs',
  'Optional OpenAI-compatible AI provider',
  'Custom provider base URL',
  'No automatic browsing-data transmission',
  'Manual local-network discovery',
  'No cloud upload of network data',
  'Local media utility dashboard',
  'Background job queue',
  'FFmpeg and Playwright integration',
  'Per-site spoofing disable overrides',
  'Automatic rolling backups',
  'Full Vast backup export',
  'User data preserved across updates and license changes',
];

export default function FeatureShowcase() {
  return (
    <div className="feature-wall-shell" data-feature-showcase="true">
      <div className="feature-wall__field" aria-hidden="true" />
      <ul className="feature-wall" aria-label="Vast features">
        {features.map((feature, index) => (
          <li className={`feature-wall__item feature-wall__item--${index % 5}`} key={feature}>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
