<template>
    <div class="v-page">
        <div class="total-num">共 {{total}} 条</div>
        <ul class="page-list">
            <li
                :class="['previous-page', pageNo < 2 ? 'icon-disabled' : '']"
                @click="updatePageNo('-')"
                title="上一页"
            >
                <a href="javascript:;" class="iconfont iconshangyiye"></a>
            </li>
            <li v-if="pagesNum" @click="updatePageNo(1)" :class="[pageNo === 1 ? 'active' : '']">
                <a href="javascript:;">1</a>
            </li>
            <li
                title="向前5页"
                @click="pageBack"
                v-if="pagesNum > pagerCount && pageNo > Math.ceil(pagerCount/2)"
                class="pages-back"
            >
                <a href="javascript:;" class="iconfont iconmore"></a>
                <a href="javascript:;" class="iconfont iconzuofanyezuohua icon-hover"></a>
            </li>
            <li
                v-for="n in pageRange"
                @click="updatePageNo(n)"
                :class="[pageNo === n ? 'active' : '']"
                :key="n"
                :title="n"
            >
                <a href="javascript:;">{{n}}</a>
            </li>
            <li
                title="向后5页"
                @click="pageForward"
                v-if="pagesNum > pagerCount && pageNo < pagesNum-Math.floor(pagerCount/2)"
                class="pages-forward"
            >
                <a href="javascript:;" class="iconfont iconmore"></a>
                <a href="javascript:;" class="iconfont iconyoufanyeyouhua icon-hover"></a>
            </li>
            <li
                v-if="pagesNum>1"
                @click="updatePageNo(pagesNum)"
                :class="[pageNo === pagesNum ? 'active' : '']"
            >
                <a href="javascript:;">{{pagesNum}}</a>
            </li>
            <li
                :class="['next-page', pageNo >= pagesNum ? 'icon-disabled' : '']"
                @click="updatePageNo('+')"
                title="下一页"
            >
                <a class="iconfont iconxiayiye"></a>
            </li>
        </ul>
        <Select
            v-if="!hiddenSelect"
            style="width:90px;"
            :clearable="false"
            @update="updatePageSize"
            :value="pageSize"
            :options="pageSizeList"
        />
        <div v-if="!hiddenJump" class="page-jump">
            跳至
            <input
                @change="pageJump"
                v-model.number="jumpNo"
                v-inputLimit="'p-integer'"
                type="text"
            />页
        </div>
    </div>
</template>

<script>
/* 
        event
            updateNo: 页码改变 返回 (pageNo)
            updateSize: 每页条数改变 返回 (pageSize)
            
            pagesNum: 共有多少页,
            pagerCount: 显示多少个页面跳转的方块(<li>)
    */
