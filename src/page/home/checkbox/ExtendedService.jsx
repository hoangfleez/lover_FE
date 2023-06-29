import React, { useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../../services/typeService.js";
import { getServices } from "../../../services/serviceService.js";
import { getServiceProvider } from "../../../services/serviceProviderService.js";

export default function Extended({ setService }) {
    const dispatch = useDispatch();

    const handleServiceClick = (id) => {
        dispatch(getServices(id));
    };

    const handleServiceToggle = (serviceId) => {
        dispatch(getServiceProvider(serviceId));
    };

    const types = useSelector((state) => {
        console.log(state.type.type[0],665)
        return state.type?.type[0]
    });
    const services = useSelector((state) => state.service.service);

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    if (!types) {
        return null;
    }

    const imageUrls = [
        "https://i0.wp.com/www.techsignin.com/wp-content/uploads/2022/10/viewsonic-x2000-harman-kardon.jpg",
        "https://s3.cloud.cmctelecom.vn/tinhte2/2020/05/5026734_TheTerrace_TV_1.jpeg",
        "https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-dep-ve-tinh-ban-be-cung-vui-choi.jpg",
        "https://duhocchaudaiduong.edu.vn/hinh-nen-luffy-4k/imager_4605.jpg",
        "https://sinhnhatnhi.com/wp-content/uploads/2021/12/sinh-nhat-ban-1.jpg",
        "https://cdn.vietnammoi.vn/171464242508312576/2021/2/21/azar-16138951350791548956637.png"
    ];

    return (
        <>
            <FormGroup sx={{ padding: "0 10px 0 10px" }}>
                <Box>
                            <div key={types.id}>
                                <h2
                                    onClick={() => handleServiceClick(types.id)}
                                    style={{ cursor: "pointer", fontSize: "25px" }}
                                >
                                    {types.type}
                                </h2>
                            </div>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            style={{
                                marginBottom: "10px",
                                marginTop: "10px",
                                position: "relative",
                                textAlign: "center",
                                overflow: "hidden",
                            }}
                        >
                            <label
                                onClick={() => handleServiceToggle(service.id)}
                                style={{
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 1,
                                    color: "white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    whiteSpace: "nowrap", // Thêm thuộc tính whiteSpace vào đây
                                }}
                            >
                                {service.name}
                            </label>
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 0,
                                }}
                            >
                                <img
                                    src={imageUrls[index % imageUrls.length]}
                                    alt="Service Image"
                                    style={{
                                        borderRadius: "6px",
                                        maxWidth: "100%",
                                        width: "300px",
                                        height: "68px",
                                        opacity: 0.5,
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        filter: "brightness(60%)",
                                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "#000000BF",
                                        zIndex: -1,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </Box>
            </FormGroup>
        </>
    );
}
