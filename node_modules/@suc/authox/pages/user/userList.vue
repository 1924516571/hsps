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
                    @click="addUser"
                >新建用户</Button>
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
        <div class="pages">
            <Page
                :total="pages.total"
                :page-size="pages.pageSize"
                :current="pages.current"
                show-total
                @on-change="pageChange"
            ></Page>
        </div>
        <Modal
            v-model="modal"
            title="新建用户"
            @on-ok="saveData"
            @on-cancel="modal = false"
        >
            <Form
                :model="userItem"
                :label-width="60"
            >
                <FormItem label="*账号">
                    <Input
                        type="text"
                        v-model="userItem.account"
                    ></Input>
                </FormItem>
                <FormItem label="*用户名">
                    <Input
                        type="text"
                        v-model="userItem.displayName"
                    ></Input>
                </FormItem>
                <FormItem label="备注">
                    <Input
                        type="text"
                        v-model="userItem.description"
                    ></Input>
                </FormItem>
                <FormItem label="*密码">
                    <Input
                        type="password"
                        v-model="userItem.password"
                    ></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import {Select, Option, Form, FormItem, Input, Modal, Table, Button, Page} from "iview";

export default {
        components: {
            Select,
            Option,
            Form,
            FormItem,
            Input,
            Modal,
            Table,
            Button,
            Page
        },
    data() {
        //定义变量
        return {
            modal: false,
            loading: false,
            tableHeight: document.documentElement.clientHeight - 170,
            key: "account",
            searchName: "",
            searchType: [
                {
                    label: "用户名",
                    value: "displayName"
                },
                {
                    label: "账号",
                    value: "account"
                }
            ],
            columns: [
                {
                    title: "账号",
                    key: "account"
                },
                {
                    title: "用户名",
                    key: "displayName"
                },
                {
                    title: "角色", //嵌套数据展示
                    key: "",
                    render: (h, params) => {
                        let tags = [];
                        params.row.roles.forEach(element => {
                            tags.push(
                                h(
                                    "Tag",
                                    {
                                        props: {
                                            type: "border",
                                            color: "primary"
                                        }
                                    },
                                    element.name
                                )
                            );
                        });
                        return h("div", tags);
                    }
                },
                {
                    title: "备注",
                    key: "description"
                },
                {
                    title: "创建时间", //时间过滤
                    key: "",
                    render: (h, params) => {
                        return h(
                            "div",
                            params.row.createTimestamp
                                ? this.$utils.dateFormat(
                                      new Date(params.row.createTimestamp),
                                      "yyyy-MM-dd HH:mm:ss"
                                  )
                                : ""
                        );
                    }
                },
                {
                    title: "操作", //添加按钮
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
                                            this.editUser(params.row.uid);
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
                                            this.deleteUser(params.row.uid);
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
            userItem: {
                account: "",
                displayName: "",
                description: "",
                password: ""
            },
            pages: {
                pageSize: parseInt(
                    (document.documentElement.clientHeight - 202) / 40
                ),
                current: 1,
                total: 0
            }
        };
    },
    created() {
        //在页面dom结构创建之前执行
        this.loadData();
    },
    methods: {
        loadData() {
            this.loading = true;
            this.$http
                .get(
                    "/rest/authox/usersByPage/like?" +
                        this.key +
                        "=" +
                        this.searchName +
                        "&pageNum=" +
                        (this.pages.current - 1) +
                        "&pageSize=" +
                        this.pages.pageSize
                )
                .then(res => {
                    this.loading = false;
                    this.dataList = res.data.pageItems;
                    this.pages.total = res.data.rowCount;
                })
                .catch(err => {
                    this.loading = false;
                    console.log(err);
                });
        },
        pageChange(num) {
            this.pages.current = num;
            this.loadData();
        },
        addUser() {
            this.userItem = {
                account: "",
                displayName: "",
                description: "",
                password: ""
            };
            this.modal = true;
        },
        editUser(id) {
            this.$router.push({
                path: "/main/authox/user/userEdit",
                query: {
                    id: id
                }
            });
        },
        saveData() {
            this.$http
                .post("/rest/authox/users", this.userItem)
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
                        .delete("/rest/authox/users/" + id)
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
