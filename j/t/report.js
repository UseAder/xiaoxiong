new Vue({
    el: '#app',
    data: {
        src: '',
        students: [
            '花老皮', '二号', '三号', '四号', '五号', '六号', '七号',
        ],
        info: {
            month: '',
            name: '',
            height: '',
            weight: '',
            petName: '',
            mainFood: '',
            milkCount: '',
            loveFood: '',
            canUseSpoon: '',
            eatHabit: '',
            sleepTime: '',
            sleepStatus: '',
            urineCount: '',
            dungStatus: '',
            soloDung: '',
            mainOther: '',
            takeCareInput: '',
            takeCareStatic1: '的每个习惯都是一点一滴的努力习得的，需要',
            takeCareStatic2: '继续保持哦！宝宝在生活自理方面的发展',
            takeCareSelect: '',
            musicLearn: '',
            musicExample: '',
            musicOther: '',
            sportLearn0: '',
            sportLearn1: '',
            sportDev: '',
            languageA: '',
            languageB: '',
            teacherSays: '',
            imgs: ['', '', '', '', '', '', '']
        },
    },
    created() {

    },
    methods: {
        getBlob(canvas) {
            let data = canvas.toDataURL("image/jpeg", 1);
            data = data.split(',')[1];
            data = window.atob(data);
            let ia = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i);
            }
            return new Blob([ia], {
                type: "image/jpeg"
            });
        },
        makeImg() {
            let rect = this.$refs['result'].getBoundingClientRect();

            console.log('a');
            let that= this;
            var canvas = document.createElement("canvas");
            let _canvas = document.getElementById('result');
            let w = parseInt(window.getComputedStyle(_canvas).width);
            let h = parseInt(window.getComputedStyle(_canvas).height);
            canvas.width = w;
            canvas.height = h;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';

            let context = canvas.getContext('2d');

            context.translate(-rect.x, -80);

            html2canvas(document.getElementById('result'), {
                canvas: canvas,
            }).then(function (canvas) {
                let blob = that.getBlob(canvas);

                let param = new FormData();
                param.append('file', blob, '.jpg');
                param.append('dir_name', 'report');
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                axios.post('http://192.168.124.7/bear_baby/codes/public/index.php/upload_img', param, config)
                    .then(response => {
                        console.log(response)
                    });

            });

        },

        mainOther4Inputing(e) {
            this.info.mainOther = e.currentTarget.value.substr(0, 20);
        },
        mainOther4InputClick(e) {
            this.info.mainOther = e.currentTarget.value;
            this.$refs.mainOther4.click();
        },

        takeCareInputing(e) {
            this.info.takeCareInput = e.currentTarget.value.substr(0, 50);
        },

        musicOtherAction(e) {
            console.log(e.currentTarget.value);
            this.info.musicOther = e.currentTarget.value;
            this.$refs.musicOther3.click();
        },
        musicOtherInputing(e) {
            console.log(e.currentTarget.value);
            this.info.musicOther = e.currentTarget.value.substr(0, 20);
        },

        languageAInputing(e) {
            this.info.languageA = e.currentTarget.value.substr(0, 20);
        },

        teacherSayInputing(e) {
            this.info.teacherSays = e.currentTarget.value.substr(0, 150);
        },

        selImg(e) {
            let idx = e.currentTarget.dataset.idx;
            console.log(this.$refs);
            this.$refs.upload[idx].click();
        },
        imgSelected(e) {
            let file = e.target.files[0];
            let url = URL.createObjectURL(file);
            let idx = e.currentTarget.dataset.idx;
            this.$set(this.info.imgs, idx, url);
        },

        checkForm() {
            let notEmptyIsOk = /^[\s\S]*.*[^\s][\s\S]*$/;
            let lessThan20 = /^(.{1,20})$/;
            let between40And50 = /^(.{40,50})$/;
            let checkArr = [
                {key: 'month', prompt: '请正确输入月报所在月份(1-12)', reg: /^(0?[1-9]|1[0-2])$/, sel: 'base-info'},
                {key: 'name', prompt: '请选择学生', reg: notEmptyIsOk, sel: 'base-info'},
                {key: 'petName', prompt: '请正确输入宝宝小名(3个汉字或6个字母以内)', reg: /^([\u4e00-\u9fa5]{1,3}|[a-zA-Z]{1,6})$/, sel: 'base-info'},
                {key: 'height', prompt: '请正确输入宝宝身高', reg: /^\d{1,3}$/, sel: 'base-info'},
                {key: 'weight', prompt: '请正确输入宝宝体重', reg: /^[0-9]+(.[0-9]{1,3})?$/, sel: 'base-info'},
                {key: 'mainFood', prompt: '请选择宝宝正餐', reg: notEmptyIsOk, sel: 'main-food'},
                {key: 'milkCount', prompt: '请正确输入宝宝奶量', reg: /^\d{1,4}$/, sel: 'main-food'},
                {key: 'loveFood', prompt: '请正确输入宝宝喜欢吃的食物', reg: notEmptyIsOk, sel: 'main-food'},
                {key: 'canUseSpoon', prompt: '请选择宝宝是否能自己拿勺吃饭', reg: notEmptyIsOk, sel: 'main-food'},
                {key: 'eatHabit', prompt: '请选择宝宝的吃饭习惯情况', reg: notEmptyIsOk, sel: 'main-food'},
                {key: 'sleepTime', prompt: '请正确输入宝宝的睡眠时间', reg: /^\d{1,3}$/, sel: 'sel-sleep'},
                {key: 'sleepStatus', prompt: '请选择宝宝的睡眠状态', reg: notEmptyIsOk, sel: 'sel-sleep'},
                {key: 'urineCount', prompt: '请正确输入宝宝换尿不湿次数', reg: /^\d{1,3}$/, sel: 'sel-wc'},
                {key: 'dungStatus', prompt: '请选择宝宝便便情况', reg: notEmptyIsOk, sel: 'sel-wc'},
                {key: 'soloDung', prompt: '请选择宝宝是否能自己上厕所', reg: notEmptyIsOk, sel: 'sel-wc'},
                {key: 'mainOther', prompt: '请选择或输入宝宝其他记录(20字以内)', reg: lessThan20, sel: 'sel-other'},
                {key: 'takeCareInput', prompt: '请正确输入宝宝生活自理情况(40-50字)', reg: between40And50, sel: 'sel-tcs'},
                {key: 'takeCareSelect', prompt: '请选择宝宝生活自己发展情况', reg: notEmptyIsOk, sel: 'sel-tcs'},
                {key: 'musicLearn', prompt: '请正确输入宝宝本月学习的儿歌', reg: notEmptyIsOk, sel: 'sel-music'},
                {key: 'musicExample', prompt: '请正确输入宝宝学习的乐器', reg: notEmptyIsOk, sel: 'sel-music'},
                {key: 'musicOther', prompt: '请选择或正确输入宝宝音乐艺术其他情况(20字以内)', reg: lessThan20, sel: 'sel-music'},
                {key: 'sportLearn0', prompt: '请正确输入宝宝做的大肌肉练习', reg: notEmptyIsOk, sel: 'sel-sport'},
                {key: 'sportLearn1', prompt: '请正确输入宝宝做的小肌肉练习', reg: notEmptyIsOk, sel: 'sel-sport'},
                {key: 'sportDev', prompt: '请选择宝宝肌肉发展情况', reg: notEmptyIsOk, sel: 'sel-sport'},
                {key: 'languageA', prompt: '请正确输入宝宝的语言发展状况(40-50字)', reg: between40And50, sel: 'sel-lan'},
                {key: 'languageB', prompt: '请选择宝宝的语言发展状况', reg: notEmptyIsOk, sel: 'sel-lan'},
                {key: 'teacherSays', prompt: '请正确输入老师寄语(150字以内)', reg: /^(.{1,150})$/, sel: 'sel-ts'},
            ];
            let that = this;
            let msg = false;
            for (let i = 0; i < checkArr.length; i++) {
                let item = checkArr[i];
                if (!item.reg || item.reg.test(that.info[item.key])) {
                    console.log('过了');
                } else {
                    msg = item.prompt;
                    this.$el.querySelector('.'+item.sel).scrollIntoView({block: 'center'});
                    break;
                }
            }
            if (!msg) {
                for (let i = 0; i < this.info.imgs.length; i++) {
                    if (this.info.imgs[i].length === 0) {
                        msg = '请选择照片' + (i + 1);
                        this.$el.querySelector('.sel-height').scrollIntoView({block: 'center'});
                        break;
                    }
                }
            }
            return msg;
        },

        submit() {
            let msg = this.checkForm();
            if (msg) {
                alert(msg);
            } else {
                // 提交表单
            }
        },
    },

});