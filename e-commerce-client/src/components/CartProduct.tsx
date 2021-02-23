import {useState, useEffect} from 'react'
import firebase from '../firebase/config'
import 'firebase/storage'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { removeCartActions } from '../redux/actions/CartActions'
interface IProp {
  product?: any
}
const CartProduct:React.FC<IProp> = ({product}) => {
  const location = useLocation().pathname
  const [productImage, setProductImage] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    if(product.image_url) {
      downloadImage(product.image_url )
    }
  }, [])
  const downloadImage = (imageName:string) => {
    let storage = firebase.storage();
    let storageRef = storage.ref();  
    storageRef.child(`images/${imageName}`).getDownloadURL()
    .then(url => {
      setProductImage(url)
    })
  }
  const downloadFile = () => {
    let storage = firebase.storage();
    let storageRef = storage.ref();  
    storageRef.child(product.name).getDownloadURL()
    .then(res => {
      window.open(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handleDelete = (id:number) => {
    dispatch(removeCartActions(id))
  }
  return (
    <div className="product-card d-flex shadow">
      <div className="card-image">
        <img src={productImage} alt={`gambar ${product.id}`}></img>
      </div>
      <div className="card-detail">
        <div>
          <h5>{product.name}</h5>
          <p>{product.price}</p>
        </div>
        {
          location === '/cart' ?
          <div onClick={() => handleDelete(product.id)} className="btn-delete">
            <i className="fas fa-trash"></i>
          </div>
          :
          <button onClick={downloadFile}>download</button>
        }
      </div>
    </div>
  )
}

export default CartProduct