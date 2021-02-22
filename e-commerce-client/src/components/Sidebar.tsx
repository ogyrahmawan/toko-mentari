import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCategoriesAction} from '../redux/actions/CategoryActons'
import {RootState} from '../redux/store'
interface Iprop {
  sidebarStatus?: boolean
}

const Sidebar: React.FC<Iprop> = ({sidebarStatus}) => {
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
        <h5>Hi Admin</h5>
      </div>
      <div className="sidebar-body">
        <h5>Product</h5>
        <ul>
          <li>all</li>
          {
            data.map((item:any) => (
              <li>{item.name}</li>
            ))
          }
          <li>Add Category</li>
          <li>Add Banner</li>
        </ul>
      </div>
    </div>
  ) 
}

export default Sidebar