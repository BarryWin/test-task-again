const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js)$/,
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
