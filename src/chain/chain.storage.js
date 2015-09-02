'use strict';

module.exports = {
  save : save,
  load : load
}

function save (list) {
  localStorage['chain-app.list'] = JSON.stringify(list);
}

function load () {
  return JSON.parse(localStorage['chain-app.list'] || '[]')
}
