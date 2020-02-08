
Vue.component('user-info', {
    props: {
        avatar: String,
        nickname: String,
        time: String,
    },
    template: `<div class="d-flex align-items-center justify-content-center">
<img style="width: 2.25rem; height: 2.25rem; border-radius: 1.125rem; background-color: #eee; margin-right: 0.5rem">
<div>
<div class="fs-09">{{nickname}}</div>
<div class="fs-07 cl-666">{{time}}</div>
</div>
</div>`
});

new Vue({
    el: '#app',
    data: {
        ths: ['', '发布者', '文字内容', '照片/视频', ''],
        cell: {number: 1, userInfo: {avatar: '', nickname: '再叨叨鲨了你', time: '2019-12-20 12:30'}, content: '闪闪的星星亮晶晶，小小的光芒照我行。', images: [1,1,1,1,1], funcBtn: ['edit', 'delete', 'download']},
        showDelete: false,
        showSubmit: false,
    },
    create() {
        this.loginRequire();
    },
    methods: {
        deleteSubmit(e) {
            this.showDelete = false;
            console.log('submit', e.number);
        },
        deleteClose() {
            this.showDelete = false;
        },
        funcAction(e) {
            let type = e.currentTarget.dataset.type;
            let obj = {
                edit: this.onEdit,
                delete: this.onDelete,
                download: this.onDownload,
            };
            obj[type]();
        },
        onDelete() {
            this.showDelete = true;
        },
        onEdit() {
            this.showSubmit = true;
        },
        onDownload() {
            console.log('download')
        },
        editClose(e) {
            this.showSubmit = false;
        },
        editSubmit(e) {
            this.showSubmit = false;
        },

    }
});
