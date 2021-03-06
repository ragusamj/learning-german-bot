'use strict';
const config = require('config');

module.exports = (function () {
    return {
        server: {},
        connections: [
            {
                uri: config.get('baseUrl'),
                port: config.get('port'),
                labels: ['web']
            }
        ],
        registrations: [
            {
                plugin: './app/models'
            },
            {
                plugin: './app/telegram'
            },
            {
                plugin: './app/notificator'
            },
            {
                plugin: './app/web/index'
            },
            {
                plugin: './app/web/test'
            }
        ]
    };
})();