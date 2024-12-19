import React, { useState } from 'react'
import propTypes from "prop-types"
import Header from '../components/Layout/header/Header'
import Policy from '../components/Layout/policy/Policy'
import Footer from '../components/Layout/footer/Footer'
import Search from '../components/Modals/Search'
import Dialog from '../components/Modals/Dialog'

const MainLayout = ({children}) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className='main-layout'>
        <Header setIsShow={setIsShow}/>
        <Search isShow={isShow} setIsShow={setIsShow} />
        <Dialog/>
        {children }
        <Policy/>
        <Footer/>
    </div>
  )
}

export default MainLayout
MainLayout.propTypes = {
  isShow : propTypes.bool,
  setIsShow : propTypes.func
}