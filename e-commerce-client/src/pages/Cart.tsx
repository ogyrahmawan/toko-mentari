import {useEffect, useState} from 'react'
import SidebarCustomer from "../components/SidebarCustomer"
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { fetchCartActions } from '../redux/actions/CartActions'
import CartProduct from '../components/CartProduct'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
const CartPage:React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [token, setToken] = useState('')
  const [sidebarStatus, setSidebarStatus] = useState(false)
  const {data} = useSelector((state: RootState) => state.cart)
  let unpaidCart = data.filter((item:any) => item.status === 'unpaid')
  const [invoice, setInvoice] = useState('')
  useEffect(() => {
    fetchCart()
  }, [])
  useEffect(() => {
    if(invoice) {
      window.location.assign(invoice)
    }
  }, [invoice])
  const handleSidebarStatus = () => {
    setSidebarStatus(!sidebarStatus)
  }
  const fetchCart = () => {
    dispatch(fetchCartActions())
  }
  const totalPrice = () => {
    let totalPrice = 0
    for(let i = 0; i < unpaidCart.length; i++) {
      totalPrice += unpaidCart[i].Product.price
    }
    return totalPrice
  }
  const checkout = () => {

    axios({
      url: '/cart/checkout',
      method: 'POST',
      headers: {
        access_token: localStorage.access_token
      },
      data: {
        cartData: data,
        email:"ogyrahmawan@gmail.com",
        totalPrice: totalPrice()
      }
    })
      .then(res => {
        setInvoice(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="cart-page">
      <Navbar setSidebarStatus={handleSidebarStatus}></Navbar>
      <div className="dashboard-content d-flex">
        <SidebarCustomer sidebarStatus={sidebarStatus}></SidebarCustomer>
        <div className="content-section d-flex justify-content-between">
          <div className="row">
            {
              unpaidCart.map((item:any) => (
                <div className="col-md-6 col-sm-12">
                  <CartProduct product={item.Product}></CartProduct>
                </div>
              ))
            }
            <div className="checkout-card col-md-4 col-sm-12">
              <h5>Ringkasan Belanja</h5>
              <p>{`total harga ${totalPrice()}`}</p>
              <button onClick={() => checkout()}>checkout</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CartPage