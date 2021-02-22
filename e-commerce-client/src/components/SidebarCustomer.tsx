import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCategoriesAction} from '../redux/actions/CategoryActons'
import {RootState} from '../redux/store'
interface Iprop {
  sidebarStatus?: boolean
}

const SidebarCustomer: React.FC<Iprop> = ({sidebarStatus}) => {
  const dispatch = useDispatch()
  const {data} = useSelector((state: RootState) => state.category)
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    dispatch(fetchCategoriesAction())
  }
  return (
    <div className={sidebarStatus ? "sidebar-container-active": "sidebar-container"}>
      <div className="sidebar-header">
        <h5>Hi </h5>
      </div>
      <div className="sidebar-body">
          <li>Cart</li>
          <li>Transaction History</li>
      </div>
    </div>
  ) 
}

export default SidebarCustomer