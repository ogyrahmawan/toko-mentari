import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import Navbar from "../components/Navbar"
import ProductList from '../components/Product'
import SidebarCustomer from "../components/SidebarCustomer"
import { fetchProductAction } from '../redux/actions/ProductAction'
import { RootState } from '../redux/store'
import CartPage from './Cart'
import TransactionHistory from './TransactionHistory'
const Home: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {data, loading} = useSelector((state: RootState) => state.product)
  const [sidebarStatus, setSidebarStatus] = useState(false)
  useEffect(() => {
    if(!localStorage.access_token) {
      history.push('/login')
    }
    fetchProduct()
  }, [])
  
  const handleSidebarStatus = () => {
    setSidebarStatus(!sidebarStatus)
  }
  const fetchProduct = () => {
    dispatch(fetchProductAction())
  }
  return (
    <div className="home-page">
      <Navbar setSidebarStatus={handleSidebarStatus}></Navbar>
      <div className="dashboard-content d-flex">
        <SidebarCustomer sidebarStatus={sidebarStatus}></SidebarCustomer>
        <div className="content-section">
          <div className="row">
            {
              data.map(product => (
                <div className="col-md-4 col-sm-12">
                  <ProductList product={product}></ProductList>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home