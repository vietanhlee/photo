import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail(props) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Tải dữ liệu user và cập nhật TopBar ngay lập tức
    fetchModel(`/api/user/${userId}`).then((data) => {
      setUser(data);
      props.changeContext(data.first_name + " " + data.last_name);
    });
  }, [userId]);

  if (!user) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">{user.first_name} {user.last_name}</Typography>
      <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
        <strong>Nghề nghiệp:</strong> {user.occupation}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Địa điểm:</strong> {user.location}
      </Typography>
      <Typography variant="body1" style={{ marginTop: "10px" }}>
        <strong>Giới thiệu bản thân:</strong> {user.description}
      </Typography>

      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" component={Link} to={`/photos/${user._id}`}>
          Xem ảnh của {user.first_name}
        </Button>
      </div>
    </div>
  );
}

export default UserDetail;


