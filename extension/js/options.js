import Vue from 'vue'
import Root from './OptionsRootComponent'

let app = new Vue({
    el: '#options',
    render: createElement => createElement(Root),
});