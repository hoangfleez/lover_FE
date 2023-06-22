import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addBooking } from "../../services/bookingService.js";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import SelectAddress from "./SelectAddress.jsx";
import { apiGetDistrict, apiGetProvinces } from "../../services/googleMapService.js";

const Rent = (props) => {
    const dispatch = useDispatch();
    const { show, handleClose, dataProvider } = props;
    const [selectedOption, setSelectedOption] = useState("");
    const [rent, setRent] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [address, setAddress] = useState({ province: "", district: "" });

    const handleRentProvider = async () => {
        const newRent = {
            selectedOption: selectedOption,
            address: address,
        };
        console.log(newRent, 666);
        setRent(newRent);
        let data = dispatch(
            addBooking({ providerId: dataProvider.id, bookingData: newRent })
        );

        if (data) {
            Swal.fire({
                icon: "success",
                title: "Đã thuê! Vui lòng chờ người cho thuê phản hồi.",
                showConfirmButton: false,
                timer: 3000,
            });
        } else {
            // Handle failure case
        }
    };

    useEffect(() => {
        if (selectedOption && dataProvider.price) {
            const cost =
                parseFloat(selectedOption) * parseFloat(dataProvider.price);
            setTotalCost(cost);
        }
    }, [selectedOption, dataProvider.price]);

    const apiGoogle = useSelector((state) => {
        return state.booking.apiG.results;
    });
    const apiDistrict = useSelector((state) => {
        return state.booking.apiGoogle.results;
    });

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
            <Modal style={{ marginTop: 100 }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thuê người yêu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">
                            Tên người yêu: {dataProvider.name}
                        </label>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Chi phí: {dataProvider.price}</label>
                    </div>

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

                    <div className="body-add-new">
                        <label className="form-label">Thời gian muốn thuê</label>
                        <select
                            className="form-select"
                            value={selectedOption}
                            onChange={(event) => setSelectedOption(event.target.value)}
                        >
                            <option value="">Chọn thời gian</option>
                            <option value="1">1 giờ</option>
                            <option value="2">2 giờ</option>
                            <option value="3">3 giờ</option>
                            {/* Rest of the options */}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tổng số tiền: {totalCost}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleRentProvider}>
                        Thuê
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Rent;
