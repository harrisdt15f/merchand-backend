<template>
    <div class="cont">
        <!-- 热门游戏内容 -->

        <div class="filter p10 mt10">
            <ul class="left">
                <li>
                    <span>游戏平台</span>
                    <Select v-model="filter.vendor_id" :options="plant_opt"></Select>
                </li>
                <li>
                    <span>游戏名称</span>
                    <Input v-model="filter.name" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue">确定</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.vendor&&row.vendor.name}}</td>
                    <td>{{row.games&&row.games.name}}</td>
                    <td>
                        <button class="btns-blue">上移</button>
                        <button class="btns-blue">下移</button>
                    </td>
                    <td>
                        <Switchbox
                            class="switch-select"
                            :value="row.is_hot"
                            @update="switchUpd($event,row)"
                        />
                    </td>
                </template>
            </Table>

            <Page
                class="table-page"
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
    </div>
</template> <script>
export default {
    props: {
        // isHot: Boolean,
        // type_id: [String, Number]
    },
    data() {
        return {
            plant_opt: [{ label: '全部', value: '' }],
            filter: {
                vendor_id: '',
                name: ''
            },
            headers: ['编号', '游戏平台', '游戏名称', '排序', '是否热门'],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25
        }
    },

    methods: {
        selectBtn(item) {
            this.curr_btn = item.value
        },
        switchUpd(val, row) {
            let data = {
                id: row.id,
                is_hot: val ? 1 : 0
            }

            let { url, method } = this.$api.game_hot_set
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === '200') {
                    this.$toast.success(res && res.message)
                    this.getList()
                }
            })
        },
        getList() {
            let para = {
                is_hot: 1,
                vendor_id: this.filter.vendor_id,
                name: this.filter.name
            }
            let params = window.all.tool.rmEmpty(para)
            this.$http({
                method: this.$api.game_h5_list.method,
                url: this.$api.game_h5_list.url,
                params: params
            }).then(res => {
                if (res && res.code === '200') {
                    this.list = res.data || []
                    this.total = this.list.length
                }
            })
        },
        updateNo(val) {},
        updateSize(val) {}
    },
    // watch: {
    //     'type_id'(to, from){
    //         console.log('from: ', from);
    //         console.log('to: ', to);
    //         if(to){
    //             this.getList()
    //         }
    //     }
    // },
    mounted() {
        this.getList()
    }
}
</script>

<style scoped>

/* .p10 全局样式 */
.switch-select {
    transform: scale(0.8);
}
</style>