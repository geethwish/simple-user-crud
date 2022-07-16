
import { useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Container, Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../../components/Loader/Loader';
import { allClients, getClients } from '../../redux/Clients/clientsSlice';
import styles from './Clients.module.scss';

const Clients = () => {

    const clientsList: any = useAppSelector(allClients);
    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(getClients());

    }, []);

    console.log(clientsList);

    if (clientsList && clientsList.status === 'loading') {

        return <Loader />
    }
    return (
        <div>
            <Container>

                <Card className="mt-5 mb-3">
                    <CardHeader>
                        <CardTitle>
                            <h3 className='mt-3 mb-3'>
                                Clients
                            </h3>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover striped borderless>

                            <thead>

                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Image</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    clientsList && clientsList.clients && clientsList.clients.length > 0 &&
                                    clientsList.clients.map((client: any, index: number) => {
                                        return <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{client.name} </td>
                                            <td>{client.amount}</td>
                                            <td>{client.image}</td>
                                        </tr>
                                    }
                                    )
                                }
                            </tbody>

                        </Table>

                    </CardBody>

                </Card>

            </Container>
        </div>
    )
}

export default Clients