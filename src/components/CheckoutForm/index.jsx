import {Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CitiesSelect from "./CitiesSelect";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

const CheckoutForm = () => {

    const {register, formState: {errors}, handleSubmit, watch, control} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    useEffect(() => {
        watch();
    }, []);

    return (<Container className='px-4 py-4'>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <div className='d-flex gap-2'>
                    <Form.Group className="w-50 mb-3" controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            className='is-invalid'
                            placeholder="Enter first name"
                            {...register("firstName", {
                                required: "First name is required", pattern: {
                                    value: /^[A-Za-z]+$/i, message: "First name should contain only letters"
                                }, minLength: {value: 2}, maxLength: {value: 20},
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.firstName?.message || <div className='mt-4'/>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="w-50 mb-3" controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            {...register("lastName", {
                                required: "Last name is required", pattern: {
                                    value: /^[A-Za-z]+$/i, message: "Last name should contain only letters"
                                }, minLength: {value: 2}, maxLength: {value: 20},
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.lastName?.message || <div className='mt-4'/>}
                        </Form.Text>
                    </Form.Group>
                </div>

                <div className='d-flex'>
                    <Form.Group className="col-12 mb-3 w-100" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: "Email is required", pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.email?.message || <div className='mt-4'/>}
                        </Form.Text>
                    </Form.Group>
                </div>

                <div className='d-flex gap-2'>
                    <Form.Group className="w-50 mb-3" controlId="formCitySelect">
                        <Form.Label>City</Form.Label>
                        <CitiesSelect control={control} name={'city'}/>
                    </Form.Group>

                    <Form.Group className="w-50 mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            {...register("address", {
                                required: "Address is required", pattern: {
                                    value: /^[A-Za-z0-9\s]+$/i,
                                    message: "Address should contain only letters and numbers"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.address?.message || <div className='mt-4'/>}
                        </Form.Text>
                    </Form.Group>
                </div>

                <div className='d-flex'>
                    <Form.Group className="col-12 mb-3 w-100" controlId="formPhoneNumber">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            {...register("phoneNumber", {
                                required: "Phone number is required", pattern: {
                                    value: /^[0-9]+$/i, message: "Phone number should contain only numbers"
                                }, minLength: {value: 10}, maxLength: {value: 10},
                            })}
                        />
                        <Form.Text className={errors?.phoneNumber?.message ? "text-danger" : "text-muted"}>
                            {errors?.phoneNumber?.message || 'Enter your phone number'}
                        </Form.Text>
                    </Form.Group>
                </div>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>);
};

export default CheckoutForm;