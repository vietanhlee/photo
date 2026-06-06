import React, { useState, useEffect } from "react";
import { Typography, Link as MuiLink } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos (props) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin user để update TopBar
    fetchModel(`/api/user/${userId}`).then((userData) => {
      setUser(userData);
      props.changeContext("Photos of " + userData.first_name + " " + userData.last_name);
    });

    // Lấy danh sách ảnh của user
    fetchModel(`/api/photo/photosOfUser/${userId}`).then((photoData) => {
      setPhotos(photoData);
    });
  }, [userId]);

  if (!user) {
    return <Typography>Đang tải hình ảnh...</Typography>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Ảnh của {user.first_name} {user.last_name}
      </Typography>

      {photos.map((photo) => (
        <div key={photo._id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "5px" }}>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Đăng ngày: {new Date(photo.date_time).toLocaleString()}
          </Typography>
          
          <div style={{ margin: "15px 0", textAlign: "center" }}>
            <img
              src={require(`../../images/${photo.file_name}`)}
              alt={photo.file_name}
              style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          <Typography variant="h6">Bình luận ({photo.comments.length}):</Typography>
          {photo.comments.length === 0 ? (
            <p style={{ color: "gray", fontSize: "0.9rem" }}>Chưa có bình luận nào.</p>
          ) : (
            photo.comments.map((comment) => (
              <div key={comment._id} style={{ marginLeft: "20px", marginTop: "10px", borderLeft: "2px solid #1976d2", paddingLeft: "10px" }}>
                <Typography variant="subtitle2">
                  <MuiLink component={Link} to={`/users/${comment.user._id}`} style={{ fontWeight: "bold", textDecoration: "none" }}>
                    {comment.user.first_name} {comment.user.last_name}
                  </MuiLink>
                  <span style={{ fontSize: "0.8rem", color: "gray", marginLeft: "10px" }}>
                    {new Date(comment.date_time).toLocaleString()}
                  </span>
                </Typography>
                <p style={{ margin: "5px 0", fontSize: "0.95rem" }}>{comment.comment}</p>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;


