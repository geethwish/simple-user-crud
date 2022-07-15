import { Card, CardHeader, CardBody, Button, CardFooter, Form, Label, Input, FormGroup, } from 'reactstrap'

import styles from './Home.module.scss';

const Home = () => {


    return (
        <div className={styles.formContainer}>
            <div className={styles.cardWrapper}>
                <Card>
                    <CardHeader>User Form</CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="john doe" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="amount">Amount</Label>
                                <Input type="number" name="amount" id="amount" placeholder="0" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Image</Label>
                                <Input type="file" name="file" id="exampleFile" />
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button>Submit</Button>
                    </CardFooter>
                </Card>
            </div>

        </div>
    )
}

export default Home