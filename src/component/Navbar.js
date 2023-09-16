// import all the importent file and modules
import './Navbar.css'
function Navbar({setCurrentPage}){
    return(
        <>
        <div className='nav-container'>
        <div className='navbar'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWQB_GPndBrqQOCcvuj6_CMEcgITH_MDkxA&usqp=CAU' 
            className='nav-img' alt='navbar-logo' setCurrentPage={()=>setCurrentPage('main')} />
            <h3 className='nav-icon' setCurrentPage={()=>setCurrentPage('main')}>PhotoPholio</h3>
        </div>
        </div>
        </>
    )
}

export default Navbar