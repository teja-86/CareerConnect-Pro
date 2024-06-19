import React from 'react'

function Jobs({result}) {
  return (
    <div>
        <div>
            <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
        </div>
        <section className='card-container'>{result}</section>
    </div>
  )
}

export default Jobs
