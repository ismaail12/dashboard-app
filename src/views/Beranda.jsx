import React from 'react'
import { Box, Typography } from '@mui/material';

const Beranda = () => {
  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
        paddingY={3}>
        <Typography variant="h5" fontWeight={'bold'} align='center' color="initial">Selamat datang di dashboard Sistem Presensi Karyawan
          <br />
          PT KAIA Anugerah Internasional</Typography>
      </Box>

    </Box>
  )
}

export default Beranda