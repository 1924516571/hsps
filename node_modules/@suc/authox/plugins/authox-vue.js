import axios from "axios";
const authoxList = {};
const authoxCheck = function (module, id) {
    let items = module.split("|");
    if (!authoxList[id]) {
        authoxList[id] = {};
    }
    if (!authoxList[id][module]) {
        authoxList[id][module] = new Promise(function (resolve, reject) {
            let params = {};
            params['resource'] = items[0];
            params['op'] = items[1];
            axios.get("/rest/authox/check", {
                params: params
            }).then(function (res) {
                if (res.data.allowed) {
                    resolve();
                } else {
                    reject();
                }
            }).catch(function (err) {
                // 暂时不考虑网络问题，如果因为网络丢包显示不正常，应当刷新页面
                reject();
            });
        });
    }
    return authoxList[id][module];
};
export default {
    install: function (Vue, options) {
        const authoxList = {};
        Vue.directive('authox', {
            bind: function (el, binding, vnode, oldVnode) {
                let id = options.state.userInfo.uid;
                let className = el.getAttribute("class");
                className = className ? className.concat(" hidden") : "hidden";
                el.setAttribute("class", className)
                authoxCheck(binding.value, id).then(function () {
                    className = className.replace("hidden", "");
                    el.setAttribute("class", className);
                }).catch(function () { });
            }
        })
    }
}