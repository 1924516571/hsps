<template>
    <div class="edit_view">
        <div class="back">
            <Button type="primary" @click="$router.go(-1)">返回</Button>
        </div>
        <Collapse value="1">
            <Panel name="1" :hide-arrow="true">
                角色详情
                <Button type="text" size="small" @click.stop="modal=true" v-authox="'authox|manage'">编辑基本信息</Button>
                <div slot="content">
                    <table cellspacing="0" cellpadding="0" border="0" class="info_table">
                        <tr>
                            <td>
                                <span>角色标识：</span>
                                <span>{{roleInfo.role}}</span>
                            </td>
                            <td>
                                <span>角色名：</span>
                                <span>{{roleInfo.name}}</span>
                            </td>
                            <td>
                                <span>备注：</span>
                                <span>{{roleInfo.des}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>父节点：</span>
                                <Tag type="border" color="primary" v-for="(item,index) in roleInfo.parents" :key="index">{{item}}</Tag>
                            </td>
                            <td>
                                <span>创建时间：</span>
                                <span>{{roleInfo.createtimestamp | dateFormat("yyyy-MM-dd HH:mm:ss")}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </Panel>
        </Collapse>
        <Collapse value="1">
            <Panel name="1" :hide-arrow="true">
                角色权限
                <Button type="text" size="small" @click.stop="isEdited = false" v-if="isEdited">编辑权限</Button>
                <Button type="text" size="small" @click.stop="saveRole" v-if="!isEdited">保存修改</Button>
                <Button type="text" size="small" @click.stop="cancelRole" v-if="!isEdited">取消修改</Button>
                <div slot="content">
                    <table cellspacing="0" cellpadding="0" border="0" class="info_table">
                        <tr>
                            <th style="width:120px;">客体</th>
                            <th>操作项</th>
                        </tr>
                        <tr v-for="rules in allRules">
                            <td><span style="line-height: 2;">{{objs[rules.objectTag]}}</span></td>
                            <td>
                                <span v-for="op in rules.ops">
                                    <Button :type="op.checked?'default':'text'" :icon="op.checked?'md-checkmark':''"
                                        @click="op.checked=!op.checked" :disabled="isEdited">{{opes[op.op]}}</Button>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </Panel>
        </Collapse>
        <Collapse value="1">
            <Panel name="1" :hide-arrow="true">
                引用记录
                <div slot="content">
                    <Table :columns="subjectsColumns" :data="subjects" size="small" stripe></Table>
                </div>
            </Panel>
        </Collapse>
        <Modal v-model="modal" title="编辑角色" @on-ok="saveData" @on-cancel="modal = false;loadData();">
            <Form :model="roleInfo" :label-width="80">
                <FormItem label="*角色名称">
                    <Input type="text" v-model="roleInfo.name"></Input>
                </FormItem>
                <FormItem label="父节点">
                    <Select v-model="roleInfo.parents" multiple>
                        <Option v-for="item in roleList" :value="item.name" :key="item.role" :label="item.name"></Option>
                    </Select>
                </FormItem>
                <FormItem label="备注">
                    <Input type="text" v-model="roleInfo.des"></Input>
                </FormItem>
            </Form>
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
                modal: false,
                id: this.$route.query.id,
                isEdited: true,
                subjects: [],
                roleList: [],
                objs: [],
                opes: [],
                allRules: [],
                subjectsColumns: [{
                    title: "被授权对象",
                    key: "name"
                }, {
                    title: "备注",
                    key: "des"
                }, {
                    title: "类型",
                    key: "type"
                }],
                roleInfo: {}
            }
        },
        created() {
            this.loadData();
            this.getRoleList();
            this.getSubjects();
            this.getRoleDetail();
        },
        methods: { //定义方法
            loadData() {
                this.$http.get("/rest/authox/roles/" + this.id).then(res => {
                    this.roleInfo = res.data;
                }).catch(err => {
                    console.log(err.data);
                })
            },
            getRoleList() {
                this.$http.get("/rest/authox/roles/" + this.id + "/validRoles").then(res => {
                    this.roleList = res.data;
                }).catch(err => {
                    console.log(err.data);
                })
            },
            getSubjects() {
                this.$http.get("/rest/authox/roles/" + this.id + "/subjects").then(res => {
                    this.subjects = res.data;
                }).catch(err => {
                    console.log(err.data);
                })
            },
            getRoleDetail() {
                this.$http.all([
                    this.$http.get('rest/authox/objects'),
                    this.$http.get('rest/authox/operations'),
                    this.$http.get('rest/authox/objectOps')
                ]).then(this.$http.spread((data1, data2, data3) => {
                    this.objs = data1.data;
                    this.opes = data2.data;
                    let rules = data3.data;

                    this.allRules = [];
                    rules.forEach(i => {
                        var n = false;
                        this.allRules.forEach(j => {
                            if (j.objectTag === i.objectcode) {
                                n = true;
                                j.ops.push({
                                    'op': i.opcode,
                                    checked: false
                                })
                            }
                        })
                        if (!n) {
                            var tagObj = {};
                            tagObj.objectTag = i.objectcode;
                            tagObj.isEdited = false;
                            tagObj.ops = [];
                            tagObj.ops.push({
                                'op': i.opcode,
                                checked: false
                            });
                            this.allRules.push(tagObj)
                        }
                    })
                    this.$http.get('rest/authox/roles/' + this.id + '/rules').then(res => {
                        let data = res.data;
                        data.forEach(i => {
                            this.allRules.forEach(j => {
                                if (i.objectTag === j.objectTag) {
                                    j.ops.forEach(m => {
                                        if (m.op === i.op) {
                                            m.checked = true;
                                        }
                                    })
                                }
                            })
                        })
                    })
                })).catch(err => {
                    console.log(err);
                })
            },
            saveRole() {
                let data = [];
                this.allRules.forEach((i) => {
                    i.ops.forEach((j) => {
                        if (j.checked) {
                            var a = {
                                objectTag: i.objectTag,
                                op: j.op
                            }
                            data.push(a);
                        }
                    })
                })
                this.$http.post("rest/authox/roles/" + this.id + "/rules", data).then(data => {
                    this.isEdited = true;
                    this.getRoleDetail();
                    this.$Message.success('保存成功！');
                }).catch(err => {
                    this.$Message.error('保存失败！');
                    console.log(err);
                })
            },
            cancelRole() {
                this.getRoleDetail();
                this.isEdited = true;
            },
            saveData() {
                let role = {
                    role: this.roleInfo.role,
                    name: this.roleInfo.name,
                    des: this.roleInfo.des,
                    parents: []
                }
                this.roleInfo.parents.forEach(element => {
                    this.roleList.forEach(item => {
                        if (item.name == element) {
                            role.parents.push(item.role);
                        }
                    })
                });
                this.$http.post("/rest/authox/roles/" + this.id, role).then(res => {
                    this.modal = false;
                    this.$Message.success('保存成功！');
                    this.loadData();
                }).catch(err => {
                    this.$Message.error('保存失败！');
                    console.log(err);
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
