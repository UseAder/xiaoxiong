new Vue({
    el: '#app',
    data: {
        ths: ['', '今日交办', '', '爱的叮咛'],
        trs: [
            {
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
        ],
    }
});