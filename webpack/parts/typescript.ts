import { Part, PartOptions } from "./Part";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"

interface TypeScriptPartOptions extends PartOptions {
  async?: boolean;
  tsconfig?: string;
}

export const TypescriptPart: Part<TypeScriptPartOptions> = (
  {
    development = false,
    async = false,
    tsconfig
  }) => {
  return {
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'eslint-loader',
              options: {
                emitError: true,
                emitWarning: true
              }
            }
          ]
        },
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".jsx", ".js"]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
          useTypescriptIncrementalApi: development,
          workers:ForkTsCheckerWebpackPlugin.ONE_CPU,
          async: async,
          tsconfig
      })
    ]
  }
};

export default TypescriptPart;
