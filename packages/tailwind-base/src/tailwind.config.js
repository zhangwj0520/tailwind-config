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
