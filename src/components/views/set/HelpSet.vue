<template>
    <div class="container">
        <div>
            <button
                v-for="(item, index) in btn_opt"
                :key="index"
                :class="curr_btn===item.value?'btn-blue-large':'btn-plain-large'"
                @click="plantSelect(item)"
            >{{item.label}}</button>
        </div>
        <div>
            <div class="filter p10 mt20">
                <ul class="left">
                    <li>
                        <span>标题</span>
                        <Input v-model="filter.title" />
                    </li>
                    <li>
                        <span>启用状态</span>
                        <Select v-model="filter.status" :options="status_opt"></Select>
                    </li>
                    <li>
                        <button class="btn-blue" @click="getList()">查询</button>
                        <button class="btn-blue" @click="addFather">添加父级帮助栏</button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="help-list">
            <ul>
                <li v-for="(lv1,lv1_index) in list" :key="lv1_index">
                    <div>
                        <table class="lv1-table">
                            <tr>
                                <td>
                                    <img
                                        v-if="show_help_list[lv1_index]"
                                        @click="hide_list(lv1,lv1_index)"
                                        style="width:20px;"
                                        src="../../../assets/image/hide.png"
                                        alt
                                    />
                                    <img
                                        v-else
                                        @click="show_list(lv1,lv1_index)"
                                        style="width:20px;"
                                        src="../../../assets/image/show.png"
                                        alt
                                    />
                                </td>
                                <td>{{lv1.title}}</td>
                                <td>
                                    <Switchbox
                                        :value="lv1.status"
                                        @update="switchStatus($event,lv1)"
                                    ></Switchbox>
                                </td>
                                <td>最后更新时间：{{lv1.updated_at}}</td>
                                <td>添加时间：{{lv1.created_at}}</td>
                                <td>
                                    <button class="btn" @click="addSon(lv1)">添加</button>
                                    <button class="btn" @click="editFather(lv1)">编辑</button>
                                    <button class="btn-red" @click="delFather(lv1)">删除</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <ul v-if="show_help_list[lv1_index] && lv1.childs ">
                        <li v-for="(lv2,lv2_index) in lv1.childs" :key="lv2_index">
                            <table class="lv2-table">
                                <tr v-if="lv2_index==0" class="lv2-header">
                                    <th>编号</th>
                                    <th>标题</th>
                                    <th>内容</th>
                                    <th>状态</th>
                                    <th>添加人</th>
                                    <th>添加时间</th>
                                    <th>最后更新人</th>
                                    <th>最后更新时间</th>
                                    <th>操作</th>
                                </tr>
                                <tr style="width:100%;height:35px;">
                                    <td>{{lv2_index+1}}</td>
                                    <td>{{lv2.title}}</td>
                                    <td style="padding-top:5px;">
                                        <!-- <img style="width:100px;" :src="head_path+lv2.pic" alt /> -->
                                        <PicShow>
                                            <img
                                                style="max-width:50px;max-height:50px"
                                                class="td-icon"
                                                :src="head_path+lv2.pic"
                                                alt="图片加载中"
                                            />
                                            <template v-slot:content>
                                                <div>
                                                    <img
                                                        style="max-width:1100px;max-height:1000px;"
                                                        class="tooltip-img"
                                                        :src="head_path+lv2.pic"
                                                        alt="图片加载中"
                                                    />
                                                </div>
                                            </template>
                                        </PicShow>
                                    </td>
                                    <td>
                                        <Switchbox
                                            :value="lv2.status"
                                            @update="switchSonStatus($event,lv2)"
                                        ></Switchbox>
                                    </td>
                                    <td>{{lv2.author}}</td>
                                    <td>{{lv2.created_at}}</td>
                                    <td>{{lv2.newer}}</td>
                                    <td>{{lv2.updated_at}}</td>
                                    <td>
                                        <button class="btn-edit"  @click="downLoad(lv2,lv1)" >下载图片</button>
                                        <button class="btn-edit" @click="editSon(lv2)">编辑</button>
                                        <button class="btn-del" @click="delSon(lv2)">删除</button>
                                    </td>
                                </tr>
                            </table>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />
        <Dialog :show.sync="dia_show" :title="dia_title">
            <div class="dia-inner">
                <div class="flex-center">
                    <ul class="form">
                        <li>
                            <span>标题:</span>
                            <Input class="w200" v-model="form.title" />
                        </li>
                        <li v-if="this.dia_status=='lv2' || this.dia_status=='editSon' ">
                            <span>添加图片:</span>
                            <!-- <Input style="width:98px" v-model="form.pic_path" /> -->
                            <span style="width:100px;height:100px" >
                                <img style="max-width:100px;max-height:100px" :src="head_path+form.pic_path" alt="">
                            </span>
                            <Upload
                                style="width:100px;"
                                title="选择图片"
                                @change="AddPicChange($event)"
                                type="file"
                            />
                        </li>
                        <li>
                            <span>是否启用:</span>
                            <Switchbox v-model="form.status" />
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
            content="是否删除该线下支付"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>

