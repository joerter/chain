'use strict';

var m = require('mithril'),
  calendar = require('./chain.calendar')

module.exports = function(ctrl) {
  return m (".chain", [
    activities(ctrl),
    list(ctrl)
  ])
}

function activities(ctrl) {
  return m(".activities col-lg-3", [
    m('input[type=text][placeholder="Activity name"]', {value: ctrl.activityName(), oninput: m.withAttr('value', ctrl.activityName)}),
    m('button', {onclick: ctrl.createActivity}, 'Create Activity'),
    m('ul', {class: 'list-group'}, ctrl.activities().map(function (activity){
      return m('li', activityAttrs(ctrl, activity), activity)
    }))
  ])
}

function list(ctrl) {
  if (!ctrl.getCurrentActivity())
    return;

  return m(".calendar col-lg-9", seven(function(y) {
    return m(".week row", seven(function(x) {
      var index = indexAt(x, y)
      return m(".day col-sm-1", day(ctrl, index), [
        m(".date", calendar.dateAt(index, ctrl.getCurrentActivity()).getDate()),
        m(".icon", [
          m("span", icons(ctrl, index))
        ])
      ])
    }))
  }))
}

function activityAttrs(ctrl, activity) {
  return {
    onclick: function() {
      ctrl.setCurrentActivity(activity)
    },
    class: ctrl.getCurrentActivity() === activity ? 'list-group-item current-activity' : 'list-group-item'
  }
}

function icons (ctrl, index) {
  return {
    class: getClass()
  }

  function getClass() {
    if (calendar.dateAt(index, ctrl.getCurrentActivity()).getTime() > calendar.today().getTime())
      return

    if (calendar.isToday(index, ctrl.getCurrentActivity()))
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
    if (calendar.dateAt(index, ctrl.getCurrentActivity()).getTime() > calendar.today().getTime())
      return

    if (calendar.isToday(index, ctrl.getCurrentActivity()))
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
