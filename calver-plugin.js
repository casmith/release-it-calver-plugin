'use strict';

const Plugin = require('release-it/lib/plugin/Plugin'),
    calver = require('calver'),
    DEFAULT_FORMAT = 'YY.MM.MICRO';

class CalverPlugin extends Plugin {

    getFormat() {
        return this.getContext().format || DEFAULT_FORMAT;
    }

    getIncrementedVersion({latestVersion}) {
        calver.init(this.getFormat());
        try {
          return calver.inc(this.getFormat(), latestVersion, 'calendar');
        } catch (e) {
          return calver.inc(this.getFormat(), latestVersion, 'micro');
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
