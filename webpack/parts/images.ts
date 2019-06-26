import { Part, PartOptions } from "./Part";

interface ImagesPartOptions extends PartOptions {
  limit?: number;
}

export const ImagesPart: Part<ImagesPartOptions> = ({limit = 8192}) => {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/i,
          exclude: /node_modules/,
          loader: "url-loader",
          options:{
            limit
          }
        }
      ]
    }
  }
};

export default ImagesPart;
