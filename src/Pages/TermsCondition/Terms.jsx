import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

// Terms and Conditions Data
const termsData = [
  { title: "1. Acceptance of Terms", content: "By accessing and using this website and our AI interface service ('Service'), you agree to be bound by these Terms and Conditions ('Terms'). If you do not agree to these Terms, please do not use the Service." },
  { title: "2. Service Description", content: "Our Service provides a unified interface for accessing various third-party AI models and services ('AI Providers'), including but not limited to OpenAI's ChatGPT, Anthropic's Claude, and Google's Gemini. We act as an intermediary platform facilitating access to these services." },
  { title: "3. User Accounts", content: "3.1. You must create an account to use our Service.\n3.2. You are responsible for maintaining the confidentiality of your account credentials.\n3.3. You must be at least 18 years old to create an account.\n3.4. You agree to provide accurate and complete information when creating your account." },
  { title: "4. Service Usage and Limitations", content: "4.1. Our Service requires valid API access to the respective AI Providers.\n4.2. You must comply with all terms and conditions of the individual AI Providers.\n4.3. We do not guarantee uninterrupted access to any AI Provider's services.\n4.4. We reserve the right to modify, suspend, or discontinue any part of our Service without notice." },
  { title: "5. User Responsibilities", content: "You agree not to:\n- Use the Service for any illegal purposes\n- Attempt to bypass any access restrictions or security measures\n- Share your account credentials with others\n- Upload malicious content or attempt to harm the Service\n- Reverse engineer or attempt to extract the source code of our software\n- Use the Service to generate harmful or abusive content" },
  { title: "6. Payment and Billing", content: "6.1. Usage of our Service may require payment based on our current pricing structure.\n6.2. You are responsible for all charges incurred under your account.\n6.3. Refunds are provided in accordance with our refund policy.\n6.4. We reserve the right to modify our pricing with appropriate notice." },
  { title: "7. Intellectual Property", content: "7.1. Our Service interface and software are protected by intellectual property laws.\n7.2. You retain ownership of your content submitted through the Service.\n7.3. You grant us a license to use your content as necessary to provide the Service." },
  { title: "8. Privacy and Data Protection", content: "8.1. Our collection and use of your data is governed by our Privacy Policy.\n8.2. We implement reasonable security measures to protect your data.\n8.3. We do not store or log the content of your interactions with AI Providers unless explicitly specified." },
  { title: "9. Disclaimers and Limitations of Liability", content: "9.1. The Service is provided 'as is' without warranties of any kind.\n9.2. We are not responsible for the accuracy or reliability of AI-generated content.\n9.3. We are not liable for any damages arising from your use of the Service.\n9.4. Our maximum liability shall not exceed the amount you paid for the Service in the past 12 months." },
  { title: "10. Third-Party Services", content: "10.1. We are not responsible for the availability or functionality of AI Providers' services.\n10.2. Your use of third-party services is subject to their respective terms and conditions.\n10.3. We make no warranties regarding third-party services." },
  { title: "11. Termination", content: "11.1. We may terminate or suspend your account for violations of these Terms.\n11.2. You may terminate your account at any time by following the cancellation process.\n11.3. Upon termination, you will lose access to all Service features." },
  { title: "12. Changes to Terms", content: "12.1. We reserve the right to modify these Terms at any time.\n12.2. Continued use of the Service after changes constitutes acceptance of modified Terms.\n12.3. Material changes will be notified to users via email or Service announcement." },
  { title: "13. Governing Law and Jurisdiction", content: "These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions." },
  { title: "14. Contact Information", content: "For questions about these Terms, please contact us at [Your Contact Information]." },
];

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 min-h-screen flex flex-col items-center md:p-6 p-2 md:px-20">
      <div className="w-full ">
        {/* Return Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-3 py-2 rounded-md mb-4"
        >
          <ChevronLeft size={28} />
          <h2 className="uppercase md:text-lg font-medium ml-2">Return</h2>
        </button>

        {/* Terms and Conditions Heading */}
        <h1 className="text-xl font-semibold pt-10 text-start">
          Terms and Conditions
        </h1>

        {/* Terms Content - Scrollable */}
        <div className=" rounded-lg p-6">
          {termsData.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="font-semibold mb-2">{section.title}</h2>
              <p className="whitespace-pre-line text-gray-700 text-sm">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
