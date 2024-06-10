import React from 'react'
import loading from '../loading.gif'
 const Spinner=()=> {
  
    return (
      <div className='text-center auto-x'>
        <img className='my-5' src={loading}  alt="loading" height="50px" width="50px"/>
      </div>
    )
  }


export default Spinner;