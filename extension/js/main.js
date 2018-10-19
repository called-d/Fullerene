import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import Root from './MainRootComponent'


let app = new Vue({
    el: '#main',
    render: createElement => createElement(Root),
});