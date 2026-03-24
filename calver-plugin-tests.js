import {expect} from 'chai';
import CalverPlugin from './calver-plugin.js';

const formatMonth = (date) => "" + (date.getMonth() + 1);
const formatYear = (date) => "" + date.getFullYear();

function versionFromDate(date, minor = 0) {
  return `${formatYear(date)}-${formatMonth(date)}.${minor}`;
}


describe('plugin', function () {
  it('should bump calendar when incrementing in a new month', function () {
    const before = new Date();
    before.setMonth(before.getMonth() - 2);
    const latestVersion = versionFromDate(before);
    const incrementedVersion = new CalverPlugin().getIncrementedVersion({latestVersion});

    const now = new Date();
    expect(incrementedVersion).to.equal(versionFromDate(now, 0));
  });

  it('should bump minor when incrementing twice in the same month', function () {
    const now = new Date();
    const incrementedVersion = new CalverPlugin().getIncrementedVersion({latestVersion: versionFromDate(now)});
    expect(incrementedVersion).to.equal(versionFromDate(now, 1));
  });

  it('should accept a cycle option', function () {
    const now = new Date();
    const latestVersion = `${formatYear(now)}.0`;
    const plugin = new CalverPlugin();
    plugin.setContext({cycle: 'year'});
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion});
    expect(incrementedVersion).to.equal(`${formatYear(now)}.1`);
  });

  it('should bump calendar with year cycle', function () {
    const latestVersion = '2025.3';
    const plugin = new CalverPlugin();
    plugin.setContext({cycle: 'year'});
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion});
    const now = new Date();
    expect(incrementedVersion).to.equal(`${formatYear(now)}.0`);
  });

  it('should generate initial version when latestVersion is 0.0.0', function () {
    const now = new Date();
    const plugin = new CalverPlugin();
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion: '0.0.0'});
    expect(incrementedVersion).to.equal(versionFromDate(now, 0));
  });

  it('should generate initial version when no latestVersion', function () {
    const now = new Date();
    const plugin = new CalverPlugin();
    const incrementedVersion = plugin.getIncrementedVersion({});
    expect(incrementedVersion).to.equal(versionFromDate(now, 0));
  });

  it('should map deprecated format option to month cycle', function () {
    const now = new Date();
    const version = versionFromDate(now);
    const plugin = new CalverPlugin();
    plugin.setContext({format: 'yyyy.mm.minor'});
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion: version});
    expect(incrementedVersion).to.equal(versionFromDate(now, 1));
  });

  it('should map deprecated format option to year cycle', function () {
    const now = new Date();
    const latestVersion = `${formatYear(now)}.0`;
    const plugin = new CalverPlugin();
    plugin.setContext({format: 'yyyy.minor'});
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion});
    expect(incrementedVersion).to.equal(`${formatYear(now)}.1`);
  });

  it('should bump day cycle when date changes', function () {
    const now = new Date();
    const formatDay = (date) => "" + date.getDate();
    const plugin = new CalverPlugin();
    plugin.setContext({cycle: 'day'});
    const latestVersion = '2025-9-15.0';
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion});
    expect(incrementedVersion).to.equal(`${formatYear(now)}-${formatMonth(now)}-${formatDay(now)}.0`);
  });

  it('should bump day cycle minor on same day', function () {
    const now = new Date();
    const formatDay = (date) => "" + date.getDate();
    const plugin = new CalverPlugin();
    plugin.setContext({cycle: 'day'});
    const latestVersion = `${formatYear(now)}-${formatMonth(now)}-${formatDay(now)}.0`;
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion});
    expect(incrementedVersion).to.equal(`${formatYear(now)}-${formatMonth(now)}-${formatDay(now)}.1`);
  });

  it('should map deprecated yyyy.0m.0d.minor format to day cycle', function () {
    const now = new Date();
    const formatDay = (date) => "" + date.getDate();
    const plugin = new CalverPlugin();
    plugin.setContext({format: 'yyyy.0m.0d.minor'});
    const latestVersion = '2025-9-15.0';
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion});
    expect(incrementedVersion).to.equal(`${formatYear(now)}-${formatMonth(now)}-${formatDay(now)}.0`);
  });

  it('should work by calling getIncrement()', function () {
    const now = new Date();
    const version = versionFromDate(now);
    const plugin = new CalverPlugin();
    const incrementedVersion = plugin.getIncrement({latestVersion: version});
    expect(incrementedVersion).to.equal(versionFromDate(now, 1));
  });

  it('should work by calling getIncrementedVersionCI()', function () {
    const now = new Date();
    const version = versionFromDate(now);
    const plugin = new CalverPlugin();
    const incrementedVersion = plugin.getIncrementedVersionCI({latestVersion: version});
    expect(incrementedVersion).to.equal(versionFromDate(now, 1));
  });
});
