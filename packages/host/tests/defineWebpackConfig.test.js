import { defineWebpackConfig } from "../src/defineWebpackConfig.js";

test("test webpack config", () => {
    const config = defineWebpackConfig();

    expect(config).not.toBeNull();
});