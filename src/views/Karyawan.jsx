import React, { useState, useEffect } from 'react'
import CustomFormDialog from '../components/CustomFormDialog'
import PaginationTable from '../components/PaginationTable';
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../utils/constant';

const contents = [
  { label: 'Nama', name: 'name' },
  { label: 'Jabatan', name: 'jabatan' },
  { label: 'Email', name: 'email' },
  { label: 'Username', name: 'username' },
  { label: 'Kontak', name: 'kontak' },
  { label: 'Alamat', name: 'alamat' }
];


const columns = [
  { id: 'name', label: 'Nama', minWidth: 170 },
  { id: 'jabatan', label: 'Jabatan', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'username', label: 'Username', minWidth: 100, align: 'left' },
  { id: 'kontak', label: 'Kontak', minWidth: 100, align: 'left' },
  { id: 'alamat', label: 'Alamat', minWidth: 200, align: 'left' },
];



const Karyawan = () => {

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [isAdd, setAdd] = useState(false);

  function toogleIsAdd() {
    setAdd(!isAdd);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getKaryawan() {
    await axios.get(`${API_URL}users`,
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        params: {
          "role": "karyawan"
        }
      })
      .then(function (response) {
        const rowsResponse = response.data.data.reverse();
        setRows(rowsResponse);

      })
      .catch(function (error) {
        console.log(error);
      })
  }


  async function handleTambahKaryawan(params) {

    await axios.post(`${API_URL}users`,
      {
        ...params,
        password: "12345678",
        role: "karyawan",
        password_confirmation: "12345678"
      },
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(function (response) {
        toogleIsAdd();
        if (response.status == 200) {
          setOpen(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  useEffect(() => {
    getKaryawan();
  }, [isAdd]);

  return (
    <>
<Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          paddingY={3}
        >
          <CustomFormDialog
            title="Form Tambah Karyawan"
            dataForm={{}}
            contents={contents}
            action={(value) => {
              handleTambahKaryawan(value);
            }}
            open={open}
            onClose={handleClose}
          />
          <Typography variant="h5" fontWeight="bold" color="initial">
            Data Karyawan
          </Typography>
        </Box>

        <Button variant="contained" onClick={handleClickOpen}>
          Tambah Karyawan
        </Button>

        <Box paddingY={3}>
          <PaginationTable rows={rows} columns={columns} contents={contents} />
        </Box>
      </Box>
    </>
  )
}

export default Karyawan