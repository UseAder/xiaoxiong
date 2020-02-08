Vue.component('delete-alert', {
    props: {
        title: {type: String, default: '',},
        content: {type: String, default: '',},
        text: {type: String, default: '确定',},
        cancelText: {type: String, default: '取消',},
        obj: Object,
    },
    template: `<div class="alert delete"><div class="alert-content">
<div class="alert-close" @click="$emit('close')"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<div><img src="/img/alert/warn.png" style="width: 10rem; height: 10rem;" alt></div>
<div class="alert-title">{{title}}</div>
<div class="alert-detail">{{content}}</div>
<div class="alert-funcs d-flex align-center justify-content-between">
<div class="complete pointer" @click="$emit('submit', obj)">{{text}}</div>
<div class="cancel pointer" @click="$emit('close')">{{cancelText}}</div>
</div>
</div></div>`
});

Vue.component('submit-alert', {
    props: {
        title: {type: String, default: '确定'},
    },
    methods: {
        close() {
            this.$emit('close', this);
        },
    },
    template: `<div class="alert delete"><div class="alert-content">
<div class="alert-close" @click="close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<slot></slot>
<div class="submit pointer" @click="$emit('submit')">{{title}}</div>
</div></div>`
});

Vue.component('alert', {
    props: {
        text: {type: String, default: '确定'},
        canceltext: {type: String, default: '取消'},
        showcancel: {type: Boolean, default: true},
        textcolor: {type: String, default: '#fff'},
        canceltextcolor: {type: String, default: '#90D1E4'},
        textbackgroundcolor: {type: String, default: '#90D1E4'},
        cancelbackgroundcolor: {type: String, default: '#fff'},
        textbordercolor: {type: String, default: '#90D1E4'},
        cancelbordercolor: {type: String, default: '#90D1E4'},
    },
    data() {
        return {
            submitStyle: '',
            cancelStyle: '',
        }
    },
    created() {
        this.submitStyle = `color: ${this.textcolor};background-color: ${this.textbackgroundcolor}; border: 2px solid ${this.textbordercolor};`;
        this.cancelStyle = `color: ${this.canceltextcolor}; background-color: ${this.cancelbackgroundcolor}; border: 2px solid ${this.cancelbordercolor};`;
    },
    methods: {},
    template: `<div class="alert delete"><div class="alert-content">
<div class="alert-close" @click="$emit('close')"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<slot></slot>
<div class="d-flex alert-funcs">
<div class="complete pointer" @click="$emit('submit')" :style="submitStyle">{{text}}</div>
<div v-if="showcancel" class="cancel pointer" @click="$emit('cancel')" :style="cancelStyle">{{canceltext}}</div>
</div>
</div></div>`
});

Vue.component('info-alert', {
    template: `<div class="alert"><div class="alert-content clear">
<div class="alert-close" @click.stop="$emit('close');"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<slot></slot>
</div></div>`
});