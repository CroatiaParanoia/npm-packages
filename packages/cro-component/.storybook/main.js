const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.[tj]sx'],
  addons: [path.resolve(__dirname, './input-knobs/register.js')]
};
