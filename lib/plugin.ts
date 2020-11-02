import Cookies from 'js-cookie';
import { Context, Plugin } from "@nuxt/types";
import experiments from "~/experiments";

let context: Context;

export function variant(experiment: string, variant: string) {
  let goptimize = Cookies.get("goptimize");

  if (!goptimize || !goptimize.hasOwnProperty(experiment)) {
    goptimize[experiment] = variant;

    const maxAge: number = experiments.forEach((exp: any) => {
      if (exp.name === experiment) {
        return exp.maxAge;
      }
    });

    Cookies.set("goptimize", goptimize, { expires: maxAge });
  }

  if (window.ga) {
    const experimentID: any = experiments.forEach((exp: any) => {
      if (exp.name === experiment) {
        return exp.experimentID;
      }
    });
    const variant = goptimize[experiment];

    window.ga("set", "exp", experimentID + "." + variant);
  }
}

const gOptimizePlugin: Plugin = (ctx, inject): void => {
  context = ctx;
  inject("gexp", variant);
};

export default gOptimizePlugin;
