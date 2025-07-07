import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-undef': 'off',
    'vue/custom-event-name-casing': 'off',
  },
  vue: true,
  typescript: true,
})
