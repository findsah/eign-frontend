// Created by p32929
// URL: https://gist.github.com/p32929/6143fafc629dcc1e7352d8ca268d11d1
// Feel free to give it a star

//
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

//
export class NodeFetchHelper {
    static get = (url, params, headers, callback) => {
        if (params) {
            params = new URLSearchParams(params);
            url = url + "?" + params
        }

        fetch(url, {
            method: GET,
            headers: new Headers({
                ...headers,
                "Content-Type": "application/json",
            })
        }).then(res => Promise.all([res.status, res.json()]))
            .then(([status, jsonData]) => {
                console.log(jsonData);
                console.log(status);
                callback(status, jsonData)
            })
            .catch((e) => {
                callback(500, {
                    error: e
                })
            })
    }

    static post = (url, params, headers, body, callback) => {
        if (params) {
            params = new URLSearchParams(params);
            url = url + "?" + params
        }

        fetch(url, {
            method: POST,
            headers: new Headers({
                ...headers,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                ...body
            })
        }).then(res => Promise.all([res.status, res.json()]))
            .then(([status, jsonData]) => {
                console.log(jsonData);
                console.log(status);
                callback(status, jsonData)
            })
            .catch((e) => {
                callback(500, {
                    error: e
                })
            })
    }

    static put = (url, params, headers, body, callback) => {
        if (params) {
            params = new URLSearchParams(params);
            url = url + "?" + params
        }

        fetch(url, {
            method: PUT,
            headers: new Headers({
                ...headers,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                ...body
            })
        }).then(res => Promise.all([res.status, res.json()]))
            .then(([status, jsonData]) => {
                console.log(jsonData);
                console.log(status);
                callback(status, jsonData)
            })
            .catch((e) => {
                callback(500, {
                    error: e
                })
            })
    }

    static deletee = (url, params, headers, callback) => {
        if (params) {
            params = new URLSearchParams(params);
            url = url + "?" + params
        }

        fetch(url, {
            method: DELETE,
            headers: new Headers({
                ...headers,
                "Content-Type": "application/json",
            })
        }).then(res => Promise.all([res.status, res.json()]))
            .then(([status, jsonData]) => {
                console.log(jsonData);
                console.log(status);
                callback(status, jsonData)
            })
            .catch((e) => {
                callback(500, {
                    error: e
                })
            })
    }

    static upload = (url, params, body, callback) => {
        if (params) {
            params = new URLSearchParams(params);
            url = url + "?" + params
        }

        var formData = new FormData();
        for (var key in body) {
            formData.append(key, body[key]);
        }
        console.log("FD")
        console.log(formData.get('uploaded_data'))

        fetch(url, {
            method: POST,
            body: formData
        }).then(res => Promise.all([res.status, res.json()]))
            .then(([status, jsonData]) => {
                console.log(jsonData);
                console.log(status);
                callback(status, jsonData)
            })
            .catch((e) => {
                callback(500, {
                    error: e
                })
            })
    }
}
