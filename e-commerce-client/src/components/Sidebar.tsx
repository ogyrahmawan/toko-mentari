import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {fetchCategoriesAction} from '../redux/actions/CategoryActons'
import {RootState} from '../redux/store'
interface Iprop {
  sidebarStatus?: boolean
}

const Sidebar: React.FC<Iprop> = ({sidebarStatus}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {data} = useSelector((state: RootState) => state.category)
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    dispatch(fetchCategoriesAction())
  }
  const logout = () => {
    localStorage.clear()
    history.push('/login')
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
              <li key={item.id}>{item.name}</li>
            ))
          }
          <li>Add Category</li>
          <li>Add Banner</li>
        </ul>
        <button onClick={logout} className="btn btn-danger mt-5">Logout</button>
      </div>
    </div>
  ) 
}

export default Sidebar