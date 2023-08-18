import React, { useState, useEffect } from 'react'
import CustomFormDialog from '../components/CustomFormDialog'
import PaginationTable from '../components/PaginationTable';
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import PaginationTablePresence from '../components/PaginationTablePresence';
import { API_URL } from '../utils/constant';

const contents = [
  { label: 'ID', name: 'id' },
  { label: 'Nama Karyawan', name: 'name' },
  { label: 'Jenis Jam Kerja', name: 'type' },
  { label: 'Jam Masuk', name: 'created_at' },
  { label: 'Jam Pulang', name: 'clockout' },
  
];
const columns = [
  { label: 'ID', id: 'id' },
  { label: 'Nama Karyawan', id: 'name' },
  { label: 'Jenis Jam Kerja', id: 'type' },
  { label: 'Jam Masuk', id: 'created_at' },
  { label: 'Jam Pulang', id: 'clockout' },

  
];



const Karyawan = () => {

  const [rows, setRows] = useState([]);


  async function getPresensi() {
    await axios.get(`${API_URL}presences`,
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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

  



  useEffect(() => {
    getPresensi();
  }, []);

  return (
    <>
      <Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
          paddingY={3}>
          <Typography variant="h5" fontWeight={'bold'} color="initial">Data Presensi</Typography>
        </Box>

        <Box paddingY={3}>
          <PaginationTablePresence rows={rows} columns={columns} contents={contents} />
        </Box>

      </Box>
    </>
  )
}

export default Karyawan