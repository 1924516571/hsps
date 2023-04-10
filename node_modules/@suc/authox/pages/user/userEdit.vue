<template>
    <div class="edit_view">
        <div class="back">
            <Button type="primary" @click="$router.go(-1)">返回</Button>
        </div>
        <Collapse value="1">
            <Panel name="1" :hide-arrow="true">
                用户详情
                <Button type="text" size="small" @click.stop="editModal = true">编辑基本信息</Button>
                <div slot="content">
                    <table cellspacing="0" cellpadding="0" border="0" class="info_table">
                        <tr>
                            <td>
                                <span>账号：</span>
                                <span>{{userInfo.account}}</span>
                            </td>
                            <td>
                                <span>用户名：</span>
                                <span>{{userInfo.displayName}}</span>
                            </td>
                            <td>
                                <span class="resetPass" @click="resetPass">重置密码</span>
                                <Icon type="md-alert" title="重置密码为123456" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>备注：</span>
                                <span>{{userInfo.description}}</span>
                            </td>
                            <td>
                                <span>创建时间：</span>
                                <span>{{userInfo.createTimestamp | dateFormat("yyyy-MM-dd HH:mm:ss")}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </Panel>
        </Collapse>
        <Collapse value="1">
            <Panel name="1" :hide-arrow="true">
                用户角色
                <Button type="text" size="small" @click.stop="editRole">编辑用户角色</Button>
                <div slot="content">
                    <Table :columns="roleColumns" :data="userInfo.roles" size="small" stripe></Table>
                </div>
            </Panel>
        </Collapse>
        <Collapse value="1">
            <Panel name="1" :hide-arrow="true">
                用户加入的组
                <div slot="content">
                    <Table :columns="groupColumns" :data="groupsList" size="small" stripe></Table>
                </div>
            </Panel>
        </Collapse>
        <Modal v-model="editModal" title="编辑用户" @on-ok="saveData" @on-cancel="editModal = false;loadData();">
            <Form :model="userInfo" :label-width="60">
                <FormItem label="*账号">
                    <Input type="text" v-model="userInfo.account"></Input>
                </FormItem>
                <FormItem label="*用户名">
                    <Input type="text" v-model="userInfo.displayName"></Input>
                </FormItem>
                <FormItem label="*备注">
                    <Input type="text" v-model="userInfo.description"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="roleModal" title="编辑用户角色" @on-ok="saveRole" @on-cancel="roleModal = false">
            <Transfer :data="roleList" :target-keys="targetKeys" :render-format="roleRender" filterable :filter-method="filterMethod"
                @on-change="onChange" :titles="['角色列表','已有角色']"></Transfer>
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
                editModal: false,
                roleModal: false,
                id: this.$route.query.id,
                roleList: [],
                targetKeys: [],
                groupsList: [],
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
                            return h(
                                "div",
                                params.row.createtimestamp ?
                                this.$utils.dateFormat(
                                    new Date(params.row.createtimestamp),
                                    "yyyy-MM-dd HH:mm:ss"
                                ) :
                                ""
                            );
                        }
                    }
                ],
                groupColumns: [{
                        title: "组名",
                        key: "displayName"
                    },
                    {
                        title: "备注",
                        key: "des"
                    }
                ],
                journalColumns: [{
                        title: "操作记录",
                        key: "role"
                    },
                    {
                        title: "操作时间",
                        key: "name"
                    }
                ],
                userInfo: {
                    account: "",
                    displayName: "",
                    description: ""
                }
            };
        },
        created() {
            this.loadData();
            this.getRoleList();
            this.getGroups();
        },
        methods: {
            //定义方法
            loadData() {
                this.$http
                    .get("/rest/authox/users/" + this.id)
                    .then(res => {
                        this.userInfo = res.data;
                    })
                    .catch(err => {
                        console.log(err.data);
                    });
            },
            getRoleList() {
                this.$http
                    .get("/rest/authox/roles")
                    .then(res => {
                        this.roleList = res.data;
                        this.roleList.forEach((item, index) => {
                            item.key = index + 1;
                        });
                    })
                    .catch(err => {
                        console.log(err.data);
                    });
            },
            getGroups() {
                this.$http
                    .get("/rest/authox/users/" + this.id + "/groups")
                    .then(res => {
                        this.groupsList = res.data;
                    })
                    .catch(err => {
                        console.log(err.data);
                    });
            },
            saveData() {
                this.$http
                    .post("/rest/authox/users/" + this.id, this.userInfo)
                    .then(res => {
                        this.editModal = false;
                        this.$Message.success('保存成功！');
                        this.loadData();
                    })
                    .catch(err => {
                        this.$Message.error('保存失败！');
                        console.log(err.data);
                    });
            },
            editRole() {
                this.targetKeys = [];
                this.userInfo.roles.forEach(role => {
                    this.roleList.forEach(item => {
                        if (role.role == item.role) {
                            this.targetKeys.push(item.key);
                        }
                    })
                })
                this.roleModal = true;
            },
            saveRole() {
                let roles = [];
                this.targetKeys.forEach(item => {
                    roles.push(this.roleList[item - 1].role)
                })
                this.$http
                    .post("/rest/authox/users/" + this.id + "/roles", roles)
                    .then(res => {
                        this.roleModal = false;
                        this.$Message.success('保存成功！');
                        this.loadData();
                    })
                    .catch(err => {
                        this.$Message.error('保存失败！');
                        console.log(err.data);
                    });
            },
            resetPass() {
                this.$Modal.confirm({
                    title: '重置密码',
                    content: '确认重置该账号密码为123456？',
                    onOk: () => {
                        this.$http
                            .post("/rest/authox/users/" + this.id + "/resetPassword")
                            .then(res => {
                                this.$Message.success('重置成功！');
                            })
                            .catch(err => {
                                this.$Message.error('重置失败！');
                                console.log(err.data);
                            });
                    },
                    onCancel: () => {}
                });
            },
            filterMethod(data, query) {
                return data.name.indexOf(query) > -1;
            },
            roleRender(item) {
                return item.name;
            },
            onChange(newTargetKeys) {
                this.targetKeys = newTargetKeys;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .edit_view {
        i {
            font-size: 16px;
            vertical-align: text-bottom;
            margin-left: 5px;
        }

        .resetPass {
            color: #337ab7;
            cursor: pointer;

            &:hover {
                color: #23527c;
                text-decoration: underline;
            }
        }
    }
</style>
