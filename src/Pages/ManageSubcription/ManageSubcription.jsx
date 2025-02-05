// import React from "react";
// import { useBillingInfoQuery, useGetPackagesQuery, usePaymentActivationMutation } from "../redux/features/baseApi/baseApi";
// import { useNavigate } from "react-router-dom";
// import { FaCheck } from "react-icons/fa"; // ✅ Import Tick Mark Icon
// import { ArrowLeft, ChevronLeft } from "lucide-react"; // Add back icon from Lucide

// const ManageSubscription = () => {
//   const { data, isLoading, error } = useGetPackagesQuery();
//    const {data:billinInfo} = useBillingInfoQuery();
//   const [paymentActivation] = usePaymentActivationMutation();
//   const navigate = useNavigate();
//   const activatedPack = billinInfo?.data?.package?.name;
//   console.log(activatedPack);

//   const handleSubscription = async (stripe_id) => {
//     try {
//       const response = await paymentActivation({ stripe_price_id: stripe_id }).unwrap();
//       window.location.href = response.data;
//     } catch (error) {
//       console.error("Error on subscription:", error);
//     }
//   };

//   return (
//   <section className=" bg-[#e1e4ed]">


//    <div className="pt-10">
//         <button
//           onClick={() => navigate(-1)}  
//           className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md md:ms-10 ms-5 mx-auto"
//         >
//           <ChevronLeft size={28} />
//           <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
//         </button>
//       </div>

//       <div className=" min-h-screen flex items-center justify-center py-6">
//       <div className="mx-auto w-full md:w-3/4 lg:w-2/3 space-y-6 px-6">
        
//         {/* Back Button */}

//         <h1 className="text-3xl font-bold text-gray-800 text-center">Subscribe Today!</h1>
//         <p className="text-gray-600 text-center font-semibold space-y-4 mb-10">
//           Manage your subscription plan, upgrade, or cancel as needed. Choose a plan or view your current subscription details below.
//         </p>

//         {/* Render Subscription Plans */}
//         <div className="md:flex justify-center md:gap-6 mx-auto">
//           {data?.data.map((plan) => (
//             <div
//               key={plan.id}
//               className="bg-white shadow-md flex flex-col p-6 rounded-md mb-10 "
//             >
//               {/* Card Content */}
//               <div className="text-center mb-6">
//                 <h2 className="text-4xl font-semibold text-gray-800">{plan.name}</h2>
//                 <p className="text-base mt-2 font-medium text-black mb-4">Price: ${plan.price}</p>

//                 {/* Features List with Tick Marks ✅ */}
//                 <ul className="text-sm text-gray-600 mb-4 space-y-2">
//                   {plan.features.map((feature, index) => (
//                     <li key={index} className="flex items-center space-x-2">
//                       <FaCheck className="text-green-500" /> {/* ✅ Tick Mark */}
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Card Button */}
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => handleSubscription(plan.stripe_price_id)}
//                   className="w-full py-2 px-4 bg-[#431D5A] text-white font-medium rounded-full hover:bg-[#2d103f] transition-colors duration-200"
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </section>
//   );
// };

// export default ManageSubscription;


import React from "react";
import { useBillingInfoQuery, useGetPackagesQuery, usePaymentActivationMutation } from "../redux/features/baseApi/baseApi";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa"; // ✅ Import Tick Mark Icon
import { ChevronLeft } from "lucide-react"; // Add back icon from Lucide

const ManageSubscription = () => {
  const { data, isLoading, error } = useGetPackagesQuery();
  const { data: billingInfo } = useBillingInfoQuery();
  const [paymentActivation] = usePaymentActivationMutation();
  const navigate = useNavigate();

  const activatedPack = billingInfo?.data?.package?.name;
  const expireDate = billingInfo?.data?.expire_date;
  

  // Handle Subscription Process
  const handleSubscription = async (stripe_id) => {
    try {
      const response = await paymentActivation({ stripe_price_id: stripe_id }).unwrap();
      window.location.href = response.data;
    } catch (error) {
      console.error("Error on subscription:", error);
    }
  };

  return (
    <section className="bg-[#e1e4ed]">
      <div className="md:pt-10 pt-5 pb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md md:ms-10 ms-5 mx-auto"
        >
          <ChevronLeft size={28} />
          <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
        </button>
      </div>

      <div className="min-h-screen flex items-center justify-center py-6">
        <div className="mx-auto w-full md:w-3/4 lg:w-2/3 space-y-6 px-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Subscribe Today!</h1>
          <p className="text-gray-600 text-center font-semibold space-y-4 mb-10">
            Manage your subscription plan, upgrade, or cancel as needed. Choose a plan or view your current subscription details below.
          </p>

          {/* Render Subscription Plans */}
          <div className="md:flex justify-center md:gap-6 mx-auto">
            {data?.data.map((plan) => (
              <div key={plan.id} className="bg-white shadow-md flex flex-col p-6 rounded-md mb-10 md:py-16">
                {/* Card Content */}
                <div className="text-center mb-6">
                  <h2 className="text-4xl font-semibold text-gray-800">{plan.name}</h2>
                  <p className="text-base mt-2 font-medium text-black mb-4">Price: ${plan.price} / <span className="capitalize">{plan.interval}</span></p>

                  {/* Features List with Tick Marks ✅ */}
                  <ul className="text-sm text-black mb-4 space-y-2">
  {plan.name === "Basic" ? (
    <>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span>Access to core features.</span>
      </li>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span className="font-semibold">First 7 days free.</span>
      </li>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span className="font-semibold">Can cancel within 7 days at no charge.</span>
      </li>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span className="font-semibold">Basic email support with 24-48 hour response time.</span>
      </li>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span>Up to 500 MB storage space.</span>
      </li>
    </>
  ) : plan.name === "Standard" ? (
    <>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span>Access to core features.</span>
      </li>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span className="font-semibold">First 7 days free.</span>
      </li>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span className="font-semibold">Can cancel within 7 days at no charge.</span>
      </li>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span className="font-semibold">Standard email support with 12-24 hour response time.</span>
      </li>
      <li className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span className="font-semibold">Up to 1 GB storage space.</span>
      </li>
    </>
  ) : (
    plan.features.map((feature, index) => (
      <li key={index} className="flex items-center space-x-2">
        <FaCheck className="text-green-500" />
        <span>{feature}</span>
      </li>
    ))
  )}
</ul>

                </div>

           

<div className="flex justify-center">
  {activatedPack && activatedPack === plan.name ? (
    <div className="w-full flex flex-col items-center">
      {/* Disabled Button for Already Activated Plan */}
      <button
        disabled
        className="w-full py-2 px-4 bg-gray-400 text-white font-medium rounded-full cursor-not-allowed"
      >
        Already Activated
      </button>

      {/* Show Expiry Date for the Active Plan */}
      <p className="mt-2 text-sm text-gray-600">
        Expiration Date:{" "}
        <span className="font-semibold text-[#431D5A]">
          {expireDate ? new Date(expireDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) : "N/A"}
        </span>
      </p>
    </div>
  ) : (
    <button
      onClick={() => handleSubscription(plan.stripe_price_id)}
      className="w-full py-2 px-4 bg-[#431D5A] text-white font-medium rounded-full hover:bg-[#2d103f] transition-colors duration-200"
    >
      Buy Now
    </button>
  )}
</div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageSubscription;
