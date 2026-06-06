import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
  const [users, setUsers] = useState([]);

  // Gọi API để lấy danh sách user khi component được render lần đầu tiên
  useEffect(() => {
    fetchModel("/api/user/list")
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách user từ backend:", error);
      });
  }, []);

  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            {/* Sử dụng component={Link} để biến mỗi ListItem thành liên kết điều hướng */}
            <ListItem button component={Link} to={`/users/${item._id}`}>
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;

