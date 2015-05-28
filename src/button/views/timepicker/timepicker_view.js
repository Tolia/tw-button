var moment = require('moment');
var View = require('ampersand-view');

var TimepickerView = View.extend({

  partials: {
    item: require('./timepicker_item.hbs')
  },

  events: {
    'mousedown [data-time]': 'onSelect'
  },

  render: function() {
    var times = this.createTimes();

    var items = times.map(function(time) {
      return this.partials.item({
        time: time.format('HH:mm'),
        text: time.format('HH:mm')
      });
    }, this);

    this.el.innerHTML = items.join('\n');
  },

  createTimes: function() {
    var times = [];
    var start = moment().set({ hours: 0, minutes: 0 });
    var end = start.clone().add(1, 'days');

    while (start.isBefore(end, 'minute')) {
      times.push(start.clone());
      start.add(30, 'minutes');
    }

    return times;
  },

  onSelect: function(event) {
    event.preventDefault();
    var time = event.target.getAttribute('data-time');
    this.trigger('select', time);
  }

});

module.exports = TimepickerView;