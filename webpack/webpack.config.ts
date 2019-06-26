import merge from "webpack-merge";
import paths from "./paths";
import {ProvidePlugin} from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { TargetConfigs, PartConfigurationCallback } from "./config";
import { ImagesPart, TypescriptPart, PartOptions } from "./parts";
import config from "../package.json";
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const getBaseClientConfig = (options: PartOptions) => {
  return merge(
    {
      context: paths.client.root,
      entry: {
          main: paths.client.entry,
      },
      output:{
        path: paths.client.output
      },
      plugins: [
          new HtmlWebpackPlugin({
              title: 'Custom template',
              template: "index.ejs",
              filename: 'index.html',
              chunksSortMode: 'dependency',
              meta: {
                "keywords": config.keywords.join(),
                "description": config.description
              }
          }),
          new ProvidePlugin({
              Promise: 'es6-promise-promise',
          })
      ]
    },
    ImagesPart({...options }),
    TypescriptPart({...options, tsconfig: paths.tsconfig })
  );
}

const getBaseServerConfig = (options: PartOptions) => {
  return merge({
    context: paths.server.root,
    entry: {
        main: paths.server.entry,
    },
    output: {
      path: paths.server.output
    }
  });
}

export default async (env, argv) => {
  const development = /development/gi.test(argv.mode);
  const baseOptions: PartOptions = { development, argv };
  const measure = Boolean(argv.measure);

  const targets: TargetConfigs = {
    client: getBaseClientConfig(baseOptions),
    server: getBaseServerConfig(baseOptions)
  };

  const configurationCallback: PartConfigurationCallback = (await import(`./${argv.using}`)).default;
  const result = configurationCallback(baseOptions, merge, targets);
  return Object.keys(result).map(x => {
    return measure ? smp.wrap(result[x]) : result[x];
  })
}
