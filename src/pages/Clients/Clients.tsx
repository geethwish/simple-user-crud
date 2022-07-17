
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import baseURL from '../../services/baseURL';
import { allClients, getClients, deleteClient, resetStatus, updateClient } from '../../redux/Clients/clientsSlice';

// components
import Loader from '../../components/Loader/Loader';

// icons
import { FaEdit, FaTrash } from 'react-icons/fa';

// styles
import styles from './Clients.module.scss';

const Clients = () => {

    const clientsList: any = useAppSelector(allClients);

    const baseurl = baseURL();

    const dispatch = useAppDispatch();

    useEffect(() => {

        // fetch clients list
        dispatch(getClients());

    }, []);

    // handle show update modal
    const [showForm, setShowForm] = useState(false);

    // selected form
    const [form, setForm]: any = useState({
        name: '',
        amount: '',
        image: 'test'
    });

    // handle success message
    const notify = () => toast.success("Client Updated");

    // handle error message
    const notifyError = () => toast.error("Something Went Wrong!");

    // handle input fields changes
    const inputHandler = (e: any) => {

        const id = e.target.id;

        const value = e.target.value;

        setForm({ ...form, [id]: value })

    }

    // handle form submit
    const formHandler = (e: any) => {

        // disable default behavior
        e.preventDefault();

        // create form data object
        const data: any = new FormData(e.currentTarget);
        const bodyFormData = new FormData();

        // assign values form above defined objects
        const name = data.get('name');
        const amount = data.get('amount');
        const image = data.get('image');
        bodyFormData.append("name", name);
        bodyFormData.append("amount", amount);
        bodyFormData.append("image", image);

        // request for client update
        dispatch(updateClient({ id: form._id, data: bodyFormData }));

        // close modal
        setShowForm(false);

    }

    // handle open and close modal
    const handleModalOpen = (client: any) => {

        setForm({ ...client });

        setShowForm(true);

    }

    // handle client record delete
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

            // send request for delete client record
            dispatch(deleteClient(id));

        }
    });

    useEffect(() => {

        // check api status
        if (clientsList && clientsList.status === 'deleted') {

            // show delete success message
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );

            // reset the api status
            dispatch(resetStatus());

        }

        if (clientsList && clientsList.status === 'updated') {

            // show update success message
            notify()

            dispatch(resetStatus());

        }

        if (clientsList && clientsList.status === 'error') {

            // show error message
            notifyError()

            dispatch(resetStatus());

        }

    }, [clientsList])

    // show loader
    if (clientsList && clientsList.status === 'loading') {

        return <Loader />
    }
    return (
        <div>
            <Container>

                <Card className="mt-5 mb-3">

                    <CardHeader className={styles.cardHeader}>

                        <CardTitle>

                            <h3 className='mt-3 mb-3'>
                                Clients
                            </h3>

                        </CardTitle>

                    </CardHeader>

                    <CardBody>

                        <Table hover striped borderless responsive>

                            <thead>

                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Image</th>
                                    <th></th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    clientsList && clientsList.clients && clientsList.clients.length > 0 &&
                                    clientsList.clients.map((client: any, index: number) => {
                                        return <tr key={index} className={styles.center}>

                                            <th scope="row">{index + 1}</th>

                                            <td>{client.name} </td>

                                            <td>{client.amount}</td>

                                            <td>
                                                <div className={styles.imageWrapper}>
                                                    <a href={`${baseurl}${client.image}`} target="_blank" rel="noreferrer" className={styles.img}>
                                                        <img src={`${baseurl}${client.image}`} alt={client.name} className={styles.image} />
                                                    </a>

                                                </div>

                                            </td>

                                            <td className={styles.smallTH}>
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