import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addBooking } from "../../services/bookingService.js";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

const Rent = (props) => {
    const dispatch = useDispatch();
    const { show, handleClose, dataProvider } = props;
    const [address, setAddress] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [rent, setRent] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const handleRentProvider = async () => {
        const newRent = {
            address: address,
            selectedOption: selectedOption,
        };
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
        if (show) {
            // Load the Google Maps API script when the modal is shown
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
            script.onload = () => setScriptLoaded(true);
            document.body.appendChild(script);
        }
    }, [show]);

    useEffect(() => {
        if (selectedOption && dataProvider.price) {
            const cost =
                parseFloat(selectedOption) * parseFloat(dataProvider.price);
            setTotalCost(cost);
        }
    }, [selectedOption, dataProvider.price]);

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

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
                        {scriptLoaded && (
                            <PlacesAutocomplete
                                value={address}
                                onChange={setAddress}
                                onSelect={handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            className="form-control"
                                            {...getInputProps()}
                                            onChange={handleAddressChange}
                                        />
                                        <ul>
                                            {loading ? <div>Loading...</div> : null}
                                            {suggestions.map((suggestion) => {
                                                const style = {
                                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                                };
                                                return (
                                                    <li
                                                        key={suggestion.placeId}
                                                        {...getSuggestionItemProps(suggestion, { style })}
                                                    >
                                                        {suggestion.description}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        )}
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