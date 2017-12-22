var config = {
   entry: './main.js',
	
   output: {
      path: __dirname,
      publicPath:'/',
      filename: 'bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 8080,
      historyApiFallback: true
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react'],
               plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread']
            }
         }
      ]
   }
}

module.exports = config;