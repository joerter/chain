'use strict';

module.exports = {
  today : today,
  dateAt : dateAt,
  isToday : isToday
}

var prefix = 'chain-app.'

function today () {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

function dateAt (index, activityName) {
  var date = new Date(startDate(activityName));
  date.setDate(date.getDate() + index);
  return date;
}

function resetDate (activityName) {
  return localStorage[prefix + activityName + '.start-date'] = today().getTime();
}

function startDate (activityName) {
  return new Date(parseInt(localStorage[prefix + activityName + '.start-date'] || resetDate()));
}

function isToday(index, activityName) {
  return dateAt(index, activityName).getTime() == today().getTime()
}
