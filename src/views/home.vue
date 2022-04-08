<template>
<div>111</div>
</template>

<script setup lang="ts">
    import { usePermissionStore } from "@/store/modules/permission"
    const { token } = usePermissionStore();
    console.log("token", token)
</script>

<style lang="less">
</style>