'use strict';

import { Plugin } from 'release-it';
import { cycle, initial } from 'calver';
const DEFAULT_CYCLE = 'month';

class CalverPlugin extends Plugin {

    getCycle() {
        return this.getContext().cycle || DEFAULT_CYCLE;
    }

    getIncrementedVersion(args) {
        const {latestVersion} = args || {};
        if (!latestVersion || latestVersion === '0.0.0') {
            return initial({cycle: this.getCycle()}) + '.0';
        }
        try {
            const result = cycle(latestVersion, {cycle: this.getCycle()});
            return result.includes('.') ? result : result + '.0';
        } catch {
            return latestVersion;
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
