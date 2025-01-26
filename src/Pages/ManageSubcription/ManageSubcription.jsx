import React from "react";
import { useGetPackagesQuery, usePaymentActivationMutation } from "../redux/features/baseApi/baseApi";
import { useNavigate } from "react-router-dom";

const ManageSubscription = () => {
  const { data, isLoading, error } = useGetPackagesQuery();
   const [paymentActivation] = usePaymentActivationMutation();
  const navigate = useNavigate();


  console.log("Data:", data);
  console.log("IsLoading:", isLoading);
  console.log("Error:", error);

  const handleSubcription = async (stripe_id)=>{
    console.log(stripe_id)
    
    try {
      const response = await paymentActivation({stripe_price_id:stripe_id}).unwrap();
      console.log(response);

      // navigate(response.data)
      window.location.href = response.data;
      
    } catch (error) {
      console.error("Error on subcription is:", error)
    }
  }


  return (
    <section className="min-h-screen bg-[#e1e4ed] flex items-center justify-center">
      <div className="mx-auto md:w-2/3 space-y-3">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
        Subscribe Today!
        </h1>
        <p className="text-gray-600 text-center font-semibold space-y-10 mb-10 pb-10">
          Manage your subscription plan, upgrade, or cancel as needed. Choose a
          plan or view your current subscription details below.
        </p>

        {/* Render Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-0 ">
          {data?.data.map((plan) => (
            <div
              key={plan.id}
              className="rounded-none bg-white shadow-md flex flex-col justify-between"
            >
              {/* Card Content */}
              <div className="p-6 pt-8 ">
                <h2 className="card-title text-gray-800 mb-2">{plan.name}</h2>
                {/* <p>Id: {plan.stripe_price_id}</p> */}
                <p className="md:text-base font-medium text-black mb-5 ">Price: ${plan.price}</p>
                <ul className="text-sm text-gray-600 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index}>- {feature}</li>
                  ))}
                </ul>
              </div>

              {/* Card Button */}
              <div className="card-actions p-6">
                <button 
                onClick={()=>handleSubcription(plan.stripe_price_id)}
                className="btn hover:bg-[#431D5A]  bg-purple-900 text-white border-none text-base w-full rounded-full shadow-lg shadow-gray-400">
                 Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default ManageSubscription;

