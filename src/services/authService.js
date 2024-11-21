import axiosConfig from "../axiosConfig";

// đăng nhập
export const apiLogin = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/auth/login',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// kiểm tra hạn token
export const apicheckTokenExpired = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/auth',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// đăng kys
export const apiRegisterService = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/auth/register',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


// đổi mật khẩu
export const apiChangePassWordService = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/auth/changepass',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
