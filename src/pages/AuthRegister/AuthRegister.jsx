import React, { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import "../../App.css";
import { fetchRegister } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

function AuthRegister() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        email: "",
        phoneNumber: "",
        password: "",
        passwordRepeat: "",
    });

    const [formErrors, setFormErrors] = useState({
        firstName: "",
        secondName: "",
        email: "",
        phoneNumber: "",
        password: "",
        passwordRepeat: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [name]: validateField(name, value),
        }));
    };

    const validateField = (fieldName, value) => {
        // Перевіряємо наявність значення в полях firstName та secondName
        if (["firstName", "secondName"].includes(fieldName)) {
            return value.trim() === "" ? "Поле обов'язкове" : "";
        }

        // Перевіряємо емейл
        if (fieldName === "email") {
            return !validator.isEmail(value) ? "Невірний формат емейлу" : "";
        }

        // Перевіряємо номер телефону
        if (fieldName === "phoneNumber") {
            return !validator.isMobilePhone(value, "any", { strictMode: false })
                ? "Невірний формат номеру телефону"
                : "";
        }

        // Перевіряємо пароль
        if (fieldName === "password") {
            return value.length < 5
                ? "Пароль має бути не менше 5 символів"
                : "";
        }

        // Перевіряємо підтвердження паролю
        if (fieldName === "passwordRepeat") {
            return value !== formData.password ? "Паролі не співпадають" : "";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = Object.values(formErrors).every(
            (error) => error === ""
        );

        if (isFormValid) {
            const data = await dispatch(fetchRegister(formData));
            console.log(data);
        } else {
            console.log("Форма містить помилки. Перевірте поля");
        }
    };

    return (
        <div className="container">
            <h1 className="form_title">Зареєструватися</h1>
            <div className="form_wrapper">
                <label htmlFor="firstName" className="input_label">
                    Ім'я
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form_input ${formErrors.firstName && "error"}`}
                    placeholder="Ім'я"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                {formErrors.firstName && (
                    <span className="error">{formErrors.firstName}</span>
                )}

                <label htmlFor="secondName" className="input_label">
                    Прізвище
                </label>
                <input
                    type="text"
                    id="secondName"
                    name="secondName"
                    className={`form_input ${formErrors.secondName && "error"}`}
                    placeholder="Прізвище"
                    value={formData.secondName}
                    onChange={handleChange}
                />
                {formErrors.secondName && (
                    <span className="error">{formErrors.secondName}</span>
                )}

                <label htmlFor="email" className="input_label">
                    E-mail
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className={`form_input ${formErrors.email && "error"}`}
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                {formErrors.email && (
                    <span className="error">{formErrors.email}</span>
                )}

                <label htmlFor="phoneNumber" className="input_label">
                    Номер телефону
                </label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className={`form_input ${
                        formErrors.phoneNumber && "error"
                    }`}
                    placeholder="+380"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                {formErrors.phoneNumber && (
                    <span className="error">{formErrors.phoneNumber}</span>
                )}

                <label htmlFor="password" className="input_label">
                    Пароль
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form_input ${formErrors.password && "error"}`}
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                />
                {formErrors.password && (
                    <span className="error">{formErrors.password}</span>
                )}

                <label htmlFor="passwordRepeat" className="input_label">
                    Підтвердження паролю
                </label>
                <input
                    type="password"
                    id="passwordRepeat"
                    name="passwordRepeat"
                    className={`form_input ${
                        formErrors.passwordRepeat && "error"
                    }`}
                    placeholder="Підтвердіть пароль"
                    value={formData.passwordRepeat}
                    onChange={handleChange}
                />
                {formErrors.passwordRepeat && (
                    <span className="error">{formErrors.passwordRepeat}</span>
                )}

                <button
                    onClick={(e) => handleSubmit(e)}
                    className="form_button"
                >
                    Зареєструватися
                </button>
                <div className="form_footer">
                    <b>Вже зареєстровані?</b>
                    <Link to="/login" className="form_footer_link">
                        Авторизація
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AuthRegister;
