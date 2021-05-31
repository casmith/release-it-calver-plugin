const expect    = require("chai").expect;
const CalverPlugin = require("./calver-plugin");

const formatMonth = (date) => "" + (date.getMonth() + 1);
const formatYear = (date) => "" + (date.getFullYear() - 2000);

describe('plugin', function () {
  it('should bump calendar when incrementing in a new month', function () {

    const before = new Date();
    before.setMonth(before.getMonth() - 2);
    console.log(before)
    const latestVersion = `${formatYear(before)}.${formatMonth(before)}.0`;
    console.log(latestVersion)
    const incrementedVersion = new CalverPlugin().getIncrementedVersion({latestVersion});

    const now = new Date();
    expect(incrementedVersion).to.equal(`${formatYear(now)}.${formatMonth(now)}.0`);
  });
  it('should bump micro when incrementing twice in the same month', function () {
    const now = new Date();
    const incrementedVersion = new CalverPlugin().getIncrementedVersion({latestVersion: `${formatYear(now)}.${formatMonth(now)}.0`});
    expect(incrementedVersion).to.equal(`${formatYear(now)}.${formatMonth(now)}.1`);
  });    
});
