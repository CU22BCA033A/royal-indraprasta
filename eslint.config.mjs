// ESLint covers the plain JavaScript build and audit scripts. TypeScript and
// Astro files are checked by `astro check` (the TypeScript compiler) instead,
// which avoids adding a separate TypeScript ESLint parser.
export default [
  {
    ignores: [
      'api/_lib/**',
      'dist/**',
      'node_modules/**',
      '.astro/**',
      'public/**',
      'test-results/**',
      '.lighthouseci/**',
      '**/*.ts',
      '**/*.astro',
    ],
  },
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { process: 'readonly', console: 'readonly', URL: 'readonly', Buffer: 'readonly' },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'smart'],
    },
  },
];
