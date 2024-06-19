import React from 'react'
import InputField from '../components/InputField'

function JobPostingData({handleChange}) {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
    const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
    const SevenDaysAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
    const ThirtyDaysAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);

  return (
    <div>
      <h4 className='text-lg font-medium mb-2 '>Data of posting</h4>
      <div>
      <label className='sidebar-label-container'>
            <input type="radio" name='test' id='test' value="" onChange={handleChange}/>
            <span className='checkmark'></span>All Time
        </label>
       <InputField handleChange={handleChange} value={twentyFourHoursAgoDate} title="Last 24 Hours" name="test"/>
       <InputField handleChange={handleChange} value={SevenDaysAgoDate} title="Last 7 Days" name="test"/>
       <InputField handleChange={handleChange} value={ThirtyDaysAgoDate} title="Last Month" name="test"/>
       

      </div>
    </div>
  )
}

export default JobPostingData
