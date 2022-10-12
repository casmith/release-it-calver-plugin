# release-it-calver-plugin

## Calender Versioning (calver) plugin for Release It!

[![codecov](https://codecov.io/gh/casmith/release-it-calver-plugin/branch/master/graph/badge.svg?token=HKW5RKSQYW)](https://codecov.io/gh/casmith/release-it-calver-plugin)

This plugin enables Calendar Versioning (calver) with Release It! This is especially useful for application projects in a continuous delivery environment. 

```
npm install --save-dev @csmith/release-it-calver-plugin
```

In [release-it](https://github.com/release-it/release-it) config:

```json
"plugins": {
  "@csmith/release-it-calver-plugin": {
    "format": "yyyy.mm.minor",
    "increment": "calendar"
  }
}
```

#### Configuration examples:

##### Defaults
```json
{
    "format": "yy.mm.minor",
    "increment": "calendar",
    "fallbackIncrement": "minor"
}
```
##### Output in November and December 2024
```
2024.11.0
2024.11.1
2024.12.1
2024.12.2
```

##### Custom
```json
{
    "format": "yyyy.mm.minor",
    "increment": "calendar.minor"
}
```
##### Output in November and December 2024
```
2024.11.0
2024.11.1
2024.12.0
2024.12.1
```

More information on available format tags can be found here: [calver](https://github.com/muratgozel/node-calver)
