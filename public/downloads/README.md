# Publishing Vast releases

Upload release files into this directory, then add the release to `manifest.json`.

Example:

```json
{
  "releases": [
    {
      "version": "1.0.0",
      "date": "2026-08-17",
      "channel": "Stable",
      "notes": ["First public release", "Initial Windows build"],
      "files": [
        {
          "label": "Download for Windows",
          "file": "Vast-1.0.0-Setup.exe",
          "url": "https://example.com/Vast-1.0.0-Setup.exe",
          "size": "84 MB"
        }
      ]
    }
  ]
}
```
