new Vue({
    el: '#app',
    data: {
        showChangePwd: false,
        showChangeInfo: false,
    },
    methods: {
        changePwd(e) {
            this.showChangePwd = true;
        },
        changeInfo(e) {
            this.showChangeInfo = true;
        },
        submitPwd() {
            this.showChangePwd = false;
        },
        closePwd() {
            this.showChangePwd = false;
        },
        submitInfo() {
            this.showChangeInfo = false;
        },
        closeInfo() {
            this.showChangeInfo = false;
        }
    }
});