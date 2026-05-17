import React, { useRef, useState } from 'react';
import { Upload, ZoomIn, ZoomOut, RotateCw, X } from 'lucide-react';
import { APP_API_URL } from '../../../utils/http_utils';
import axios from 'axios';
import ls from "localstorage-slim";

interface FormData {
  firstName: string;
  lastName: string;
  profession: string;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
  summary: string;
  skills: string[];
  tools: string[];
  experienceTitle: string;
  experienceCompany: string;
  experienceLocation: string;
  experienceStartDate: string;
  experienceEndDate: string;
  experienceDescription: string;
  educationDegree: string;
  educationInstitution: string;
  educationStartYear: string;
  educationEndYear: string;
}

interface ImageTransform {
  scale: number;
  rotation: number;
  x: number;
  y: number;
}

const SmartCvForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    profession: '',
    phoneNumber: '',
    email: '',
    city: '',
    state: '',
    summary: '',
    skills: [],
    tools: [],
    experienceTitle: '',
    experienceCompany: '',
    experienceLocation: '',
    experienceStartDate: '',
    experienceEndDate: '',
    experienceDescription: '',
    educationDegree: '',
    educationInstitution: '',
    educationStartYear: '',
    educationEndYear: ''
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<File | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [transform, setTransform]= useState<ImageTransform>({
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editorImgRef = useRef<HTMLImageElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category: 'skills' | 'tools', value: string) => {
    setFormData(prev => {
      const currentArray = prev[category];
      const isChecked = currentArray.includes(value);
      
      return {
        ...prev,
        [category]: isChecked
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
        setShowEditor(true);
        setTransform({ scale: 1, rotation: 0, x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoom = (delta: number) => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.5, Math.min(3, prev.scale + delta))
    }));
  };

  const handleRotate = () => {
    setTransform(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360
    }));
  };

const countChars = (text: string) => text.length;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const cropAndSaveImage = () => {
    if (!canvasRef.current || !editorImgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.scale(transform.scale, transform.scale);
    ctx.translate(-size / 2 + transform.x / transform.scale, -size / 2 + transform.y / transform.scale);

    ctx.drawImage(editorImgRef.current, 0, 0, size, size);
    ctx.restore();

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'profile-photo.jpg', { type: 'image/jpeg' });
        setFinalImage(file);
        setShowEditor(false);
      }
    }, 'image/jpeg', 0.95);
  };

