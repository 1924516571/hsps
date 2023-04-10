<template>
    <div class="table_view">
        <div class="tool_bar">
            <Select
                v-model="key"
                style="width:80px;margin-right: 10px;"
            >
                <Option
                    v-for="item in searchType"
                    :value="item.value"
                    :key="item.value"
                >{{item.label}}</Option>
            </Select>
            <Input
                v-model="searchName"
                placeholder="输入查询内容"
                @keyup.enter.native="loadData"
                style="width: 200px;margin-right: 10px;"
            />
            <Button
                type="primary"
                @click="loadData"
            >查询</Button>
            <div class="buttons">
                <Button
                    type="primary"
                    @click="addRole"
                >新建角色</Button>
            </div>
        </div>
        <div
            class="table_list"
            ref="table_list"
        >
            <Table
                :height="tableHeight"
                :loading="loading"
                :columns="columns"
                :data="dataList"
                size="small"
                stripe
            ></Table>
        </div>
        <Modal
            v-model="modal"
            title="新建角色"
            @on-ok="saveData"
            @on-cancel="modal = false"
        >
            <Form
                :model="roleItem"
                :label-width="80"
            >
                <FormItem label="*角色标识">
                    <Input
                        type="text"
                        v-model="roleItem.role"
                    ></Input>
                </FormItem>
                <FormItem label="*角色名称">
                    <Input
                        type="text"
                        v-model="roleItem.name"
                    ></Input>
                </FormItem>
                <FormItem label="父节点">
                    <Select
                        v-model="roleItem.parents"
                        multiple
                    >
                        <Option
                            v-for="item in roleList"
                            :value="item.role"
                            :key="item.role"
                            :label="item.name"
                        ></Option>
                    </Select>
                </FormItem>
                <FormItem label="备注">
                    <Input
                        type="text"
                        v-model="roleItem.des"
                    ></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import {Select, Option, Form, FormItem, Input, Modal, Table, Button} from "iview";

export default {
        components: {
            Select,
            Option,
            Form,
            FormItem,
            Input,
            Modal,
            Table,
            Button
        },
    data() {
        //定义变量
        return {
            modal: false,
            loading: false,
            tableHeight: document.documentElement.clientHeight - 120,
            key: "name",
            searchName: "",
            searchType: [
                {
                    label: "角色名",
                    value: "name"
                }
            ],
            roleList: [],
            columns: [
                {
                    title: "角色标识",
                    key: "role"
                },
                {
                    title: "角色名称",
                    key: "name"
                },
                {
                    title: "父节点", //嵌套数据展示
                    key: "",
                    render: (h, params) => {
                        let tags = [];
                        params.row.parents.forEach(element => {
                            tags.push(
                                h(
                                    "Tag",
                                    {
                                        props: {
                                            type: "border",
                                            color: "primary"
                                        }
                                    },
                                    element
                                )
                            );
                        });
                        return h("div", tags);
                    }
                },
                {
                    title: "备注",
                    key: "des"
                },
                {
                    title: "创建时间", //时间过滤
                    key: "",
                    render: (h, params) => {
                        return h(
                            "div",
                            params.row.createtimestamp
                                ? this.$utils.dateFormat(
                                      new Date(params.row.createtimestamp),
                                      "yyyy-MM-dd HH:mm:ss"
                                  )
                                : ""
                        );
                    }
                },
                {
                    title: "操作     ", //添加按钮
                    key: "",
                    align: "right",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#2372fe"
                                    },
                                    on: {
                                        click: () => {
                                            this.editUser(params.row.role);
                                        }
                                    }
                                },
                                "管理"
                            ),
                            h(
                                "span",
                                {
                                    style: {
                                        marginRight: "5px",
                                        color: "#ccc"
                                    }
                                },
                                "|"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    style: {
                                        color: "#e93820"
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteUser(params.row.role);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            dataList: [],
            roleItem: {
                role: "",
                name: "",
                des: "",
                parents: []
            }
        };
    },
    created() {
        //在页面dom结构创建之前执行
        this.loadData();
        this.getRoleList();
    },
    methods: {
        loadData() {
            this.loading = true;
            this.$http
                .get(
                    "rest/authox/roles/like?key=" +
                        this.key +
                        "&value=" +
                        this.searchName
                )
                .then(res => {
                    this.loading = false;
                    this.dataList = res.data;
                })
                .catch(err => {
                    this.loading = false;
                    console.log(err.data);
                });
        },
        getRoleList() {
            this.$http
                .get("rest/authox/roles")
                .then(res => {
                    this.roleList = res.data;
                })
                .catch(err => {
                    console.log(err.data);
                });
        },
        addRole() {
            this.roleItem = {
                role: "",
                name: "",
                des: "",
                parents: []
            };
            this.modal = true;
        },
        editUser(id) {
            this.$router.push({
                path: "/main/authox/role/roleEdit",
                query: {
                    id: id
                }
            });
        },
        saveData() {
            this.$http
                .post("/rest/authox/roles", this.roleItem)
                .then(res => {
                    this.modal = false;
                    this.loadData();
                    this.$Message.success("添加成功！");
                })
                .catch(err => {
                    this.$Message.error("添加失败！");
                    console.log(err.data);
                });
        },
        deleteUser(id) {
            this.$Modal.confirm({
                title: "确认删除该用户？",
                onOk: () => {
                    this.$http
                        .delete("/rest/authox/roles/" + id)
                        .then(res => {
                            this.$Message.success("删除成功！");
                            this.loadData();
                        })
                        .catch(err => {
                            this.$Message.error("删除失败！");
                            console.log(err.data);
                        });
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.table_list {
    th:last-child {
        padding-right: 8px;
    }
}
</style>
