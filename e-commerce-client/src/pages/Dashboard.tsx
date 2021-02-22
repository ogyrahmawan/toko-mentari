import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useEffect, useState} from 'react'
import AddProduct from '../components/AddProduct'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { fetchCategoriesAction } from '../redux/actions/CategoryActons'
import { fetchProductAction } from '../redux/actions/ProductAction'
import ProductCard from '../components/ProductCard'
import EditProduct from '../components/EditProduct'

const Dashboard: React.FC = () => {
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
    <div className="dashboard-page">
      <Navbar setSidebarStatus={handleSidebarStatus}></Navbar>
      <div className="dashboard-content d-flex">
        <Sidebar sidebarStatus={sidebarStatus}></Sidebar>
        <div className="content-section">
          <div className="row">
            {
              data.map(product => (
                <div className="col-md-5 col-sm-12">
                  <EditProduct product={product}></EditProduct>
                </div>
              ))
            }
          </div>
          <AddProduct></AddProduct>
        </div>
      </div>
    </div>
  )
}
export default Dashboard