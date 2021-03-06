const { mix } = require('laravel-mix');

mix
    .setPublicPath('public')
    .js('resources/assets/js/app.js', 'public/js')
    .js('extension/js/background.js', 'public/extension/')
    .js('extension/js/main.js', 'public/extension/')
    .js('extension/js/options.js', 'public/extension/')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: { appendTsSuffixTo: [/\.vue$/] },
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: [
                        { loader: 'extract-loader' },
                        { loader: 'css-loader' },
                        {
                            loader: 'sass-loader',
                            options: {
                            includePaths: ['./node_modules'],
                            }
                        }
                    ]
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
        },
    });
