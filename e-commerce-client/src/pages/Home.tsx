import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import ProductList from '../components/Product'
import SidebarCustomer from "../components/SidebarCustomer"
import { fetchProductAction } from '../redux/actions/ProductAction'
import { RootState } from '../redux/store'
const Home: React.FC = () => {
  const dispatch = useDispatch()
  const {data, loading} = useSelector((state: RootState) => state.product)
  const [sidebarStatus, setSidebarStatus] = useState(false)
  useEffect(() => {
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