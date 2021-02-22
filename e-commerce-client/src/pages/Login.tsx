import { useState } from 'react'   
import { useEffect } from 'react-bootstrap/node_modules/@types/react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Login } from '../redux/actions/UserActions'
import { RootState } from '../redux/store'

const LoginPage: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [formInput, setFormInput] =  useState({
    email: '',
    password: ''
  })
  const {success, userData, error, loading} = useSelector((state:RootState) => state.user)
  
  function handleChange (e: React.ChangeEvent<HTMLInputElement>) :void {
    setFormInput({...formInput, [e.target.name]: e.target.value})
  }
  function handleSubmit (e: any) : void {
    e.preventDefault()
    dispatch(Login(formInput))

  }
  return (
    <div className="container_login">
      <div className="container_login d-flex justify-content-center">
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">

            </div>
            <form onSubmit={handleSubmit} >
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
              <div className="form-group">
              </div>
              <button type="submit" name="button" className="btn btn-login mt-4">LOGIN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage