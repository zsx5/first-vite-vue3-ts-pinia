<template>
    <a-menu
      id="side-menu"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 200px"
      mode="inline"
      @click="handleClick"
    >
      <template v-for="item in menuTree" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <img :src="selectedKeys.indexOf(item.key)>-1 ? item.selectedIcon : item.unSelectedIcon" >
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :key="item.key" :menuInfo="item" :selectedKeys="selectedKeys"></SubMenu>
        </template>
      </template>
    </a-menu>
  </template>
  <script setup lang="ts">
  import { computed, reactive, watch } from 'vue';
  import { useRoute, useRouter } from "vue-router"
  import { menus } from "@/router/menu.config"
  import SubMenu from './SubMenu.vue';
  const route = reactive(useRoute());
  const router = reactive(useRouter());
  
  function getSelectedKeys(match: any){
    let res = [];
    res = match?.map((v: any) => {
      return v.path;
    })
    return res;
  }
  
  let selectedKeys = reactive(['']);
  selectedKeys = getSelectedKeys(route.matched);
  
  let menuTree = reactive(menus);
  
  watch(route, (newVal) => {
    selectedKeys = getSelectedKeys(route.matched);
  })
  
  let openKeys = computed(() => {
    return route.matched?.length ? [route.matched[0].path] : [];
  })
  
  const handleClick = (e:any) => {
    if (selectedKeys[0] === e.key || e.key === route.path) {
      return;
    }
    router.push(e.key);
  };
  </script>