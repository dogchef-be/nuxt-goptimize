# nuxt-goptimize

<a href="https://www.npmjs.com/package/nuxt-goptimize"><img src="https://img.shields.io/npm/v/nuxt-goptimize?style=flat-square"></a> <a href="https://www.npmjs.com/package/nuxt-goptimize"><img src="https://img.shields.io/npm/dt/nuxt-goptimize?style=flat-square"></a> <a href="#"><img src="https://img.shields.io/github/license/dogchef-be/nuxt-goptimize?style=flat-square"></a>

NuxtJS module for Google Optimize

## Main features

- Run multiple experiments simultaneously
- TypeScript support

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

3. (Optional) TypeScript support. Add `nuxt-goptimize` to the `types` section of `tsconfig.json`:

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

Event handler to let Google know about variants in-use. Supported: `ga` and `dataLayer`.

## Usage

It can be used inside components like:

```js
{
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

## License

See the LICENSE file for license rights and limitations (MIT).
