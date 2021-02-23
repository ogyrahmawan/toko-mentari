import {useEffect, useState} from 'react'
import SidebarCustomer from "../components/SidebarCustomer"
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { fetchCartActions } from '../redux/actions/CartActions'
import CartProduct from '../components/CartProduct'



const TransactionHistory:React.FC = () => {
  const dispatch = useDispatch()

  const {data} = useSelector((state: RootState) => state.cart)
  const [sidebarStatus, setSidebarStatus] = useState(false)
  let paidCart = data.filter((item:any) => item.status === 'paid')
  console.log(data, paidCart                                                                                                                      )
  useEffect(() => {
    fetchCart()
  }, [])
  const handleSidebarStatus = () => {
    setSidebarStatus(!sidebarStatus)
  }
  const fetchCart = () => {
    dispatch(fetchCartActions())
  }
  return (
    <div className="cart-page">
      <Navbar setSidebarStatus={handleSidebarStatus}></Navbar>
      <div className="dashboard-content d-flex">
        <SidebarCustomer sidebarStatus={sidebarStatus}></SidebarCustomer>
        <div className="content-section d-flex justify-content-between">
          <div className="row">
            {
              paidCart.map((item:any) => (
                <div className="col-md-12">
                  <CartProduct product={item.Product}></CartProduct>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory