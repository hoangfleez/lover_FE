import React, { useEffect, useState } from "react";
import { addBooking } from "../../services/bookingService.js";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid, MenuItem, Select, Stack } from "@mui/material";

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
    console.log(data);
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Đã thuê! Vui lòng chờ người cho thuê phản hồi.",
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: "swal2-show",
        },
        onOpen: () => {
          const swalContainer = document.querySelector(".swal2-container");
          if (swalContainer) {
            swalContainer.style.zIndex = "100";
          }
        },
      });
      handleClose(false);
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
      const cost = parseFloat(selectedOption) * parseFloat(dataProvider.price);
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
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="1">1 giờ</MenuItem>
                    <MenuItem value="2">2 giờ</MenuItem>
                    <MenuItem value="3">3 giờ</MenuItem>
                    {/* Rest of the options */}
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
              {scriptLoaded && (
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <Box>
                      <input
                        className="form-control"
                        {...getInputProps()}
                        onChange={handleAddressChange}
                      />
                      <ul>
                        {loading ? <Box>Loading...</Box> : null}
                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active
                              ? "#41b6e6"
                              : "#fff",
                          };
                          return (
                            <li
                              key={suggestion.placeId}
                              {...getSuggestionItemProps(suggestion, {
                                style,
                              })}
                            >
                              {suggestion.description}
                            </li>
                          );
                        })}
                      </ul>
                    </Box>
                  )}
                </PlacesAutocomplete>
              )}
            </div>
            <textarea name="" id="" cols="30" rows="10" style={{resize: "none", padding:"5px"}} placeholder="Hãy nhắn gì đó ...." ></textarea>
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
