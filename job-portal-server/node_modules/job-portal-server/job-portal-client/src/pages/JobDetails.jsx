import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import PageHeader from '../components/PageHeader';

function JobDetails() {
    const {id} = useParams();
    const [job, setJob] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/all-jobs/${id}`).then(res => res.json()).then(data => setJob(data))
    },[id]);

    const handleApply = async()=> {
        const { value: url } = await Swal.fire({
            input: "url",
            inputLabel: "URL address",
            inputPlaceholder: "Enter the URL"
          });
          if (url) {
            Swal.fire(`Entered URL: ${url}`);
          }
    }
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <PageHeader title={"Single Job Page"} path={"single job"}/>
        <h2 className='mt-8 mb-3 font-semibold'>Job details</h2>
        <h2 className='mb-4 font-semibold'>{job.jobTitle}</h2>
        <p className='mb-4 hover:font-semibold'>{job.description}</p>
        <div className='flex gap-4 mb-10'>
        <button className='bg-violet-900 px-8 py-2 text-white h-9 text-center' onClick={handleApply}>Full-time</button>
        <button className='bg-blue px-8 py-2 text-white h-9 text-center' onClick={handleApply}>Apply Now</button>
        </div>
        <div className='text-center text-stone-800 font-semibold text-5xl mb-14'>
            <h1>Thank you!</h1>
        </div>
    </div>
  )
}

export default JobDetails