<script>
export default {
    name: "HelpSet",
    data() {
        return {
            curr_btn: 1,
            btn_opt: [
                { label: "H5帮助管理", value: 1 },
                { label: "PC帮助管理", value: 2 },
                { label: "APP帮助管理", value: 3 }
            ],
            list: [],
            status_opt: [
                { label: "全部", value: "" },
                { label: "启用", value: "1" },
                { label: "关闭", value: "0" }
            ],
            filter: {
                title: "",
                status: ""
            },
            show_help_list: [],
            form: {
                title: "",
                pic_path: "",
                status: true
            },
            dia_title: "",
            dia_show: false,
            dia_status: "",
            protocol: window.location.protocol,
            head_path: "",
            curr_row: {},
            mod_show: false,
            curr_list: {},
            curr_son_list: {},
            del_status: "",
            total: 0,
            pageNo: 1,
            pageSize: 25,
        };
    },
    methods: {
        downLoad(row,row_father){
            // console.log('row',row)
            // console.log('father',row_father)
            var image = new Image();
            // 解决跨域 Canvas 污染问题
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;

                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                var url = canvas.toDataURL("image/png");

                // 生成一个a元素
                var a = document.createElement("a");
                // 创建一个单击事件
                var event = new MouseEvent("click");

                // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
                a.download = name || row_father.title+'-'+row.title;
                // 将生成的URL设置为a.href属性
                a.href = url;
                // 触发a的单击事件
                a.dispatchEvent(event);
            };

            image.src =this.head_path+row.pic;
        },
        switchStatus(val, lv1) {
            let data = {
                id: lv1.id,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.help_center_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        switchSonStatus(val, lv2) {
            let data = {
                id: lv2.id,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.help_center_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        delFather(lv1) {
            this.mod_show = true;
            this.curr_list = lv1;
            this.del_status = "father";
        },
        delSon(lv2) {
            this.mod_show = true;
            this.curr_son_list = lv2;
            this.del_status = "son";
        },
        modConf() {
            if (this.del_status == "father") {
                this.fatherDelCfm();
            }
            if (this.del_status == "son") {
                this.sonDelCfm();
            }
        },
        fatherDelCfm() {
            let data = {
                id: this.curr_list.id
            };
            let { url, method } = this.$api.help_center_del;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.mod_show = false;
                    this.getList();
                }
            });
        },
        sonDelCfm() {
            let data = {
                id: this.curr_son_list.id
            };
            let { url, method } = this.$api.help_center_del;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.mod_show = false;
                    this.getList();
                }
            });
        },
        clearForm() {
            this.form = {
                title: "",
                pic_path: "",
                status: true
            };
        },
        addFather() {
            this.dia_status = "lv1";
            this.dia_show = true;
            this.dia_title = "添加父级帮助栏";
            this.clearForm();
        },
        addSon(lv1) {
            console.log("lv1", lv1);
            this.dia_status = "lv2";
            this.dia_show = true;
            this.dia_title = "添加";
            this.clearForm();
            this.curr_row = lv1;
        },
        diaCfm() {
            if (this.dia_status == "lv1") {
                this.addFatherCfm();
            }
            if (this.dia_status == "lv2") {
                this.addSonCfm();
            }
            if (this.dia_status == "editFather") {
                this.editFatherCfm();
            }
            if (this.dia_status == "editSon") {
                this.editSonCfm();
            }
        },
        addFatherCfm() {
            let datas = {
                pid: "0",
                type: this.curr_btn,
                title: this.form.title,
                pic: this.form.pic_path,
                status: this.form.status ? "1" : "0"
            };
            // console.log('添加父级请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { url, method } = this.$api.help_center_add;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        addSonCfm() {
            let data = {
                pid: this.curr_row.id,
                type: this.curr_btn,
                title: this.form.title,
                pic: this.form.pic_path,
                status: this.form.status ? 1 : 0
            };
            // console.log('请求数据',data)
            let { url, method } = this.$api.help_center_add;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        AddPicChange(e) {
            let pic = e.target.files[0];
            let basket = "set/help/uploads";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$set(this.form, "pic_path", res.data.path);
                }
            });
        },
        editFather(lv1) {
            this.dia_status = "editFather";
            this.dia_show = true;
            this.dia_title = "编辑";
            this.curr_row = lv1;
            this.form = {
                title: lv1.title,
                status: lv1.status
            };
        },
        editFatherCfm() {
            let datas = {
                id: this.curr_row.id,
                pic: this.form.pic_path,
                title: this.form.title,
                status: this.form.status ? 1 : 0
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.help_center_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.dia_show = false;
                    this.getList();
                    this.$toast.success(res.message);
                }
            });
        },
        editSon(lv2) {
            this.dia_status = "editSon";
            this.dia_show = true;
            this.dia_title = "编辑";
            this.curr_row = lv2;
            this.form = {
                title: lv2.title,
                pic_path: lv2.pic,
                status: lv2.status
            };
        },
        editSonCfm() {
            let datas = {
                id: this.curr_row.id,
                pic: this.form.pic_path,
                title: this.form.title,
                status: this.form.status ? 1 : 0
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.help_center_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.dia_show = false;
                    this.getList();
                    this.$toast.success(res.message);
                }
            });
        },
        getList() {
            let datas = {
                type: this.curr_btn,
                title: this.filter.title,
                status: this.filter.status,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.help_center_list;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data || [];
                    this.total=res.data.total
                }
            });
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        plantSelect(item) {
            this.curr_btn = item.value;
            this.getList();
        },
        show_list(item, index) {
            this.show_help_list[index] = true;
            this.$set(this.show_help_list, index, true);
            // this.show_help_list=this.show_help_list.slice
        },
        hide_list(item, index) {
            this.show_help_list[index] = false;
            this.$set(this.show_help_list, index, false);
        }
    },
    mounted() {
        this.head_path = this.protocol + "//pic.397017.com/";
        this.getList();
    }
};
</script>

