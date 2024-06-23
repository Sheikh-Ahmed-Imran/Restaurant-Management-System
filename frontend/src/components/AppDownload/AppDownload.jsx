import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <h3 className='pforbetter'>Sheikh Ahmed <br /> </h3>
        <p>Project Head</p>
        <div className="app-download-platforms">
           {/* <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
  */}
        </div>
    </div>
  )
}

export default AppDownload