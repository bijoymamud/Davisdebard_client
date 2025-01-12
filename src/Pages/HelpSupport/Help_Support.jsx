import React from 'react'
// import Navbar from '../Shared/Navbar';

const Help_Support = () => {
  return (
    <div>
    {/* <Navbar/> */}
      <div className="bg-[#e1e4ed] flex flex-col items-center justify-center h-screen w-full px-6 ">
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

        <button className="py-2 hover:bg-[#431D5A] hover:text-white border border-[#431D5A] mt-3 px-4 rounded-md font-semibold ">Save</button>
      </div>
    </div>
  </div>
  )
}

export default Help_Support;
