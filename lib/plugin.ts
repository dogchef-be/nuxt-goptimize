import Cookies from "js-cookie";
import { Plugin } from "@nuxt/types";
import experiments from "<%= options.experiments %>";
import { weightedRandom } from "./utils/weighted-random";

const COOKIE_PREFIX = "gopt";

interface Experiment {
  name: string;
  id: string;
  duration: number;
  variants: [{ weight: number }];
}

export function experimentVariant(experimentName: string): number {
  const experiment: Experiment = experiments.find(
    (exp: Experiment) => exp.name === experimentName
  );

  let activeVariant: string =
    Cookies.get(`${COOKIE_PREFIX}_${experimentName}`) || "";

  // Determine the active variant of the experiment
  if (activeVariant.length === 0) {
    const weights: number[] = experiment.variants.map((variant) =>
      variant.weight === undefined ? 1 : variant.weight
    );

    activeVariant = weightedRandom(weights).toString();

    Cookies.set(`${COOKIE_PREFIX}_${experiment}`, activeVariant, {
      expires: experiment.duration
    });
  }

  if (window.ga) {
    window.ga("set", "exp", experiment.id + "." + activeVariant);
  }

  return Number.parseInt(activeVariant);
}

const googleOptimizePlugin: Plugin = (ctx, inject): void => {
  inject("gexp", experimentVariant);
};

export default googleOptimizePlugin;
