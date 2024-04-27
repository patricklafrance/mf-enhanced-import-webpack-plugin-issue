# mf-enhanced-import-webpack-plugin-issue

Related to the following issue: https://github.com/module-federation/universe/issues/2368.

The app contains 3 applications:
- An [host application](./packages/host/)
- A remote module named [remote-1](./packages/remote-1/)
- A remote module named [remote-2](./packages/remote-2/)

## Instructions to reproduce the issue

First install the dependencies with PNPM:

```bash
pnpm install
```

Then, start the solution by executing the following command at the root of the workspace:

```bash
pnpm dev
```

You should notice the following error in the console:

```
packages/host dev: import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
packages/host dev:          ^^^^^^^^^^^^^^^^^^^^^^
packages/host dev: SyntaxError: Named export 'ModuleFederationPlugin' not found. The requested module '@module-federation/enhanced/webpack' is a CommonJS module, which may not support all module.exports as named exports.
packages/host dev: CommonJS modules can always be imported via the default export, for example using:
packages/host dev: import pkg from '@module-federation/enhanced/webpack';
packages/host dev: const { ModuleFederationPlugin } = pkg;
packages/host dev:     at ModuleJob._instantiate (node:internal/modules/esm/module_job:134:21)
packages/host dev:     at async ModuleJob.run (node:internal/modules/esm/module_job:217:5)
packages/host dev:     at async ModuleLoader.import (node:internal/modules/esm/loader:323:24)
packages/host dev:     at async WebpackCLI.tryRequireThenImport (C:\Dev\poc\mf-enhanced-import-webpack-plugin-issue\node_modules\.pnpm\webpack-cli@5.1.4_webpack-dev-server@5.0.4_webpack@5.91.0\node_modules\webpack-cli\lib\webpack-cli.js:232:34)
packages/host dev:     at async loadConfigByPath (C:\Dev\poc\mf-enhanced-import-webpack-plugin-issue\node_modules\.pnpm\webpack-cli@5.1.4_webpack-dev-server@5.0.4_webpack@5.91.0\node_modules\webpack-cli\lib\webpack-cli.js:1406:27)
packages/host dev:     at async Promise.all (index 0)
packages/host dev:     at async WebpackCLI.loadConfig (C:\Dev\poc\mf-enhanced-import-webpack-plugin-issue\node_modules\.pnpm\webpack-cli@5.1.4_webpack-dev-server@5.0.4_webpack@5.91.0\node_modules\webpack-cli\lib\webpack-cli.js:1460:35)
packages/host dev:     at async WebpackCLI.createCompiler (C:\Dev\poc\mf-enhanced-import-webpack-plugin-issue\node_modules\.pnpm\webpack-cli@5.1.4_webpack-dev-server@5.0.4_webpack@5.91.0\node_modules\webpack-cli\lib\webpack-cli.js:1781:22)
packages/host dev:     at async Command.<anonymous> (C:\Dev\poc\mf-enhanced-import-webpack-plugin-issue\node_modules\.pnpm\@webpack-cli+serve@2.0.5_webpack-cli@5.1.4_webpack-dev-server@5.0.4_webpack@5.91.0\node_modules\@webpack-cli\serve\lib\index.js:81:30)
packages/host dev:     at async Command.parseAsync (C:\Dev\poc\mf-enhanced-import-webpack-plugin-issue\node_modules\.pnpm\commander@10.0.1\node_modules\commander\lib\command.js:935:5)
```

Now, go to the [packages/host/src/defineWebpackDevConfig.js](./packages/host/src/defineWebpackDevConfig.js) file and replace the following line:

```js
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
```

by:

```js
import ModuleFederation from "@module-federation/enhanced/webpack";
```

Then, replace:

```js
new ModuleFederationPlugin({
```

by:

```js
new ModuleFederation.ModuleFederationPlugin({
```

Execute the `pnpm dev` command again at the root of the workspace. The application should start and everything should now works as expected.

Great!

But there's another issue :(

The Jest test runner doesn't like:

```js
import ModuleFederation from "@module-federation/enhanced/webpack";
```

It throws the following error:

```
TypeError: Cannot read properties of undefined (reading 'ModuleFederationPlugin')
```

To reproduce the issue, execute the following command at the root of workspace:

```bash
pnpm test
```

You should get the following error:

```
TypeError: Cannot read properties of undefined (reading 'ModuleFederationPlugin')
```

In short, for the `@module-federation/enhanced` package, the webpack CLI requires:

```js
import ModuleFederation from "@module-federation/enhanced/webpack";
```

And the Jest CLI requires:

```js
import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
```

We're stuck!



