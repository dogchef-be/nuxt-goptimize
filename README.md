# nuxt-goptimize

NuxtJS module for Google Optimize

## Main features

- Load Google Optimize
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
  gOptimize: {
    maxAge: '60',
  }
}
```

## Options

### `publishableKey`

- Type: `String`

Cookie's time to live.

## Usage

It can be used inside templates like:

```html
<div v-if="this.$gexp.variant('my-first-exp', 1)">
  <my-component />
</div>
```

## License

See the LICENSE file for license rights and limitations (MIT).
