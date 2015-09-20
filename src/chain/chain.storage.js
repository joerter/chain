'use strict';

var calendar = require('./chain.calendar')

module.exports = {
  save : save,
  load : load,
  createActivity : createActivity,
  getActivities : getActivities
}

var prefix = 'chain-app.'

function save (list, activityName) {
  localStorage[prefix + activityName] = JSON.stringify(list);
}

function load (activityName) {
  return JSON.parse(localStorage[prefix + activityName] || '[]')
}

function createActivity(name) {
  var activities = getActivities()
  activities.push(name)

  localStorage[prefix + 'activities'] = JSON.stringify(activities)
  localStorage[prefix + name] = JSON.stringify([])
}

function getActivities() {
  return JSON.parse(localStorage[prefix + 'activities'] || '[]')
}
