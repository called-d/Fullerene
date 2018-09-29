window.Vue = require('vue');

import Notification from './components/Notification'

const app = new Vue({
  el: '#app',
  components: {
    Notification,
  },
});
