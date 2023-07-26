import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth";

function ProfilePage() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.data);
    const submitLogout = (e) => {
        e.preventDefault();

        dispatch(logout());
    };
    return (
        <div className="container">
            <img
                src={userData.avatarUrl}
                alt="Avatar"
                className="profile_img"
            />
            <div className="user_data_wrapper">
                <h4 className="user_data">Ім'я: {userData.firstName}</h4>
                <h4 className="user_data">Прізвище: {userData.secondName}</h4>
                <h4 className="user_data">E-mail: {userData.email}</h4>
                <h4 className="user_data">
                    Номер телефону: {userData.phoneNumber}
                </h4>
                <h4 className="user_data">
                    Дата створення: {userData.createdAt}
                </h4>
                <button
                    onClick={(e) => submitLogout(e)}
                    className="log_out_button"
                >
                    Вийти
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
