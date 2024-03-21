/* eslint-disable no-undef */
const { addDynamicIconSelectors } = require('@zhangwj0520/tailwind-iconify-plugin')


/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@zhangwj0520/tailwind-base')],
  // content: [],
  theme: {
    extend: {},
  },
  plugins: [
    addDynamicIconSelectors({

    }),
  ],
}
