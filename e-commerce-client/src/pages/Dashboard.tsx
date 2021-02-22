import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useState} from 'react'
import AddProduct from '../components/AddProduct'

const Dashboard: React.FC = () => {
  const [sidebarStatus, setSidebarStatus] = useState(false)
  const handleSidebarStatus = () => {
    setSidebarStatus(!sidebarStatus)
  }
  return (
    <div className="dashboard-page">
      <Navbar setSidebarStatus={handleSidebarStatus}></Navbar>
      <div className="dashboard-content">
        <Sidebar sidebarStatus={sidebarStatus}></Sidebar>
        <div className="content-section">
          <AddProduct></AddProduct>
        </div>
      </div>
    </div>
  )
}
export default Dashboard