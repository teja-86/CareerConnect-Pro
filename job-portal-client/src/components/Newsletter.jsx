import React, { useState } from 'react'
import {FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';

function Newsletter() {
  const [email, setEmail] = useState("");
  const handleClick = () => {
    if(email != ""){
      alert("Do you want to submit email to get job opportunities ? ");
    }
    setEmail("");
  }

  const handleApply = async()=> {
    const { value: url } = await Swal.fire({
        input: "url",
        inputLabel: "URL address",
        inputPlaceholder: "Upload you resume drive URL"
      });
      if (url) {
        Swal.fire(`Upload you resume drive URL: ${url}`);
      }
}
  return (
    <div>
      <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'><FaEnvelopeOpenText/>Email me for Jobs</h3>
        <p className='text-primary/75 text-base mb-4'>Email me for the job seeking</p>
        <div className='w-full space-y-4'>
          
            <input type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} id='email' placeholder='name@gmail.com' className='w-full block py-2 pl-3 border focus:outline-none' />
            <input type="submit" onClick={handleClick}  name={"Subscribe"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
        </div>
        
      </div>

{/* 2nd part */}
      <div className='mt-20'>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'><FaRocket/>Get noticed faster</h3>
        <p className='text-primary/75 text-base mb-4'>Upload resume for the job seeking</p>
        <div className='w-full space-y-4'>
            <input type="submit" value={"Upload your resume"} onClick={handleApply} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
        </div>
        
      </div>
    </div>
  )
}

export default Newsletter;  
