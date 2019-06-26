import { Part, PartOptions } from "./Part";
import {
  HotModuleReplacementPlugin,
  NamedModulesPlugin
} from "webpack";
import { Configuration } from "webpack-dev-server";

interface ConfigureDevServerPartCallback {
  (partOptions: DevServerPartOptions, config: Configuration): Configuration;
}

interface DevServerPartOptions extends PartOptions {
  contentBase: string;
  port?: number;
  configure?: ConfigureDevServerPartCallback;
}

const useCurrentConfig: ConfigureDevServerPartCallback = (_: any, config) => config;

export const DevServerPart: Part<DevServerPartOptions> = (partOptions) => {
  const {
    development = false,
    port = 5000,
    contentBase,
    configure = useCurrentConfig
  } = partOptions;

  return {
    devServer: configure(partOptions, {
        host: "0.0.0.0",
        quiet: false,
        public: `localhost:${port}`,
        contentBase,
        compress: true,
        port: port,
        hot: true,
        stats: {
            chunks: false,
            assets: false,
            timings: true,
            warnings: true,
            errors: true,
            children: false,
            chunkModules: false,
            modules: false,
            chunkOrigins: false
        },
        overlay: {
            warnings: true,
            errors: true
        },
    }),
    plugins:[
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin()
    ]
  }
}

export default DevServerPart;
