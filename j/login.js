import api from "../util/api.js";
import util from "../util/util.js";

new Vue({
    el: '#app',
    data: {
        account: '',
        pwd: '123456789',
        type: '',
    },
    methods: {
        login() {

            util.post({
                uri: api.login,
                data: {
                    login_account: this.account,
                    login_pwd: this.pwd,
                    login_type: this.type,
                },
                success(res) {
                    res.school_id = 1;
                    console.log(res);
                    $.setSession('userinfo', res);
                    if (res.login_type === 2) {
                        // 教职工
                        window.location.href = "../p/t/index.html";
                    } else {
                        window.location.href = "../p/a/info.html";
                    }
                },
                fail(err) {
                    console.log(err);
                }
            });
        },
    },
});

// $('#submit').on('click', function () {
//     let account = $('input[name="account"]').val();
//     let password = $('input[name="password"]').val();
//     let role = $('input:checked[name="role"]').val();
//     console.log(account, password, role);
//
//     window.location.href = "p/administrator.p"
// });
// $('#submit').on('click', function () {
//     let param = {
//         login_account: $('input[name="account"]').val(),
//         login_pwd: $('input[name="password"]').val(),
//         login_type: $('input:checked[name="role"]').val(),
//     };
//     console.log(param);
//     $.ajax({
//         url: 'http://192.168.124.7/bear_baby/codes/public/index.php/manager_login',
//         type: 'post',
//         header: {
//             "Content-Type": "application/json"
//         },
//         data: param,
//         dataType: "json",
//         success: function (res) {
//             if (res.errno === 0) {
//                 console.log(res);
//                 // $.setStorage('userinfo', res.data);
//                 $.setSession('userinfo', res.data);
//                 if (res.data.login_type === 2) {
//                     // 教职工
//                     window.location.href = "../p/t/index.html";
//                 } else {
//                     window.location.href = "../p/a/info.html";
//                 }
//
//             } else {
//                 console.error('错误', res);
//             }
//         },
//         fail(err) {
//             console.log(err);
//         }
//     })
// });