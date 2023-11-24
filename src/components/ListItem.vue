<script setup>
const title = 'My first list'
const description = 'This is my first list'
const date = '2021-10-10'
</script>

<template>
    <li class="list__item">
        <h3 class="list__item__title">{{ title }}</h3>

        <div class="list__item__content">
            <p class="list__item__description">{{ description }}</p>
            <p class="list__item__date">{{ date }}</p>
        </div>

        <div class="list__item__actions">
            <button class="list__item__button list__item__button--edit" @click="editItem">
                Edit
            </button>
            <button class="list__item__button list__item__button--delete" @click="deleteItem">
                Delete
            </button>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.list {
    &__item {
        display: flex;
        flex-direction: row;
        gap: 30px;
        justify-content: space-between;
        align-items: center;

        background: $background-color;
        border: $border-color solid 1px;
        border-radius: 10px;
        padding: 15px 20px;

        cursor: grab;

        &__date {
            font-size: 0.8rem;
            font-style: italic;
        }

        &__actions {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
        }

        &__button {
            color: $text-color;

            &--edit:hover {
                text-decoration: wavy underline orange;
            }

            &--delete:hover {
                text-decoration: wavy underline red;
            }
        }
    }
}
</style>
