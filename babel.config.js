module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    [
      'transform-assets',
      {
        extensions: ['jpg', 'png'],
        name: '[name].[ext]?[sha512:hash:base64:7]',
      },
    ],
  ],
};
