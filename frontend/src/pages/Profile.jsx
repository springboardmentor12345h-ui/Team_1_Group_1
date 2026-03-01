import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState("");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    college: user?.college || "",
    phone: user?.phone || "",
  });

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  // ================= UPDATE PROFILE =================
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("college", form.college);
      formData.append("phone", form.phone);

      if (image) {
        formData.append("profileImage", image);
      }

      await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully");
      setEditing(false);
      window.location.reload();

    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  // ================= DELETE ACCOUNT =================
  const handleDeleteAccount = async () => {
    if (confirmDelete !== "DELETE") {
      toast.error("Type DELETE to confirm");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        "http://localhost:5000/api/auth/delete-account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Account deleted successfully");
      logout();
      navigate("/register");

    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-44 bg-gradient-to-r from-blue-600 to-blue-500 mb-20">

        {/* PROFILE IMAGE */}
        <div className="absolute -bottom-14 left-0 right-0 flex justify-center">
          <div className="relative w-28 h-28 rounded-2xl border-4 border-white shadow-xl overflow-hidden">

            {user?.profileImage ? (
              <img
                src={`http://localhost:5000/uploads/${user.profileImage}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-700 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {initials}
                </span>
              </div>
            )}

            {editing && (
              <label className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs cursor-pointer">
                Change
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6">

        <h2 className="text-xl font-bold text-gray-800">
          Personal Information
        </h2>

        <InputField
          label="Full Name"
          value={form.name}
          editing={editing}
          onChange={(v) => setForm({ ...form, name: v })}
        />

        <InputField
          label="Email"
          value={form.email}
          editing={false}
        />

        <InputField
          label="College"
          value={form.college}
          editing={editing}
          onChange={(v) => setForm({ ...form, college: v })}
        />

        <InputField
          label="Phone"
          value={form.phone}
          editing={editing}
          onChange={(v) => setForm({ ...form, phone: v })}
        />

        {/* PROFILE BUTTONS */}
        <div className="flex gap-3 pt-4">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-5 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="px-5 py-2 bg-gray-800 text-white rounded-lg"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* CHANGE PASSWORD */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Change Password
          </h3>

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            onClick={handleChangePassword}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Update Password
          </button>
        </div>

        {/* DELETE ACCOUNT */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-semibold text-red-600">
            Danger Zone
          </h3>

          <p className="text-sm text-gray-500">
            Type DELETE to permanently remove your account.
          </p>

          <input
            type="text"
            placeholder="Type DELETE"
            value={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.value)}
            className="w-full border border-red-300 rounded-lg px-3 py-2"
          />

          <button
            onClick={handleDeleteAccount}
            className="px-5 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, editing, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-600">{label}</label>

      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
      ) : (
        <div className="border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-700">
          {value || "Not provided"}
        </div>
      )}
    </div>
  );
}