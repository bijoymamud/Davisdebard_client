import React from "react";
import { useBillingInfoQuery } from "../redux/features/baseApi/baseApi";

const BillingInfo = () => {
  const { data } = useBillingInfoQuery();

  // Extract data from the API response
  const billInfo = data?.data?.package?.name;
  console.log(billInfo);

  const userName = data?.data?.user?.name;
  const userEmail = data?.data?.user?.email;
  const Pack_startDate = data?.data?.start_date;
  const Pack_endDate = data?.data?.expire_date;

  // Format dates (convert to readable format)
  const formattedStartDate = Pack_startDate
    ? new Date(Pack_startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const formattedEndDate = Pack_endDate
    ? new Date(Pack_endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Billing Information
        </h1>
        <div className="space-y-4">
          {/* Display user and package information */}
          <h2 className="text-lg">
            <strong>Name:</strong> {userName || "N/A"}
          </h2>
          <h2 className="text-lg">
            <strong>Email:</strong> {userEmail || "N/A"}
          </h2>
          <h2 className="text-lg">
            <strong>Package Name:</strong> {billInfo || "N/A"}
          </h2>
          <h2 className="text-lg">
            <strong>Start Date:</strong> {formattedStartDate}
          </h2>
          <h2 className="text-lg">
            <strong>End Date:</strong> {formattedEndDate}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;
