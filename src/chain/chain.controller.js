'use strict';
var calendar = require('./chain.calendar'),
  storage = require('./chain.storage')

module.exports = function() {
  var list = storage.load()

  this.isChecked = function(index) {
    return list[index]
  }

  this.check = function(index, status) {
    if (calendar.dateAt(index).getTime() <= calendar.today().getTime()) {
      list[index] = status;
      storage.save(list);
    }
  }
}
