<template>
    <a-calendar v-model:value="value" @panelChange="onPanelChange" />
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue';
const value = ref();

const onPanelChange = (value, mode) => {
    console.log(value, mode);
};
</script>