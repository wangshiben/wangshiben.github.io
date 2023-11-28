import store from "@/store/index.js";
import { postAxios } from "./postAxios";
import { getAxios } from "./getAxios";
import router from "@/router";
import { showpopup } from "./showpopup.js"
import {allPort} from "@/service/api";
export async function _postAxios(_this, axios_event, obj) {
    let JSESSIONID = store.state.JSESSIONID;
    if (axios_event === "postLoginInfo") {
        var temp = await postAxios(allPort.USER_LOGIN, obj, axios_event);
        console.log(temp);
        if (temp === "err") {
            showpopup(_this, "登录失败")
        }
        else {
            store.commit("changeMessage", temp)
            JSESSIONID = store.state.JSESSIONID;
            var temp2 = await getAxios(`${allPort.DATABASE_IS_CONNECT}?JSESSIONID=${JSESSIONID}`)//检查是否连接数据库
            // 如果数据库已经连接
            console.log("temp2");
            console.log(temp2);

            if (temp2 === "ok") {
                router.push({ path: '/select' })//如果数据库尚未连接，则直接跳转到。。。。。
            }
            if (temp2 === "err") {
                router.push({ path: '/connect' })//如果数据库已经连接，则直接跳转到。。。。。
            }
        }
    }
    if (axios_event === "postRegisterInfo") {
        var temp3 = await postAxios(`${allPort.USER_REGISTER}?JSESSIONID=${JSESSIONID}`, obj, axios_event);
        if (temp3 === "ok") {
            router.push({ path: '/login' })//注册成功后跳转登陆页面
        }
        if (temp3 === "err") {
            showpopup(_this, "网络或验证码错误")
        }
    }
}