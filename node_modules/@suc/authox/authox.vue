<template>
    <div class="authox_view">
        <nav-bar></nav-bar>
        <authox-main></authox-main>
    </div>
</template>

<script>
    import {
        navBar,
        authoxMain
    } from './components';
    export default {
        data() {
            return {}
        },
        components: {
            navBar,
            authoxMain
        },
    };
</script>