export default {
    name: 'Page',
    props: {
        total: {
            type: [Number, String],
            default: () => 0
        },
        /**
         * 显示多少个页面跳转的方块(<li>) 默认7个([...]不算)
         */
        pagerCount: {
            type: Number,
            default: () => 7
        },
        pageSize: {
            type: Number,
            default: () => 25
        },
        pageNo: {
            type: Number,
            default: () => 1
        },
        hiddenSelect: {
            type: Boolean,
            default: false
        },
        hiddenJump: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            /**
             * 共多少页
             */
            pagesNum: 0,
            /**
             * 中间展示页框子 ... [4][5][6] ...
             */
            pageRange: [],
            pageSizeList: [
                {
                    value: 25,
                    label: '25 条/页'
                },
                {
                    value: 50,
                    label: '50 条/页'
                },
                {
                    value: 100,
                    label: '100 条/页'
                }
                // {
                //     value: 200,
                //     label: '200 条/页'
                // }
            ],
            jumpNo: undefined
        }
    },
    methods: {
        updatePageNo(num) {
            /**
             * 点击的 当前页
             */
            let pageNo = Number(this.pageNo)
            if (num === '-') {
                pageNo > 1 && pageNo--
            } else if (num === '+') {
                pageNo < this.pagesNum && pageNo++
            } else {
                if (num === pageNo) {
                    return
                }
                pageNo = num
            }
            if (pageNo === this.pageNo) return
            this.$emit('update:pageNo', pageNo)
            this.$emit('updateNo', pageNo)

            this.pageRange = []
            /**
             * 除第一页和最后页 的中间方块数 [1] __[2][3]__ [4]
             */
            let centerCount = this.pagerCount - 2

            if (pageNo <= 4) {
                for (let i = 0; i < centerCount; i++) {
                    let page = i + 2
                    if (page >= this.pagesNum) {
                        break
                    }
                    this.pageRange[i] = page
                }
            } else if (pageNo >= this.pagesNum - Math.floor(centerCount / 2)) {
                for (let i = 0; i < centerCount; i++) {
                    let page = this.pagesNum - centerCount + i
                    if (page < 2) {
                        // 第一页,不显示在中间
                        continue
                    } else if (page >= this.pagesNum) {
                        // 最后也不显示在中间
                        break
                    } else {
                        this.pageRange.push(page)
                    }
                }
            } else {
                for (let i = 0; i < centerCount; i++) {
                    this.pageRange[i] = pageNo - Math.floor(centerCount / 2) + i
                }
            }
        },
        updatePageSize(size) {
            this.$emit('update:pageSize', size)
            this.$emit('update:pageNo', 1)
            this.$emit('updateSize', size)
            this.pagesNum = Math.ceil(Number(this.total) / size)
            if (this.pagesNum < 3) {
                this.pageRange = []
                return
            }
            for (let i = 0; i < this.pagerCount - 2; i++) {
                let num = i + 2
                if (num >= this.pagesNum) {
                    break
                }
                this.pageRange[i] = num
            }
        },
        pageBack() {
            this.updatePageNo(this.pageNo - 5 < 1 ? 1 : this.pageNo - 5)
        },
        pageForward() {
            this.updatePageNo(
                this.pageNo + 5 > this.pagesNum
                    ? this.pagesNum
                    : this.pageNo + 5
            )
        },

        pageJump() {
            if (isNaN(this.jumpNo)) return

            if (this.jumpNo > this.pagesNum) {
                this.jumpNo = undefined
                this.$toast.warning('不能超过最大页')
            } else if (this.jumpNo === 0) {
                this.jumpNo = undefined
                this.$toast.warning('页面必须大于0')
            } else {
                this.updatePageNo(this.jumpNo)
            }
        },
        initPages(total) {
            this.pagesNum = Math.ceil(Number(total) / this.pageSize)
            this.pageRange = []
            // if(this.pagesNum < 3) {
            //     return
            // }
            // // this.pageRange = []
            // for(let i = 0; i<this.pagerCount-2; i++) {
            //     // num 要展示的页面 数字
            //     let num = this.pageNo + i + 1
            //     if(num >= this.pagesNum) {
            //         break
            //     }
            //     this.pageRange[i] = num
            // }

            /**
             * 除第一页和最后页 的中间方块数 [1] __[2][3]__ [4]
             */
            let centerCount = this.pagerCount - 2
            /**
             * 点击的 当前页
             */
            let pageNo = Number(this.pageNo)
            if (pageNo <= 4) {
                for (let i = 0; i < centerCount; i++) {
                    let page = i + 2
                    if (page >= this.pagesNum) {
                        break
                    }
                    this.pageRange[i] = page
                }
                // 如果 当前页码 >= (总页数 - 中间方块数/2)
            } else if (pageNo >= this.pagesNum - Math.floor(centerCount / 2)) {
                for (let i = 0; i < centerCount; i++) {
                    let page = this.pagesNum - centerCount + i
                    if (page < 2) {
                        // 第一页,不显示在中间
                        continue
                    } else if (page >= this.pagesNum) {
                        // 最后一页,也不显示在中间
                        break
                    } else {
                        this.pageRange.push(page)
                    }
                }
            } else {
                for (let i = 0; i < centerCount; i++) {
                    this.pageRange[i] = pageNo - Math.floor(centerCount / 2) + i
                }
            }
        }
    },
    mounted() {
        this.initPages(this.total)
    },
    watch: {
        total(val) {
            this.initPages(this.total)
        }
    }
}
</script>

<style scoped>
.v-page {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    white-space: nowrap;
}
.total-num {
    margin: 0 10px;
}
.page-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0 10px;
}
.page-list li {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #dcdee2;
    margin: 0 4px;
    line-height: 30px;
    cursor: pointer;
    text-align: center;
}
.page-list li a {
    color: #333;
    text-decoration: none;
}
.page-list .icon-disabled {
    cursor: not-allowed;
}
.page-list .icon-disabled a {
    color: #ddd;
}
.page-list .icon-disabled:hover {
    border-color: #dcdee2;
}
.page-list .icon-disabled:hover a {
    cursor: not-allowed;
    color: #ddd;
}
.page-list li:hover,
.page-list .active {
    border-color: #2d8cf0;
}
.page-list li:hover a,
.page-list .active a {
    color: #2d8cf0;
}
.pages-back .icon-hover,
.pages-forward .icon-hover {
    display: none;
}
.pages-back:hover .iconmore,
.pages-forward:hover .iconmore {
    display: none;
}
.pages-back:hover .icon-hover,
.pages-forward:hover .icon-hover {
    display: inline-block;
}
.v-page .page-jump {
    height: 32px;
    display: flex;
    align-items: center;
    margin: 0 10px;
}
.v-page .page-jump input {
    width: 50px;
    height: 30px;
    box-sizing: border-box;
    padding: 0 10px;
    margin: 0 10px;
    border-radius: 4px;
    color: #515a6e;
    border: 1px solid #dcdee2;
}
</style>


