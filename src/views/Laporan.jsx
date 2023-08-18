import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { API_URL } from '../utils/constant';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import 'jspdf-autotable';



async function getPresenceByMonth(month) {


  return await axios.get(`${API_URL}presences/month/${month}`,
    {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(function (response) {
      return response;

    })
    .catch(function (error) {
      console.log(error);
    })
}


function downloadPdf(data, name) {


  const body = [];


  data.map((val) => {
    body.push(val);
  });

  
  const doc = new jsPDF();
  doc.text('Laporan Presensi', 20, 10);
  doc.autoTable({
    columns: [
      { header: 'No', dataKey: 'no' },
      { header: 'Nama Karyawan', dataKey: 'name' },
      { header: 'Jenis Jam Kerja', dataKey: 'type' },
      { header: 'Clock In', dataKey: 'created_at' },
      { header: 'Clock Out', dataKey: 'clockout' },
    ],
    body: body,
  })
  doc.text(`Jumlah Hadir : ${body.length}`, 150, 10);
  doc.save(`Laporan ${name}.pdf`);
}


const Laporan = () => {


  const [month, setMonth] = React.useState('');
  const [monthList, setMonthList] = React.useState([]);
  const [presences, setPresences] = React.useState([]);

  const handleChange = async (event) => {
    setMonth(event.target.value);
  };

  const getMonthName = (monthNumber) => {
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return monthNames[monthNumber - 1];
  };

  async function getPresenceByMonthList() {


    return await axios.get(`${API_URL}presences/monthlist`,
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then(function (response) {
        setMonthList(response.data);

      })
      .catch(function (error) {
        console.log(error);
      })
  }


  useEffect(() => {
    getPresenceByMonthList();

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
          <Typography variant="h5" fontWeight={'bold'} color="initial">Laporan</Typography>
        </Box>

        <Typography variant="h6" fontWeight={'bold'} color="initial">Silahakan pilih periode laporan<br /></Typography>

        <Box sx={{ minWidth: 120, maxWidth: 400, marginTop: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Pilih Bulan</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month}
              label="month"
              onChange={handleChange}
            >

              {monthList.map((v) => {
                return <MenuItem key={v.value} value={v.value}>{v.name}</MenuItem>
              })}


            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" sx={{
          marginY: 3
        }}
          onClick={async (val) => {
            const res = await getPresenceByMonth(month);
            const monthName = getMonthName(month);
             downloadPdf(res.data.data, `${monthName} 2023`);
          }}
        >
          Cetak Laporan
        </Button>

        <Button variant="contained" sx={{
          marginY: 3,
          marginX: 3,
        }}
          onClick={async (val) => {
            const res = await getPresenceByMonth(month);
            const ws = XLSX.utils.aoa_to_sheet([
              ['No', 'Nama Karyawan', 'Jenis Jam Kerja', 'Clock In', 'Clock Out'],
              ...res.data.data.map((item, index) => [
                index + 1,
                item.name,
                item.type,
                item.created_at,
                item.clockout,
              ]),
            ]);
        
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'DataSheet');
            const monthName = getMonthName(month);
            XLSX.writeFile(wb, `Laporan ${monthName} 2023.xlsx`);

          }}
        >
          Export ke Excel
        </Button>

        <Box paddingY={3}>
        </Box>
        {/* <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Nama Karyawan</TableCell>
                <TableCell>Jenis jam kerja</TableCell>
                <TableCell>Clock In</TableCell>
                <TableCell>Clock Out</TableCell>
                <TableCell>Keterangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {presences.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.no}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>{row.clockout}</TableCell>
                  <TableCell>{row.info}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Box>
    </>
  )
}

export default Laporan