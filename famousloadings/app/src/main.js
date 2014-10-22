/* globals define */
define(function (require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var SequentialLayout = require('famous/views/SequentialLayout');
    var Scrollview = require("famous/views/Scrollview");
    var SquareLoadingView = require('./SquareLoadingView');
    var CircleLoadingView = require('./CircleLoadingView');
    var CircleScaleLoadingView = require('./CircleScaleLoadingView');

    var mainContext = Engine.createContext();

//    var loading = new SquareLoadingView();
//    mainContext.add(loading);

//    var loading = new CircleLoadingView();
//    mainContext.add(loading);

    var loading = new CircleScaleLoadingView();
    mainContext.add(loading);
});
