import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../http/users";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanged, setHasChanged] = useState(undefined);
  const { user } = useSelector((state) => state.auth);
  const [currUser, setCurrUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrUser({ ...currUser, [name]: value });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setCurrUser({ ...user }); // Reset user data to original if cancelling edit
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const res = await updateUser(currUser);
      setHasChanged(res);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div className="flex flex-col  items-center gap-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-darkBrand font-bold">Profile</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col gap-4">
          {[
            { id: "name", label: "Name", type: "text", placeholder: "Name" },
            { id: "email", label: "Email", type: "email", placeholder: "Email" },
            { id: "address", label: "Address", type: "text", placeholder: "Address" },
            { id: "phone", label: "Phone", type: "text", placeholder: "Phone" }
          ].map(({ id, label, type, placeholder }) => (
            <div key={id} className="flex flex-col gap-1">
              <label htmlFor={id} className="text-lg font-medium">{label}:</label>
              <input
                type={type}
                id={id}
                name={id}
                value={currUser[id]}
                disabled={!isEditing}
                placeholder={placeholder}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleEditToggle}
              className={`px-4 py-2 rounded-md ${isEditing ? 'bg-red-600 hover:bg-red-700' : 'bg-brand hover:bg-brand-dark'} text-white`}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-md"
              >
                Save
              </button>
            )}
            {hasChanged && <p className="text-green-500 mt-2">{hasChanged.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
