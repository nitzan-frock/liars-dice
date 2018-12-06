// import path from 'path';
// import express from 'express';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import config from '../../webpack.config.dev';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.config.dev');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const server = require('./game/index.js');
const Game = require('./game/Game.js');

const port = process.env.PORT || 8080;

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const compiler = webpack(config);

app.use(
    webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'bundle.js',
        publicPath: config.output.publicPath
    })
);

app.use(
    webpackHotMiddleware(compiler, {
        log: console.log,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    })
);

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

app.listen(port, () => {
    console.log(`App listening to ${port}`);
});

const game = new Game();
server.run(io, game);