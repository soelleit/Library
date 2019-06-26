import { PartOptions } from "./parts";
import { Configuration } from "webpack";
import merge from "webpack-merge";

type MergeCallback = typeof merge;

export interface TargetConfigs {
  client: Configuration;
  server: Configuration;
}

export interface ConfigMap {
  [key: string]: Configuration
}

export interface PartConfigurationCallback {
  (options: PartOptions, merge: MergeCallback, configs: TargetConfigs): ConfigMap
}
