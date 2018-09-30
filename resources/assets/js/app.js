window.Vue = require('vue');

import Fullerene from './fullerene/Fullerene'
import FullereneIncognito from './fullerene/Fullerene+Incognito'

window.Fullerene = Fullerene
window.FullereneIncognito = FullereneIncognito

import Notification from './components/Notification'

const app = new Vue({
  el: '#app',
  components: {
    Notification,
  },
});