<style scoped>
.help-switch {
    transform: scale(0.9);
    width: 100px;
}
.help-list {
    margin-top: 10px;
}
.lv1-table {
    font-size: 12px;
    color: white;
    width: 100%;
    text-align: left;
    background: #4c8bfd;
    margin: 5px;
    margin-left: 1px;
}
.lv1-table tr > td {
    vertical-align: middle;
    padding: 5px;
}
.lv1-table tr > td:nth-child(2) {
    width: 100px;
}
.lv1-table tr > td:nth-child(3) {
    width: 180px;
}
.lv1-table tr > td:nth-child(4) {
    margin-left: 150px;
}
.lv2-table {
    width: 100%;
    text-align: center;
}
.lv2-header {
    text-align: center;
    width: 100%;
}
.lv2-header th {
    padding: 5px;
    background: #4c8bfd;
    color: white;
}
.lv2-table tr td {
    border: 1px solid #6fa2fe;
}
.lv2-table tr td:first-child {
    width: 5%;
}
.lv2-table tr td:nth-child(2) {
    width: 10%;
}
.lv2-table tr td:nth-child(3) {
    width: 20%;
}
.lv2-table tr td:nth-child(4) {
    width: 5%;
}
.lv2-table tr td:nth-child(5) {
    width: 7%;
}
.lv2-table tr td:nth-child(6) {
    width: 15%;
}
.lv2-table tr td:nth-child(7) {
    width: 7%;
}
.lv2-table tr td:nth-child(8) {
    width: 15%;
}
.lv2-table tr td:nth-child(9) {
    width: 16%;
}
.btn-add {
    background: #4c8bfd;
    color: white;
}
.btn-edit {
    background: #4c8bfd;
    color: white;
}
.btn-del {
    background: #ff6a6a;
    color: white;
}
.flex-center {
    display: flex;
    justify-content: center;
}
.form li {
    display: flex;
    line-height: 30px;
    margin-top: 20px;
}
.form li > span:first-child {
    min-width: 5em;
    text-align: right;
    margin-right: 10px;
}
.form-btn {
    width: fit-content;
    margin: 0 auto;
}

</style>