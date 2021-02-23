import {useState, useEffect} from 'react'
import firebase from '../firebase/config'
import 'firebase/storage'
import { useDispatch } from 'react-redux'
import { addProductToCartActions } from '../redux/actions/CartActions'
interface IProp {
  product?: any
}
const ProductList:React.FC<IProp> = ({product}) => {
  const dispatch = useDispatch()
  const [productImage, setProductImage] = useState("")
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
  const addToCart = (id: number) => {
    dispatch(addProductToCartActions(id))
  }
  return (
    <div className="card shadow">
      <div className="card-image">
        <img src={productImage} alt={`gambar ${product.id}`}></img>
      </div>
      <div className="card-detail">
        <div>
          <h5>{product.name}</h5>
          <p>{product.price}</p>
        </div>
        <button onClick={() => addToCart(product.id)}>add to cart</button>
      </div>
    </div>
  )
}

export default ProductList