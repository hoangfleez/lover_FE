import React, { useEffect, useState } from "react";
import { addBooking } from "../../services/bookingService.js";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid, MenuItem, Select, Stack } from "@mui/material";
import SelectAddress from "./SelectAddress.jsx";
import { apiGetDistrict, apiGetProvinces } from "../../services/googleMapService.js";

const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "customColorSchemes.backgroundColor",
    boxShadow: 24,
    borderRadius: "15px",
};

const Rent = (props) => {
    const dispatch = useDispatch();
    const { show, handleClose, dataProvider } = props;
    const [selectedOption, setSelectedOption] = useState("");
    const [rent, setRent] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [address, setAddress] = useState({ province: "", district: "" });
    const [provinceName, setProvinceName] = useState("");

    const handleRentProvider = async () => {
        const newRent = {
            address: `${provinceName} - ${address.district}`,
            selectedOption: selectedOption,
        };
        setRent(newRent);
        let data = await dispatch(addBooking({ providerId: dataProvider.id, bookingData: newRent }));

        if (data) {
            Swal.fire({
                icon: "success",
                title: "Đã thuê! Vui lòng chờ người cho thuê phản hồi.",
                showConfirmButton: false,
                timer: 3000,
            });
            handleClose(false);
        } else {
            // Handle error case if necessary
        }
    };

    useEffect(() => {
        if (selectedOption && dataProvider.price) {
            const cost = parseFloat(selectedOption) * parseFloat(dataProvider.price);
            setTotalCost(cost);
        }
    }, [selectedOption, dataProvider.price]);

    const apiGoogle = useSelector((state) => state.booking.apiG.results);
    const idProvince = `${address.province}`;
    const filteredProvinces =
        apiGoogle &&
        apiGoogle.filter((item) => item.province_id === idProvince);

    useEffect(() => {
        if (filteredProvinces && filteredProvinces.length > 0) {
            setProvinceName(filteredProvinces[0].province_name);
        }
    }, [filteredProvinces]);

    const apiDistrict = useSelector((state) => state.booking.apiGoogle.results);

    useEffect(() => {
        dispatch(apiGetProvinces());
    }, [dispatch]);

    useEffect(() => {
        if (address.province) {
            dispatch(apiGetDistrict(address.province));
        }
    }, [dispatch, address.province]);

    return (
        <>
            <Modal
                keepMounted
                open={show}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Stack p={2} alignItems={"center"}>
                        <Typography variant="h6" id="modal-title">
                            THUÊ NGƯỜI YÊU
                        </Typography>
                    </Stack>
                    <Divider />
                    <Stack p={2} direction={"column"}>
                        <Grid container rowSpacing={1}>
                            <Grid item xs={8}>
                                <Typography variant="body1" gutterBottom>
                                    Tên:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom>
                                    {dataProvider.name}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container rowSpacing={1}>
                            <Grid item xs={8}>
                                <Typography variant="body1" gutterBottom>
                                    Thời gian muốn thuê
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom>
                                    <Select
                                        fullWidth
                                        padding={"none"}
                                        value={selectedOption}
                                        onChange={(event) => setSelectedOption(event.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Chọn thời gian</em>
                                        </MenuItem>
                                        <MenuItem value="1">1 giờ</MenuItem>
                                        <MenuItem value="2">2 giờ</MenuItem>
                                        <MenuItem value="3">3 giờ</MenuItem>
                                        <MenuItem value="4">4 giờ</MenuItem>
                                        <MenuItem value="5">5 giờ</MenuItem>
                                        <MenuItem value="6">6 giờ</MenuItem>
                                        <MenuItem value="7">7 giờ</MenuItem>
                                        <MenuItem value="8">8 giờ</MenuItem>
                                        <MenuItem value="9">9 giờ</MenuItem>
                                        <MenuItem value="10">10 giờ</MenuItem>
                                        <MenuItem value="11">11 giờ</MenuItem>
                                        <MenuItem value="12">12 giờ</MenuItem>
                                        <MenuItem value="13">13 giờ</MenuItem>
                                        <MenuItem value="14">14 giờ</MenuItem>
                                        <MenuItem value="15">15 giờ</MenuItem>
                                        <MenuItem value="16">16 giờ</MenuItem>
                                        <MenuItem value="17">17 giờ</MenuItem>
                                        <MenuItem value="18">18 giờ</MenuItem>
                                        <MenuItem value="19">19 giờ</MenuItem>
                                        <MenuItem value="20">20 giờ</MenuItem>
                                        <MenuItem value="21">21 giờ</MenuItem>
                                        <MenuItem value="22">22 giờ</MenuItem>
                                        <MenuItem value="23">23 giờ</MenuItem>
                                        <MenuItem value="24">24 giờ</MenuItem>
                                    </Select>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container rowSpacing={1}>
                            <Grid item xs={8}>
                                <Typography variant="body1" gutterBottom>
                                    Chi phí:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" gutterBottom>
                                    {totalCost}
                                </Typography>
                            </Grid>
                        </Grid>
                        <div className="body-add-new">
                            <label className="form-label">Địa điểm</label>
                            <div className="flex-semibold text-xl py-4">
                                <SelectAddress
                                    type="province"
                                    value={address.province}
                                    setValue={(value) => setAddress({ ...address, province: value })}
                                    options={apiGoogle}
                                    label="Tỉnh/Thành phố"
                                />
                                <SelectAddress
                                    type="district"
                                    value={address.district}
                                    setValue={(value) => setAddress({ ...address, district: value })}
                                    options={apiDistrict}
                                    label="Quận/Huyện"
                                />
                            </div>
                        </div>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            style={{ resize: "none", padding: "5px" }}
                            placeholder="Hãy nhắn gì đó ...."
                        ></textarea>
                    </Stack>
                    <Divider />
                    <Box
                        sx={{
                            p: 2,
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRentProvider}
                            sx={{
                                bgcolor: "red",
                                color: "white",
                                "&:hover": {
                                    bgcolor: "red",
                                    color: "white",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Thuê
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            sx={{
                                bgcolor: "#d4d4d5",
                                "&:hover": {
                                    bgcolor: "#d4d4d5",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Đóng
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default Rent;
