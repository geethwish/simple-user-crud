import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardBody, Button, CardFooter, Form, Label, Input, FormGroup, } from 'reactstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../../components/Loader/Loader';
import { clientDetails, saveClient, rest } from '../../redux/Clients/clientSlice';

import styles from './Home.module.scss';

const Home = () => {

    const clientDetail: any = useAppSelector(clientDetails);

    const dispatch = useAppDispatch()

    const [form, setForm] = useState({
        name: '',
        amount: '',
        image: {}
    })

    const notify = () => toast.success("New Client Details Added!");

    const notifyError = () => toast.error("Something Went Wrong!");

    const inputHandler = (e: any) => {

        const id = e.target.id;

        const value = e.target.value;

        setForm({ ...form, [id]: value })

    }


    const imageUploadHandle = (e: any) => {

        const selected = e.target.files[0];

        const objectUrl = URL.createObjectURL(selected)

        setForm({ ...form, image: objectUrl })


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


        dispatch(saveClient(bodyFormData))

    }

    useEffect(() => {

        if (clientDetail.status === 'success') {

            notify();

            dispatch(rest());

        } else if (clientDetail.status === 'success') {

            notifyError();

            dispatch(rest());

        }
    }, [clientDetail])


    if (clientDetail && clientDetail.status === 'loading') {

        return <Loader />

    }

    return (
        <div className={styles.formContainer}>

            <div className={styles.cardWrapper}>

                <Card>

                    <Form onSubmit={formHandler}>

                        <CardHeader>User Form</CardHeader>

                        <CardBody>

                            <FormGroup>

                                <Label for="name">Name</Label>

                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="john doe"
                                    onChange={inputHandler}
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
                                />

                            </FormGroup>

                            <FormGroup>

                                <Label for="exampleFile">Image</Label>

                                <Input type="file" name="image" id="exampleFile" onChange={imageUploadHandle} />

                            </FormGroup>

                        </CardBody>

                        <CardFooter>

                            <Button type='submit'>Submit</Button>

                        </CardFooter>

                    </Form>

                </Card>

            </div>

        </div>
    )
}

export default Home