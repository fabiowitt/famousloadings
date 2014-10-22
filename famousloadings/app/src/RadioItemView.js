define('RadioItemView', function (require, exports, module) {
    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');

    function RadioItem(options) {
        View.apply(this, arguments);

        this.index = this.options.group.length;
        this.options.group.push(this);

        this.surface = options.surface;
        this.surface.pipe(this._eventOutput);
        this.add(this.options.surface);

        this.surface.on('click', selectAllRadioItems.bind(this, this.index));
        selectOneRadioItem.call(this, this.options.index || 0);
    }
    RadioItem.prototype = Object.create(View.prototype);
    RadioItem.prototype.constructor = RadioItem;

    RadioItem.DEFAULT_OPTIONS = {
        surface: null,
        group: [],
        index: 0,
    };

    function selectOneRadioItem(index) {
        var selected = this.index == index;
        if (selected) {
            this.surface.addClass('selected');
        } else {
            this.surface.removeClass('selected');
        }
    }

    function selectAllRadioItems(index) {
        this.options.group.forEach(function (tab) {
            selectOneRadioItem.call(tab, index);
        });
        this._eventOutput.emit('select', index);
    }

    RadioItem.prototype.select = function () {
        selectAllRadioItems.call(this, this.index);
    };

    module.exports = RadioItem;
});