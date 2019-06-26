const path = require('path');

export default {
  client: {
    root: path.resolve(__dirname, "../app"),
    entry: "./Browser.tsx",
    output: path.resolve(__dirname, "../build2/public")
  },
  server: {
    root: path.resolve(__dirname, "../server"),
    entry: "./server.js",
    output: path.resolve(__dirname, "../build2")
  },
  tsconfig: path.resolve(__dirname, "../tsconfig.json")
}
