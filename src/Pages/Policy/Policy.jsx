import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

// Privacy Policy Data
const privacyPolicyData = [
  { title: "Introduction", content: "This Privacy Policy describes how we collect, use, and protect your personal information when you use our AI interface service ('Service'). We take your privacy seriously and are committed to protecting your personal data." },
  { title: "Information We Collect", content: "We collect various types of data:\n\n1. Personal Information:\n   - Name and email address\n   - Billing information and payment details\n   - Account credentials\n   - Usage history and preferences\n\n2. Technical Information:\n   - IP address\n   - Browser type and version\n   - Device information\n   - Operating system\n   - Login timestamps\n   - Service usage patterns\n\n3. AI Interaction Data:\n   - Query history\n   - Response metadata\n   - Usage metrics for different AI services\n   - Performance analytics" },
  { title: "How We Use Your Information", content: "We use your information for:\n\n1. Service Provision:\n   - Managing your account\n   - Processing payments\n   - Providing customer support\n   - Maintaining service functionality\n   - Improving user experience\n\n2. Communication:\n   - Sending service updates\n   - Providing technical notifications\n   - Responding to your inquiries\n   - Marketing communications (with your consent)\n\n3. Service Improvement:\n   - Analyzing usage patterns\n   - Identifying technical issues\n   - Optimizing service performance\n   - Developing new features" },
  { title: "Data Sharing and Third Parties", content: "We share data with:\n\n1. AI Service Providers:\n   - Necessary query data is shared with AI providers (Claude, ChatGPT, Gemini) to facilitate services.\n   - Each provider's privacy policy applies.\n\n2. Service Providers:\n   - Payment processors\n   - Cloud hosting services\n   - Analytics providers\n   - Customer support tools\n\n3. Legal Requirements:\n   - We may disclose information when required by law.\n   - In response to valid legal requests.\n   - To protect our rights or property." },
  { title: "Data Security", content: "We implement appropriate security measures:\n- Encryption of data in transit and at rest\n- Regular security assessments\n- Access controls and authentication\n- Secure data storage practices\n- Regular security updates" },
  { title: "Data Retention", content: "We retain data based on the following:\n- Account information is retained while your account is active.\n- Query history is retained for [specified period].\n- Payment information is retained as required by law.\n- You can request data deletion subject to legal requirements." },
  { title: "Your Rights", content: "You have the right to:\n- Access your personal data.\n- Correct inaccurate data.\n- Request data deletion.\n- Object to data processing.\n- Export your data.\n- Withdraw consent.\n- Lodge complaints with supervisory authorities." },
  { title: "Children's Privacy", content: "Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13." },
  { title: "International Data Transfers", content: "When we transfer data internationally, we ensure appropriate safeguards:\n- Standard contractual clauses\n- Adequacy decisions\n- Privacy Shield certification (where applicable)\n- Data processing agreements" },
  { title: "Cookie Policy", content: "We use cookies and similar technologies to:\n- Maintain session information\n- Remember preferences\n- Analyze service usage\n- Improve user experience\n\nYou can control cookie settings through your browser preferences." },
  { title: "Changes to Privacy Policy", content: "We may update this Privacy Policy periodically. We will notify you of material changes:\n- Through email notification\n- Via service announcement\n- By posting notice on our website" },
  { title: "Contact Information", content: "For privacy-related inquiries:\n- Email: [Your Privacy Email]\n- Address: [Your Physical Address]\n- Phone: [Your Contact Number]" },
  { title: "Additional Information", content: "California Privacy Rights:\nCalifornia residents may have additional rights under the CCPA/CPRA.\n\nGDPR Compliance:\nFor EU users, we serve as a data controller under GDPR. Our legal basis for processing includes:\n- Contract performance\n- Legal obligations\n- Legitimate interests\n- Consent\n\nData Protection Officer:\nOur Data Protection Officer can be contacted at: [DPO Contact Information]" },
  { title: "Governing Law", content: "This Privacy Policy is governed by the laws of [Your Jurisdiction]." },
];

const Policy = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 min-h-screen flex flex-col items-center md:p-6 p-2">
      <div className="w-full md:px-20">
        {/* Return Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-3 py-2 rounded-md mb-4"
        >
          <ChevronLeft size={28} />
          <h2 className="uppercase text-lg font-medium ml-2">Return</h2>
        </button>

        {/* Privacy Policy Heading */}
        <h1 className="text-xl font-semibold mb-6 pt-10 text-start">
          Privacy Policy
        </h1>

        {/* Privacy Policy Content - Scrollable */}
        <div className=" rounded-lg p-6  border-gray-200">
          {privacyPolicyData.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className=" font-semibold mb-2">{section.title}</h2>
              <p className="whitespace-pre-line text-gray-700 text-sm ">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Policy;
