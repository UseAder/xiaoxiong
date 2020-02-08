import util from "../../util/util.js";
import api from "../../util/api.js";

new Vue({
    el: '#app',
    data: {
        list: [],
        editAlert: {
            show: false,
        },
        deleteAlert: {
            show: false,
        }
    },
    created() {
        this.loginRequire();
        this.req_food_list();
    },
    methods: {

        req_food_list() {
            let that = this;
            util.get({
                uri: api.foodList,
                data: {
                    school_id: this.getSession('userinfo').school_id,
                },
                success(res) {
                    console.log(res);
                    that.list = res;
                }
            })
        },

        get_food_info(id) {
            let that = this;
            util.get({
                uri: api.foodInfo,
                data: {
                    food_id: id,
                },
                success(res) {
                    that.editAlert = {};
                    console.log(res);
                    that.editAlert.show = true;
                    that.editAlert.info = res;
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        uploadImg(success) {
            util.upload({
                uri: api.upload,
                file: this.editAlert.file,
                dirName: "foodlist_" + this.getSession('userinfo').school_id,
                success(url) {
                    success(url);
                },
            })

        },

        editSubmit() {
            let that = this;
            if (this.editAlert.info.food_name.length === 0) {
                this.$message({
                    message: "请输入食品名",
                    type: "error",
                });
                return;
            }
            if (!this.editAlert.file && this.editAlert.info.food_img.length === 0) {
                this.$message({
                    message: "请选择图片",
                    type: "error",
                });
                return;
            } else {
                let param = {
                    school_id: that.getSession('userinfo').school_id,
                    food_id: that.editAlert.info.food_id,
                    food_name: that.editAlert.info.food_name,
                };
                if (this.editAlert.file) {
                    this.uploadImg(function (food_img) {
                        param.food_img = food_img;
                        that.post_food(param);
                    });
                } else  {
                    param.food_img = that.editAlert.info.food_img;
                    that.post_food(param);
                }
            }


        },

        post_food(param) {
            let that = this;
            util.post({
                uri: api.foodEdit,
                data: param,
                success(res) {
                    console.log(res);
                    that.$message({
                        message: "添加成功",
                        type: "success",
                    });
                    that.editAlert.show = false;
                    that.req_food_list();
                },
                fail(err) {
                    console.log(err);
                },
            })
        },

        delete_food() {
            let that = this;
            util.post({
                uri: api.foodDelete,
                data: {
                    food_id: this.editAlert.info.food_id,
                },
                success(res) {
                    that.req_food_list();
                    that.editAlert.show = false;
                    that.deleteAlert.show = false;
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        previewClicked() {
            this.$refs['selectImg'].click();
        },
        selectedImg(e) {
            let file = e.target.files[0];
            this.editAlert.choosedImg = URL.createObjectURL(file);
            this.editAlert.file = file;
            this.editAlert.chooseImgClass = "";
            this.$forceUpdate();
        },

        editAlertClose() {
            this.editAlert.show = false;
            this.$forceUpdate();
        },

    }
});