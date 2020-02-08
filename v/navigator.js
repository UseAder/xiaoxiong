;(function ($, window) {

    // 导航栏
    $.fn.navigator = function (options) {
        // 添加logo
        this.addClass('navigator-back d-flex align-items-center justify-content-between');
        var logo = `<a href="index.html"><img src="/img/login/logo.png" alt="" style="width:15rem; height: 2.75rem;"></a>`;
        this.append(logo);

        // 添加时间
        var time = `<div class="time cl-999 fs-14"></div>`;
        var time_content = `<div class="time-content"></div>`;
        time = $(time).append($(time_content).text(new Date().format('yyyy-MM-dd hh:mm:ss')));

        setInterval(function () {
            $('.time-content').remove();
            var time = new Date().format('yyyy-MM-dd hh:mm:ss');
            var content = $(time_content).text(time);
            $('.time').append($(content));
        }, 1000);
        this.append(time);

        // 用户角色
        var role = `<div class="d-flex align-items-center justify-content-center"></div>`;
        var role_icon = `<img class="pointer" alt="" src="/img/navigator/head_men.png" style="width: 1.8rem; height: 2.05rem">`;
        var nickname = `<div class="pointer nickname cl-333"></div>`;
        var exit_btn = `<div class="exit-btn pointer d-flex justify-content-center align-items-center fw-600">退出</div>`;

        this.append($(role).append($(role_icon).on('click', function () {

            window.location.href = "info.html";
        })).append($(nickname).text(options.nickname).on('click', function(){
            window.location.href = "info.html";
        })).append(exit_btn));
        $('.exit-btn').on('click', function () {
            $.ajax({
                url: 'http://192.168.124.7/bear_baby/codes/public/index.php/manager_logout',
                type: 'post',
                success() {
                    $.removeSession('userinfo');
                    window.location.href = '/p/login.html';
                }
            });
        });

        return this;
    };
})(jQuery, window);