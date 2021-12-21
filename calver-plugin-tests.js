const expect    = require("chai").expect;
const CalverPlugin = require("./calver-plugin");

const formatMonth = (date) => "" + (date.getMonth() + 1);
const formatYear = (date, fullYear = false) => "" + (date.getFullYear() - (fullYear ? 0 : 2000));

function versionFromDate(date, micro = 0, fullYear = false) {
  return `${formatYear(date, fullYear)}.${formatMonth(date)}.${micro}`;
}


describe('plugin', function () {
  it('should bump calendar when incrementing in a new month', function () {

    const before = new Date();
    before.setMonth(before.getMonth() - 2);
    const latestVersion = versionFromDate(before);
    const incrementedVersion = new CalverPlugin().getIncrementedVersion({latestVersion});

    const now = new Date();
    expect(incrementedVersion).to.equal(`${formatYear(now)}.${formatMonth(now)}.0`);
  });
  it('should bump micro when incrementing twice in the same month', function () {
    const now = new Date();
    const incrementedVersion = new CalverPlugin().getIncrementedVersion({latestVersion: versionFromDate(now)});
    expect(incrementedVersion).to.equal(versionFromDate(now, 1));
  });

  it('should acccept an increment option', function () {
    const before = new Date();
    before.setMonth(before.getMonth() - 2);
    const latestVersion = versionFromDate(before);
    const plugin = new CalverPlugin();
    plugin.setContext({increment: 'minor'});
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion});
    expect(incrementedVersion).to.equal(versionFromDate(before, 1));
  });
  it('should accept a format option', function () {
    const now = new Date();
    const latestVersion = versionFromDate(now, 0, true);
    const plugin = new CalverPlugin();
    plugin.setContext({format: 'yyyy.mm.minor'});
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion});
    expect(incrementedVersion).to.equal(versionFromDate(now, 1, true));
  });

  xit('should support alpha increment', function () {
    const now = new Date();
    const version = '2021.1.1.0-alpha.0';
    const plugin = new CalverPlugin();
    plugin.setContext({'increment': 'alpha', 'format': 'yyyy.mm.minor.patch'});
    const incrementedVersion = plugin.getIncrementedVersion({latestVersion: version});
    expect(incrementedVersion).to.equal('2021.1.1.0-alpha.1');
  });    
});
