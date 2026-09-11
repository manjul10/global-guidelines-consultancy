import ContactForm from "@/components/public/ContactForm";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact Us & Book Free Counseling",
  description:
    "Schedule an in-person or virtual consultation with senior education and visa counselors at Global Guidelines Consultancy.",
};

export default function ContactPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
            Direct Expert Consultation
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Connect with Our Education & Visa Counselors
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Whether you need eligibility assessment, scholarship advice, or visa file audits,
            our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Kathmandu Head Office & Branches
              </h2>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Head Office:</strong>
                    <span>Level-3, Brihaspati Sadan, Putalisadak (near Laxmi Plaza), Kathmandu, Nepal</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Birgunj Branch:</strong>
                    <span>Global Guidelines Consultancy - Birgunj, Parsa, Nepal</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Telephone & Support:</strong>
                    <span>+977 1 4525327 / +977 1 4423890 / +977 9801234567</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Email:</strong>
                    <span>info@globalguidelines.com / counseling@globalguidelines.com</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Counseling Hours:</strong>
                    <span>Sunday – Friday: 9:00 AM to 5:00 PM (Saturday Closed)</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-brand-navy-900 text-white p-8 rounded-2xl border border-brand-navy-800 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Assessment Fee</span>
              </div>
              <h3 className="text-base font-bold">In-Person & Virtual Appointments</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Living outside the valley or abroad? You can request a 1-on-1 Zoom video consultation
                with our country managers. Simply mention your preference in your message!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
