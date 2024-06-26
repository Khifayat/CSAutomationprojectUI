import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../css/PostFormModal.css';
import postFunctions from '../services/dbservices/postservices/PostFunctions';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addEvent } from '../services/dbservices/eventservices/eventFunctions';

function PostForm() {
    //post DTO
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"))
    const post = {
        title: "",
        description: "",
        imgURL: "",
        location: {
            roomNumber: ""
        },
        startDate: "",
        startTime: "",
    }
    //there is a better way, but i dont have time to figure it
    const [selectedTime, setSelectedTime] = useState(null)
    const [postTitle, setPostTitle] = useState()
    const [postDescription, setPostDescription] = useState()
    const [postImgURL, setPostImgURL] = useState()
    const [validated, setValidated] = useState(false)
    const [startHour, setStartHour] = useState("")
    const [startMin, setStartMin] = useState("")
    const [roomNumber, setRoomNumber] = useState()
    const [selectedDate, setSelectedDate] = useState(null)

    const handleTitleChange = (e) => setPostTitle(e.target.value)
    const handleDescriptionChange = (e) => setPostDescription(e.target.value)
    const handleImageChange = (e) => setPostImgURL(e.target.value)
    const handleRoomChange = (e) => setRoomNumber(e.target.value)
    const handleMinChange = (e) => setStartMin(e.target.value)
    const handleHourChange = (e) => setStartHour(e.target.value)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        post.title = postTitle
        post.imgURL = postImgURL
        post.description = postDescription
        console.log(post)
        post.startDate = selectedDate
        post.startTime = new Date(0, 0, 0, startHour, startMin, 0)
        post.location.roomNumber = roomNumber
        console.log(post)
        setShow(false);
    }

    async function handleAddPost(event) {
        //check if form is valid
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        event.preventDefault()
        handleClose()
        await addEvent(post, loggedInUser.userId)
            .catch(function (error) {
                if (error) {
                    console.log(error)
                } else {
                    window.location.reload()
                }
            })
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='add-post-button' >
                Add New Event
            </Button>

            <Modal
                show={show} className='my-modal'
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                validationPost={post}
            >
                <Modal.Header closeButton color='red'>
                    <Modal.Title>New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={validated} onSubmit={handleAddPost}>
                        <Form.Group>
                            <Form.Label className='form-label'>Title</Form.Label>
                            <Form.Control required type="text" onChange={handleTitleChange} value={postTitle} placeholder="Event Title" className='input-field' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Description</Form.Label>
                            <Form.Control required as="textarea" onChange={handleDescriptionChange} value={postDescription} placeholder="Description" className='input-field' size='lg' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Image URL</Form.Label>
                            <Form.Control type="text" onChange={handleImageChange} value={postImgURL} placeholder="Image URL" className='input-field' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Address/Room Number</Form.Label>
                            <Form.Control required type="text" onChange={handleRoomChange} value={roomNumber} placeholder="Room Number" className='input-field' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Date</Form.Label>
                            <br></br>
                            <DatePicker
                                required
                                selected={selectedDate}
                                onChange={date => setSelectedDate(date)}
                                dateFormat='yyyy-MM-dd'
                                minDate={new Date()}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Start Time:</Form.Label>
                            <br />
                            <input required onChange={handleHourChange} type='number' placeholder='hour' size={'50%'} min={0} max={24}></input>
                            <input required onChange={handleMinChange} type='number' placeholder='min' size={'50%'} min={0} max={59}></input>
                        </Form.Group>
                        <br></br>
                        <Modal.Footer>
                            <Button variant="secondary" type='reset' onClick={handleClose} className="cancel-btn">
                                Cancel
                            </Button>
                            <Button variant="primary" type='submit' className="submit-btn">Submit</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PostForm;