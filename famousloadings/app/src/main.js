/* globals define */
define(function (require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var Scrollview = require("famous/views/Scrollview");
    var SquareLoadingView = require('./SquareLoadingView');

    var mainContext = Engine.createContext();

    var squareLoading = new SquareLoadingView();

    mainContext.add(squareLoading);
});
