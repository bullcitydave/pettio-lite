var config = {
development: {
    //mongodb connection settings
    database: {
        host:   'localhost',
        port:   '27017',
        db:     'local',
        user:   'moksha',
        pw:     'dog1',
        authSource: 'admin'
    }
},
production: {
    //mongodb connection settings
    database: {
        host: 'ds115752.mlab.com',
        port: '15752',
        db:   'heroku_8kbdmjms',
        user: 'pettio-lite',
        pw: 'pettio-lite',
    }
}
};
module.exports = config;