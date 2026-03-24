# release-it-calver-plugin

## Calendar Versioning (calver) plugin for Release It!

[![codecov](https://codecov.io/gh/casmith/release-it-calver-plugin/branch/master/graph/badge.svg?token=HKW5RKSQYW)](https://codecov.io/gh/casmith/release-it-calver-plugin)

This plugin enables Calendar Versioning (calver) with Release It! This is especially useful for application projects in a continuous delivery environment.

```
npm install --save-dev @csmith/release-it-calver-plugin
```

In [release-it](https://github.com/release-it/release-it) config:

```json
"plugins": {
  "@csmith/release-it-calver-plugin": {
    "cycle": "month"
  }
}
```

## Configuration

| Option | Description | Default | Values |
|---|---|---|---|
| `cycle` | The calendar cycle to use | `month` | `year`, `month`, `week`, `day`, `auto` |
| `prefix` | String to prepend to the version | `""` | Any string |
| `separator` | Separator between date segments | `"."` | `"."` or `"-"` |

### Cycle options

#### `year`

Versions contain only the year and a minor number.

```
2026.0
2026.1
2027.0
```

#### `month` (default)

Versions contain the year, month, and a minor number.

```
2026.3.0
2026.3.1
2026.4.0
```

#### `week`

Versions contain the year, week number, and a minor number.

```
2026.13.0
2026.13.1
2026.14.0
```

#### `day`

Versions contain the year, month, day, and a minor number.

Note: 4-segment versions (e.g. `2026.3.24.0`) are not valid semver and will be rejected by `npm version`. If you publish to npm, either use a different cycle or set `"npm": { "skipChecks": true }` in your release-it config.

```
2026.3.24.0
2026.3.24.1
2026.3.25.0
```

### Prefix

Useful for monorepos where multiple modules need distinct version tags.

```json
"@csmith/release-it-calver-plugin": {
    "cycle": "month",
    "prefix": "ui-"
}
```

Produces versions like `ui-2026.3.0`, `ui-2026.3.1`, etc.

### Separator

By default, all date segments are separated by `.` for npm semver compatibility. Set to `"-"` to use dash-separated output (calver-native format). Only use this if you don't need npm compatibility.

```json
"@csmith/release-it-calver-plugin": {
    "cycle": "month",
    "separator": "-"
}
```

Produces versions like `2026-3.0`, `2026-3.1`, etc.

Dash-separated versions are not valid semver, so you will also need to configure release-it to skip npm version checks:

```json
"npm": {
    "skipChecks": true
}
```

## Upgrading from pre-calver 24.x versions

This plugin now uses [calver 24.x](https://github.com/muratgozel/node-calver), which is a complete rewrite of the calver library. The plugin handles the transition automatically, but there are some things to be aware of.

### What happens automatically

- **Old config still works.** The `format`, `increment`, and `fallbackIncrement` options are deprecated but still supported. The plugin maps them to the new `cycle` setting and logs a deprecation warning. You can upgrade your config at your own pace.
- **Old tags are migrated.** Existing tags in the old format (e.g. `24.11.0` or `2024.11.0`) are automatically converted when computing the next version. No manual retagging is needed.
- **Initial versions work.** If your repository has no prior calver tags (or only a `0.0.0` tag), the plugin now correctly generates an initial version instead of returning `0.0.0`.

### What changes

- **4-digit years.** Versions now always use 4-digit years. If your previous tags used 2-digit years (e.g. `24.11.0`), the next version will use 4-digit years (e.g. `2026.3.0`).
- **Simplified config.** The `format` and `increment` options are replaced by a single `cycle` option. See the table below for the mapping.

### Config mapping

| Old config | New config |
|---|---|
| `"format": "yy.mm.minor", "increment": "calendar"` | `"cycle": "month"` |
| `"format": "yyyy.mm.minor", "increment": "calendar"` | `"cycle": "month"` |
| `"format": "yyyy.minor", "increment": "calendar"` | `"cycle": "year"` |
| `"format": "yyyy.ww.minor", "increment": "calendar"` | `"cycle": "week"` |
| `"format": "yyyy.mm.dd.minor", "increment": "calendar"` | `"cycle": "day"` |
| `"format": "yyyy.0m.minor"` | `"cycle": "month"` |
| `"format": "yyyy.0m.0d.minor"` | `"cycle": "day"` |

### Example upgrade

Before:
```json
"@csmith/release-it-calver-plugin": {
    "format": "yyyy.mm.minor",
    "increment": "calendar",
    "fallbackIncrement": "minor"
}
```

After:
```json
"@csmith/release-it-calver-plugin": {
    "cycle": "month"
}
```

More information on calendar versioning can be found here: [calver](https://github.com/muratgozel/node-calver)
