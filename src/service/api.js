const BASE_URL ="127.0.0.1:8001";//填写后端项目地址



export const allPort = {
    CONNECT_DATABASE: `http://${BASE_URL}/connect`,
    GET_ALL_DATABASE: `http://${BASE_URL}/database/get_db`,
    GET_ALL_TABLE: `http://${BASE_URL}/database/get_all`,
    GENERATE_CODE: `http://${BASE_URL}/makeCode`,
    GENERATE_ZIP: `http://${BASE_URL}/makezip`,
    DATABASE_IS_CONNECT:`http://${BASE_URL}/isconnect`,
    USER_LOGIN:`http://${BASE_URL}/user/login`,
    USER_REGISTER:`http://${BASE_URL}/user/regesist`,
    USER_EMAIL:`http://${BASE_URL}/mail`

}