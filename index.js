'use strict';

const Plugin = require('release-it/lib/plugin/Plugin'),
    Calver = require('calver'),
    DEFAULT_FORMAT = 'YY.MM.MICRO';

class CalverPlugin extends Plugin {

    getFormat() {
        return this.getContext().format || DEFAULT_FORMAT;
    }
    
    getIncrementedVersion({latestVersion}) {
        return new Calver(this.getFormat(), latestVersion).inc().get();
    }

    getIncrementedVersionCI() {
        return this.getIncrementedVersion(...arguments);
    }
}

module.exports = CalverPlugin;