new Vue({
    el: '#app',
    data: {
        ths: ['', '', '姓名', '班级', '请假原因', '监护人及电话', '申请者', '状态'],
        row: {
                number: 1,
                avatar: '',
                name: '王祖蓝',
                cls: '小二班',
                reason: '外婆住院，去外婆城市看望外婆。外婆住院，去外婆城市看望外婆外婆住院，去外婆城市看望外婆',
                guardian: {name: '叨叨', phone: '12312341234'},
                applier: {
                    avatar: '',
                    name: '叨叨爹',
                    position: '王祖蓝爹',
                },
                status: '通过',
            }

    }
});

