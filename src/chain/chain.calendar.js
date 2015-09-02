'use strict';

module.exports = {
  today : today,
  dateAt : dateAt
}

function today () {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

function dateAt (index) {
  var date = new Date(startDate());
  date.setDate(date.getDate() + index);
  return date;
}

function resetDate () {
  return localStorage["chain-app.start-date"] = today().getTime();
}

function startDate () {
  return new Date(parseInt(localStorage["chain-app.start-date"] || resetDate()));
}
