import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "../axios.js";
import { AuthContext } from "../context/AuthContext.js";

const Toolbar = ({ selected, setData, data }) => {
  const { logout } = React.useContext(AuthContext);

  const handlerDeleteClick = async () => {
    try {
      selected.map(async (id) => {
        await axios
          .delete(`/main/delete/:${id}`)
          .then((res) => {
            const data = JSON.parse(localStorage.getItem("userData"));
            if (id === data.userId) logout();
            console.log("deleted: ", res.data);
            setData(res.data);
          })
          .catch((e) => console.log(e));
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlerBlockClick = async () => {
    try {
      selected.map(async (id) => {
        await axios
          .patch(`/main/block/:${id}`)
          .then((res) => {
            const data = JSON.parse(localStorage.getItem("userData"));
            if (id === data.userId) logout();
            console.log("blocked: ", res.data);
            setData(res.data);
          })
          .catch((e) => console.log(e));
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlerUnblockClick = async () => {
    try {
      selected.map(async (id) => {
        await axios
          .patch(`/main/unblock/:${id}`)
          .then((res) => {
            console.log("unblocked: ", res.data);
            setData(res.data);
          })
          .catch((e) => console.log(e));
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box align="left">
      <h1 align="left">Toolbar</h1>
      <Tooltip title="Block">
        <IconButton color="warning" onClick={handlerBlockClick}>
          <LockIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Unblock">
        <IconButton color="primary" onClick={handlerUnblockClick}>
          <LockOpenIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={handlerDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Toolbar;
