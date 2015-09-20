'use strict';
var m = require('mithril'),
  calendar = require('./chain.calendar'),
  storage = require('./chain.storage')

module.exports = function chainController() {
  var vm = this,
    list = [],
    currentActivity = ""

  init()

  function init() {
    vm.activityName = m.prop('')
    vm.activities = m.prop(storage.getActivities())

    if (vm.activities().length === 0)
      return;

    list = storage.load(vm.activities()[0]);
  }

  vm.getCurrentActivity = function() {
    return currentActivity
  }

  vm.setCurrentActivity = function(activity) {
    currentActivity = activity
    list = storage.load(activity)
  }

  vm.createActivity = function() {
    var activityName = vm.activityName()
    storage.createActivity(activityName)
    vm.activityName('')
    vm.activities(storage.getActivities())
    vm.setCurrentActivity(activityName)
  }

  vm.isChecked = function(index) {
    return list[index]
  }

  vm.check = function(index, status) {
    if (calendar.dateAt(index, currentActivity).getTime() <= calendar.today().getTime()) {
      list[index] = status;
      storage.save(list, currentActivity);
    }
  }
}
