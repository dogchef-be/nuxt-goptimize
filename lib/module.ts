import path from "path";
import { experimentVariant } from "./plugin";

declare module "vue/types/vue" {
  interface Vue {
    $gexp: typeof experimentVariant;
  }
}

// eslint-disable-next-line
export default function GoogleOptimizeModule(this: any): void {
  const defaults = {
    experiments: "~/experiments.js",
  };

  const options = Object.assign({}, defaults, this.options.googleOptimize);

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    ssr: "false",
    options,
  });
}
