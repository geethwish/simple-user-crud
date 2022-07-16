
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Swal from 'sweetalert2'

import Loader from '../../components/Loader/Loader';
import { allClients, getClients, deleteClient, resetStatus, updateClient } from '../../redux/Clients/clientsSlice';

import { FaEdit, FaTrash } from 'react-icons/fa';

import styles from './Clients.module.scss';
import { toast } from 'react-toastify';


const Clients = () => {

    const clientsList: any = useAppSelector(allClients);

    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(getClients());

    }, []);

    const [showForm, setShowForm] = useState(false);


    const [form, setForm]: any = useState({
        name: '',
        amount: '',
        image: 'test'
    });


    const notify = () => toast.success("Client Updated");

    const notifyError = () => toast.error("Something Went Wrong!");

    const inputHandler = (e: any) => {

        const id = e.target.id;

        const value = e.target.value;

        setForm({ ...form, [id]: value })

    }
    const formHandler = (e: any) => {

        e.preventDefault();

        const data: any = new FormData(e.currentTarget);

        const bodyFormData = new FormData();

        const name = data.get('name');
        const amount = data.get('amount');
        const image = data.get('image');
        bodyFormData.append("name", name);
        bodyFormData.append("amount", amount);
        bodyFormData.append("image", image);


        console.log(bodyFormData);

        dispatch(updateClient({ id: form._id, data: bodyFormData }));

        setShowForm(false);

    }

    const handleModalOpen = (client: any) => {

        setForm({ ...client });

        setShowForm(true);

    }


    const deleteClientHandler = (id: any) => Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            dispatch(deleteClient(id));

        }
    });

    useEffect(() => {

        if (clientsList && clientsList.status === 'deleted') {

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

            dispatch(resetStatus());

        }

        if (clientsList && clientsList.status === 'updated') {

            notify()

            dispatch(resetStatus());

        }

        if (clientsList && clientsList.status === 'error') {

            notifyError()

            dispatch(resetStatus());

        }

    }, [clientsList])

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
                                    <th style={{ width: 150 }}></th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    clientsList && clientsList.clients && clientsList.clients.length > 0 &&
                                    clientsList.clients.map((client: any, index: number) => {
                                        return <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{client.name} </td>
                                            <td>{client.amount}</td>
                                            <td>{client.image}</td>
                                            <td >
                                                <Button color="primary" onClick={() => handleModalOpen(client)}><FaEdit /></Button>{' '}
                                                <Button color="danger" onClick={() => deleteClientHandler(client._id)}><FaTrash /></Button>{' '}
                                            </td>
                                        </tr>
                                    }
                                    )
                                }
                            </tbody>

                        </Table>

                    </CardBody>

                </Card>

                <Modal isOpen={showForm} toggle={() => setShowForm(!showForm)}>

                    <Form onSubmit={formHandler}>

                        <ModalHeader toggle={() => setShowForm(!showForm)}>Update | {form.name}</ModalHeader>

                        <ModalBody>

                            <FormGroup>

                                <Label for="name">Name</Label>

                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="john doe"
                                    onChange={inputHandler}
                                    value={form.name}
                                    required
                                />

                            </FormGroup>

                            <FormGroup>

                                <Label for="amount">Amount</Label>

                                <Input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    placeholder="0"
                                    onChange={inputHandler}
                                    required
                                    value={form.amount}
                                />

                            </FormGroup>

                            <FormGroup>

                                <Label for="exampleFile">Image</Label>

                                <Input type="file" name="image" id="exampleFile" />

                            </FormGroup>


                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                type='submit'
                            >
                                Update
                            </Button>{' '}
                            <Button
                                color="secondary"
                                onClick={() => setShowForm(!showForm)}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Container>
        </div>
    )
}

export default Clients