import React from 'react'
import InputField from '../components/InputField'

function EmploymentType({handleChange}) {
  return (
    <div>
    <h4 className='text-lg font-medium mb-2 '>Type of Employment</h4>
    <div>
    <label className='sidebar-label-container'>
          <input type="radio" name='test5' id='test5' value="" onChange={handleChange}/>
          <span className='checkmark'></span>Any Experience
      </label>
     <InputField handleChange={handleChange} value="full-time" title="Full-time" name="test5"/>
     <InputField handleChange={handleChange} value="temporary" title="Temporary" name="test5"/>
     <InputField handleChange={handleChange} value="Part-time" title="Part-time" name="test5"/>
     

    </div>
  </div>
  )
}

export default EmploymentType
