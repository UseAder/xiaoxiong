import util from "../../util/util.js";
import api from "../../util/api.js";

new Vue({
    el: '#app',
    data: {
        total: {
            launch: [
                {name: '爆炒猪油', active: false},
                {name: '洋葱猪肝', active: true},
                {name: '甘油', active: false},
                {name: '甘美', active: false},
                {name: '甘梅鸡块', active: true},
                {name: '孜然', active: false},
                {name: '今天不吃了', active: false},
                {name: '爱吃不吃', active: false},
                {name: '关我屁事', active: false},
            ],
            dessert: ['甜品', '吃什么', '想吃什么', '就吃什么', '爱吃不吃', '关我屁事'],
        },
        foodListShow: false,
        ths: ['时间', '午餐', '点心'],
        rows: [
            {time: '2020-01-06 星期一', launch: ['洋葱猪肝', '甘梅鸡块'], dessert: ['关我屁事']},
            {time: '2020-01-06 星期一', launch: [], dessert: []},
            {time: '2020-01-06 星期一', launch: [], dessert: []},
            {time: '2020-01-06 星期一', launch: [], dessert: []},
            {time: '2020-01-06 星期一', launch: [], dessert: []},
            {time: '2020-01-06 星期一', launch: [], dessert: []},
            {time: '2020-01-06 星期一', launch: [], dessert: []},
        ],
        currentRow: 0,
        currentType: 'launch',
        currentBox: {},
    },
    created() {
        this.req_food_list();
    },
    methods: {

        req_food_list() {
            util.get({
                uri: api.foodSelect,
                data: {
                    school_id: this.getSession("userinfo").school_id,
                },
                success(res) {
                    console.log(res);
                }
            })
        },

        // 显隐下拉菜单
        boxAction(e) {
            let target = e.currentTarget;
            let idx = target.dataset.idx;
            let type = target.dataset.type;

            this.currentRow = idx;
            this.currentType = type;

            this.reloadFoodList();

            let left = target.offsetLeft;
            let top = target.offsetTop;
            let width = target.offsetWidth;
            let height = target.offsetHeight;
            if (this.flLeft === left && this.flTop === top) {
                this.flLeft = left;
                this.flTop = top;
                this.flWidth = width;
                this.flHeight = height;
                this.foodListShow = !this.foodListShow;
            } else {
                this.foodListShow = false;
                this.flLeft = left;
                this.flTop = top;
                this.flWidth = width;
                this.flHeight = height;
                this.foodListShow = true;
            }
        },

        // 总列表添加删除食物
        totalFoodClick(e) {
            let idx = e.currentTarget.dataset.idx;
            let food = this.total[this.currentType][idx];
            food.active = !food.active;
            if (food.active) {
                this.rows[this.currentRow][this.currentType].push(food.name);
            } else {
                let row = this.rows[this.currentRow][this.currentType];
                let i = row.indexOf(food.name);
                this.rows[this.currentRow][this.currentType].splice(i,1)
            }
        },
        // 点击上边删除食物
        currentFoodClick(e) {
            let idx = e.currentTarget.dataset.idx;
            let food = this.rows[this.currentRow][this.currentType];
            let name = food[idx];
            this.rows[this.currentRow][this.currentType].splice(idx, 1);
            this.total[this.currentType].forEach(function (f) {
                if (f.name === name) {
                    f.active = false;
                }
            });
        },

        // 刷新下拉列表
        reloadFoodList() {
            let idx = this.currentRow;
            let type = this.currentType;

            this.total[type].forEach(function (c) {
                c.active = this.rows[idx][type].indexOf(c.name) !== -1;
            }.bind(this));
        },

        // 点击空白处隐藏列表
        hideFoodList() {
            this.foodListShow = false;
        },

        navigate(e) {
            window.location.href = e.currentTarget.dataset.href;
        },

    },
});