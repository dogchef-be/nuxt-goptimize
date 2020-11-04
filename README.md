# nuxt-goptimize

<a href="https://www.npmjs.com/package/nuxt-goptimize"><img src="https://img.shields.io/npm/v/nuxt-goptimize?style=flat-square"></a> <a href="https://www.npmjs.com/package/nuxt-goptimize"><img src="https://img.shields.io/npm/dt/nuxt-goptimize?style=flat-square"></a> <a href="#"><img src="https://img.shields.io/github/license/dogchef-be/nuxt-goptimize?style=flat-square"></a>

NuxtJS module for A/B testing with Google Optimize

## Main features

- Run multiple experiments simultaneously
- TypeScript support
- Cookies to persist variants for users
- Event handlers `ga` or `dataLayer`

## Dependencies

You can choose one of the following options:

- [analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs)
- [@nuxtjs/google-analytics](https://github.com/nuxt-community/gooogle-analytics-module)
- Any other alternative which injects Google Analytics into your application (e.g. via 3rd-party services such as [Segment](https://segment.com)).

## Setup

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
 *  id: string; Experiment ID
 *  maxAgeDays: number; Number of days to persist the cookie of user's active variant
 *  variants: number[]; An array of variants weights
 * }
 */
module.exports = [
  {
    name: "experiment-x",
    id: "IUhKJR2MSTiPMVGAwJDFBL",
    maxAgeDays: 15,
    variants: [50],
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
  }),
  mounted() {
    const activeVariant = this.$gexp('experiment-a');
    if (activeVariant === 0) {
      this.payBtnLabel = 'Place order';
    } else {
      this.payBtnLabel = 'Pay now!';
    }
  }
}
```

## Credits

- [Brandon Mills](https://github.com/btmills) for `weightedRandom()`

## License

See the LICENSE file for license rights and limitations (MIT).
