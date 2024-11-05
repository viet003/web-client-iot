import axiosConfig from "../axiosConfig";

// đăng nhập
export const apiGetAllUsers = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'get',
            url: 'api/user',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


// đlấy thông tin theo id
export const apiGetUserById = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/user/id',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


// cập nhật thông tin theo id
export const apiUpdateUserById = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/user/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
