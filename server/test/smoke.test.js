// server/test/smoke.test.js
const test = require("node:test");
const assert = require("node:assert/strict");

test("smoke: basic math should work", () => {
  assert.equal(1 + 1, 2);
});

// Demo fail: set CI_FORCE_FAIL=1 to make this test fail on purpose
test("demo: can force fail for PR gating", () => {
  if (process.env.CI_FORCE_FAIL === "1") {
    assert.fail("Forced failure because CI_FORCE_FAIL=1");
  }
});
