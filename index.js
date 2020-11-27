'use strict';

const Plugin = require('release-it/lib/plugin/Plugin'),
    Calver = require('calver'),
    DEFAULT_FORMAT = 'YY.MM.MICRO';

class CalverPlugin extends Plugin {

    getFormat() {
        return this.getContext().format || DEFAULT_FORMAT;
    }

    getIncrementedVersion({latestVersion}) {
        let calver = new Calver(this.getFormat(), latestVersion).inc();
        if (calver.get() === latestVersion) {
            calver = calver.inc('micro');
        }
        return calver.get();
    }

    getIncrementedVersionCI() {
        return this.getIncrementedVersion(...arguments);
    }

    getIncrement() {
        return this.getIncrementedVersion(...arguments);
    }
}

module.exports = CalverPlugin;
