// ts-check

import HtmlWebpackPlugin from "html-webpack-plugin";
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
// import ModuleFederation from "@module-federation/enhanced/webpack";

export function defineWebpackBuildConfig() {
    /** @type {import("webpack").Configuration} */
    return {
        mode: "production",
        target: "web",
        entry: "./src/index.js",
        output: {
            // The trailing / is very important, otherwise paths will ne be resolved correctly.
            publicPath: "auto",
            uniqueName: "host-app"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "swc-loader"
                    }
                },
                {
                    // https://stackoverflow.com/questions/69427025/programmatic-webpack-jest-esm-cant-resolve-module-without-js-file-exten
                    test: /\.js/,
                    resolve: {
                        fullySpecified: false
                    }
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    type: "asset/resource"
                }
            ]
        },
        plugins: [
            // new ModuleFederation.ModuleFederationPlugin({
            new ModuleFederationPlugin({
                name: "host",
                remotes: {
                    "remote1": "remote1@http://localhost:8081/remoteEntry.js",
                    "remote2": "remote2@http://localhost:8082/remoteEntry.js"
                },
                shared: {
                    "react": {
                        singleton: true,
                        eager: true
                    },
                    "react-dom": {
                        singleton: true,
                        eager: true
                    },
                    "lodash": {
                        singleton: true,
                        eager: true
                    },
                    "useless-lib": {
                        singleton: true,
                        eager: true
                    }
                }
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            })
        ]
    };
}
