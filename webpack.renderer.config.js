const rules = require('./webpack.rules'); // eslint-disable-line
const plugins = require('./webpack.plugins');// eslint-disable-line

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
  },
  {
    test: /\.(png|jp(e*)g|svg|gif)$/,
    type: 'asset/resource'
  }
);

module.exports = {
  module: {
    rules
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  }
};
