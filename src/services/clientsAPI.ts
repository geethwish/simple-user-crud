import axiosInstance from "./axiosInstance";
import qs from "qs";


export function fetchClients() {

    return new Promise((resolve, reject) =>

        setTimeout(() => {
            axiosInstance.get('clients').then((response) => {

                resolve(response.data)

            }).catch((error) => {

                reject(error);

            })
        }, 3000)

    )
}


export function saveClientsDetails(client: any) {

    return new Promise((resolve, reject) =>

        setTimeout(() => {


            axiosInstance.post('clients', client).then((response) => {

                resolve(response.data)

            }).catch((error) => {

                reject(error);

            })

        }, 3000)
    )

}


export function deleteClientRecord(id: any) {

    return new Promise((resolve, reject) =>

        setTimeout(() => {

            axiosInstance.delete(`clients/${id}`).then((response) => {

                resolve(response.data)

            }).catch((error) => {

                reject(error);

            })

        }, 3000)
    )

}

export function updateClientRecord(client: any) {

    return new Promise((resolve, reject) =>

        setTimeout(() => {

            axiosInstance.put(`clients/${client.id}`, client.data).then((response) => {

                resolve(response.data)

            }).catch((error) => {

                reject(error);

            })

        }, 3000)
    )


}
