const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssOption = {
    use: [
        'css-loader',
        'postcss-loader',
    ],
    fallback: 'style-loader'
};
const lessOption = {
    use: [
        'css-loader',
        'less-loader',
        'postcss-loader',
    ],
    fallback: 'style-loader'
};

const scssOption = {
	use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        camelCase: true,
        localIdentName: '[name]__[local]--[hash:base64:5]'
      }
    },
	  'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
      }
    },
	],
	fallback: 'style-loader'
};

const excludePath = /node_modules\/(?!@(hfe|dp))/;
const isDev = process.env.NODE_ENV !== 'production';

const cssloadRule = {
   test: /\.css$/,
   use: ExtractTextPlugin.extract(cssOption)
};
const lessloadRule = {
   test: /\.less$/,
   use: ExtractTextPlugin.extract(lessOption)
};
const scssloadRule = {
   test: /\.scss$/,
   use: ExtractTextPlugin.extract(scssOption)
};

const jsloadRule = {
    test: /\.(es6|js)$/,
    use: [{
        loader: 'babel-loader',
        options: {
            cacheDirectory: isDev,
            forceEnv: isDev ? 'dev' : 'prod'
        }
    }],
    exclude: /node_modules\/(?!@(hfe|dp))/
};

const suffix = '';

const imgloadRule = {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [{
        loader: 'url-loader',//return a DataURL if the file is smaller than a byte limit
        options: {
            limit: 8000,
            name: `images/[name]${suffix}.[ext]`
        }
    }]
}

const fontloadRule = {
    test: /\.woff|ttf|woff2|eot|swf$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: `fonts/[name]${suffix}.[ext]`
        }
    }]
};

module.exports = [ jsloadRule, cssloadRule, lessloadRule, scssloadRule, imgloadRule, fontloadRule ];
