function post(options) {
    let param_f = new FormData();
    Object.keys(options.data).forEach(key => {
        param_f.append(key, options.data[key])
    });
    axios.post(options.uri, param_f)
        .then(res => {
            let data = res.data;
            if (data.errno === 0) {
                options.success(data.data);
            } else {
                options.fail(data);
            }
        })
}

function get(options) {
    axios.get(options.uri, {
        params: options.data
    }).then(res => {
        let data = res.data;
        if (data.errno === 0) {
            options.success(data.data);
        } else {
            options.fail(data);
        }
    })
}

function upload(options) {
    console.log(options);
    let param = new FormData();
    param.append('file', options.file, '.jpg');
    param.append('dir_name', options.dirName);
    let config = {
        headers:{'Content-Type':'multipart/form-data'}
    };
    console.log(param);
    axios.post(options.uri, param, config)
        .then(response => {
            console.log(response);
            options.success(response.data);
        });
}


export default {
    post: post,
    get: get,
    upload: upload,
};