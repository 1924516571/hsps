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
                    @click="addGroup"
                >新建群组</Button>
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
            title="新建群组"
            @on-ok="saveData"
            @on-cancel="modal = false"
        >
            <Form
                :model="groupItem"
                :label-width="60"
            >
                <FormItem label="*组名">
                    <Input
                        type="text"
                        v-model="groupItem.displayName"
                    ></Input>
                </FormItem>
                <FormItem label="*备注">
                    <Input
                        type="text"
                        v-model="groupItem.des"
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
            key: "displayName",
            searchName: "",
            searchType: [
                {
                    label: "组名",
                    value: "displayName"
                }
            ],
            columns: [
                {
                    title: "组名称",
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
                                            this.editGroup(params.row.groupTag);
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
                                            this.deleteGroup(
                                                params.row.groupTag
                                            );
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
            groupItem: {
                displayName: "",
                des: "",
                groupTag: null
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
                    "/rest/authox/groups/like?key=" +
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
        addGroup() {
            this.groupItem = {
                displayName: "",
                des: "",
                groupTag: null
            };
            this.modal = true;
        },
        editGroup(id) {
            this.$router.push({
                path: "/main/authox/group/groupEdit",
                query: {
                    id: id
                }
            });
        },
        saveData() {
            this.$http
                .post("/rest/authox/groups", this.groupItem)
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
        deleteGroup(id) {
            this.$Modal.confirm({
                title: "确认删除该群组？",
                onOk: () => {
                    this.$http
                        .delete("/rest/authox/groups/" + id)
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
