'use strict';

var m = require('mithril'),
  calendar = require('./chain.calendar')

module.exports = function(ctrl) {
  return m(".calendar", seven(function(y) {
    return m(".week row", seven(function(x) {
      var index = indexAt(x, y)
      return m(".day col-sm-1", day(ctrl, index), [
        m(".date", calendar.dateAt(index).getDate()),
        m(".icon", [
          m("span", icons(ctrl, index))
        ])
      ])
    }))
  }))
}

function icons (ctrl, index) {
  return {
    class: getClass()
  }

  function getClass() {
    if (calendar.dateAt(index).getTime() > calendar.today().getTime())
      return

    if (calendar.isToday(index))
      return ctrl.isChecked(index) ? 'mega-octicon really-more-mega octicon-check' : ''

    return ctrl.isChecked(index) ? 'mega-octicon really-more-mega octicon-check' : 'mega-octicon really-more-mega octicon-x'
  }
}

function day (ctrl, index) {
  return {
    onclick: function() {
      var status = ctrl.isChecked(index)
      ctrl.check(index, !status)
    },
    class: getClass()
  }

  function getClass() {
    if (calendar.dateAt(index).getTime() > calendar.today().getTime())
      return

    if (calendar.isToday(index))
      return ctrl.isChecked(index) ? 'checked' : 'today'

    return ctrl.isChecked(index) ? 'checked' : 'not-checked'
  }
}

function indexAt (x, y) {
  return y * 7 + x;
}

function seven (subject) {
  var output = [];
  for (var i = 0; i < 7; i++) output.push(subject(i));
  return output;
}
