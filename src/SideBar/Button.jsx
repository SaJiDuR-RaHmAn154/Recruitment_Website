import React from 'react'
import "./Button.css"

const Button = ({onClickHandler,value,title}) => {
  return (
    <button onClick={onClickHandler} value={value} className='btn px-2 py-1 mr-1 text-primary font-semi-bold'>{title}</button>
  )
}

export default Button
