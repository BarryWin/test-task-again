const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|json)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    }
                }
            }
        ]
    },    
    resolve: {
        extensions: ['.js', '.json']
    },
    mode: 'production',
};
