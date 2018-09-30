<template>
    <div class="mdc-card">
        <header class="card-title mdc-typography--subtitle1">
            new Item
        </header>
        <div class="card-body">
            <div class="mdc-text-field mdc-text-field--fullwidth">
                <input type="text"
                    ref="item_name"
                    placeholder="Item name"
                    aria-label="Item name"
                    required
                    class="mdc-text-field__input">
                <div class="mdc-line-ripple"></div>
            </div>
        </div>
        <div class="mdc-card__actions">
            <div class="mdc-card__action-buttons">
            <button
                class="mdc-button mdc-card__action mdc-card__action--button"
                @click="newItem"
                >
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {MDCFormField} from '@material/form-field';
import {MDCTextField} from '@material/textfield';


[
].forEach(component => Vue.use(component))

export default {
    data() { return { text: "" } },
    mounted() {
        const textField = new MDCTextField(this.$el.querySelector('.mdc-text-field'));
    },
    methods: {
        newItem() {
            console.log('newItem')
            let name = this.$refs.item_name.value
            let description = null
            let parent = null
            let tags = []
            this.$emit('add', {
                name,
                description,
                parent,
                tags,
            })
        }
    },
}
</script>

<style scoped>
    .card-title {
        padding: 16px 16px;
    }
    .card-body {
        padding: 1rem 8px;
    }
    .mdc-form-field {
        width: 100%;
    }
</style>
