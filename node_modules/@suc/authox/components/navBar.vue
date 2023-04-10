<template>
    <div class="nav_bar">
        <Menu :active-name="activeNav" width="170px">
            <MenuItem name="user" to="/main/authox/user">用户管理</MenuItem>
            <MenuItem name="group" to="/main/authox/group">群组管理</MenuItem>
            <MenuItem name="role" to="/main/authox/role">角色管理</MenuItem>
        </Menu>
    </div>
</template>

<script>

    import {Menu, MenuItem} from "iview";

    export default {
        name: "navBar",
        components: {
            Menu,
            MenuItem
        },
        data() {
            return {
                activeNav: this.$route.matched[2].meta.name
            }
        }
    };
</script>
