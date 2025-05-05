import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email) {
      setUserData(storedUser);
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.email) return;

    const categories = ["marketplace", "lostPets", "alerts", "events"];
    let posts = [];

    categories.forEach((cat) => {
      const data = JSON.parse(localStorage.getItem(cat)) || [];
      data.forEach((post) => {
        if (post.email === storedUser.email) {
          posts.push({ ...post, category: cat });
        }
      });
    });

    setUserPosts(posts);
  }, [userData]);

  const handleDelete = async (postId, category) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    let type;

    if(category === "alerts") {
        type = "alert";
    } else if (category === "lostPets") {
        type = "lostPet";
    } else if(category === "events") {
        type = "event";
    } else if (category === "marketplace") {
        type = "marketplace";
    }

    try {
      const response = await fetch(`/api/delete/${type}/${postId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.status === "ok") {
        const posts = JSON.parse(localStorage.getItem(category)) || [];
        const updated = posts.filter((p) => p._id !== postId);
        localStorage.setItem(category, JSON.stringify(updated));

        setUserPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        alert("Failed to delete post.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img
            src="/img/profile.png"
            alt="Profile"
            className="profile-avatar"
          />
          <div className="profile-edit-badge">✏️</div>
        </div>
        <div className="profile-header-info">
          <h1 className="profile-name">
            {userData.firstName || "First Name"}{" "}
            {userData.lastName || "Last Name"}
          </h1>
          <p className="profile-email">{userData.email}</p>
          <div className="profile-location">
            <span>{userData.community || "Your Community"}</span>
          </div>
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Address Line 1</span>
              <span className="info-value">{userData.address1 || "-"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address Line 2</span>
              <span className="info-value">{userData.address2 || "-"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">City</span>
              <span className="info-value">{userData.city || "-"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">State</span>
              <span className="info-value">{userData.state || "-"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Zipcode</span>
              <span className="info-value">{userData.zip || "-"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Country</span>
              <span className="info-value">
                {userData.country || "United States"}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">Your Posts</h2>
            <span className="post-count">{userPosts.length} posts</span>
          </div>

          {userPosts.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any posts yet</p>
              <button className="create-post-btn">
                Create Your First Post
              </button>
            </div>
          ) : (
            <div className="posts-grid">
              {userPosts.map((post) => (
                <div key={post._id} className="post-card">
                  {post.image && post.image.data ? (
                    <div
                      className="post-image"
                      style={{
                        backgroundImage: `url(data:${post.image.contentType};base64,${post.image.data})`,
                      }}
                    ></div>
                  ) : (
                    <div className="post-image placeholder">
                      <span>No Image</span>
                    </div>
                  )}
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="post-category">
                        {post.category || "General"}
                      </span>
                      <span className="post-date">
                        {new Date(
                          post.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-description">{post.description}</p>
                    <div className="post-actions">
                      <button
                        onClick={() => handleDelete(post._id, post.category)}
                        className="profile-delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
