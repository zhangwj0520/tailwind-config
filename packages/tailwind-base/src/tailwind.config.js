// const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const typographyPlugin = require('@tailwindcss/typography')

module.exports = {
  darkMode: 'class', // 手动切换暗模式
  // content-配置源路径
  content: ['src/**/*.{vue,html,jsx,tsx}', 'public/**/*.html', './*.html'],
  // important: true,
  theme: {
    extend: {
      // 拓展
      screens: {
        // 如果要添加额外的小断点，则不能使用extend，因为小断点将添加到断点列表的末尾
        // ，并且断点需要从最小到最大排序才能按预期工作宽度断点系统。
        xs: '475px',
        ...defaultTheme.screens,
        '3xl': '1800px',
      },
      colors: { klein: '#002fa7' },

      spacing: {
        100: '25rem',
        110: '27.5rem',
        120: '30rem',
        140: '35rem',
        160: '40rem',
        180: '45rem',
        200: '50rem',
      },
      animation: {},
      borderRadius: ({ theme }) => ({ ...theme('spacing') }),
      borderWidth: {
        1: '1px',
        3: '3px',
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        999: 999,
      },
      // text-XXX
      fontSize: {
        12: ['12px', { lineHeight: '16px' }],
        14: ['14px', { lineHeight: '18px' }],
        16: ['16px', { lineHeight: '20px' }],
        18: ['18px', { lineHeight: '22px' }],
        20: ['20px', { lineHeight: '24px' }],
        22: ['22px', { lineHeight: '26px' }],
        24: ['24px', { lineHeight: '28px' }],
        26: ['26px', { lineHeight: '30px' }],
        28: ['28px', { lineHeight: '32px' }],
        30: ['30px', { lineHeight: '34px' }],
        32: ['32px', { lineHeight: '36px' }],
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
    },
  },
  plugins: [
    typographyPlugin,
    // plugin(({ addBase, theme }) => {
    //   addBase({ h1: { fontSize: theme('fontSize.2xl') } })
    // addComponents({
    //   '.card': {
    //     backgroundColor: theme('colors.white'),
    //     borderRadius: theme('borderRadius.lg'),
    //     padding: theme('spacing.6'),
    //     boxShadow: theme('boxShadow.xl'),
    //   },
    // })
    // addUtilities({ '.content-auto': { contentVisibility: 'auto' } })
    // }),
  ],

  // preflight: false,// 禁用 Tailwind 的全局基本样式
  // corePlugins: {
  //   // float:false //仅用某些插件
  // },
}
