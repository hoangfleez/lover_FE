// import React, { useEffect } from "react";
// import FormGroup from "@mui/material/FormGroup";
// import { Box, Button } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { getTypes } from "../../../services/typeService.js";
// import { getServices } from "../../../services/serviceService.js";
// import {getServiceProvider} from "../../../services/serviceProviderService.js";
//
// export default function Extended({ setService }) {
//     const dispatch = useDispatch();
//
//     const handleServiceClick = (id) => {
//         dispatch(getServices(id));
//     };
//
//     const handleServiceToggle = (serviceId) => {
//         dispatch(getServiceProvider(serviceId))
//     };
//     const abc = useSelector((state) => {
//         console.log(state,666)
//         // state.type.type
//     });
//
//     const types = useSelector((state) =>state.type.type);
//     const services = useSelector((state) => state.service.service);
//
//
//     useEffect(() => {
//         dispatch(getTypes());
//     }, [dispatch]);
//
//     if (!types) {
//         return null;
//     }
//
//     return (
//         <>
//             <FormGroup sx={{ paddingLeft: "10px" }}>
//                 {types &&
//                     types.map((item) => (
//                         <div key={item.id}>
//                             <h2
//                                 onClick={() => handleServiceClick(item.id)}
//                                 style={{ cursor: "pointer" }}
//                             >
//                                 {item.type}
//                             </h2>
//                         </div>
//                     ))}
//                 <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: "20px" }}>
//                     {services.map((service) => (
//                         <div key={service.id}>
//                             <label onClick={() => handleServiceToggle(service.id)}>{service.name}</label>
//                         </div>
//                     ))}
//                 </Box>
//             </FormGroup>
//         </>
//     );
// }


import React, {useEffect} from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Box, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getTypes} from "../../../services/typeService.js";
import {getServices} from "../../../services/serviceService.js";

export default function Extended({setService}) {
    const dispatch = useDispatch();

    const handleCheckboxChange = (event) => {
        const checkedService = event.target.name;
        if (event.target.checked) {
            setService((prevService) => [...prevService, checkedService]);
        } else {
            setService((prevService) =>
                prevService.filter((item) => item !== checkedService)
            );
        }
    };

    const types = useSelector((state) => {
        return state.type.type;
    });

    const services = useSelector((state) => {
        return state.service.service;
    });

    const handleClickService = (id) => {
        dispatch(getServices(id));

    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);


    if (!types) {
        return null;
    }

    return (
        <>
            <FormGroup sx={{paddingLeft: "10px"}}>
                {types &&
                    types.map((item) => (
                        <div key={item.id}>
                            <h2 onClick={() => handleClickService(item.id)} style={{cursor: "pointer"}}>{item.type}</h2>
                        </div>

                    ))}

                <Box sx={{display: "flex", flexDirection: "column", paddingLeft: "20px"}}>
                    {services.map((service) => (
                        <FormControlLabel
                            key={service.id}
                            control={
                                <Checkbox
                                    onChange={handleCheckboxChange}
                                    name={service.name}
                                    checked={Array.isArray(setService) && setService.includes(service.name)}
                                />
                            }
                            label={service.name}
                        />
                    ))}
                </Box>
            </FormGroup>
        </>
    );
}