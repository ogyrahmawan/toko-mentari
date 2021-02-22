import {useState, useEffect} from 'react'
import firebase from '../firebase/config'
import 'firebase/storage'
interface IProp {
  product: any
  handleShow: () => void
}
const ProductCard:React.FC<IProp> = ({product, handleShow}) => {
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
  const handleDelete = (id:number) => {
    
  }
  return (
    <div onClick={handleShow} className="product-card d-flex shadow">
      <div className="card-image">
        <img src={productImage} alt={`gambar ${product.id}`}></img>
      </div>
      <div className="card-detail">
        <div>
          <h5>{product.name}</h5>
          <p>{product.price}</p>
        </div>
        <div onClick={() => handleDelete(product.id)} className="btn-delete">
          <i className="fas fa-trash"></i>
        </div>
      </div>
    </div>
  )
}

export default ProductCard