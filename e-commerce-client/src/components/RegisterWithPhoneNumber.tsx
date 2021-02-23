import React, {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import firebase from '../firebase/config'
import 'firebase/auth'
import { useHistory } from 'react-router-dom'

const RegisterPhoneNumber:React.FC = () => {
  const history = useHistory()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [phoneNumber, setPhoneNumber] = useState('')
  const setUpRecaptcha = () => {
    (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response: any) => {
        handleSubmit();
      }
    });
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }
  const handleSubmit = () => {
    setUpRecaptcha()  
    const appVerifier = (window as any).recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          (window as any).confirmationResult = confirmationResult;
          const code: any = window.prompt('type otp');
          confirmationResult.confirm(code).then((result) => {
            const user:any = result.user;
            localStorage.setItem('user', user?.phoneNumber)
            history.push('/')
          })
        }).catch((error) => {
          console.log(error)
        });
  }
  return (
    <>
    <button className="btn-danger btn mt-3" onClick={handleShow}>Register With Phone Number</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Register With Phone Number</Modal.Title>
        </Modal.Header>
        <div id="sign-in">
          <Modal.Body>
              <label>Phone Number</label><br></br>
              <input onChange={handleChange} type="text" name="phoneNumber" placeholder="+62xxxx"></input>
          </Modal.Body>
        </div>
        <form>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
              Close
              </Button>
              <Button id="sign-in-button" variant="primary" onClick={handleSubmit}>
              Save Changes
              </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default RegisterPhoneNumber