'use strict';

const Plugin = require('release-it/lib/plugin/Plugin'),
    calver = require('calver/node/lts'),
    DEFAULT_FORMAT = 'yy.mm.minor',
    DEFAULT_INCREMENT = 'calendar',
    FALLBACK_INCREMENT = 'minor';

class CalverPlugin extends Plugin {

    getFormat() {
        return this.getContext().format || DEFAULT_FORMAT;
    }

    getInc() {
        return this.getContext().increment || DEFAULT_INCREMENT;
    }

    getFallbackInc() {
        return this.getContext().fallbackIncrement || FALLBACK_INCREMENT;
    }

    getIncrementedVersion(args) {
        const {latestVersion} = args || {};
        const incrementedVersion = calver.inc(this.getFormat(), latestVersion, this.getInc());
        return incrementedVersion === latestVersion ? 
          calver.inc(this.getFormat(), latestVersion, this.getFallbackInc()): 
          incrementedVersion;
    }

    getIncrementedVersionCI() {
      return this.getIncrementedVersion(...arguments);
    }

    getIncrement() {
      return this.getIncrementedVersion(...arguments);
    }
}

module.exports = CalverPlugin;
