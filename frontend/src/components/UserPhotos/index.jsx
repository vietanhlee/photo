import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos(props) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Lấy thông tin user để cập nhật tiêu đề TopBar
    fetchModel(`/api/user/${userId}`).then((userData) => {
      setUser(userData);
      props.changeContext(`Photos of ${userData.first_name} ${userData.last_name}`);
    });

    // 2. Lấy danh sách ảnh của user
    fetchModel(`/api/photo/photosOfUser/${userId}`).then((photoData) => {
      setPhotos(photoData);
    });
  }, [userId]);

  if (!user) {
    return <div>Đang tải hình ảnh...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ảnh của {user.first_name} {user.last_name}</h2>

      {photos.map((photo) => (
        <div key={photo._id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "5px" }}>
          <p style={{ color: "gray", fontSize: "0.85rem" }}>
            Đăng ngày: {new Date(photo.date_time).toLocaleString()}
          </p>
          
          <div style={{ margin: "15px 0", textAlign: "center" }}>
            <img
              src={require(`../../images/${photo.file_name}`)}
              alt={photo.file_name}
              style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          <h4>Bình luận ({photo.comments ? photo.comments.length : 0}):</h4>
          {photo.comments && photo.comments.length > 0 ? (
            photo.comments.map((comment) => (
              <div key={comment._id} style={{ marginLeft: "20px", marginTop: "10px", borderLeft: "2px solid blue", paddingLeft: "10px" }}>
                <p style={{ margin: "5px 0" }}>
                  <Link to={`/users/${comment.user._id}`} style={{ fontWeight: "bold", textDecoration: "none" }}>
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>
                  <span style={{ fontSize: "0.8rem", color: "gray", marginLeft: "10px" }}>
                    {new Date(comment.date_time).toLocaleString()}
                  </span>
                </p>
                <p style={{ margin: "5px 0" }}>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "gray" }}>Chưa có bình luận nào.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;


