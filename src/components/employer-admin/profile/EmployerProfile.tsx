import React, { useState, ChangeEvent, useContext, useEffect, FormEvent } from "react";
import { UilCheck, UilTimes } from "@iconscout/react-unicons";
import { Avatar, Button, Divider, useToast } from "@chakra-ui/react";
import { iProfileCompany } from "../../../models/profle";
import { iSocial } from "../../../models/social";
import { httpGetWithToken, httpGetWithoutToken, httpPostWithToken } from "../../../utils/http_utils";
import { AppContext } from "../../../global/state";

const EmployerProfile: React.FC = () => {
  const { updateUser }: any = useContext(AppContext);
  const toast = useToast();

  const [profile, setProfile] = useState<iProfileCompany>({
    id: undefined,
    name: "",
    email: "",
    status: "",
    role: "",
    address: "",
    phone_no: "",
    avatar: "",
    about_company: "",
    founded: "",
    industry: "",
    country: "",
    company: "",
    website: "",
    zipcode: "",
    city: "",
    state: "",
    wallet: "",
    company_size: "",
    social_medias: [],
  });

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [selected, setSelected] = useState<File | null>(null);
  const [links, setLinks] = useState<iSocial[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [editing_link, setEditingLink] = useState<string>("");
  const [newLink, setNewLink] = useState<string>("");
  const [newLinkValue, setNewLinkValue] = useState<string>("");
  const [showAddLink, setShowAddLink] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile();
    getCountries();
  }, []);

  useEffect(() => {
    if (profile.country) {
      getStates(profile.country);
    } else {
      setStates([]);
    }
  }, [profile.country]);

  const getProfile = async () => {
    try {
      const res = await httpGetWithToken("employer/profile");
      if (!res?.data) return;
      setProfile(res.data);
      setLinks(res.data.social_medias ?? []);
      updateUser(res.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const countChars = (text: string) => text.length;

const validate = () => {
  if (!selected && !profile.avatar) {
    toast({ status: "error", title: "Please upload a company photo" });
    return false;
  }
  if (!profile.country) {
    toast({ status: "error", title: "Country is required" });
    return false;
  }
  if (!profile.state?.trim()) {
    toast({ status: "error", title: "State is required" });
    return false;
  }
  if (countChars(profile.about_company ?? "") < 50) {
    toast({ status: "error", title: "About Company must be at least 50 characters" });
    return false;
  }
  return true;
};

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

  const getStates = async (countryCode: string) => {
    if (!countryCode) {
      setStates([]);
      return;
    }
    try {
      const res = await httpGetWithoutToken(`countries/${countryCode}`);
      const items: any[] = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : [];
      setStates(items);
    } catch (error) {
      console.error("Failed to fetch states:", error);
      setStates([]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === "country") {
      setProfile((prev) => ({ ...prev, country: value, state: "" }));
    } else {
      setProfile((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (saveLoading) return;
    if (!validate()) return;

    try {
      setSaveLoading(true);

      const payload = {
        name: profile.name,
        email: profile.email,
        website: profile.website,
        founded: profile.founded,
        company_size: profile.company_size,
        phone_no: profile.phone_no,
        industry: profile.industry,
        about_company: profile.about_company,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        zipcode: profile.zipcode,
      };

      const resp = await httpPostWithToken("employer/profile", payload);

      if (resp.status === "success") {
        toast({ status: "success", title: "Profile updated successfully", duration: 5000, isClosable: true });
        getProfile();
      } else {
        toast({ status: "error", title: resp.message ?? "Failed to update profile", duration: 5000, isClosable: true });
      }
    } catch (error) {
      toast({ status: "error", title: "An error occurred", duration: 5000, isClosable: true });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelected(file);
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageSave = async () => {
    if (!selected || saveLoading) return;
    const fd = new FormData();
    fd.append("file", selected);
    try {
      setSaveLoading(true);
      const resp = await httpPostWithToken("employer/profile/avatar", fd);
      if (resp.status === "success") {
        toast({ status: "success", title: "Photo updated successfully", duration: 5000, isClosable: true });
        getProfile();
      }
    } catch (error) {
      toast({ status: "error", title: "Failed to update photo", duration: 5000, isClosable: true });
    } finally {
      setSaveLoading(false);
      setImage(null);
      setSelected(null);
    }
  };

  const handleImageDelete = async () => {
    try {
      await httpGetWithToken("employer/profile/delete-avatar");
      setImage(null);
      setProfile((prev) => ({ ...prev, avatar: "" }));
      toast({ status: "success", title: "Photo deleted", duration: 5000, isClosable: true });
      getProfile();
    } catch (error) {
      toast({ status: "error", title: "Failed to delete photo", duration: 5000, isClosable: true });
    }
  };

  const updateLinkEditing = (id: number, val: string) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, value: val } : link)));
    setEditingLink(val);
  };

  const addLink = async () => {
    if (!newLink || !newLinkValue || loading) return;
    try {
      setLoading(true);
      const resp = await httpPostWithToken("employer/profile/social-add", {
        label: newLink,
        value: newLinkValue,
      });
      if (resp.status === "success") {
        toast({ status: "success", title: "Social media link added", duration: 5000, isClosable: true });
        setNewLink("");
        setNewLinkValue("");
        setShowAddLink(false);
        getProfile();
      }
    } catch (error) {
      toast({ status: "error", title: "Failed to add link", duration: 5000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const updateLink = async (id: number) => {
    try {
      const resp = await httpPostWithToken(`employer/profile/social/${id}`, { value: editing_link });
      if (resp.status === "success") {
        toast({ status: "success", title: "Social link updated", duration: 5000, isClosable: true });
        getProfile();
      }
    } catch (error) {
      toast({ status: "error", title: "Failed to update link", duration: 5000, isClosable: true });
    }
  };

  const removeLink = async (id: number) => {
    try {
      const resp = await httpPostWithToken(`employer/profile/social-delete/${id}`, {});
      if (resp.status === "success") {
        toast({ status: "success", title: "Social link deleted", duration: 5000, isClosable: true });
        getProfile();
      }
    } catch (error) {
      toast({ status: "error", title: "Failed to delete link", duration: 5000, isClosable: true });
    }
  };

  return (
    <section className="px-2 py-8 max-w-[1100px] mx-auto">
      <div className="bg-white rounded-2xl py-8 px-[4rem] mt-8">

        {/* Avatar Section */}
        <div className="flex items-center flex-wrap gap-4 py-4">
          {profile.avatar || image ? (
            <img
              className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover"
              src={image ? (image as string) : profile.avatar}
              alt="Profile"
            />
          ) : (
            <Avatar boxSize={{ base: 16, md: 20 }} />
          )}

          {image ? (
            <>
              <button onClick={handleImageSave} className="text-green-600 font-semibold py-2 px-4 rounded border border-green-600">
                {saveLoading ? "Saving..." : "Save Photo"}
              </button>
              <button onClick={() => { setImage(null); setSelected(null); }} className="text-red-600 font-semibold py-2 px-4 rounded border border-red-300">
                Cancel
              </button>
            </>
          ) : (
            <>
              <label className="cursor-pointer bg-green-100 text-green-600 font-medium py-2 px-4 rounded">
                Upload new photo
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {profile.avatar && (
                <button type="button" onClick={handleImageDelete} className="text-pink-600 py-2 px-4 rounded border border-pink-600">
                  Delete
                </button>
              )}
            </>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="mb-8">
            <label className="block font-semibold text-green-600 text-lg mb-2">Company Name*</label>
            <input
              type="text"
              id="name"
              value={profile.name ?? ""}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full text-black border rounded-lg border-gray-300 bg-white p-4 shadow-sm focus:ring-0 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-wrap -mx-2">
            {/* Website */}
            <div className="w-full px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">Website</label>
              <input
                type="text"
                id="website"
                value={profile.website ?? ""}
                onChange={handleChange}
                placeholder="www.example.com"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Founded Date */}
            <div className="w-full sm:w-1/2 px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">Founded Date*</label>
              <input
                type="date"
                id="founded"
                value={profile.founded ?? ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
                required
              />
            </div>

            {/* Company Size */}
            <div className="w-full sm:w-1/2 px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">Company Size*</label>
              <input
                type="number"
                id="company_size"
                value={profile.company_size ?? ""}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div className="w-full sm:w-1/2 px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">Phone Number*</label>
              <input
                type="tel"
                id="phone_no"
                value={profile.phone_no ?? ""}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
                required
              />
            </div>

            {/* Industry */}
            <div className="w-full sm:w-1/2 px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">Industry / Category*</label>
              <input
                type="text"
                id="industry"
                value={profile.industry ?? ""}
                onChange={handleChange}
                placeholder="e.g. Finance, Marketing"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
                required
              />
            </div>

            {/* Country */}
            <div className="w-full sm:w-1/2 px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">Country</label>
              <select
                id="country"
                value={profile.country ?? ""}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* State */}
            <div className="w-full sm:w-1/2 px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">State</label>
              {states.length > 0 ? (
                <select
                  id="state"
                  value={profile.state ?? ""}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id="state"
                  value={profile.state ?? ""}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
                />
              )}
            </div>

            {/* City */}
            <div className="w-full sm:w-1/2 px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">City</label>
              <input
                type="text"
                id="city"
                value={profile.city ?? ""}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div className="w-full sm:w-1/2 px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input
                type="text"
                id="address"
                value={profile.address ?? ""}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Zip Code */}
            <div className="w-full sm:w-1/2 px-2 mb-8">
              <label className="block text-gray-700 font-bold mb-2">Zip Code</label>
              <input
                type="text"
                id="zipcode"
                value={profile.zipcode ?? ""}
                onChange={handleChange}
                placeholder="Zip / Postal code"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
  <label className="block font-semibold text-green-600 text-lg mb-2">About Company*</label>
  <textarea
    id="about_company"
    value={profile.about_company ?? ""}
    onChange={handleChange}
    rows={10}
    placeholder="Tell us about your company..."
    className="w-full text-black border rounded-lg border-gray-300 bg-white p-4 shadow-sm focus:ring-0 focus:outline-none"
  />
  <p className={`text-sm mt-1 ${countChars(profile.about_company ?? "") < 50 ? "text-red-500" : "text-green-600"}`}>
    {countChars(profile.about_company ?? "")} / 50 characters minimum
  </p>
</div>

          {/* Social Links */}
   <div className="bg-white rounded-2xl mt-8">
  <h2 className="font-semibold text-pink-600 text-xl mb-4">Social Media</h2>
  {(links ?? []).map((link) => (
    <div key={link.id} className="mb-4 flex items-center gap-2">
      <div className="flex-grow">
        <label className="block font-semibold text-green-600 text-lg mb-2">{link.label}</label>
        <input
          type="url"
          value={link.value ?? ""}
          onChange={(e) => updateLinkEditing(link.id, e.target.value)}
          placeholder="https://..."
          pattern="https?://.+"
          title="Please enter a valid URL starting with http:// or https://"
          className="w-full border rounded-lg border-gray-300 bg-white text-blue-600 p-2 shadow-sm focus:ring-0 focus:outline-none invalid:border-red-400"
        />
      </div>
      <button type="button" onClick={() => updateLink(link.id)} className="mt-6">
        <UilCheck size={25} color="green" />
      </button>
      <button type="button" onClick={() => removeLink(link.id)} className="mt-6">
        <UilTimes size={25} color="#ee009d" />
      </button>
    </div>
  ))}

  {showAddLink ? (
    <>
      <Divider className="my-3" />
      <div className="my-3">
        <label className="block font-semibold text-green-600 text-lg mb-2">Platform Label</label>
        <input
          type="text"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          placeholder="e.g. LinkedIn, Twitter"
          className="w-full border rounded-lg border-gray-300 bg-white text-blue-600 p-2 shadow-sm focus:ring-0 focus:outline-none"
        />
      </div>
      <div className="my-3">
        <label className="block font-semibold text-green-600 text-lg mb-2">URL</label>
        <input
          type="url"
          value={newLinkValue}
          onChange={(e) => setNewLinkValue(e.target.value)}
          placeholder="https://..."
          pattern="https?://.+"
          title="Please enter a valid URL starting with http:// or https://"
          className="w-full border rounded-lg border-gray-300 bg-white text-blue-600 p-2 shadow-sm focus:ring-0 focus:outline-none invalid:border-red-400"
        />
      </div>
      <div className="flex justify-start space-x-4 mt-4">
        <Button
          bg="#ee009d"
          color="white"
          isLoading={loading}
          onClick={() => {
            if (!newLinkValue.match(/^https?:\/\/.+/)) {
              toast({ status: "error", title: "Please enter a valid URL starting with http:// or https://", duration: 4000, isClosable: true });
              return;
            }
            addLink();
          }}
          py={2}
          px={8}
          fontSize="large"
          fontWeight="600"
          rounded="lg"
        >
          Add
        </Button>
        <button
          type="button"
          onClick={() => { setNewLink(""); setNewLinkValue(""); setShowAddLink(false); }}
          className="text-green-600 text-lg py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </>
  ) : (
    <button type="button" className="text-pink-600 text-lg" onClick={() => setShowAddLink(true)}>
      + Add social link
    </button>
  )}
</div>

          {/* Submit */}
          <div className="flex justify-start space-x-4 mt-8">
            <button
              type="submit"
              disabled={saveLoading}
              className="bg-pink-600 text-white py-2 px-8 text-lg font-medium rounded-full disabled:opacity-60"
            >
              {saveLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EmployerProfile;