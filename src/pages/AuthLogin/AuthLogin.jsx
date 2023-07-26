import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import validator from "validator";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../../redux/slices/auth";

function AuthLogin() {
    const isAuth = useSelector((state) => Boolean(state.auth.data));
    const [formError, setFormError] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            validator.isEmail(formData.email) &&
            formData.password.length >= 5
        ) {
            setFormError(false);
            const data = await dispatch(fetchAuth(formData));
            if (!data.payload) {
                setFormError(true);
            } else {
                if ("token" in data.payload) {
                    window.localStorage.setItem("token", data.payload.token);
                } else {
                    setFormError(true);
                }
            }
        } else {
            setFormError(true);
        }
    };
    if (isAuth) {
        return <Navigate to="/" />;
    }
    return (
        <div className="container">
            <h1 className="form_title">Вхід</h1>
            <div className="form_wrapper">
                <label htmlFor="email" className="input_label">
                    E-mail
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className={`form_input ${
                        formError && !validator.isEmail(formData.email)
                            ? "error"
                            : ""
                    }`}
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                />

                <label htmlFor="password" className="input_label">
                    Пароль
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form_input ${
                        formError && formData.password.length < 5 ? "error" : ""
                    }`}
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                />
                {formError ? (
                    <span className="error">
                        Ви ввели не правильний логін або пароль
                    </span>
                ) : null}
                <span className="forget_text">Забули пароль?</span>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="form_button"
                >
                    Увійти
                </button>
                <div className="form_footer">
                    <b>Ще не зареєстровані?</b>
                    <Link to="/register" className="form_footer_link">
                        Реєстрація
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AuthLogin;
