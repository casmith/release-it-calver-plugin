'use strict';

import { Plugin } from 'release-it';
import calver from 'calver/node/lts';
const DEFAULT_FORMAT = 'yy.mm.minor',
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
        try {
            return calver.inc(this.getFormat(), latestVersion, this.getInc());
        } catch {
            try {
                return calver.inc(this.getFormat(), latestVersion, this.getFallbackInc());
            } catch {
                return latestVersion;
            }
        }
    }

    getIncrementedVersionCI() {
      return this.getIncrementedVersion(...arguments);
    }

    getIncrement() {
      return this.getIncrementedVersion(...arguments);
    }
}

export default CalverPlugin;
