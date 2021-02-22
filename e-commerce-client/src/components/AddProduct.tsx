import React, {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import firebase from '../firebase/config'
import 'firebase/storage'
import {fetchCategoriesAction} from '../redux/actions/CategoryActons'
import {RootState} from '../redux/store'
import { addProduct } from '../redux/actions/ProductAction'


const AddProduct:React.FC = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formInput, setFormInput] = useState({
      image: '',
      name: '',
      price: 0,
      categoryName: ''
  })
  const [productFile, setProductFile] = useState('')
  const {data} = useSelector((state: RootState) => state.category)
  
  useEffect(() => {
      fetchCategories()
  }, [])
  const fetchCategories = () => {
      dispatch(fetchCategoriesAction())
  }
  const handleUpload = (e: any) => {
    setFormInput({...formInput, image: e.target.files[0].name})
    let storageRef= firebase.storage().ref(`images/${e.target.files[0].name}`)
    storageRef.put(e.target.files[0])
  }
  const handleUploadFile = (e: any) => {
    setProductFile(e.target.files[0].name)
    let storageRef= firebase.storage().ref(`${formInput.name}`)
    storageRef.put(e.target.files[0])
  }
// 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormInput({...formInput, [e.target.name]: e.target.value })
  }

  const handleSubmit =  (e: any) => {
    e.preventDefault()
    dispatch(addProduct(formInput))
    handleClose()
  }
  return (
    <>
      <div className="btn-add" onClick={handleShow}>
        +
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
              <div className="form-group">
                  <label>Image URL</label>
                  <input onChange={handleUpload} name="image" className="form-control" type="file"></input>
              </div>
              <div className="form-group">
                  <label>Product File</label>
                  <input onChange={handleUploadFile} name="productFile" className="form-control" type="file"></input>
              </div>
              <div className="form-group">
                  <label>Name</label>
                  <input onChange={handleChange} name="name" className="form-control" type="text"></input>
              </div>  
              <div className="form-group">
                  <label>Price</label>
                  <input onChange={handleChange} name="price" className="form-control" type="number"></input>
              </div>
              <div className="form-group">
                  <label>Category</label>
                  <select onChange={handleChange} className="form-control" name="categoryName">
                    <option>select</option>
                    {
                      data.map((item:any) => (
                        <option >{item.name}</option>
                      ))
                    }
                  </select>
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
              Close
              </Button>
              <Button variant="primary" type="submit">
              Save Changes
              </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
  
  export default AddProduct