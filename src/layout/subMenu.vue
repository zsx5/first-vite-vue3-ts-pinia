<!---单文件方式. 用于递归生成菜单--->
<template>
    <a-sub-menu :key="menuInfo.key">
        <template #icon>
            <img :src="selectedKeys.indexOf(menuInfo.key)>-1 ? menuInfo.selectedIcon : menuInfo.unSelectedIcon" >
        </template>
        <template #title>{{ menuInfo.title }}</template>
        <template v-for="item in menuInfo.children" :key="item.key">
            <template v-if="!item.children">
                <a-menu-item :key="item.key">
                    <template #icon>
                        <img :src="selectedKeys.indexOf(item.key)>-1 ? item.selectedIcon : item.unSelectedIcon" >
                    </template>
                    {{ item.title }}
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu-info="item" :key="item.key" :selectedKeys="selectedKeys" />
            </template>
        </template>
    </a-sub-menu>
</template>
<script setup lang="ts">

const props = defineProps({
    menuInfo: {
        type: Object,
        default: () => ({})
    },
    selectedKeys: {
        type: Array,
        default: () => ([])
    }
})
</script>