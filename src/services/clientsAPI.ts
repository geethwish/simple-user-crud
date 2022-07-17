import axiosInstance from "./axiosInstance";


export function fetchClients() {

    return new Promise((resolve, reject) =>

        // waiting fes mil-sec
        setTimeout(() => {

            // request client from backend
            axiosInstance.get('clients').then((response) => {

                // return the response
                resolve(response.data);

            }).catch((error) => {

                // send error
                reject(error);

            })
        }, 3000)

    )
}


export function saveClientsDetails(client: any) {

    return new Promise((resolve, reject) =>

        // waiting fes mil-sec

        setTimeout(() => {

            axiosInstance.post('clients', client).then((response) => {

                resolve(response.data)

            }).catch((error) => {

                reject(error);

            })

        }, 3000)
    )

}

// handle delete client

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

// handle update clients

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
