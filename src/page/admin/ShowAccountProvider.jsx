import {Toolbar} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllProvider} from "../../services/adminService.js";

const ShowAccountProvider = () => {
    const dispatch = useDispatch();

    const providers = useSelector((state) => {
        return state.admin.listUser;
    });

    useEffect(() => {
        dispatch(findAllProvider())
    },[dispatch])
    return (
        <>
            <Toolbar/>
            <div>
                {providers && providers.map(item => (
                    <span key={item.id}> Tên tài khoản: {item.username}</span>
                ))}
            </div>

        </>
    )
}

export default ShowAccountProvider;
