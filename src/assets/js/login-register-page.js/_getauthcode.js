import { getauthcode } from "./getauthcode";
export async function _getauthcode(obj) {
    var message = await getauthcode('http://127.0.0.1:8001/mail', obj.email);
    return message;
}

// npm镜像换源：npm --registry=https://registry.npm.taobao.org install