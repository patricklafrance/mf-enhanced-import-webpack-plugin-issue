import { defineWebpackDevConfig } from "../src/defineWebpackDevConfig.js";

test("test webpack config", () => {
    const config = defineWebpackDevConfig();

    expect(config).not.toBeNull();
});