import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import MapComponent from "../reusable/map/MapComponent";
import { UilCheck, UilTimes } from "@iconscout/react-unicons";
import {
  httpGetWithToken,
  httpGetWithoutToken,
  httpPostWithToken,
} from "../../utils/http_utils";
import { iProfile } from "../../models/profle";
import { iSocial } from "../../models/social";
import {
  Avatar,
  Button,
  Divider,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AppContext } from "../../global/state";
import DeleteAction from "../confirm_modal";
import { useNavigate } from "react-router-dom";

const ProfileImageUpload: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser }: any = useContext(AppContext);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [profile, setProfile] = useState<iProfile>({});
  const [links, setLinks] = useState<iSocial[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);

  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [expected_salary, setExpectedSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const [showAddLink, setShowAddLink] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [newLinkValue, setNewLinkValue] = useState("");
  const [editing_link, setEditingLink] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  //  Fetch profile
  const getProfile = async () => {
    try {
      const res = await httpGetWithToken("profile");
      const profileData = res.data ?? {};
      console.log("Avatar value:", profileData.avatar);
      setProfile(profileData);
      setFullname(profileData.name ?? "");
      setBio(profileData.bio ?? "");
      setCity(profileData.city ?? "");
      setCountry(profileData.country ?? "");
      setState(profileData.state ?? "");
      setZipCode(profileData.zip_code ?? "");
      setAddress(profileData.address ?? "");
      setExpectedSalary(profileData.expected_salary ?? "");
      setExperience(profileData.experience ?? "");
      setSkills(profileData.skills ?? "");
      setEducation(profileData.education ?? "");
      setLinks(profileData.social_medias ?? []);
      if (profileData.country) getStates(profileData.country);
      updateUser(profileData);
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast({ status: "error", title: "Failed to load profile" });
    }
  };

  const getCountries = async () => {
    try {
      const resp = await httpGetWithoutToken("countries");
      setCountries(resp.data ?? []);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  const getStates = async (code: string) => {
    try {
      const resp = await httpGetWithoutToken(`countries/${code}`);
      setStates(resp.data ?? []);
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const countChars = (text: string) => text.length;

const validate = () => {
  if (!selected && !profile.avatar) {
    toast({ status: "error", title: "Please upload a profile photo" });
    return false;
  }
  if (expected_salary && !/^\d+$/.test(expected_salary.trim())) {
  toast({ status: "error", title: "Expected Salary must contain numbers only" });
  return false;
}
  if (countChars(bio) < 50) {
    toast({ status: "error", title: "Bio must be at least 50 characters" });
    return false;
  }
  if (!experience.trim()) {
    toast({ status: "error", title: "Experience is required" });
    return false;
  }
  if (!skills.trim()) {
    toast({ status: "error", title: "Skills are required" });
    return false;
  }
  if (!education.trim()) {
    toast({ status: "error", title: "Education is required" });
    return false;
  }
  return true;
};

  //  Update profile details (including new fields)
 const updateProfile = async () => {
  if (loading) return;
  if (!validate()) return; // 👈 add this line
  setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", fullname);
      fd.append("bio", bio);
      fd.append("country", country);
      fd.append("state", state);
      fd.append("city", city);
      fd.append("zip_code", zipcode);
      fd.append("address", address);
      fd.append("expected_salary", expected_salary);
      fd.append("experience", experience);
      fd.append("skills", skills);
      fd.append("education", education);

      if (cvFile) {
        fd.append("cv", cvFile);
      }

      const resp = await httpPostWithToken("profile", fd);
      if (resp.status === "success") {
        toast({
          status: "success",
          title: "Profile updated",
          duration: 5000,
          isClosable: true,
        });
        getProfile();
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast({ status: "error", title: "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  //  Save profile image
  const handleImageSave = async () => {
    if (!selected || saveLoading) return;
    const fd = new FormData();
    fd.append("file", selected);
    setSaveLoading(true);
    try {
      const resp = await httpPostWithToken("profile", fd);
      if (resp.status === "success") {
        await getProfile();
        toast({
          status: "success",
          title: "Profile picture updated",
          duration: 5000,
          isClosable: true,
        });
        setImage(null);
        setSelected(null);
      }
    } catch (err) {
      console.error("Error saving image:", err);
      toast({ status: "error", title: "Failed to save image" });
    } finally {
      setSaveLoading(false);
    }
  };

  //  File & social link handlers
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelected(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvFile(file);
  };

  const addLink = async () => {
    if (!newLink || !newLinkValue || loading) return;
    setLoading(true);
    try {
      const fd = { label: newLink, value: newLinkValue };
      const resp = await httpPostWithToken("profile/social-add", fd);
      if (resp.status === "success") {
        await getProfile();
        toast({
          status: "success",
          title: "Social Media Link Added",
          duration: 5000,
          isClosable: true,
        });
        setShowAddLink(false);
        setNewLink("");
        setNewLinkValue("");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeLink = async (id: number) => {
    try {
      await httpPostWithToken(`profile/social-delete/${id}`);
      await getProfile();
      toast({
        status: "success",
        title: "Social link deleted",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error deleting link:", err);
      toast({ status: "error", title: "Failed to delete link" });
    }
  };

  const updateLink = async (id: number) => {
    try {
      const fd = { value: editing_link };
      await httpPostWithToken(`profile/social/${id}`, fd);
      toast({
        status: "success",
        title: "Social link updated",
        duration: 5000,
        isClosable: true,
      });
      await getProfile();
    } catch (err) {
      console.error("Error updating link:", err);
    }
  };

  const updateLinkEditing = (id: number, val: string) => {
    const newLinks = links.map((link) =>
      link.id === id ? { ...link, value: val } : link
    );
    setLinks(newLinks);
    setEditingLink(val);
  };

  const handleImageDelete = () => onOpen();

  useEffect(() => {
    getProfile();
    getCountries();
  }, []);

  return (
    <section className=" px-2 py-8 max-w-[1100px] mx-auto">
      <DeleteAction
        onClose={onClose}
        onFinished={getProfile}
        title="Delete Avatar"
        isOpen={isOpen}
        url="profile/delete-avatar"
      />

      {/* Profile Info */}
      <div className="bg-white rounded-2xl py-8 px-[2rem] mt-8">
        <div className="flex items-center flex-wrap gap-4 py-4">
          {profile.avatar || image ? (
            <img
              className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover"
              src={image ? (image as string) : profile.avatar ?? "/default-avatar.png"}
              alt="Profile"
            />
          ) : (
            <Avatar boxSize={{ base: 16, md: 20 }} />
          )}

          {image ? (
            <>
              <button
                onClick={handleImageSave}
                className="text-green-600 py-2 px-4 border rounded"
              >
                {saveLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setImage(null)}
                className="text-red-600 py-2 px-4 border rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <label className="cursor-pointer bg-green-100 text-green-600 py-2 px-4 rounded">
                Upload new photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {profile.avatar && (
                <button
                  onClick={handleImageDelete}
                  className="text-pink-600 py-2 px-4 border rounded"
                >
                  Delete
                </button>
              )}
            </>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-green-600 text-lg mb-2">
            Full Name*
          </label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
  <label className="block font-semibold text-green-600 text-lg mb-2">
    Bio*
  </label>
  <textarea
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    rows={10}
    className="w-full border rounded-lg p-4"
  ></textarea>
  <p className={`text-sm mt-1 ${countChars(bio) < 50 ? "text-red-500" : "text-green-600"}`}>
    {countChars(bio)} / 50 characters minimum
  </p>
</div>

        {/* New Fields */}
        <div className="mb-4">
          <label className="block text-green-600 font-semibold mb-2">
            Experience
          </label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-600 font-semibold mb-2">
            Skills
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="e.g., React, Node.js, UI Design"
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-600 font-semibold mb-2">
            Education
          </label>
          <textarea
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
  <label className="block text-green-600 font-semibold mb-2">
    Expected Salary / Budget
  </label>
  <input
    type="text"
    value={expected_salary}
    onChange={(e) => {
      const val = e.target.value;
      if (/[^0-9]/.test(val)) {
        toast({ status: "warning", title: "Only numbers are accepted", duration: 2000, isClosable: true });
      }
      setExpectedSalary(val.replace(/[^0-9]/g, ""));
    }}
    className="w-full border rounded-lg p-2"
    placeholder="e.g. 50000"
    inputMode="numeric"
  />
  <p className="text-xs text-gray-500 mt-1">Enter numbers only (e.g. 50000)</p>
</div>

      <div className="mb-4">
  {profile.smartcv ? (
    <a
      href={profile.smartcv}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-600 text-white px-4 py-2 rounded-lg inline-block hover:bg-green-700"
    >
      View SmartCV
    </a>
  ) : (
    <p className="text-gray-500">No SmartCV created yet.</p>
  )}
</div>

      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl p-8 mt-8">
        <label className="block text-xl text-[#ee009d] mb-2">
          Address & Location
        </label>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-green-600 font-semibold mb-2">
              Country*
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-green-600 font-semibold mb-2">
              City*
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-green-600 font-semibold mb-2">
              Zip Code*
            </label>
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-4">
            <label className="block text-green-600 font-semibold mb-2">
              State*
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-green-600 font-semibold mb-2">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="mb-2">
          <MapComponent />
        </div>
      </div>

      <div className="flex space-x-4 mt-8">
        <Button bg="#ee009d" color="white" isLoading={loading} onClick={updateProfile}>
          Save
        </Button>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-green-600 py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

export default ProfileImageUpload;
