import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editUser, showUser} from '../../../services/useService.js';
import {
    Box,
    Button,
    CardMedia,
    Container,
    Stack,
    TextField,
    Modal,
    Backdrop,
    Fade
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './ShowAndEditInfo.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {ref, uploadBytes, getDownloadURL} from "@firebase/storage";
import {storage} from "../../../services/firebase.js";
import {v4} from "uuid";
import { useUserProfile } from '../../../customHook/useUserProfile.js';

const ShowAndEditInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profile = useUserProfile();

    const [formState, setFormState] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        address: '',
        phoneNumber: '',
        email: '',
        identityCard: '',
        avatar: ''
    });
    const [imageUpload, setImageUpload] = useState(null);
    const [tempAvatar, setTempAvatar] = useState("");
    const [open, setOpen] = useState(false);


    const handleOpenModal = () => {
        setOpen(true);
        setTempAvatar(formState.avatar); // Lưu trữ ảnh tạm thời
    };

    const handleCloseModal = () => {
        setOpen(false);
        setTempAvatar(""); // Xóa giá trị của tempAvatar
    };

    const handleSubmitEditProfile = async (event) => {
        alert('Cập nhật thành công');
        event.preventDefault();

        const editProfile = {
            id: userId,
            ...formState
        };

        let res = await dispatch(editUser(editProfile));
    };

    const handleChangeImage = (event) => {
        event.preventDefault();
        if (event.target.files.length === 0) return;

        const image = event.target.files[0];
        const imageRef = ref(storage, `images/${image.name + v4()}`);

        uploadBytes(imageRef, image)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                setTempAvatar(url);
            })
            .catch((error) => {
                // Handle any error occurred during image upload
                console.log(error);
            });
    };



    const handleSaveImage = async () => {
        let res = await dispatch(editUser({...formState, avatar: tempAvatar}));
        if (res.error) {

        } else {
            setFormState({...formState, avatar: tempAvatar}); // Update the formState with the new avatar URL
            handleCloseModal();
        }
    };



    useEffect(() => {
        if (profile) {
            setFormState(profile);
        }
    }, [profile]);

    return (
        <>
            <Box
                sx={{
                    marginTop: '64px',
                    padding: '10px',
                    height: '93vh'
                }}
            >
                <Container maxWidth="lg">
                    <form>
                        {profile && (
                            <Box sx={{display: 'flex', width: '100%', height: '100%'}}>
                                <Box sx={{width: '30%'}}>
                                    <div className="image-container">
                                        <CardMedia
                                            className="hover-image"
                                            component="img"
                                            sx={{width: 250}}
                                            image={formState.avatar}
                                            alt="Avatar"
                                        />
                                        <div className="overlay" onClick={handleOpenModal}>
                                            <FontAwesomeIcon icon={faCamera} size="3x" color="white"
                                                             style={{marginTop: 100}}/>
                                        </div>
                                    </div>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={open}
                                        onClose={handleCloseModal}
                                        closeAfterTransition
                                    >
                                        <Fade in={open}>
                                            <div className="modal-paper" style={{
                                                background: "white",
                                                width: 350,
                                                height: 450,
                                                position: 'absolute',
                                                top: '30%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}>
                                                {tempAvatar && (
                                                    <img src={tempAvatar} alt="Preview"
                                                         style={{
                                                             width: '300px',
                                                             height: '300px',
                                                             objectFit: 'contain',
                                                             margin: "10px 0 0 25px"
                                                         }}/> // set width and height of image to 400px and 300px respectively
                                                )}

                                                <form>
                                                    <div className="mb3">
                                                        <input
                                                            style={{ marginLeft: 10 }}
                                                            id="exampleInput"
                                                            type="file"
                                                            className="form-control"
                                                            accept="image/*"
                                                            onChange={handleChangeImage}
                                                        />
                                                    </div>

                                                </form>

                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: '10px',
                                                    right: '5px',
                                                    width: '100%'
                                                }}>
                                                    <Button variant="contained" onClick={handleSaveImage}
                                                            style={{float: 'right', marginLeft: '10px'}}>
                                                        Lưu
                                                    </Button>
                                                    <Button variant="contained" onClick={handleCloseModal}
                                                            style={{float: 'right'}}>
                                                        Thoát
                                                    </Button>
                                                </div>
                                            </div>
                                        </Fade>
                                    </Modal>
                                </Box>

                                <Box sx={{width: '70%'}}>
                                    <h1>Thông tin tài khoản</h1>
                                    <Box sx={{width: '45ch'}}>
                                        <TextField
                                            sx={{marginTop: 2}}
                                            fullWidth
                                            label="Địa chỉ email"
                                            multiline
                                            defaultValue={formState.email}
                                            onChange={(event) => setFormState({
                                                ...formState,
                                                email: event.target.value
                                            })}
                                        />

                                        <TextField
                                            sx={{marginTop: 3}}
                                            fullWidth
                                            label="Họ"
                                            multiline
                                            defaultValue={formState.firstname}
                                            onChange={(event) => setFormState({
                                                ...formState,
                                                firstname: event.target.value
                                            })}
                                        />
                                        <TextField
                                            sx={{marginTop: 3}}
                                            fullWidth
                                            label="Tên"
                                            multiline
                                            defaultValue={formState.lastname}
                                            onChange={(event) => setFormState({
                                                ...formState,
                                                lastname: event.target.value
                                            })}
                                        />

                                        <TextField
                                            sx={{marginTop: 3}}
                                            fullWidth
                                            label="Địa chỉ"
                                            multiline
                                            defaultValue={formState.address}
                                            onChange={(event) => setFormState({
                                                ...formState,
                                                address: event.target.value
                                            })}
                                        />
                                    </Box>
                                    <Box sx={{width: '45ch', marginTop: 3}}>
                                        <Stack direction="row" spacing={2} sx={{justifyContent: 'space-evenly'}}>
                                            <Button onClick={handleSubmitEditProfile} variant="contained">
                                                Cập nhật
                                            </Button>
                                            <Button variant="contained" onClick={() => navigate('/')}>
                                                Trang chủ
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default ShowAndEditInfo;

