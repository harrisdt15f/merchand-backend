<template>
    <div class="cont">
        <Table :headers="headers" :column="list">
            <template v-slot:item="{row}">
                <!-- '客服名称','客服类型','客服号码','聊天链接','操作' -->
                <td>{{row.link}}</td>
                <td>{{row.content}}</td>

                <td>
                    <button class="btns-blue" @click="editClick(row)">编辑</button>
                    <button class="btns-red" @click="delClick(row)">删除</button>
                </td>
            </template>
        </Table>
        <!-- 
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />-->
        <Dialog :show.sync="dia_show" :title="dia_title">
            <div class="dia-inner">
                <div class="form">
                    <ul>
                        <li>
                            <span>聊天链接:</span>
                            <Input class="w200" v-model="form.link" />
                        </li>
                        <li>
                            <span>客服版本:</span>
                            <Radio
                                class="radio-left"
                                label="专业版"
                                :value="form.status"
                                :val="3"
                                v-model="form.status"
                            />
                            <Radio
                                class="radio-right ml20"
                                label="企业版"
                                :value="form.status"
                                :val="4"
                                v-model="form.status"
                            />
                        </li>
                        <li>
                            <span>提示内容:</span>
                            <textarea class="textarea form-textarea" v-model="form.tip_content"></textarea>
                        </li>
                        <li class="form-btn">
                            <button class="btn-plain-large" @click="dia_show=false">取消</button>
                            <button class="btn-blue-large ml50" @click="diaCfm">确认</button>
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>
        <Modal
            :show.sync="mod_show"
            title="删除"
            content="是否确认删除该聊天内容!"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            headers: ["聊天链接", "内容", "操作"],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            // dia
            dia_show: false,
            dia_title: "",
            curr_row: {},
            form: {
                name: "",
                link: "",
                type: "",
                tip_content: "",
                status: "on"
            },
            // modal
            mod_show: false,
            dia_status: ""
        };
    },
    methods: {
        diaCfm() {
            if (this.dia_status == "add") {
                this.addCfm();
            }
            if (this.dia_status == "edit") {
                this.editCfm();
            }
        },
        // 父组件点击添加按钮
        addclick() {
            this.form = {
                link: "",
                status: "",
                tip_content: "",
                type: 2
            };
            this.dia_status = "add";
            this.dia_title = "添加";
            this.dia_show = true;
        },
        addCfm() {
            let data = {
                type: 2,
                link: this.form.link,
                version: this.form.status,
                content: this.form.tip_content
            };
            // console.log('请求数据',data)
            let { url, method } = this.$api.customer_service_add;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        editClick(row) {
            this.curr_row = row;
            this.dia_status = "edit";
            this.dia_title = "编辑";
            this.dia_show = true;
            this.form = {
                link: row.link,
                status: row.version,
                tip_content: row.content,
                type: row.type
            };
        },
        editCfm() {
            let data = {
                id: this.curr_row.id,
                type: this.form.type,
                link: this.form.link,
                version: this.form.status,
                content: this.form.tip_content
            };
            // console.log('请求数据',data)
            let { url, method } = this.$api.customer_service_set;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        delClick(row) {
            this.curr_row = row;
            this.mod_show = true;
        },
        modConf() {
            let data={
                id:this.curr_row.id
            }
            let {method,url}=this.$api.customer_service_del;
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.mod_show=false;
                    this.getList();
                }
            })
        },
        getList() {
            let para = {
                type: 2
            };
            let params = window.all.tool.rmEmpty(para);

            let { url, method } = this.$api.customer_service_list;
            this.$http({ method, url, params }).then(res => {
                // console.log('列表👌👌👌👌: ', res)
                if (res && res.code === "200") {
                    this.list = res.data;
                }
            });
        },
        qrcodeClick() {},
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {
        this.getList();
    }
};
</script>

<style scoped>
.form {
    display: flex;
    justify-content: center;
}
.form ul > li {
    display: flex;
    line-height: 30px;
    margin-top: 20px;
}
.form ul > li > span:first-child {
    min-width: 5em;
    text-align: right;
    margin-right: 10px;
}
.form-btn {
    width: fit-content;
    margin: 0 auto;
}
.form-textarea {
    width: 200px;
    height: 100px;
}
</style>