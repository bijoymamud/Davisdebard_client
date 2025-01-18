import { ChevronLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
// import Navbar from '../Shared/Navbar';

const Help_Support = () => {

  const navigate = useNavigate()
  return (
    <div className='bg-[#e1e4ed] pt-10'>
    <button
 onClick={() => navigate(-1)} // Navigate back to the previous page
 className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md ms-10 mx-auto"
>
 <ChevronLeft size={28} />
 <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
</button> 
      <div className=" flex flex-col items-center justify-center h-screen w-full px-6 ">
      <div className=" xl:w-2/4">
        <h1 className="text-[30px] text-black font-semibold py-5">Help & Support </h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="Email"
          className="border py-2 px-4 rounded-md w-full mb-6"
        />

    <textarea
          type="text"
          name=""
          id=""
          placeholder="Description"
          className="border py-2 px-4 rounded-md w-full h-32 "
        />

       <div className='flex items-center justify-end'>
       <button className="py-2 text-white bg-[#431D5A] hover:bg-[#431D5A] border border-[#431D5A] mt-3 px-4 rounded-md font-semibold ">Save</button>
       </div>
      </div>
    </div>
  </div>
  )
}

export default Help_Support;



//  const navigate = useNavigate();<button
//  onClick={() => navigate(-1)} // Navigate back to the previous page
//  className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md"
// >
//  <ChevronLeft size={28} />
//  <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
// </button>