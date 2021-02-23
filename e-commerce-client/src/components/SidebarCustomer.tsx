import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import {fetchCategoriesAction} from '../redux/actions/CategoryActons'
import {RootState} from '../redux/store'
interface Iprop {
  sidebarStatus?: boolean
}

const SidebarCustomer: React.FC<Iprop> = ({sidebarStatus}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {data} = useSelector((state: RootState) => state.category)
  useEffect(() => {
    fetchCategories()
  }, [])
  const logout = () => {
    localStorage.clear()
    history.push('/login')
  }
  const fetchCategories = () => {
    dispatch(fetchCategoriesAction())
  }
  return (
    <div className={sidebarStatus ? "sidebar-container-active": "sidebar-container"}>
      <div className="sidebar-header">
      </div>
      <div className="sidebar-body">
        <NavLink to="/">
          <li>Product</li>
        </NavLink>
        <li>
        <NavLink to="cart">
            Cart
        </NavLink>
        </li>
        <li>
          <NavLink to="transaction">
            Transaction History
          </NavLink>
        </li>
      </div>
      <button onClick={logout} className="btn btn-danger mt-5">Logout</button>
    </div>
  ) 
}

export default SidebarCustomer