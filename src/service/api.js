const BASE_URL ="127.0.0.1:8001";//填写后端项目地址



export const allPort = {
    CONNECT_DATABASE: `${BASE_URL}/connect`,
    GET_ALL_DATABASE: `${BASE_URL}/database/get_db`,
    GET_ALL_TABLE: `${BASE_URL}/database/get_all`,
    GENERATE_CODE: `${BASE_URL}/makeCode`,
    GENERATE_ZIP: `${BASE_URL}/makezip`,
    DATABASE_IS_CONNECT:`${BASE_URL}/isconnect`,
    USER_LOGIN:`${BASE_URL}/user/login`,
    USER_REGISTER:`${BASE_URL}/user/regesist`,
    USER_EMAIL:`${BASE_URL}/mail`

}