const handleSubmit = async () => {
    if (countChars(formData.summary) < 50) {
  alert("Professional Summary must be at least 50 characters.");
  return;
}
  try {
    // Create FormData
    const form = new FormData();

    // DEBUG logs
    console.log('Form data before sending:', formData);
    console.log('experienceTitle specifically:', formData.experienceTitle);

    // Append photo
    if (finalImage) {
      form.append("photo", finalImage, finalImage.name);
      console.log('Photo attached:', finalImage.name, finalImage.type);
    } else {
      console.warn('No photo uploaded!');
    }

    // Append all other fields
    Object.keys(formData).forEach((key) => {
      const value = (formData as any)[key];
      if (Array.isArray(value)) {
        value.forEach((v: string) => form.append(`${key}[]`, v));
      } else {
        form.append(key, value);
      }
    });

    // Send to CV generation endpoint
    const response = await axios.post(`${APP_API_URL}/cv`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${ls.get("wwph_token", { decrypt: true })}`,
      }
    });

    // The backend already saved the SmartCV to user profile
    const cvUrl = response.data.cv_url;
    console.log("SmartCV saved at:", cvUrl);

    alert("SmartCV saved! You can now view it in your profile.");

  } catch (err: any) {
    console.error("CV generation failed:", err);
    const message = err.response?.data?.message || err.message || "Something went wrong";
    alert(message);
  }
};




  

  const skillOptions = [
    'Calendar Management',
    'Email Handling',
    'Customer Support',
    'Data Entry',
    'Administrative Support',
    'Scheduling',
    'Document Preparation',
    'Travel Arrangements',
    'Motion Graphics & Animation',
    'Color & Visual Enhancement',
    'Visual Effects & Cleanup',
    'Audio Post-Production',
    'Media Management',
    'Content Optimization & Delivery'
  ];

  const toolOptions = [
    'Microsoft Office',
    'Trello',
    'Asana',
    'Slack',
    'Google Workspace',
    'Zoom',
    'Calendly',
    'Notion',
    'Adobe Premiere Pro',
    'DaVinci Resolve',
    'DaVinci Resolve',
    'CapCut',
    'Cinema 4D',
    'Adobe Animate',
    'Adobe After Effects',
    'Filmora'
  ];

  return (
    <div className=" min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white mt-16 rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="bg-[#2AA100] text-[#2AA100] p-8 text-center relative">
            <div className="inline-block bg-white px-8 py-4 rounded-lg transform -rotate-3 shadow-lg">
              <span className="text-xl font-bold">
                SmartCV<br />
                <span className="text-2xl">Fill the Form</span>
              </span>
            </div>
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Smart CV</h1>
            <p className="text-gray-600">
              SmartCV is Workason's interactive, AI-ready freelancer résumé that helps talent stand out and clients make faster hiring decisions. It's more than a static CV — it's a profile plus portfolio in one, verified and formatted to highlight skills, experience, and achievements for maximum impact.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Profile Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Profile Photo <span className="text-red-500">*</span>
            </label>
            
            {!finalImage && !showEditor && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Upload a Photo</p>
                <p className="text-sm text-gray-500 mb-4">Choose a professional photo for your CV</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Choose File
                </label>
              </div>
            )}

            {finalImage && !showEditor && (
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                    <img 
                      src={URL.createObjectURL(finalImage)} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Change Photo
                  </label>
                  <button
                    onClick={() => setFinalImage(null)}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
              </div>
            )}
          </div>


          {/* Name Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <label className="block text-xs text-gray-500 mt-1">First Name</label>
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <label className="block text-xs text-gray-500 mt-1">Last Name</label>
              </div>
            </div>
          </div>

          {/* Profession */}
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
              Profession/Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              placeholder="e.g. Virtual Assistant, Video Editor"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Contact Information */}
          l

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Lagos"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State/Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Nigeria"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Summary */}
          <div>
  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
    Professional Summary <span className="text-red-500">*</span>
  </label>
  <textarea
    id="summary"
    name="summary"
    value={formData.summary}
    onChange={handleInputChange}
    rows={4}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
    placeholder="Brief description of your professional background and expertise..."
    required
  />
  <p className={`text-sm mt-1 ${countChars(formData.summary) < 50 ? "text-red-500" : "text-green-600"}`}>
  {countChars(formData.summary)} / 50 characters minimum
</p>
</div>

          {/* Skills and Tools Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Skills <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-md">
                {skillOptions.map((skill) => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleCheckboxChange('skills', skill)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tools <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-md">
                {toolOptions.map((tool) => (
                  <label key={tool} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tools.includes(tool)}
                      onChange={() => handleCheckboxChange('tools', tool)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{tool}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Experience</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="experienceTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="experienceTitle"
                  name="experienceTitle"
                  value={formData.experienceTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Virtual Assistant"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="experienceCompany" className="block text-sm font-medium text-gray-700 mb-2">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="experienceCompany"
                    name="experienceCompany"
                    value={formData.experienceCompany}
                    onChange={handleInputChange}
                    placeholder="e.g. ABC Solutions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="experienceLocation" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="experienceLocation"
                    name="experienceLocation"
                    value={formData.experienceLocation}
                    onChange={handleInputChange}
                    placeholder="e.g. Lagos, Nigeria"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="experienceStartDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    id="experienceStartDate"
                    name="experienceStartDate"
                    value={formData.experienceStartDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="experienceEndDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="month"
                    id="experienceEndDate"
                    name="experienceEndDate"
                    value={formData.experienceEndDate}
                    onChange={handleInputChange}
                    placeholder="Leave empty if current"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty if this is your current position</p>
                </div>
              </div>

              <div>
                <label htmlFor="experienceDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="experienceDescription"
                  name="experienceDescription"
                  value={formData.experienceDescription}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  placeholder="Describe your responsibilities and achievements..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Education</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="educationDegree" className="block text-sm font-medium text-gray-700 mb-2">
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="educationDegree"
                  name="educationDegree"
                  value={formData.educationDegree}
                  onChange={handleInputChange}
                  placeholder="e.g. Bachelor of Arts in Business Administration"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="educationInstitution" className="block text-sm font-medium text-gray-700 mb-2">
                  Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="educationInstitution"
                  name="educationInstitution"
                  value={formData.educationInstitution}
                  onChange={handleInputChange}
                  placeholder="e.g. University of Lagos"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="educationStartYear" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="educationStartYear"
                    name="educationStartYear"
                    value={formData.educationStartYear}
                    onChange={handleInputChange}
                    placeholder="2018"
                    min="1950"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="educationEndYear" className="block text-sm font-medium text-gray-700 mb-2">
                    End Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="educationEndYear"
                    name="educationEndYear"
                    value={formData.educationEndYear}
                    onChange={handleInputChange}
                    placeholder="2022"
                    min="1950"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gray-500 text-white px-8 py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>

    
  {/* Image Editor Modal */}
  {showEditor && previewImage && (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Adjust Your Photo</h3>
          <button
            onClick={() => {
              setShowEditor(false);
              setPreviewImage(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div 
          className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4 cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            ref={editorImgRef}
            src={previewImage}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotation}deg)`,
              transformOrigin: 'center'
            }}
          />
          <div className="absolute inset-0 border-2 border-dashed border-white opacity-50 pointer-events-none"></div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-sm text-gray-600 w-16 text-center">
            {Math.round(transform.scale * 100)}%
          </span>
          <button
            onClick={() => handleZoom(0.1)}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 ml-4"
            title="Rotate"
          >
            <RotateCw size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center mb-4">
          Drag to reposition • Zoom to adjust size • Rotate to adjust angle
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowEditor(false);
              setPreviewImage(null);
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={cropAndSaveImage}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  )}
</div>
);
};

export default SmartCvForm;