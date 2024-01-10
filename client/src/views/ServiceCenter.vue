<template>
<div>
    <main class="d-flex flex-nowrap">
        <ssidebar class="sidebar"/>
    <h1>고객센터</h1>
    <router-view :key="$route.fullPath" />
</main>
</div>
</template>
<script>
import ssidebar from'../components/ServiceCenter/sidebar.vue'

export default{
    data(){
        return{

        }
    },
    components : {
     
     ssidebar
 },
}
</script>