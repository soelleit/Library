import getDevServerConfig from "./parts/devServer";
import paths from "./paths";
import { Configuration } from "webpack";

import { PartConfigurationCallback } from "./config";

const configure: PartConfigurationCallback = (options, merge, configs) => {

  const devTimeOptimizations: Configuration = {
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
    }
  };

  return {
    client: merge(
      configs.client,
      devTimeOptimizations,
      getDevServerConfig({...options, contentBase: paths.client.root, port: options.argv.port })
    )
  }
}

export default configure;
