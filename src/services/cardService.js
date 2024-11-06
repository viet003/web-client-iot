import axiosConfig from "../axiosConfig";

// đăng nhập
export const apiGetAllCards = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'get',
            url: 'api/card',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


// đlấy thông tin theo id
export const apiGetCardWhithoutAccount = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'get',
            url: 'api/card/noac',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// tạo thẻ
export const apiCreateCard = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/card/add',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// cập nhật thông tin theo id
export const apiUpdateCardById = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/card/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


// cập nhật thông tin theo id
export const apiDeleteCardById = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/card/delete',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
