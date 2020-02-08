
$(document).ready(function () {
    $.loginRequire();
    $('body').body();
    $('.navigator').navigator({
        nickname: '再叨叨剁了你',
    });
    $('.sidebar').sidebar();
    makeView({
        name: "小二哥"
    });
});

function makeView(options) {
    $('.content').append(`<div class="title">个人中心</div>
<div class="info">
    <div class="d-flex">
        <div class="avatar"><img src="/img/index/head_men.png" style="width: 6.6rem; height: 7.9rem;" alt></div>
        <div class="hi d-flex flex-column justify-content-end"><div class="welcome">Hi, 再叨叨老师</div><div class="d-flex align-items-center"><div class="account">账号：0000001</div><div class="change-pwd pointer">修改密码</div></div></div>
    </div>
    <div class="base">
        <div class="base-title d-flex align-items-baseline">
            <div class="fs-14">基本信息</div>
            <div class="fs-09 change-info pointer">修改</div>
        </div>
        <div class="base-cell cl-333 fs-10">姓名：${options.name}</div>
        <div class="base-cell cl-333 fs-10">班级：</div>
        <div class="base-cell cl-333 fs-10">性别：</div>
        <div class="base-cell cl-333 fs-10">年龄：</div>
        <div class="base-cell cl-333 fs-10">电话：</div>
        <div class="base-cell cl-333 fs-10">住址：</div>
        <div class="base-cell cl-333 fs-10">毕业：</div>
    </div>
</div>`);
    $('.change-pwd').on('click', function () {
        showChangePwd();
    });
    $('.change-info').on('click', function () {
        showChangeInfo();
    });
}

function showChangePwd() {
    $('.content').append(`<div class="alert"><div class="alert-content align-items-end">
<div class="alert-close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<div class="row "><label>原密码：</label><input type="password" class="title-input-input"></div>
<div class="row "><label>新密码：</label><input type="password" class="title-input-input"></div>
<div class="row "><label>确认新密码：</label><input type="password" class="title-input-input"> </div>
<div class="submit pointer">确定</div>
</div></div>`);
    $('.alert .submit').on('click', function () {
        $('.alert').last().remove();
        changePwd();
    });
    $('.alert-close').on('click', function () {
        $('.alert').last().remove();
    });
}

function showChangeInfo() {
    $('.content').showTeacherEdit({
        account: "0000001",
        name: "小二哥",
        class: "小二班",
        gender: 1,
        age: 26,
        phone: "18557514751",
        address: "江虹路",
        graduate: "幼师大学",
        success(res) {
            if (res.confirm) {

            }
        }
    });
}

function changePwd() {

}

function changeInfo() {

}