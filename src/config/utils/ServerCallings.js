//
import {NodeFetchHelper} from "./NodeFetchHelper";

const api_endpoint = "http://13.48.163.106/"
const login_endpoint = api_endpoint + "user/login/"
const registration_endpoint = api_endpoint + "user/registration/"
const property_list_endpoint = api_endpoint + 'property/list/'
const single_property_endpoint = api_endpoint + "property/get-property/"
const post_property_endpoint = api_endpoint + "property/post-property/"

//
export class ServerCallings {
    static revive() {
        NodeFetchHelper.get(api_endpoint, null, null, (a, b) => {
            console.log("Revived")
        })
    }

    static login(email, password, callback) {
        NodeFetchHelper.post(login_endpoint, null, null, {
            email,
            password,
        }, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                callback(data)
            }
        })
    }

    static register(body, callback) {
        NodeFetchHelper.post(registration_endpoint, null, null, body, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                callback(data)
            }
        })
    }

    static getOneProperty(id, cb) {
        NodeFetchHelper.get(single_property_endpoint + id, null, null, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }

    static getProperties(body, cb) {
        NodeFetchHelper.post(property_list_endpoint, null, null, body, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }

    static postProperty(body, cb) {
        NodeFetchHelper.upload(post_property_endpoint, null, body, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }
}
