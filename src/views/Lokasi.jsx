import React, { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import CustomFormDialog from '../components/CustomFormDialog'
import { API_URL } from '../utils/constant';

const contents = [
  { label: 'Longitude', name: 'long' },
  { label: 'Latitude', name: 'lat' },
];




const Lokasi = () => {


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [lokasi, setLokasi] = useState({
    long: '',
    lat: '',
  });

  async function handleEditOfficeLocation(params) {
    await axios.patch(`${API_URL}offlocs/${params.id}`, params, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then(response => {
      
      if (response.status == 200) {
        setOpen(false);
      }
    }).catch(error => console.log(error));
  }

  async function getLocations() {
    return await axios.get(`${API_URL}offlocs`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then((response) => {
      setLokasi({
        long: response.data.data.long,
        lat: response.data.data.lat,
      })
    }).catch((error) => {
      console.log(error);
    });
  }



  useEffect(() => {
    getLocations();
  }, []);


  return (
    <>
      <Box>

      <CustomFormDialog title='Form Edit Lokasi' dataForm={lokasi} contents={contents} action={(value) => {
            handleEditOfficeLocation(value);
          }} open={open} onClose={handleClose} />

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
          paddingY={3}>
          <Typography variant="h5" fontWeight={'bold'} color="initial">Lokasi Kantor</Typography>
        </Box>
        <Typography variant="h6" fontWeight={'bold'} color="initial">Lokasi kantor saat ini: <br />
          Longitude: {lokasi.long} <br />
          Latitude: {lokasi.lat}</Typography>
        <Button variant="contained" sx={{
          marginY: 3
        }}
        onClick={handleClickOpen}
        >
          Edit Lokasi Kantor
        </Button>
        <Box paddingY={3}>
        </Box>

      </Box>
    </>
  )
}

export default Lokasi