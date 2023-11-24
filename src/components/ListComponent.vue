<script setup>
import ListItem from './ListItem.vue';
import { ref } from 'vue';
const props = defineProps({
    name: String
});

const listItems = ref(null);
const toggleHideList = () => {
    listItems.value.classList.toggle('hide');
};

const nbItems = ref(4);
</script>

<template>
    <div class="list__container">
        <header class="list__header">
            <h2 class="list__name" @click="toggleHideList">{{ props.name }}</h2>

            <p>{{ nbItems }} items</p>

            <div class="list__header__actions">
                <button class="list__header__actions__button list__header__actions--add">
                    Add
                </button>

                <button class="list__header__actions__button list__header__actions--delete">
                    Delete
                </button>
            </div>
        </header>

        <ul class="list__items" ref="listItems">
            <slot name="items">
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
            </slot>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.list {
    &__container {
        width: 100%;
        overflow: hidden;

        border-left: #ffffff19 solid 1px;
    }

    &__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        padding: 20px;

        &__actions {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;

            height: 100%;

            &__button {
                color: $text-color;
            }

            &--add:hover {
                text-decoration: wavy underline #00ff00;
            }

            &--delete:hover {
                text-decoration: wavy underline #ff0000;
            }
        }
    }

    &__name {
        user-select: none;
        cursor: pointer;
        text-decoration: underline #ffffff00;
        transition: all 0.13s ease-in-out;

        &:hover {
            text-decoration: underline #ffffff;
        }
    }

    &__items {
        display: flex;
        flex-direction: column;
        gap: 10px;

        width: 100%;
        height: auto;
        max-height: 100vh;
        padding: 0px 20px;
        overflow: hidden;

        transition: all 0.2s ease-in-out;

        &.hide {
            max-height: 0px;
        }
    }
}
</style>
