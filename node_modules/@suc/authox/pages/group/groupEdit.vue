<template>
    <div class="edit_view">
        <div class="back">
            <Button type="primary" @click="$router.go(-1)">返回</Button>
        </div>
        <Collapse value="1">
            <Panel name="1" :hide-arrow="true">
                群组详情
                <Button type="text" size="small" @click.stop="editGroup = true">编辑群组信息</Button>
                <div slot="content">
                    <table cellspacing="0" cellpadding="0" border="0" class="info_table">
                        <tr>
                            <td>
                                <span>群组名：</span>
                                <span>{{groupInfo.displayName}}</span>
                            </td>
                            <td>
                                <span>备注：</span>
                                <span>{{groupInfo.des}}</span>
                            </td>
                            <td>
                                <span>创建时间：</span>
                                <span>{{groupInfo.createtimestamp | dateFormat("yyyy-MM-dd HH:mm:ss")}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </Panel>
        </Collapse>
        <Collapse value="1">
            <Panel name="1" :hide-arrow="true">
                群组成员
                <Button type="text" size="small" @click.stop="editMember">编辑群组成员</Button>
                <div slot="content">
                    <Table :columns="userColumns" :data="memberList" size="small" stripe></Table>
                </div>
            </Panel>
        </Collapse>
        <Collapse value="1">
            <Panel name="1" :hide-arrow="true">
                群组角色
                <Button type="text" size="small" @click.stop="editRole">编辑群组角色</Button>
                <div slot="content">
                    <Table :columns="roleColumns" :data="groupInfo.roles" size="small" stripe></Table>
                </div>
            </Panel>
        </Collapse>
        <Modal v-model="editGroup" title="编辑群组" @on-ok="saveGroup" @on-cancel="editGroup = false;loadData();">
            <Form :model="groupInfo" :label-width="60">
                <FormItem label="*组名">
                    <Input type="text" v-model="groupInfo.displayName"></Input>
                </FormItem>
                <FormItem label="*备注">
                    <Input type="text" v-model="groupInfo.des"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="roleModal" title="编辑群组角色" @on-ok="saveRole" @on-cancel="roleModal = false">
            <Transfer :data="roleList" :target-keys="targetKeys" :render-format="roleRender" filterable :filter-method="filterMethod"
                @on-change="onChange" :titles="['角色列表','已有角色']"></Transfer>
        </Modal>
        <Modal v-model="memberModal" title="编辑群组成员" @on-ok="saveMember" @on-cancel="memberModal = false">
            <Transfer :data="userList" :target-keys="memberKeys" :render-format="roleRender2" filterable :filter-method="filterMethod2"
                @on-change="onChange2" :titles="['用户列表','成员列表']"></Transfer>
        </Modal>
    </div>
</template>
<script>
    import {
        Collapse, Button, Modal,
        Panel,
        Transfer, FormItem, Form, Input, Table
    } from 'iview';

    export default {
        components: {
            Collapse,
            Button,
            Modal,
            Panel,
            Transfer,
            Form,
            FormItem,
            Input,
            Table
        },
        data() {
            return {
                id: this.$route.query.id,
                editGroup: false,
                roleModal: false,
                memberModal: false,
                userList: [],
                memberList: [],
                roleList: [],
                targetKeys: [],
                memberKeys: [],
                allUserList: [],
                userTargetKeys: [],
                roleColumns: [{
                        title: "角色标识",
                        key: "role"
                    },
                    {
                        title: "角色名称",
                        key: "name"
                    },
                    {
                        title: "备注",
                        key: "des"
                    },
                    {
                        title: "创建时间",
                        key: "",
                        render: (h, params) => {
                            return h("div", params.row.createtimestamp ? this.$utils.dateFormat(new Date(params
                                .row.createtimestamp), "yyyy-MM-dd HH:mm:ss") : "");
                        }
                    }
                ],
                userColumns: [{
                    title: "账号",
                    key: "account"
                }, {
                    title: "用户名",
                    key: "displayName"
                }, {
                    title: "备注",
                    key: "description"
                }, {
                    title: "创建时间",
                    key: "",
                    render: (h, params) => {
                        return h('div', params.row.createTimestamp ? this.$utils.dateFormat(new Date(params
                            .row.createTimestamp), "yyyy-MM-dd HH:mm:ss") : "");
                    }
                }],
                groupInfo: {}
            }
        },
        created() {
            this.loadData();
            this.getMemberList();
            this.getUserList();
            this.getRoleList();
        },
        methods: { //定义方法
            loadData() {
                this.$http.get("/rest/authox/groups/" + this.id).then(res => {
                    this.groupInfo = res.data;
                }).catch(err => {
                    console.log(err.data);
                })
            },
            getRoleList() {
                this.$http.get("/rest/authox/roles").then(res => {
                    this.roleList = res.data;
                    this.roleList.forEach((item, index) => {
                        item.key = index + 1;
                    });
                }).catch(err => {
                    console.log(err.data);
                });
            },
            getUserList() {
                this.$http.get("/rest/authox/users").then(res => {
                    this.userList = res.data;
                    this.userList.forEach((item, index) => {
                        item.key = index + 1;
                    })
                }).catch(err => {
                    console.log(err.data);
                })
            },
            getMemberList() {
                this.$http.get("/rest/authox/groups/" + this.id + "/users").then(res => {
                    this.memberList = res.data;
                }).catch(err => {
                    console.log(err.data);
                })
            },
            editRole() {
                this.targetKeys = [];
                this.groupInfo.roles.forEach(role => {
                    this.roleList.forEach(item => {
                        if (role.role == item.role) {
                            this.targetKeys.push(item.key);
                        }
                    })
                })
                this.roleModal = true;
            },
            editMember() {
                this.memberKeys = [];
                this.memberList.forEach(member => {
                    this.userList.forEach(user => {
                        if (user.uid == member.uid) {
                            this.memberKeys.push(user.key);
                        }
                    })
                })
                this.memberModal = true;
            },
            saveMember() {
                let members = [];
                this.memberKeys.forEach(item => {
                    members.push(this.userList[item - 1].uid);
                })
                this.$http.post("/rest/authox/groups/" + this.id + "/users", members).then(res => {
                    this.memberModal = false;
                    this.$Message.success('保存成功！');
                    this.getMemberList();
                }).catch(err => {
                    this.$Message.error('保存失败！');
                    console.log(err.data);
                });
            },
            saveRole() {
                let roles = [];
                this.targetKeys.forEach(item => {
                    roles.push(this.roleList[item - 1].role)
                })
                this.$http.post("/rest/authox/groups/" + this.id + "/roles", roles).then(res => {
                    this.roleModal = false;
                    this.$Message.success('保存成功！');
                    this.loadData();
                }).catch(err => {
                    this.$Message.error('保存失败！');
                    console.log(err.data);
                });
            },
            saveGroup() {
                this.$http.post("/rest/authox/groups/" + this.id, this.groupInfo).then(res => {
                    this.editGroup = false;
                    this.$Message.success('保存成功！');
                    this.loadData();
                }).catch(err => {
                    this.$Message.error('保存失败！');
                    console.log(err.data);
                });
            },
            filterMethod(data, query) {
                return data.name.indexOf(query) > -1;
            },
            filterMethod2(data, query) {
                return data.displayName.indexOf(query) > -1;
            },
            roleRender(item) {
                return item.name;
            },
            roleRender2(item) {
                return item.displayName;
            },
            onChange(newTargetKeys) {
                this.targetKeys = newTargetKeys;
            },
            onChange2(newTargetKeys) {
                this.memberKeys = newTargetKeys;
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
