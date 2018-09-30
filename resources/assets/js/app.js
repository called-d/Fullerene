window.Vue = require('vue');

import Fullerene from './fullerene/Fullerene'
import FullereneIncognito from './fullerene/Fullerene+Incognito'

window.Fullerene = Fullerene
window.FullereneIncognito = FullereneIncognito

import ItemForm from './components/ItemForm'

let fl = new Fullerene()

const app = new Vue({
  el: '#app',
  data: {
    items: [],
  },
  mounted() {
    console.log("created")
    this.$nextTick(()=>fl.itemsChanged = this.onItemsChanged)
  },
  methods: {
    add(obj) {
      fl.newItem(obj.name, obj.description, obj.parent)
      fl.items.then(items => items.forEach(item => console.log))
    },
    onItemsChanged(changes) {
      fl.items.then(items => this.items = items)
/*      changes.forEach(change => {
        switch (change.type) {
        case "splice":
          this.items.splice(change.index, 0, change.object[change.index])
          console.log(change)
          break
        }
      })*/
    },
  },
  components: {
    ItemForm,
  },
});
