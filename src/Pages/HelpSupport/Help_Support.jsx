import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useHelpSupportMutation } from '../redux/features/baseApi/baseApi';


const Help_Support = () => {
  const navigate = useNavigate();
  const [helpSupport, { isLoading }] = useHelpSupportMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // You can send the form data to your backend here
    try {
        const response = helpSupport(data).unwrap();
        console.log("Submitted Data:", response)
        reset()
        navigate("/helpSupportThank");
    } catch (error) {
      console.error('Error submitting the form:', error)
    }
  };

  return (
    <div className='bg-[#e1e4ed] md:pt-10 pt-5'>
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 ms-6 rounded-md  md:ms-10 mx-auto"
      >
        <ChevronLeft size={28} />
        <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
      </button>
      <div className="flex flex-col items-center justify-center h-screen w-full px-6">
        <div className="xl:w-2/4">
          <h1 className="text-[30px] text-black font-semibold py-5">Support</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className='font-medium text-base'>Please enter your email</label>
              <input
                type="email"
                placeholder="Email"
                className={`border py-2 px-4 rounded-md w-full mt-2 bg-white ${errors.email ? 'border-red-500' : ''}`}
                style={{ backgroundColor: 'white' }}
                {...register('email', {
                  required: 'Email is required',
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-6">
              <label className='font-medium text-base'>Please describe your issues or concerns</label>
              <textarea
                placeholder="Description"
                className={`border py-2 px-4 rounded-md w-full mt-2 ${errors.description ? 'border-red-500' : ''}`}
                rows={5}
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className='flex items-center justify-end'>
              <button type="submit" className="py-2 text-white bg-[#431D5A] hover:bg-[#431D5A] border border-[#431D5A] mt-3 px-10 rounded-md font-semibold">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help_Support;
