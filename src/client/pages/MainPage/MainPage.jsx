import React, { useState, useEffect } from "react";
import { Button, Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Toolbar from "../../components/Toolbar.jsx";

import { AuthContext } from "../../context/AuthContext.js";
import axios from "../../axios.js";

import "./MainPage.scss";

const MainPage = () => {
  const { logout } = React.useContext(AuthContext);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios.get("/main/users").then((res) => {
        setData(res.data);
      });
    }
    getData();
  }, []);
  useEffect(() => {});
  let columns = [
    { field: "id", headerName: "ID", width: 210 },
    { field: "fullName", headerName: "Full Name", width: 150 },
    { field: "email", headerName: "e-mail", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "Date of Registration",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "loginDate",
      headerName: "Date of Recent Login",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];
  let rows = data.map((row) => ({
    id: row._id,
    fullName: row.fullName,
    email: row.email,
    status: row.status,
    createdAt: row.createdAt,
    loginDate: row.loginDate,
  }));

  return (
    <Container>
      <Button variant="contained" sx={{ mt: 3, mb: 1 }} onClick={logout}>
        Log out
      </Button>

      <Toolbar selected={selected} setData={setData} data={data} />

      <Box sx={{ height: 400 }}>
        <DataGrid
          sx={{
            justifyContent: "space-between",
          }}
          rows={rows}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          checkboxSelection
          rowHeight={40}
          onSelectionModelChange={(newSelection) => {
            setSelected(newSelection);
          }}
        />
      </Box>
    </Container>
  );
};

export default MainPage;
