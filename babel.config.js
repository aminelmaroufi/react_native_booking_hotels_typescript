// module.exports = {
//   presets: [
//     'module:metro-react-native-babel-preset',
//     '@babel/preset-typescript',
//   ],
//   plugins: ['@babel/plugin-transform-modules-commonjs'],
// };
// module.exports = {
//   presets: [
//     'module:metro-react-native-babel-preset',
//     '@babel/preset-env',
//     '@babel/preset-react',
//     '@babel/preset-typescript',
//   ],
// };
module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {useTransformReactJSXExperimental: true},
    ],
  ],
  // plugins: ['@babel/plugin-transform-modules-commonjs'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
};
