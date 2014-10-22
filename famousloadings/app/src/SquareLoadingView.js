define('SquareLoadingView', function (require, exports, module) {
    var View = require('famous/core/View');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');

    var Transitionable = require('famous/transitions/Transitionable');
    var Easing = require('famous/transitions/Easing');

    var angleX = new Transitionable(0);
    var angleY = new Transitionable(0);

    function SquareLoading(options) {
        View.apply(this, arguments);

        this.index = this.options.group.length;
        this.options.group.push(this);

        this.add(this.options.surface);

        _createBody.call(this);

        rotate();
    }
    SquareLoading.prototype = Object.create(View.prototype);
    SquareLoading.prototype.constructor = SquareLoading;

    SquareLoading.DEFAULT_OPTIONS = {
        surface: null,
        group: [],
        index: 0,
    };

    function rotate() {
        angleX.set(0 * (Math.PI / 180), { duration: 0 });
        angleY.set(0 * (Math.PI / 180), { duration: 0 });
        angleX.set(-180 * (Math.PI / 180),
            {
                duration: 600,
                curve: Easing.outQuad
            },
            function () {
                angleY.set(-180 * (Math.PI / 180),
                    {
                        duration: 600,
                        curve: Easing.outQuad
                    },
                    function () {
                        rotate();
                    });
            });

    };

    function _createBody() {
        var square = new Surface({
            size: [50, 50],
            properties: {
                backgroundColor: 'orange'
            },
            classes: ['backfaceVisibility']
        });

        var centerSpinModifier = new Modifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5],
            transform: function () {
                return Transform.multiply(
                    Transform.rotate(angleX.get(), angleY.get(), 0),
                    Transform.perspective(10000));
            }
        });

        this.add(centerSpinModifier).add(square);
    }

    module.exports = SquareLoading;
});
