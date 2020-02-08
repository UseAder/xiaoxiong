new Vue({
    el: '#app',
    data: {
        ths: ['', '', '姓名', '班级', '性别', '月龄', '身高', '体重', '负责老师', '监护人', '联系电话', '家庭住址', ''],
        rows: [
            {
                number: '1',
                avatar: '/img/placeholder/student.png',
                name: '王祖蓝',
                cls: '小二班',
                gender: '女',
                age: '36',
                height: '109',
                weight: '25',
                teacher: {
                    name: '叨叨',
                    phone: '12312341234',
                },
                guardian: '叨叨叨',
                phone: '12312341234',
                address: '浙江省杭州市滨江区江虹路768号浙农科创园5栋1203',
                funcBtn: [
                    'wechat',
                    'report',
                ]
            }
        ],
        guardians: [
            {avatar: '/img/placeholder/guardian.png', name: '叨叨爹'},
            {avatar: '/img/placeholder/guardian.png', name: '叨叨爹'},
        ],
        familier: [
            {avatar: '/img/placeholder/guardian.png', name: '叨叨爹'},
            {avatar: '/img/placeholder/guardian.png', name: '叨叨爹'},
        ],
        reports: [
            {
                number: '1',
                date: '2019-12-30',
            },
            {
                number: '1',
                date: '2019-12-30',
            }
        ],
        wechatShow: false,
        addWechatShow: false,
        reportShow: false,
    },
    methods: {
        showWechat() {
            this.wechatShow = true;
        },
        closeWechat() {
            this.wechatShow = false;
        },
        submitWechat() {
            this.wechatShow = false;
        },

        guardianAdd() {
            this.addWechatShow = true;
        },
        familyAdd() {
            this.addWechatShow = true;
        },

        closeAddWechat() {
            this.addWechatShow = false;
        },
        selectGuardianWechat() {
            this.addWechatShow = false;
        },

        showReport() {
            this.reportShow = true;
        },
        closeReport() {
            this.reportShow = false;
        },

        searchGuardian() {

        },

        showSignin() {

        },
    }
});