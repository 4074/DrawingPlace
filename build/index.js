'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

require('./connection');

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _sockets = require('./sockets');

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(__dirname + '/../app/build'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _session2.default)());

app.use(function (req, res, next) {
    if (req.path.indexOf('/api') === 0) {
        return next();
    }

    res.sendFile(__dirname + '/../app/build/index.html');
});

app.use('/api', _api2.default);

var server = _http2.default.Server(app);
(0, _sockets2.default)(server);

server.listen(_config2.default.app.port, function (err) {
    if (err) {
        console.error(error);
    } else {
        console.info('app is running on ' + _config2.default.app.port);
    }
});