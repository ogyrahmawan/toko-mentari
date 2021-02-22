import { useState } from "react"

interface Props {
  setSidebarStatus: () => void
}
const Navbar: React.FC<Props> = ({setSidebarStatus}) => {
  const [menuBarToggle, setMenuBarToggle] = useState(false)
  
  const hamburgerClickHandle = () => {
    setMenuBarToggle(!menuBarToggle)
    setSidebarStatus()
  }
  return (
    <>
    <nav className="navbar">
      <h5>Mentari Store</h5>
      <div onClick={() => hamburgerClickHandle()} className="hamburger-btn">
        <div className={menuBarToggle ? `bar1change`: `bar1`}></div>
        <div className={menuBarToggle ? `bar2change`: `bar2`}></div>
        <div className={menuBarToggle ? `bar3change`: `bar3`}></div>
      </div>

    </nav>
    </> 
  )
}

export default Navbar