import {Toolbar} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllUser} from "../../services/adminService.js";

const ShowAccountUser = () => {
    const dispatch = useDispatch();

    const users = useSelector((state) => {
        return state.admin.listUser;
    });

    useEffect(() => {
        dispatch(findAllUser())
    },[dispatch])
    return (
        <>
            <Toolbar/>
            <div>
                {users && users.map(item => (
                    <span key={item.id}> Tên tài khoản: {item.username}</span>
                ))}
            </div>

        </>
    )
}

export default ShowAccountUser;
