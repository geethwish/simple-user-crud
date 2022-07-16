import axiosInstance from "./axiosInstance";
import qs from "qs";


export function fetchClients() {

    return new Promise<{ data: number }>((resolve, reject) =>

        setTimeout(() => {
            axiosInstance.get('clients').then((response) => {

                resolve(response.data)

            }).catch((error) => {

                reject(error);

            })
        }, 3000)

    )
}


export function saveClientsDetails(data: any) {

    return new Promise<{ data: number }>((resolve, reject) =>

        setTimeout(() => {

            axiosInstance.post('clients', qs.stringify({ ...data })).then((response) => {

                resolve(response.data)

            }).catch((error) => {

                reject(error);

            })

        }, 3000)
    )


}
