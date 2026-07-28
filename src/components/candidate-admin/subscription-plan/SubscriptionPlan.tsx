import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Upload, Calendar, Check, X, ArrowLeft, ArrowRight, Sparkles, User, Briefcase, FileText, Package, Clock, Shield } from 'lucide-react';
import { httpGetWithoutToken } from "../../../utils/http_utils"; // adjust path as needed
import { useCMS } from "../../../hooks/useCMS";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  experience: string;
  skills: string[];
  workSamples: File[];
  portfolioLink: string;
  experienceDetails: string;
  education: string;
  toolsSkills: string;
  package: string;
  weeklyAvailability: string;
  clientTypes: string[];
  startDate: string;
  agreeTerms: boolean;
  consentProfile: boolean;
}

const SubscriptionPlan = () => {
    const { candidateDashboardSmartStart: cms } = useCMS();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [countries, setCountries] = useState<any[]>([]);  // ← added
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        role: '',
        experience: '',
        skills: [],
        workSamples: [],
        portfolioLink: '',
        experienceDetails: '',
        education: '',
        toolsSkills: '',
        package: '',
        weeklyAvailability: '',
        clientTypes: [],
        startDate: '',
        agreeTerms: false,
        consentProfile: false
    });

    const totalSteps = 6;

    useEffect(() => {
        getCountries();
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
    }, []);

    const getCountries = async () => {
        try {
            const res = await httpGetWithoutToken("countries");
            const items: any[] = Array.isArray(res)
                ? res
                : Array.isArray(res?.data)
                ? res.data
                : [];
            setCountries(items);
        } catch (error) {
            console.error("Failed to fetch countries:", error);
        }
    };

    const stepConfig = [
        {id:1, title: cms.step_personal_title, icon: User, color: 'from-blue-600 to-blue-600 '},
        {id:2, title: cms.step_role_title, icon: Briefcase, color: 'from-blue-600 to-blue-600'},
        {id:3, title: cms.step_portfolio_title, icon: FileText, color: 'from-blue-600 to-blue-600'},
        {id:4, title: cms.step_package_title, icon: Package, color: 'from-blue-600 to-blue-600'},
        {id:5, title: cms.step_availability_title, icon: Clock, color: 'from-blue-600 to-blue-600'},
        {id:6, title: cms.step_consent_title, icon: Shield, color: 'from-blue-600 to-blue-600'},
    ];

    const roles = ['Virtual Assistant', 'Editor'];
    const experienceLevels = ['None / Beginner', '1-3 years', '3+ years'];
    const vaSkills = ['Data Entry', 'Email Management', 'Calender Management', 'Customer Support', 'Social Media Management', 'Research & Analysis'];
    const editorSkills = ['Vidio Editing', 'Motion Graphics', 'Animation', 'Sound Design', 'Color Correction', 'Visual Effects'];
    const availabilityOptions = ['<10 hrs', '10–20 hrs', '20–30 hrs', 'Full-time'];
    const clientTypes = ['Small Business', 'Individual Entrepreneur', 'NGO', 'Corporate'];
    const packages = [
        {
            name: 'SmartStart Freelancers',
            price: '£15',
            naira: '₦30,000',
            gradient: 'from-blue-600 to-blue-600',
            description: 'Includes onboarding, verification pathway, and access to client opportunities',
        }
    ];

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSkillToggle = (skill: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.includes(skill) ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill]
        }));
    };

    const handleClientTypeToggle = (type: string) => {
        setFormData(prev => ({
            ...prev,
            clientTypes: prev.clientTypes.includes(type) ? prev.clientTypes.filter(t => t !== type) : [...prev.clientTypes, type]
        }));
    };

    const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
    const getStepStatus = (step: number) => { if (step < currentStep) return 'completed'; if (step === currentStep) return 'current'; return 'upcoming'; };

    const isStepValid = (step: number) => {
        switch(step) {
            case 1: return formData.fullName && formData.email && formData.phone && formData.location;
            case 2: return formData.role && formData.experience && formData.skills.length > 0;
            case 3: return true;
            case 4: return formData.package;
            case 5: return formData.weeklyAvailability && formData.clientTypes.length > 0 && formData.startDate;
            case 6: return formData.agreeTerms && formData.consentProfile;
            default: return false;
        }
    };

    const handleSubmit = () => {
        console.log('Form Submitted:', formData);
        alert('Application submitted successfully!');
    };

    const handlePayment = () => {
        const PaystackPop = (window as any).PaystackPop;
        if (!PaystackPop) {
            alert('Payment service not loaded. Please refresh and try again.');
            return;
        }
        const handler = PaystackPop.setup({
            key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
            email: formData.email,
            amount: 3000000, // ₦30,000 in kobo (£15 × ₦2,000)
            currency: 'NGN',
            ref: `smartstart_${Date.now()}`,
            metadata: { name: formData.fullName, phone: formData.phone, package: formData.package },
            callback: (_response: any) => { handleSubmit(); },
            onClose: () => {},
        });
        handler.openIframe();
    };

    const getCurrentStep = () => stepConfig.find(step => step.id === currentStep);

    const renderStepContent = () => {
        switch(currentStep) {
            case 1:
                return (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{cms.step_personal_title}</h2>
                      <p className="text-gray-600">{cms.personal_details_subtitle}</p>
                    </div>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Full Name <span className="text-[#ee009d]">*</span></label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
        
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Email Address <span className="text-[#ee009d]">*</span></label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
        
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Phone Number (WhatsApp preferred) <span className="text-[#ee009d]">*</span></label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                          placeholder="Enter your phone number"
                        />
                      </div>
        
                      {/* ← Location now uses countries from API */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Location (Country) <span className="text-[#ee009d]">*</span>
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                        >
                          <option value="">Select your country</option>
                          {countries.map((c) => (
                            <option key={c.code} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );

            case 2:
                return (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{cms.step_role_title}</h2>
                      <p className="text-gray-600">{cms.role_skills_subtitle}</p>
                    </div>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Select Your Role <span className="text-[#ee009d]">*</span></label>
                        <select value={formData.role} onChange={(e) => handleInputChange('role', e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all duration-200">
                          <option value="">Select a role</option>
                          {roles.map(role => <option key={role} value={role}>{role}</option>)}
                        </select>
                      </div>
        
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Years of Experience <span className="text-[#ee009d]">*</span></label>
                        <select value={formData.experience} onChange={(e) => handleInputChange('experience', e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200">
                          <option value="">Select experience level</option>
                          {experienceLevels.map(level => <option key={level} value={level}>{level}</option>)}
                        </select>
                      </div>
                    </div>
        
                    {formData.role && (
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Skills Checklist <span className="text-[#ee009d]">*</span></label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {(formData.role === 'Virtual Assistant' ? vaSkills : editorSkills).map(skill => (
                            <label key={skill} className="flex items-center space-x-3 cursor-pointer group">
                              <div className="relative">
                                <input type="checkbox" checked={formData.skills.includes(skill)} onChange={() => handleSkillToggle(skill)} className="sr-only" />
                                <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-200 ${formData.skills.includes(skill) ? 'bg-purple-700 border-purple-400' : 'border-gray-300 group-hover:border-purple-400'}`}>
                                  {formData.skills.includes(skill) && <Check className="w-3 h-3 text-white m-0.5" />}
                                </div>
                              </div>
                              <span className="text-sm text-gray-700 group-hover:text-purple-700 transition-colors">{skill}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );

            case 3:
                return (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{cms.step_portfolio_title}</h2>
                      <p className="text-gray-600">{cms.portfolio_subtitle}</p>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Experience</label>
                        <textarea value={formData.experienceDetails} onChange={(e) => handleInputChange('experienceDetails', e.target.value)} rows={4} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200" placeholder="Describe your relevant work experience..." />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Education</label>
                        <textarea value={formData.education} onChange={(e) => handleInputChange('education', e.target.value)} rows={3} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200" placeholder="Your educational background..." />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Skills/Tools</label>
                        <textarea value={formData.toolsSkills} onChange={(e) => handleInputChange('toolsSkills', e.target.value)} rows={3} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200" placeholder="List the tools and software you're proficient with..." />
                      </div>
                     <div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">Upload 1–3 Work Samples (optional)</label>
  <label className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#ee009d] hover:bg-pink-50 transition-all duration-300 cursor-pointer block">
    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
    <p className="text-sm text-gray-600 mb-2 font-medium">Click to upload or drag and drop</p>
    <p className="text-xs text-gray-500">PDF, DOC, PNG, JPG up to 10MB each</p>
    <input
      type="file"
      multiple
      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
      className="hidden"
      onChange={(e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 3) {
          alert("You can only upload up to 3 work samples.");
          return;
        }
        handleInputChange('workSamples', files);
      }}
    />
  </label>
  {formData.workSamples.length > 0 && (
    <ul className="mt-2 space-y-1">
      {formData.workSamples.map((file, index) => (
        <li key={index} className="text-sm text-green-600 flex items-center gap-2">
          <Check className="w-4 h-4" /> {file.name}
        </li>
      ))}
    </ul>
  )}
</div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Link to Online Portfolio (optional)</label>
                        <input type="url" value={formData.portfolioLink} onChange={(e) => handleInputChange('portfolioLink', e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200" placeholder="https://your-portfolio.com" />
                      </div>
                    </div>
                  </div>
                );

            case 4:
                return (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                        <Package className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{cms.step_package_title}</h2>
                      <p className="text-gray-600">{cms.package_subtitle}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-6">Choose SmartStart™ Package <span className="text-[#ee009d]">*</span></label>
                      <div className="flex justify-center">
                        {packages.map(pkg => (
                          <div key={pkg.name} className={`relative border-3 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 w-full max-w-md ${formData.package === pkg.name ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl' : 'border-gray-200 hover:border-green-700 hover:bg-green-900/10 hover:shadow-lg'}`} onClick={() => handleInputChange('package', pkg.name)}>
                            {formData.package === pkg.name && (
                              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#2AA100] rounded-full flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                              </div>
                            )}
                            <div className="text-center mb-6">
                              <h3 className={`text-2xl font-bold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent mb-4`}>{pkg.name}</h3>
                              <div className="flex items-baseline justify-center gap-3">
                                <span className={`text-5xl font-bold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}>{pkg.price}</span>
                                <span className="text-gray-400 text-sm font-medium">/ {pkg.naira}</span>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">at ₦2,000 per £1</p>
                            </div>
                            <p className="text-sm text-gray-600 text-center leading-relaxed">{pkg.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );

            case 5:
                return (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                        <Clock className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{cms.step_availability_title}</h2>
                      <p className="text-gray-600">{cms.availability_subtitle}</p>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Weekly Availability <span className="text-[#ee009d]">*</span></label>
                          <select value={formData.weeklyAvailability} onChange={(e) => handleInputChange('weeklyAvailability', e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200">
                            <option value="">Select availability</option>
                            {availabilityOptions.map(option => <option key={option} value={option}>{option}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Earliest Start Date <span className="text-[#ee009d]">*</span></label>
                          <input type="date" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Preferred Client Type <span className="text-[#ee009d]">*</span></label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {clientTypes.map(type => (
                            <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                              <div className="relative">
                                <input type="checkbox" checked={formData.clientTypes.includes(type)} onChange={() => handleClientTypeToggle(type)} className="sr-only" />
                                <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-200 ${formData.clientTypes.includes(type) ? 'bg-purple-700 border-purple-400' : 'border-gray-300 group-hover:border-purple-400'}`}>
                                  {formData.clientTypes.includes(type) && <Check className="w-3 h-3 text-white m-0.5" />}
                                </div>
                              </div>
                              <span className="text-sm text-gray-700 group-hover:text-purple-700 transition-colors">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );

            case 6:
                return (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2AA100] hover:bg-teal-600 rounded-2xl mb-4">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{cms.step_consent_title}</h2>
                      <p className="text-gray-600">{cms.consent_subtitle}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 space-y-6">
                      <label className="flex items-start space-x-4 cursor-pointer group">
                        <div className="relative mt-1">
                          <input type="checkbox" checked={formData.agreeTerms} onChange={(e) => handleInputChange('agreeTerms', e.target.checked)} className="sr-only" />
                          <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 ${formData.agreeTerms ? 'bg-[#2AA100] border-white' : 'border-gray-300 group-hover:border-green-400'}`}>
                            {formData.agreeTerms && <Check className="w-4 h-4 text-white m-0.5" />}
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-green-700 transition-colors">
                          {cms.terms_checkbox_text} <span className="text-[#ee009d] font-semibold">*</span>
                        </span>
                      </label>
                      <label className="flex items-start space-x-4 cursor-pointer group">
                        <div className="relative mt-1">
                          <input type="checkbox" checked={formData.consentProfile} onChange={(e) => handleInputChange('consentProfile', e.target.checked)} className="sr-only" />
                          <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 ${formData.consentProfile ? 'bg-[#2AA100] border-white' : 'border-gray-300 group-hover:border-green-400'}`}>
                            {formData.consentProfile && <Check className="w-4 h-4 text-white m-0.5" />}
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-green-700 transition-colors">
                          {cms.consent_checkbox_text} <span className="text-[#ee009d] font-semibold">*</span>
                        </span>
                      </label>
                    </div>
                  </div>
                );

            default:
                return null;
        }
    };

  return (
    <div className="container mx-auto mt-[8rem] px-4 md:px-4 lg:px-8 lg:ml-64">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1E2A38] mb-2">{cms.page_heading}</h1>
              <p className="text-gray-600">{cms.page_description}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-800">Step {currentStep} of {totalSteps}</span>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#2AA100]" />
                <span className="text-lg font-bold text-[#2AA100]">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
            </div>

            <div className="flex items-center justify-between relative">
              {stepConfig.map((step, index) => {
                const status = getStepStatus(step.id);
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center relative z-10">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${status === 'completed' ? 'bg-[#2AA100] text-white shadow-lg' : status === 'current' ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-110` : 'bg-gray-200 text-gray-600'}`}>
                        {status === 'completed' ? <Check size={20} /> : <Icon size={20} />}
                      </div>
                      <span className={`mt-2 text-xs font-medium text-center max-w-16 ${status === 'current' ? 'text-purple-600' : 'text-gray-500'}`}>{step.title}</span>
                    </div>
                    {index < stepConfig.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${step.id < currentStep ? 'bg-[#2AA100]' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          {renderStepContent()}
        </div>

        <div className="flex items-center justify-between pt-8 border-t-2 border-gray-100">
          <button onClick={prevStep} disabled={currentStep === 1} className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${currentStep > 1 ? 'text-gray-700 hover:text-purple-700 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-500' : 'text-gray-400 cursor-not-allowed border-2 border-gray-200'}`}>
            <ArrowLeft className="w-5 h-5" />
            {cms.prev_button}
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => {
              const step = i + 1;
              const status = getStepStatus(step);
              return (
                <div key={step} className={`transition-all duration-300 rounded-full ${status === 'current' ? 'w-12 h-3 bg-blue-600' : status === 'completed' ? 'w-3 h-3 bg-[#2AA100]' : 'w-3 h-3 bg-gray-300'}`} />
              );
            })}
          </div>

          {currentStep < totalSteps ? (
            <button onClick={nextStep} disabled={!isStepValid(currentStep)} className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${isStepValid(currentStep) ? 'bg-[#ee009d] text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              {cms.next_button}
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handlePayment} disabled={!isStepValid(currentStep)} className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${isStepValid(currentStep) ? 'bg-[#2AA100] text-white hover:bg-teal-700 shadow-lg hover:shadow-xl transform hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              <Sparkles className="w-5 h-5" />
              {cms.submit_button}
            </button>
          )}
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-md border border-gray-100">
            <div className="w-3 h-3 rounded-full bg-[#ee009d]"></div>
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps} • {getCurrentStep()?.title}</span>
          </div>
        </div>
      </div>
  );
};

export default SubscriptionPlan;