import React, {useEffect, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import firebase from '../firebase/config'
import 'firebase/storage'
import {fetchCategoriesAction} from '../redux/actions/CategoryActons'
import {RootState} from '../redux/store'
import {editProductAction } from '../redux/actions/ProductAction'
import ProductCard from './ProductCard'

interface Iprop {
  product: any
}
const EditProduct:React.FC<Iprop> = ({product}) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formInput, setFormInput] = useState({
    id: product.id,
    image: product.image_url,
    name: product.name,
    price: product.price,
    categoryName: product.Category.name
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
    dispatch(editProductAction(formInput))
    handleClose()
  }
  return (
    <>
    <ProductCard product={product} handleShow={handleShow}></ProductCard>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Product</Modal.Title>
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
                  <input onChange={handleChange} value={formInput.name} name="name" className="form-control" type="text"></input>
              </div>  
              <div className="form-group">
                  <label>Price</label>
                  <input onChange={handleChange} value={formInput.price} name="price" className="form-control" type="number"></input>
              </div>
              <div className="form-group">
                  <label>Category</label>
                  <select onChange={handleChange} value={formInput.categoryName} className="form-control" name="categoryName">
                    <option>select</option>
                    {
                      data.map((item:any) => (
                        <option key={item.id} >{item.name}</option>
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
  
  export default EditProduct