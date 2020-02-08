import util from "../../util/util.js";
import api from "../../util/api.js";

new Vue({
    el: '#app',
    data: {
        ths: ['', '今日交办', '', '爱的叮咛', ''],
        trs: [
            {
                dd: true,
                sendStatus: true,
                avatar: '',
                name: '王祖蓝',
                today: '<p>入园: 9.28</p><p>体温: 正常</p><p>起床: 7:00-7:30</p><p>早餐: 有</p><p>排便: 无</p><p>特殊: 今天心情不好</p>',
                process: [
                    {time: '8:30', action: '量体温', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                ],
                love: '今天睿睿特别霸道，一整天都在欺负其他同学，抢别人的点心,老师询问原因都不理老师。希望睿睿妈妈和老师一起解决这个问题。',
            },
            {
                dd: true,
                sendStatus: false,
                avatar: '',
                name: '孙越',
                today: '<p>入园: 9.28</p><p>体温: 正常</p><p>起床: 7:00-7:30</p><p>早餐: 有</p><p>排便: 无</p><p>特殊: 今天心情不好</p>',
                process: [
                    {time: '8:30', action: '量体温', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                    {time: '9:30', action: '点心', status: '正常'},
                ],
                love: undefined,
            },
            {
                dd: false,
                avatar: '',
                name: '岳云鹏',
            }
        ],
        loveHistories: [
            "宝宝尿不湿快用完咯，妈妈记得带一包过来哦/宝宝湿纸巾快用完咯，妈妈记得带一包过来哦/宝宝口水巾不多了，妈妈记得带过来哦。0",
            "宝宝尿不湿快用完咯，妈妈记得带一包过来哦/宝宝湿纸巾快用完咯，妈妈记得带一包过来哦/宝宝口水巾不多了，妈妈记得带过来哦。1",
            "宝宝尿不湿快用完咯，妈妈记得带一包过来哦/宝宝湿纸巾快用完咯，妈妈记得带一包过来哦/宝宝口水巾不多了，妈妈记得带过来哦。2",
            "宝宝尿不湿快用完咯，妈妈记得带一包过来哦/宝宝湿纸巾快用完咯，妈妈记得带一包过来哦/宝宝口水巾不多了，妈妈记得带过来哦。3",
            "宝宝尿不湿快用完咯，妈妈记得带一包过来哦/宝宝湿纸巾快用完咯，妈妈记得带一包过来哦/宝宝口水巾不多了，妈妈记得带过来哦。4",
            "宝宝尿不湿快用完咯，妈妈记得带一包过来哦/宝宝湿纸巾快用完咯，妈妈记得带一包过来哦/宝宝口水巾不多了，妈妈记得带过来哦。5",
        ],
        showLove: false,
        signinShow: false,
        actionShow: false,
        actionDelete: false,
        actionTypes: [
            {img: 'temperature.png', title: '量体温'},
            {img: 'snack.png', title: '吃点心'},
            {img: 'diaper.png', title: '换尿布'},
            {img: 'eat.png', title: '吃饭'},
            {img: 'sleep.png', title: '午睡'},
            {img: 'milk.png', title: '喝奶'},
        ],
        actionType: 0,
        loveText: '',
    },
    created() {
        this.req_stu_list()
    },
    methods: {

        req_stu_list() {
            let that = this;
            let user = this.getSession('userinfo');
            util.get({
                uri: api.t_stuList,
                data: {
                    login_id: user.login_id,
                    login_type: user.login_type,
                    page: 1,
                },
                success(res) {
                    console.log(res)
                },
                fail(err) {

                }
            })
        },

        completeLove() {
            this.showLove = false;
            console.log(this.loveText);
        },
        navigate(e) {
            window.location.href = e.currentTarget.dataset.uri;
        },

        showAction() {
            this.actionShow = true;
        },
        deleteAction() {
            this.actionDelete = true;
        },
    },
});