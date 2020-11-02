import path from "path";
import { variant } from "./plugin";

declare module "vue/types/vue" {
  interface Vue {
    $gexp: typeof variant;
  }
}

// eslint-disable-next-line
export default function GoptimizeModule(this: any): void {
  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    ssr: "false"
  });
}
