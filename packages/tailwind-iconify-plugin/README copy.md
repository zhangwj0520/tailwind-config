# `@zhangwj0520/tailwind-iconify-plugin`

> conify for Tailwind CSS

## Usage

tailwind.config.js

```js
import { addDynamicIconSelectors } from '@zhangwj0520/tailwind-iconify-plugin'


module.exports = {
   plugins: [

    addDynamicIconSelectors({
      iconSets: {
        custom: {path:'src/assets/icons'},
      },
    }),
  ]
}
```
