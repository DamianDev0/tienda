const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './app/index.js', // Archivo de entrada de la aplicación
  output: { // Configuración de salida
    path: path.resolve(__dirname, 'dist'), // Directorio de salida
    filename: 'bundle.js', // Nombre del archivo de salida
    publicPath: '/', // Ruta relativa para los recursos
    clean: true // Limpia el directorio de salida antes de generar el bundle
  },
  module: { // Configuración de los módulos
    rules: [ // Reglas para los módulos
      {
        test: /\.js$/, // Expresión regular para identificar los archivos js
        exclude: /node_modules/, // Excluye la carpeta node_modules
        use: { // Loader a utilizar
          loader: 'babel-loader' // Babel loader para transformar el código js moderno
        }
      },
      {
        test: /\.css$/, // Expresión regular para identificar los archivos css
        oneOf: [
          {
            exclude: /node_modules/, // Excluye node_modules
            use: [
              MiniCssExtractPlugin.loader, // Extrae el css a un archivo independiente
              {
                loader: 'css-loader', // Interpreta los archivos css
                options: { // Opciones del loader
                  modules: { // Habilita el uso de módulos
                    localIdentName: '[name]__[local]___[hash:base64:5]' // Nombre de las clases hasheadas
                  }
                }
              }
            ]
          },
          {
            include: /node_modules/, // Incluye explícitamente node_modules aquí
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader' // Usar css-loader sin opciones de módulos
            ]
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // asset/resource sustituye a file-loader
        generator: {
          filename: 'assets/[name][ext]' // Define la carpeta de salida y el formato del nombre del archivo
        },
        use: {
          loader: 'image-webpack-loader', // Optimiza las imágenes
          options: { // Opciones de optimización
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75
            }
          }
        }
      }
    ]
  },
  plugins: [ // Configuración de los plugins
    new HtmlWebpackPlugin({ // Genera un archivo html en el directorio de salida
      template: './index.html', // Plantilla html
      filename: 'index.html' // Nombre del archivo de salida
    }),
    new MiniCssExtractPlugin({ // Extrae el css a un archivo independiente
      filename: '[name].[contenthash].css', // Nombre del archivo de salida
      chunkFilename: '[id].[contenthash].css' // Nombre del archivo de salida
    })
  ],
  devServer: { // Configuración del servidor de desarrollo
    static: { // Directorio base del servidor
      directory: path.join(__dirname, 'dist') // Directorio de salida
    },
    compress: true, // Habilita la compresión
    port: 9000, // Puerto del servidor
    historyApiFallback:true // Habilita el enrutamiento de aplicaciones de una sola página
    
  }
};
