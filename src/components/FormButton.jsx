import React from 'react'

const FormButton = ({text,onClick}) => {
  return (
    <div>
        <button className="styled-button" onClick={onClick}>{text}</button>
    </div>
  )
}

export default FormButton