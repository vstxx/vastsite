# Maintaining the release manifest

`manifest.json` is the source of truth for the website's release page. The page reads its release order, changelog, upgrade notes, and download links directly from this file.

## Add a release

1. Confirm the release is published and use its existing GitHub release assets. Treat published release tags and assets as immutable: do not replace, rename, or move them.
2. Add a record at the start of the `releases` array so the newest release appears first. Keep every prior release and its original asset URLs. Mark superseded releases `Legacy`.
3. Copy the exact version, previous version, publication date, release URL, documentation URL, asset filenames, byte counts, and SHA-256 digests from the published release. Do not calculate or estimate missing release metadata.
4. Use `changelog` sections for user-facing changes and `notes` for upgrade instructions, distribution differences, and limitations. Include only claims supported by the release evidence.

## Manifest fields

- `version`, `previousVersion`, `date`, and `channel` identify the release. Use the publication date in `YYYY-MM-DD` form and `Official` or `Legacy` for the channel.
- `description` is a short summary for the release card.
- `releaseUrl` links to the GitHub release page; `documentationUrl` links to its guide when one exists.
- `changelog` is an array of titled sections, each with an `items` array of user-facing changes.
- `notes` is an array of upgrade, security, or availability notices shown with the release.
- `files` is an array of downloadable GitHub release assets. Each file has a user-facing `label`, exact `file` name, `url`, display `size`, exact `bytes`, and lowercase hexadecimal `sha256` digest.

The current 0.5.0 record in `manifest.json` is the schema example. Its URLs point directly to the versioned GitHub release assets; executables are not uploaded to this website directory. Preserve those URLs for historical releases when adding newer records.
