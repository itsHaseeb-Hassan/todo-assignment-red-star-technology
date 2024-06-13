import React from 'react'

const FormInput = ({label,type,placeholder,onChange,value,name}) => {
  return (
    <>
        <div className="input-container">
            <label className='label'>{label}</label>
        <input type={type} className="styled-input" placeholder={placeholder} name={name} value={value} onChange={onChange}/>
    </div>
    </>
  )
}

export default FormInput