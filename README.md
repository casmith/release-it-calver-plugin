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

## Migrating from older versions

### From format/increment to cycle

The `format`, `increment`, and `fallbackIncrement` options are deprecated but still supported. The plugin will automatically map them to the appropriate `cycle` setting.

| Old format | New cycle |
|---|---|
| `yy.mm.minor`, `yyyy.mm.minor` | `month` |
| `yy.minor`, `yyyy.minor` | `year` |
| `yy.ww.minor`, `yyyy.ww.minor` | `week` |
| `yy.mm.dd.minor`, `yyyy.mm.dd.minor` | `day` |

### Version format changes

Older versions of this plugin used 2-digit years (e.g. `24.11.0`). The current version always uses 4-digit years (e.g. `2024.11.0`). Existing tags in the old format are automatically migrated when computing the next version.

More information on calendar versioning can be found here: [calver](https://github.com/muratgozel/node-calver)
