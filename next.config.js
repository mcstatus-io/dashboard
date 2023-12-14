const path = require('path');

module.exports = {
    swcMinify: true,
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');

        config.module.rules.push({
            test: /\.svg$/,
            use: [
                { loader: '@svgr/webpack' }
            ]
        });

        return config;
    }
};