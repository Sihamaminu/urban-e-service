module.exports = {
    contextSeparator: '_',
    createOldCatalogs: false,
    defaultNamespace: 'translation',
    defaultValue: '', // Leave empty to use the key as the default value
    indentation: 2,
    keepRemoved: false,
    keySeparator: '.',
    locales: ['en', 'am'], // Add your languages here
    namespaceSeparator: ':',
    output: 'src/locales/$LOCALE/$NAMESPACE.json', // Where to save translation files
    input: ['src/**/*.{js,jsx,ts,tsx}'], // Scan all JS/JSX/TS/TSX files
    sort: true,
  };