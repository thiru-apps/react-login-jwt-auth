import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">
                This is not a valid email.
            </div>
        );
    }
};

const validUsername = (value) => {
    if (value.length < 5 || value.length > 10) {
        return (
            <div className="invalid-feedback d-block">
                The username must be between 5 and 10 characters.
            </div>
        );
    }
};

const validPassword = (value) => {
    if (value.length < 8 || value.length > 10) {
        return (
            <div className="invalid-feedback d-block">
                The password must be between 6 and 8 characters.
            </div>
        );
    }
};

const validPhone = (value) => {
    if (value.length < 10 || value.length > 13) {
        return (
            <div className="invalid-feedback d-block">
                The phone number must be between 10 and 13 numbers.
            </div>
        );
    }
};

const validAddress = (value) => {
    if (value.length < 10 || value.length > 30) {
        return (
            <div className="invalid-feedback d-block">
                The Address must be between 10 and 30 characters.
            </div>
        );
    }
};

const Register = (pros) => {

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);


        form.current.validateAll();


        if (checkBtn.current.contex._errors.length === 0) {
            AuthService.register(username, email, password, phone, address).then(
                (response) => {
                    setMessage(response.data.message)
                    setSuccessful(true)
                }, (error) => {
                    const response = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    setMessage(response);
                    setSuccessful(false)
                }
            )
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="" alt="profile" className="profile-img-card" />
            </div>
            <Form onSumbit={handleRegister} ref={form}>
                {!successful && (
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} validations={[required, validUsername]} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required, validPassword]} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={email} onChange={onChangeEmail} validations={[required, validEmail]} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" name="phone" value={phone} onChange={onChangePhone} validations={[required, validPhone]} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" name="address" value={address} onChange={onChangeAddress} validations={[required, validAddress]} />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Register</button>
                        </div>
                    </div>
                )}
                {message && (
                    <div className="form-group">
                        <div className={
                            successful ? "alert alert-success" : "alert alert-danger"
                        } role="alert"
                        >
                            {message}
                        </div>
                    </div>

                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />

            </Form>
        </div>
    );

}

export default Register;