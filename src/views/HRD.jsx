import React, { useState, useEffect } from 'react';
import CustomFormDialog from '../components/CustomFormDialog'
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import PaginationTable from '../components/PaginationTable';
import { API_URL } from '../utils/constant';

const contents = [
  { label: 'Nama', name: 'name' },
  { label: 'Email', name: 'email' },
  { label: 'Username', name: 'username' },
  { label: 'Kontak', name: 'kontak' },
  { label: 'Alamat', name: 'alamat' }
];


const columns = [
  { id: 'name', label: 'Nama', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'username',
    label: 'Username',
    minWidth: 100,
    align: 'left',

  },
  {
    id: 'kontak',
    label: 'Kontak',
    minWidth: 100,
    align: 'left',

  },
  {
    id: 'alamat',
    label: 'Alamat',
    minWidth: 200,
    align: 'left',
  },
];





function HRD() {

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

  async function getHrd() {
    await axios.get(`${API_URL}users`,
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        params: {
          "role": "hrd"
        }
      })
      .then(function (response) {
        const rowsResponse = response.data.data;
        setRows(rowsResponse);

      })
      .catch(function (error) {
        console.log(error);
      })
  }

  async function handleTambahHrd(params) {

    await axios.post(`${API_URL}users`,
      {
        ...params,
        jabatan: "hrd",
        password: "12345678",
        role: "hrd",
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
    getHrd();
  }, [isAdd]);

  return (
    <>
      <CustomFormDialog title='Form Tambah HRD' contents={contents} dataForm={{}} action={(value) => handleTambahHrd(value)} open={open} onClose={handleClose} />
      <Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
          paddingY={3}>
          <Typography variant="h5" fontWeight={'bold'} color="initial">Data HRD</Typography>
        </Box>

        <Button variant="contained" onClick={handleClickOpen}>
          Tambah HRD
        </Button>

        <Box paddingY={3}>
        <PaginationTable  rows={rows} columns={columns} contents={contents}/>
        </Box>
      </Box>
    </>
  );
}

export default HRD;
