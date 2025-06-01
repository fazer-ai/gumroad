module.exports = {
  input: [
    'app/javascript/**/*.{js,jsx,ts,tsx}',
    '!app/javascript/**/*.spec.{js,jsx,ts,tsx}',
    '!app/javascript/**/*.test.{js,jsx,ts,tsx}',
    '!**/node_modules/**'
  ],
  output: './',
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallbackKey: function(ns, value) {
        return value;
      }
    },
    lngs: ['en'],
    ns: ['common', 'product', 'checkout', 'dashboard', 'authentication'],
    defaultLng: 'en',
    defaultNs: 'common',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'app/javascript/locales/{{lng}}/{{ns}}.json',
      savePath: 'app/javascript/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: false,
    keySeparator: false,
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    }
  }
};
