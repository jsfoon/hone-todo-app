// fixtures.js for v8 coverage
import { test as testBase, expect } from "@playwright/test";
import { addCoverageReport } from "monocart-reporter";

const test = testBase.extend({
  autoTestFixture: [
    async ({ page }, use) => {
      // NOTE: it depends on your project name
      const isChromium = test.info().project.name === "chromium";

      // console.log("autoTestFixture setup...");
      // coverage API is chromium only
      if (isChromium) {
        await Promise.all([
          page.coverage.startJSCoverage({
            resetOnNavigation: false,
          }),
          page.coverage.startCSSCoverage({
            resetOnNavigation: false,
          }),
        ]);
      }

      await use("autoTestFixture");

      // console.log('autoTestFixture teardown...');
      if (isChromium) {
        const [jsCoverage, cssCoverage] = await Promise.all([
          page.coverage.stopJSCoverage(),
          page.coverage.stopCSSCoverage(),
        ]);
        const coverageList = [...jsCoverage, ...cssCoverage];
        // console.log({ coverageList, info: test.info() });
        // console.log(coverageList.map((item) => item.url));
        await addCoverageReport(coverageList, test.info());
      }
    },
    {
      scope: "test",
      auto: true,
    },
  ],
});
export { test, expect };
