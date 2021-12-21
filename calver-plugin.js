'use strict';

const Plugin = require('release-it/lib/plugin/Plugin'),
    calver = require('calver'),
    DEFAULT_FORMAT = 'YY.MM.MICRO',
    DEFAULT_INCREMENT = 'calendar',
    FALLBACK_INCREMENT = 'micro';

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
        calver.init(this.getFormat());
        try {
          return calver.inc(this.getFormat(), latestVersion, this.getInc());
        } catch (e) {
          return calver.inc(this.getFormat(), latestVersion, this.getFallbackInc());
        }
    }

    getIncrementedVersionCI() {
      return this.getIncrementedVersion(...arguments);
    }

    getIncrement() {
      return this.getIncrementedVersion(...arguments);
    }
}

module.exports = CalverPlugin;
