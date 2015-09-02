'use strict';

var m = require('mithril'),
  calendar = require('./chain.calendar')

module.exports = function(ctrl) {
  return m("table", seven(function(y) {
    return m("tr", seven(function(x) {
      var index = indexAt(x, y)
      return m("td", highlights(index), [
        m("input[type=checkbox]", checks(ctrl, index))
      ])
    }))
  }))
}

function checks (ctrl, index) {
  return {
    onclick: function() {
      ctrl.check(index, this.checked);
    },
    checked: ctrl.isChecked(index)
  };
}

function highlights (index) {
  return {
    style: {
      background: calendar.dateAt(index).getTime() == calendar.today().getTime() ? "silver" : ""
    }
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
