<h1 align="center">
  nuxt-goptimize
</h1>
<p align="center">
  NuxtJS module for A/B testing with Google Optimize<br />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-goptimize"><img src="https://img.shields.io/npm/v/nuxt-goptimize?style=flat-square"></a> <a href="https://www.npmjs.com/package/nuxt-goptimize"><img src="https://img.shields.io/npm/dt/nuxt-goptimize?style=flat-square"></a> <a href="#"><img src="https://img.shields.io/github/license/dogchef-be/nuxt-goptimize?style=flat-square"></a>
</p>
<br />

**_Note: Google Optimize is used for reporting (only)._**

## Table of contents

- [Main features](#main-features)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Options](#options)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Main features

- Run multiple experiments simultaneously
- TypeScript support
- Cookies to persist variants across users
- Event handlers `ga` or `dataLayer`
- Force a specific variant via url or param. E.g. `url?experiment-x=1` or `this.$exp('experiment-x', 1);`

## Dependencies

You can choose one of the following options which injects Google Analytics into your application:

- [analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs)
- [@nuxtjs/google-analytics](https://github.com/nuxt-community/gooogle-analytics-module)
- 3rd-party such as [Segment](https://segment.com)

## Setup

### Google Optimize

1. Create a new experiment:

```
Name: Experiment X
Type of experience: A/B test
```

2. Add variants names:

```
Original: this.$gexp('my_experiment') = 0
Variant A: this.$gexp('my_experiment') = 1
Variant B: this.$gexp('my_experiment') = 2
```

3. Define a page targeting:

`WHEN` `URL equals` `SERVER_SIDE`

4. Define experiment's objectives.

### Nuxt.js Module

1. Add `nuxt-goptimize` dependency to your project:

```bash
npm install nuxt-goptimize
```

2. Add `nuxt-goptimize` module and configuration to `nuxt.config.js`:

```js
export default {
  // ...other config options
  modules: ["nuxt-goptimize"];
  googleOptimize: {
    experiments: '~/experiments.js', // optional
  }
}
```

3. Create the `experiments.js` in project's root with an array of your experiments. An example:

```js
/**
 * {
 *  name: string; A name to identify the experiment on this.$gexp('NAME_HERE')
 *  id: string; Experiment ID of Google Optimize
 *  maxAgeDays: number; Number of days to persist the cookie of user's active variant
 *  variants: number[]; An array of variants weights
 * }
 */
module.exports = [
  {
    name: "experiment-x",
    id: "IUhKJR2MSTiPMVGAwJDFBL",
    maxAgeDays: 15,
    variants: [50, 50],
  },
];
```

4. (Optional) TypeScript support. Add `nuxt-goptimize` to the `types` section of `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["nuxt-goptimize"]
  }
}
```

## Options

### `experiments`

- Type: `String`
- Default: `~/experiments.js`

File path for your experiments definition.

### `eventHandler`

- Type: `String`
- Default: `ga`
- Values: `ga`, `dataLayer`

Event handler to let Google know about variants in-use.

## Usage

It can be used inside components like:

```js
{
  data: () => ({
    payBtnLabel: null as string | null,
    isScenarioA: true,
  }),
  mounted() {
    // Example 1: normal usage
    const activeVariant = this.$gexp('experiment-x');
    if (activeVariant === 0) {
      this.payBtnLabel = 'Place order';
    } else {
      this.payBtnLabel = 'Pay now!';
    }

    // Example 2: force variant 1
    if (this.isScenarioA) {
      this.$gexp('experiment-y', 1)
      // do something else..
    }
  }
}
```

## Credits

- [Brandon Mills](https://github.com/btmills) for `weightedRandom()`

## License

See the LICENSE file for license rights and limitations (MIT).
