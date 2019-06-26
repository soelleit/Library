import { Configuration } from "webpack";

export interface PartOptions {
  development: boolean;
  argv: any;
}

export type Part<T extends PartOptions = PartOptions> = (options: T) => Configuration;
