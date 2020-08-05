# release-it-calver-plugin

## Calender Versioning (calver) plugin for Release It!

This plugin enables Calendar Versioning (calver) with Release It! This is especially useful for application projects in a continuous delivery environment. 

```
npm install --save-dev @release-it/bumper
```

In [release-it](https://github.com/release-it/release-it) config:

```json
"plugins": {
  "@casmith/release-it-calver-plugin": {
    "format": "YYYY.MM.MICRO"
  }
}
```

More information on available format tags can be found here: [calver](https://github.com/muratgozel/node-calver)
