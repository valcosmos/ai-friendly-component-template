// import { dirname } from 'node:path'
// import { fileURLToPath } from 'node:url'
import antfu from '@antfu/eslint-config'

// import { FlatCompat } from '@eslint/eslintrc'
import nextPlugin from '@next/eslint-plugin-next'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// })

// const eslintConfig = [
//   ...compat.extends('next/core-web-vitals', 'next/typescript'),
// ]

// export default eslintConfig;

export default antfu({
  react: true,
  formatters: true,
  plugins: { '@next/next': nextPlugin },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    '@next/next/no-duplicate-head': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
})
