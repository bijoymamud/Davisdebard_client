import { Camera, ChevronLeft, EyeOff, LockKeyhole, Mic, SquarePen } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  
    const navigate = useNavigate()
  return (
    <section className='bg-[#e1e4ed]'>


<div className='pt-10'>
<button
 onClick={() => navigate(-1)} // Navigate back to the previous page
 className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md ms-10 mx-auto"
>
 <ChevronLeft size={28} />
 <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
</button> 
</div>

      <div className="flex flex-col items-center justify-center min-h-screen md:p-6">
        {/* Profile Section */}
        <div className="md:p-8 p-5 rounded-lg w-full xl:w-2/4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start">
              <div className="relative mb-8">
                <img
                  src="https://img.freepik.com/premium-photo/photo-boy-cute-boy-character_911060-18951.jpg"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-2 border-purple-500 cursor-pointer"
                />
                <button
                  className="absolute bottom-0 right-0 bg-[#431D5A] shadow-md text-white p-2 rounded-full"
                  title="Upload Profile Picture"
                >
                  <Camera size={28} />
                </button>
              </div>

              {/* Input Fields */}
              <div className="md:flex md:flex-wrap gap-6 w-full">
                <div className="md:flex gap-4 w-full">
                  <div className="flex flex-1 items-center rounded-md shadow p-2 border border-[#431D5A]">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex-1 bg-transparent outline-none px-4 text-black text-base"
                    />
                    <button className="flex items-center justify-center w-12 h-12 text-purple-600">
                      <SquarePen size={20} className="text-[#431D5A]" />
                    </button>
                  </div>

                  <div className="flex flex-1 items-center rounded-md shadow p-2 border border-[#431D5A] my-4 md:my-0">
                    <input
                      type="text"
                      placeholder="Subscription Type"
                      className="flex-1 py-3 md:py-0 bg-transparent outline-none px-4 text-black text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Input Fields */}
              <div className="md:flex gap-4 w-full md:mt-5">
                <div className="flex flex-1 items-center rounded-md shadow p-2 border border-[#431D5A] mb-5 md:mb-0">
                  <input
                    type="text"
                    placeholder="abc@gmail.com"
                    className="flex-1 bg-transparent outline-none px-4 text-black text-base py-3"
                  />
                </div>

                <div className="flex flex-1 items-center rounded-md shadow p-2 border border-[#431D5A]">
                  <button className="flex items-center justify-center text-purple-600 ms-3">
                    <LockKeyhole size={20} className="text-[#431D5A]" />
                  </button>
                  <input
                    type="text"
                    placeholder="Enter password"
                    className="flex-1 bg-transparent outline-none px-4 text-black text-base"
                  />
                  <button className="flex items-center justify-center w-12 h-12 text-purple-600">
                    <EyeOff size={20} className="text-[#431D5A]" />
                  </button>
                </div>
              </div>

              {/* Update Button */}
              <div className="mt-8 w-full flex justify-end">
                <button
                  className="px-6 py-2 bg-[#431D5A] text-white rounded-md text-lg font-semibold shadow hover:bg-[#360F47]"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;



