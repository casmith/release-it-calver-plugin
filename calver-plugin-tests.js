const expect    = require("chai").expect;
const CalverPlugin = require("./calver-plugin");

describe('plugin', function () {
  	it('should bump micro when incrementing', function () {
		const now = new Date();
        const year = now.getFullYear().toString().substr(2);
        const month = new Date().getMonth() + 1;

        const incrementedVersion = new CalverPlugin().getIncrementedVersion({latestVersion: `${year}.${month}.0`});
    	expect(incrementedVersion).to.equal(`${year}.${month}.1`);
  	});
});
