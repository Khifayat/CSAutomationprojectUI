import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import '../css/PostFormModal.css'
import postFunctions from '../services/dbservices/postservices/PostFunctions';

function PostForm() {
    //post DTO
    const post = {
        title: "",
        description: "",
        imgURL: ""
    }
    //there is a better way, but i dont have time to figure it
    const [postTitle, setPostTitle] = useState()
    const [postDescription, setPostDescription] = useState()
    const [postImgURL, setPostImgURL] = useState()
    const [validated, setValidated] = useState(false)
    
    const handleTitleChange = (e) => setPostTitle(e.target.value)
    const handleDescriptionChange = (e) => setPostDescription(e.target.value)
    const handleImageChange = (e) => setPostImgURL(e.target.value)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        post.title = postTitle
        post.imgURL = postImgURL
        post.description = postDescription
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
        handleClose()
        await postFunctions.addPost(post, "")
            .catch(function (error) {
                if (error) {
                    console.log(error)
                } else {
                    setPostDescription("")
                    setPostImgURL("")
                    setPostTitle("")
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
                            <Form.Control pattern="\s*(\S\s*){6,}" required type="text" onChange={handleTitleChange} value={postTitle} placeholder="Event Title" className='input-field' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Description</Form.Label>
                            <Form.Control pattern="\s*(\S\s*){6,}" required as="textarea" onChange={handleDescriptionChange} value={postDescription} placeholder="Description" className='input-field' size='lg' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Image URL</Form.Label>
                            <Form.Control type="text" onChange={handleImageChange} value={postImgURL} placeholder="Image URL" className='input-field' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Address/Room Number</Form.Label>
                            <Form.Control pattern="\s*(\S\s*){6,}" required type="text" onChange={handleTitleChange} value={postTitle} placeholder="Room Number" className='input-field' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Date</Form.Label>
                            <Form.Control pattern="\s*(\S\s*){6,}" required type="text" onChange={handleTitleChange} value={postTitle} placeholder="Event Date" className='input-field' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='form-label'>Start Time</Form.Label>
                            <Form.Control pattern="\s*(\S\s*){6,}" required type="number" onChange={handleTitleChange} value={postTitle} placeholder="Start Time" className='input-field' />
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