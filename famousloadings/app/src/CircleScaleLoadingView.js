/**
 * Created by fabiowitt on 10/21/14.
 */
define('CircleScaleLoadingView', function (require, exports, module) {
    var View = require('famous/core/View');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');

    var Transitionable = require('famous/transitions/Transitionable');
    var Easing = require('famous/transitions/Easing');

    var scale = new Transitionable(0);
    var scale2 = new Transitionable(1);

    function CircleScaleLoading(options) {
        View.apply(this, arguments);

        _createBody.call(this);

        startScale.call(this);
        startScale2.call(this);
    }
    CircleScaleLoading.prototype = Object.create(View.prototype);
    CircleScaleLoading.prototype.constructor = CircleScaleLoading;

    CircleScaleLoading.DEFAULT_OPTIONS = {
        easing : Easing.inOutQuad,
        size : 80,
        duration : 1100
    };

    function startScale() {
        var self = this;

        scale.set(1,
            {
                duration: self.options.duration,
                curve: self.options.easing
            },
            function () {
                scale.set(0,
                    {
                        duration: self.options.duration,
                        curve: self.options.easing
                    },
                    function () {
                        startScale.call(self);
                    });
            });
    };

    function startScale2() {
        var self = this;

        scale2.set(0,
            {
                duration: self.options.duration,
                curve: self.options.easing
            },
            function () {
                scale2.set(1,
                    {
                        duration: self.options.duration,
                        curve: self.options.easing
                    },
                    function () {
                        startScale2.call(self);
                    });
            });
    }

    function _createBody() {
        var self = this;

        var circle = new Surface({
            size: [self.options.size,self.options.size],
            properties: {
                backgroundColor: 'orange',
                borderRadius : '50%',
            }
        });

        var circle2 = new Surface({
            size: [self.options.size,self.options.size],
            properties: {
                backgroundColor: 'orange',
                borderRadius : '50%'
            }
        });

        var centerSpinModifier = new Modifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5],
            opacity : 0.5,
            transform: function () {
                return Transform.scale(scale.get());
            }
        });
        var centerSpinReverseModifier = new Modifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5],
            transform: function () {
                return Transform.scale(scale2.get());
            }
        });

        this.add(centerSpinModifier).add(circle);
        this.add(centerSpinReverseModifier).add(circle2);
    }

    module.exports = CircleScaleLoading;
});/**
 * Created by fabiowitt on 10/21/14.
 */
