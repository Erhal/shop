import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {useForm} from "react-hook-form";
import CitiesSelect from "./CitiesSelect";
import SpinnerBorder from "../Spinners/SpinnerBorder";

import {deleteCart} from "../../store/slices/cart";
import sendOrder from "../../helpers/api/sendOrder";

const CheckoutForm = () => {

    const {cart} = useSelector(state => state.cart);
    const {register, formState: {errors}, handleSubmit, watch, control} = useForm({mode: "all"});

    const [orderNumber, setOrderNumber] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        setOrderNumber('loading')
        const response = await sendOrder(formData, cart);
        await setOrderNumber(response)
        if (response !== 'error') {
            setTimeout(() => {
                navigate('/')
            }, 4000)
            setTimeout(() => {
                dispatch(deleteCart())
            }, 4100)
        }
    }

    useEffect(() => {
        watch();
    }, []);

    return (
        <Container className='px-4 py-4'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.name ? 'is-invalid' : ''}
                        placeholder="Enter your name"
                        {...register("name", {
                            required: "Name is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/i,
                                message: "Name should contain only letters"
                            },
                        })}
                    />
                    <Form.Text className="text-danger">
                        <div style={{height: '12px'}}>
                            {errors?.name?.message}
                        </div>
                    </Form.Text>
                </Form.Group>

                <div className='d-flex gap-2'>
                    <Form.Group className="w-100 mb-3" controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            className={errors.phone ? 'is-invalid' : ''}
                            placeholder="Enter phone number"
                            {...register("phone", {
                                required: "Phone is required",
                                pattern: {
                                    value: /^[0-9]+$/i,
                                    message: "Phone should contain only numbers"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            <div style={{height: '12px'}}>
                                {errors?.phone?.message}
                            </div>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="w-100 mb-3 w-100" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            className={errors.email ? 'is-invalid' : ''}
                            placeholder="Enter email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            <div style={{height: '12px'}}>
                                {errors?.email?.message}
                            </div>
                        </Form.Text>
                    </Form.Group>
                </div>

                <div className='d-flex gap-2'>
                    <Form.Group className="w-50 mb-3" controlId="formCitySelect">
                        <Form.Label>City</Form.Label>
                        <CitiesSelect control={control} name={'city'} error={errors.city}/>
                    </Form.Group>
                    <Form.Group className="w-50 mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            className={errors.address ? 'is-invalid' : ''}
                            placeholder="Enter address"
                            {...register("address", {
                                required: "Address is required",
                                pattern: {
                                    value: /^[A-Za-z0-9\s]+$/i,
                                    message: "Address should contain only letters and numbers"
                                }
                            })}
                        />
                        <Form.Text className="text-danger">
                            <div style={{height: '12px'}}>
                                {errors?.address?.message}
                            </div>
                        </Form.Text>
                    </Form.Group>
                </div>

                <div className='d-flex flex-column align-items-center justify-content-center'>
                    {!orderNumber && <>
                        <Button className='w-50 mt-2 mb-4' variant="outline-success" type="submit">
                            Send
                        </Button>
                        <h5 className='text-center text-muted mt-3'>Please fill out this form and we will contact you to confirm
                        the order</h5>
                    </>}
                    {orderNumber === 'loading' &&
                        <div className='mt-2 mb-2 d-flex justify-content-center align-items-center'><SpinnerBorder/></div>
                    }
                </div>

                {orderNumber && orderNumber !== 'loading' && orderNumber !== 'error' && <>
                    <h4 className='text-center text-muted mt-3'>Done!</h4>
                    <h5 className='text-center text-muted mt-3'>Your order number: {orderNumber}</h5>
                </>}
            </Form>
        </Container>
    );
};

export default CheckoutForm;