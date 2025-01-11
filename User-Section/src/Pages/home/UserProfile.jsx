import React, { useState } from "react";
import MyOrderPage from "./My_Order";
import { CgOverflow } from "react-icons/cg";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState(""); // Default to My Order

  const renderContent = () => {
    switch (activeSection) {
      case "My Order":
        return <MyOrderPage />;
      case "Personal":
      // return <PersonalPage />;
      case "My Favorite":
      // return <MyFavoritePage />;
      case "Profile":
      default:
        return (
          <ProfileContent
            formData={formData}
            handleChange={handleChange}
            handleSignOut={handleSignOut}
            handleSaveChanges={handleSaveChanges}
            setActiveSection={setActiveSection}
          />
        );
    }
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    location: "",
    address: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("Saved data:", formData);
  };

  const handleSignOut = () => {
    console.log("Signed out");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={{ ...styles.sidebarProfile, cursor: 'pointer' }} onClick={() => setActiveSection("Profile")} >
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              style={styles.sidebarProfileImage}
            />
            <div style={styles.sidebarTextContainer}>
              <p style={styles.sidebarProfileName}>Chan Senghak</p>
              <p style={styles.sidebarProfileEmail}>ChanSenghak@gmail.com</p>
            </div>
          </div>
          <div style={styles.sidebarArrow}>
            <span>&gt;</span>
          </div>
        </div>
        <ul style={styles.sidebarMenu}>
          <li
            style={styles.sidebarItem(activeSection === "My Order")}
            onClick={() => setActiveSection("My Order")}
          >
            My Order
          </li>
          <li
            style={styles.sidebarItem(activeSection === "Personal")}
            onClick={() => setActiveSection("Personal")}
          >
            Personal
          </li>
          <li
            style={styles.sidebarItem(activeSection === "My Favorite")}
            onClick={() => setActiveSection("My Favorite")}
          >
            My Favorite
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
};
const ProfileContent = ({ formData, handleChange, handleSignOut, handleSaveChanges, setActiveSection }) => {
  return (
    <div>
      <div style={styles.headerContainer}>
        <div style={styles.profileInfo} onClick={() => setActiveSection("Profile")}>
          <img
            src="https://via.placeholder.com/60"
            alt="Profile"
            style={styles.profileImageHeader}
          />
          <div style={styles.textContainer} >
            <h3 style={styles.profileName}>Chan Senghak</h3>
            <p style={styles.profileRole}>Re-seller</p>
            <p style={styles.profileLocation}>Cambodia, Phnom Penh</p>
          </div>
        </div>
        <div style={styles.actionButtons}>
          <button style={styles.uploadButton}>Upload Photo</button>
          <button style={styles.deleteButton}>Delete</button>
        </div>
      </div>

      {/* Form Section */}
      <div style={styles.form}>
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Email Address", name: "email" },
          { label: "User Name", name: "username" },
          { label: "Location", name: "location" },
          { label: "Address", name: "address" },
          { label: "Phone Number", name: "phoneNumber" },
          { label: "Current Password", name: "currentPassword", type: "password" },
          { label: "New Password", name: "newPassword", type: "password" },
          { label: "Confirm New Password", name: "confirmPassword", type: "password" },
        ].map((field, idx) => (
          <div key={idx} style={styles.formField}>
            <label style={styles.formLabel}>{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtonsBottom}>
        <button style={styles.signOutButton} onClick={handleSignOut}>
          Sign Out
        </button>
        <button style={styles.saveChangesButton} onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  sidebar: {
    width: "25%",
    backgroundColor: "#f4f4f4",
    padding: "15px", // Adjusted padding
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sidebarHeader: {
    backgroundColor: "#a8d5a5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px", // Reduced padding for smaller size
    borderRadius: "8px",
    marginBottom: "15px", // Reduced margin
    width: "100%",
  },
  sidebarProfile: {
    display: "flex",
    alignItems: "center",
  },
  sidebarProfileImage: {
    width: "40px", // Reduced profile image size
    height: "40px", // Reduced profile image size
    borderRadius: "50%",
    marginRight: "10px",
  },
  sidebarTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  sidebarProfileName: {
    fontSize: "14px", // Reduced font size
    fontWeight: "bold",
    margin: 0,
  },
  sidebarProfileEmail: {
    fontSize: "12px", // Reduced font size
    color: "#333",
    margin: 0,
  },
  sidebarArrow: {
    fontSize: "16px", // Reduced arrow size
    fontWeight: "bold",
    color: "#000",
  },
  sidebarMenu: {
    listStyle: "none",
    padding: 0,
    width: "100%",
  },
  sidebarItem: (isActive) => ({
    padding: "8px 15px", // Reduced padding
    cursor: "pointer",

    borderBottom: "1px solid #ddd",
    textAlign: "left",
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "green" : "inherit", // Change color when active
  }),
  mainContent: {
    flex: 1,
    padding: "20px",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px", // Reduced margin
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
  },
  profileImageHeader: {
    width: "50px", // Reduced profile image size
    height: "50px", // Reduced profile image size
    borderRadius: "50%",
    marginRight: "15px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  profileRole: {
    margin: 0,
    fontSize: "13px", // Reduced font size
    color: "#888",
  },
  profileLocation: {
    margin: 0,
    fontSize: "13px", // Reduced font size
    color: "#aaa",
  },
  actionButtons: {
    display: "flex",
    gap: "8px", // Reduced gap
  },
  uploadButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "8px 12px", // Reduced padding
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "transparent",
    color: "#000",
    padding: "8px 12px", // Reduced padding
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px", // Reduced gap
    marginBottom: "20px",
  },
  formField: {
    display: "flex",
    flexDirection: "column",
  },
  formLabel: {
    marginBottom: "5px",
    fontSize: "14px",
  },
  input: {
    padding: "8px", // Reduced padding
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  actionButtonsBottom: {
    display: "flex",
    justifyContent: "space-between",
  },
  signOutButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: "8px 15px", // Reduced padding
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  saveChangesButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 15px", // Reduced padding
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default UserProfile;
