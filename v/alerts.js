;(function ($) {

    $.fn.closeBtn = function() {
        return `<div class="alert-close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>`
    };

    // 显示删除提示
    $.fn.showDelete = function (options) {
        if (!options) {options={}}
        this.append(`<div class="alert delete"><div class="alert-content">
<div class="alert-close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<div><img src="/img/alert/warn.png" style="width: 10rem; height: 10rem;" alt></div>
<div class="alert-title">${options.title?options.title:''}</div>
<div class="alert-detail">${options.content?options.content:''}</div>
<div class="alert-funcs d-flex align-center justify-content-between">
<div class="complete pointer">${options.text?options.text:'确定'}</div>
<div class="cancel pointer">${options.cancelText?options.cancelText:'取消'}</div>
</div>
</div></div>`);
        $('.alert .alert-close').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.success == 'function') {
                options.success({close: true,});
            }
        });
        $('.alert .complete').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.success == 'function') {
                options.success({confirm: true,});
            }
        });
        $('.alert .cancel').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.success == 'function') {
                options.cancel({cancel: true});
            }
        })
    };

    $.fn.showSuccess = function (options) {
        this.append(`<div class="alert"><div class="alert-content">
<div><img src="/img/alert/success.png" style="width: 10rem; height: 10rem;" alt></div>
<div class="alert-title">${options.title?options.title:''}</div>
<div class="submit pointer">${options.text?options.text:'确定'}</div>
</div></div>`);
        $('.submit').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.success == 'function') {
                options.success({confirm: true});
            }
        });
    };

    $.fn.showAccountSuccess = function (options) {
        this.append(`<div class="alert complete"><div class="alert-content">
<div><img src="/img/alert/success.png" style="width: 10rem; height: 10rem;" alt></div>
<div class="alert-title">${options.title?options.title:''}</div>
<div class="account-info d-flex align-items-center">
<div class="account">账号：${options.account}</div>
<div class="password">密码：${options.password}</div>
<div class="copy pointer">复制</div>
</div>
<div class="prompt">*密码仅展示一次，请妥善保管</div>
<div class="submit pointer">确定</div>
</div></div>`);
        $('.alert .submit').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.success == 'function') {
                options.success({confirm: true});
            }
        });
    };

    $.fn.showReset = function (options) {
        this.append(`<div class="alert"><div class="alert-content">
<div class="alert-close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<div><img src="/img/alert/safe_warn.png" style="width: 8.5rem; height: 9.5rem;"></div>
<div class="alert-title">${options.title?options.title:''}</div>
<div class="alert-detail">${options.content?options.content:''}</div>
<div class="alert-funcs d-flex align-center justify-content-between">
<div class="complete pointer">${options.text?options.text:'确定'}</div>
<div class="cancel pointer">${options.cancelText?options.cancelText:'取消'}</div>
</div>
</div></div>`);
        $('.alert .alert-close').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.success == 'function') {
                options.success({close: true});
            }
        });
        $('.alert .complete').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.success == 'function') {
                options.success({confirm: true});
            }
        });
        $('.alert .cancel').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.success == 'function') {
                options.success({cancel: true});
            }
        })
    };

    $.fn.showTeacherEdit = function (options) {
        this.append(`<div class="alert">
<div class="alert-content">
<div class="alert-close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<div class="row">
<div><label class="title-input-title">账号：<input class="title-input-input" value="${options.account}"></label></div>
<div class="right"><label class="title-input-title">姓名：<input class="title-input-input" value="${options.name}"></label></div>
</div>

<div class="row">
<div><label class="title-input-title">班级：</label><input class="title-input-input fs-12" disabled value="${options.class}"></div>
<div class="right d-flex align-items-center justify-content-between"><label class="title-input-title">性别：</label><div class="radio-container d-flex align-items-center justify-content-around"><input type="radio" ${options.gender===1?'checked':''} name="gender" id="male"><label for="male">男</label><input type="radio" ${options.gender===0?'checked':''} name="gender" id="female"><label for="female">女</label></div></div>
</div>

<div class="row">
<div><label class="title-input-title">年龄：<input class="title-input-input" value="${options.age}"></label></div>
<div class="right"><label class="title-input-title">电话：<input class="title-input-input" value="${options.phone}"></label></div>
</div>

<div class="row">
<div class="d-flex align-items-start"><label class="title-input-title">住址：</label><textarea class="title-input-input" rows="1">${options.address}</textarea></div>
<div class="right d-flex align-items-start"><label class="title-input-title">毕业：</label><textarea class="title-input-input">${options.graduate}</textarea></div>
</div>

<div class="row d-flex justify-content-center"><div class="submit pointer">完成</div></div>
</div>
</div>`);
        $('.alert .alert-close').on('click', function () {
            $('.alert').last().remove();
        });
        $('.alert .submit').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.success == 'function') {
                options.success({confirm: true});
            }
        });
    };

    $.fn.studentAdd = function (options) {
        let classes = ['一班', '二班'];
        let classOptions = '';
        classes.forEach(cls => {
            classOptions += `<option>${cls}</option>`;
        });
        console.log(classOptions);
        this.append(`<div class="alert"><div class="alert-content">
<div class="alert-close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>

<div class="d-flex justify-content-between">
<div>
<div class="cell d-flex justify-content-end"><label class="title-input-title">姓名：</label><input type="text" class="title-input-input" placeholder="请输入学生姓名"></div>

<div class="cell d-flex justify-content-end"><label class="title-input-title">性别：</label><div class="radio-container d-flex align-items-center justify-content-around">
<input type="radio" checked name="gender" id="male">
<label for="male">男</label>
<input type="radio" name="gender" id="female">
<label for="female">女</label>
</div></div>

<div class="cell d-flex justify-content-end"><label class="title-input-title">身高：</label><input class="title-input-input"></div>

<div class="cell d-flex justify-content-end"><label class="title-input-title">监护人：</label><input id="guardian" placeholder="点击选择监护人" class="title-input-input" style="cursor: pointer"></div>

<div class="cell d-flex justify-content-end">
<label class="title-input-title">住址：</label>
<textarea class="title-input-input">2</textarea>
</div>

</div>
<div class="right">
<div class="cell d-flex justify-content-end"><label class="title-input-title">小名：</label><input class="title-input-input"></div>
<div class="cell d-flex justify-content-end"><label class="title-input-title">班级：</label><select>${classOptions}</select></div>
<div class="cell d-flex justify-content-end"><label class="title-input-title">出生日：</label><input class="title-input-input"></div>
<div class="cell d-flex justify-content-end"><label class="title-input-title">体重：</label><input class="title-input-input"></div>

<div class="cell d-flex justify-content-end">
<label class="title-input-title">照片：</label>
<div class="title-input-input d-flex" style="background-color: white">
<img id="upload-result" alt>
<div class="upload align-self-end">上传</div>
<input type="file" class="photo" accept="image/*" hidden></div>
</div>

</div>
</div>

<div class="submit pointer">完成</div>
</div></div>`);
        $('.alert-close').on('click', function () {
            $('.alert').last().remove();
        });
        $('.submit').on('click', function () {
            $('.alert').last().remove();
            if (typeof options.submit == 'function') {
                options.submit();
            }
        });
        $('.upload').on('click', function () {
            $('.photo').click();
        });
        $('.photo').change(function () {
            let file = $(this)[0].files[0];
            $("#upload-result").attr("src",URL.createObjectURL(file));
        });
        $('#guardian').on('click', function () {
            $('.content').guardianAdd();
        }).focus(function () {
            $(this).blur();
        });
    };

    $.fn.guardianAdd = function () {
        let parents = [1,1,1,1,1,1,1,1];
        let collectionContent = '<div class="collection d-flex flex-wrap" style="max-width: 50rem">';
        parents.forEach(function () {
            collectionContent += `<div class="d-flex pointer parent" style="margin-right: 2rem;margin-top: 2rem;">
<div><img style="width: 3rem; height: 3rem; background-color: #eeeeee; margin-right: 0.55rem;"></div>
<div>
<div class="name" style="font-size: 1rem; color: #333;">崽崽爸爸</div>
<div class="number" style="color: #FF95AA;font-size: 0.8rem;">ID: 33333333</div>
</div>
</div>`
        });
        collectionContent+="</div>";
        console.log(collectionContent);
        this.append(`<div class="alert"><div class="alert-content">
<div class="alert-close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<div>
<div class="d-flex "><div class="guardian-input-bg"><img src="/img/content/search.png" style="width: 1.2rem; height: 1.2rem; border-radius: 0.6rem;" alt><input class="guardian-input" placeholder="请输入监护人ID搜索"></div><div class="guardian-search-btn pointer">搜索</div></div>
${collectionContent}
</div>
</div></div>`);
        $('.alert-close').on('click', function () {
            $('.alert').last().remove();
        });
        $('.alert .parent').on('click', function () {
            $('.alert').last().remove();
        });
    };

})(jQuery);