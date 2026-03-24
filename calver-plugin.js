'use strict';

import { Plugin } from 'release-it';
import { cycle, initial } from 'calver';
const DEFAULT_CYCLE = 'month';

const FORMAT_TO_CYCLE = {
    'yy.mm': 'month',
    'yyyy.mm': 'month',
    'yy.mm.minor': 'month',
    'yyyy.mm.minor': 'month',
    'yy.mm.minor.patch': 'month',
    'yyyy.mm.minor.patch': 'month',
    'yy.minor': 'year',
    'yyyy.minor': 'year',
    'yy.ww': 'week',
    'yyyy.ww': 'week',
    'yy.ww.minor': 'week',
    'yyyy.ww.minor': 'week',
    'yy.mm.dd': 'day',
    'yyyy.mm.dd': 'day',
    'yy.mm.dd.minor': 'day',
    'yyyy.mm.dd.minor': 'day',
    'yy.0m.0d.minor': 'day',
    'yyyy.0m.0d.minor': 'day',
    'yy.0m.minor': 'month',
    'yyyy.0m.minor': 'month',
};

function migrateVersion(version) {
    // Already in new format
    if (version.includes('-')) return version;
    // Expand 2-digit year to 4-digit
    let v = version.replace(/^(\d{2})\./, (_, yy) => '20' + yy + '.');
    // Day format: YYYY.MM.DD.minor → YYYY-MM-DD.minor
    v = v.replace(/^(\d{4})\.(\d{1,2})\.(\d{1,2})\.(\d+)$/, '$1-$2-$3.$4');
    // Month format: YYYY.MM.minor → YYYY-MM.minor
    if (!v.includes('-')) {
        v = v.replace(/^(\d{4})\.(\d{1,2})\.(\d+)$/, '$1-$2.$3');
    }
    return v;
}

function toSemverCompatible(version) {
    return version.replace(/-/g, '.');
}

class CalverPlugin extends Plugin {

    getPrefix() {
        return this.getContext().prefix || '';
    }

    getCycle() {
        const { cycle, format } = this.getContext();
        if (cycle) return cycle;
        if (format) {
            const mapped = FORMAT_TO_CYCLE[format.toLowerCase()];
            if (mapped) {
                this.log?.warn(`Deprecated: "format" option "${format}" is deprecated. Use "cycle": "${mapped}" instead.`);
                return mapped;
            }
        }
        return DEFAULT_CYCLE;
    }

    getIncrementedVersion(args) {
        const {latestVersion} = args || {};
        const prefix = this.getPrefix();
        const version = prefix && latestVersion?.startsWith(prefix)
            ? latestVersion.slice(prefix.length)
            : latestVersion;
        if (!version || version === '0.0.0') {
            return prefix + toSemverCompatible(initial({cycle: this.getCycle()})) + '.0';
        }
        try {
            const result = cycle(migrateVersion(version), {cycle: this.getCycle()});
            const normalized = result.includes('.') ? result : result + '.0';
            return prefix + toSemverCompatible(normalized);
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
