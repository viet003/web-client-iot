import axiosConfig from "../axiosConfig";

// lấy bill
export const apiGetAllBills = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'get',
            url: 'api/bill/all',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// lấy bill
export const apiUpdateBillById = (payload) => new Promise((resolve, reject) => {
    try {
        const response = axiosConfig({
            method: 'post',
            url: 'api/bill/pay',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
