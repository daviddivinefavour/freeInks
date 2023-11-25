module.exports = {
  require: ['ts-node/register', 'tsconfig-paths/register'],
  recursive: true,
  spec: 'tests/**/*.test.ts',
  project: './tsconfig.test.json',
  bail: false,
  color: true,
  ui: 'bdd',
  watch: true,
  'watch-files': ['app/**/*.ts', 'tests/**/*.test.ts'],
  'watch-ignore': ['node_modules', 'dist', 'build', 'coverage', 'database', 'logs', 'scripts'],
};
