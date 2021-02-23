import { useState, useEffect } from 'react'   
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { Login } from '../redux/actions/UserActions'
import { RootState } from '../redux/store'
import axios from '../axios/config'
import firebase from '../firebase/config'
import { SET_LOGIN_ERROR, SET_LOGIN_SUCCESS } from '../redux/types'
import RegisterPhoneNumber from '../components/RegisterWithPhoneNumber'
const RegisterPage: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [formInput, setFormInput] =  useState({
    email: '',
    password: ''
  })
  const {success, userData, error, loading} = useSelector((state:RootState) => state.user)
  useEffect(() => {
    if(success && userData === 'admin@mail.com') {
      history.push('/dashboard')
    } else if(success) {
      history.push('/')
    }
  }, [success, history])
  function handleChange (e: React.ChangeEvent<HTMLInputElement>) :void {
    setFormInput({...formInput, [e.target.name]: e.target.value})
  }

  function register (e:any) {
    e.preventDefault()
    axios({
      url: '/register',
      method: 'POST',
      data: formInput
    })
      .then(res => {
        history.push('/login')
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  return (
    <div className="container_login">
      <div className="container_login d-flex justify-content-center">
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
            </div>
            <form onSubmit={register} >
              <div className="input-group mt-5 mb-3">
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                <input onChange={handleChange} name="email" type="email" className="form-control input_user"  placeholder="email" required />
              </div>
              <div className="input-group mb-2">
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input onChange={handleChange} name="password" type="password"  className="form-control input_pass"  placeholder="password" required />
              </div>
              <Link to="/login">
                <span className="text-white ">Alreadt have account? Sign in</span>
              </Link>
              <button type="submit" name="button" className="btn btn-login mt-4">Register</button>
            </form>
          </div>
          <RegisterPhoneNumber></RegisterPhoneNumber>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage