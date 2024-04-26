const config = {
    testEnvironment: "jsdom",
    transform: {
        // Must add the ".js" file extension because the files from @workleap/webpack-configs
        // are ESM only and therefore must be processed by SWC.
        "^.+\\.(js)$": ["@swc/jest", {
            jsc: {
                parser: {
                    syntax: "ecmascript"
                },
                target: "esnext"
            },
            module: {
                type: "es6"
            }
        }]
    }
};

export default config;
