define('CircleLoadingView', function (require, exports, module) {
    var View = require('famous/core/View');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');

    var Transitionable = require('famous/transitions/Transitionable');
    var Easing = require('famous/transitions/Easing');

    var angleX = new Transitionable(0);
    var angleY = new Transitionable(0);

    function CircleLoading(options) {
        View.apply(this, arguments);

        _createBody.call(this);

        start();
    }
    CircleLoading.prototype = Object.create(View.prototype);
    CircleLoading.prototype.constructor = CircleLoading;

    CircleLoading.DEFAULT_OPTIONS = {
    };

    function start() {
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
                        start();
                    });
            });

    };

    function _createBody() {
        var circle = new Surface({
            size: [50, 50],
            properties: {
                backgroundColor: 'orange',
                borderRadius : '50%'
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

        this.add(centerSpinModifier).add(circle);
    }

    module.exports = CircleLoading;
});/**
 * Created by fabiowitt on 10/21/14.
 */
