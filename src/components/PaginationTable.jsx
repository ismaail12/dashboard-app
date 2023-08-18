import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomFormDialog from '../components/CustomFormDialog'
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { API_URL } from '../utils/constant';




export default function PaginationTable({ contents, columns, rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [open, setOpen] = useState(false);
  const [dataForm, setDataForm] = useState({});


  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleEditUser(params) {

    axios.patch(`${API_URL}users/${params.id}`, params, {
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

  function handleDeleteUser(params) {
    console.log(params.id);

    axios.delete(`${API_URL}users/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
          console.log('berhasil');
        }
      })
      .catch(error => console.error(error));
  }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CustomFormDialog title='Form Edit' contents={contents} dataForm={dataForm} action={(value) => handleEditUser(value)} open={open} onClose={handleClose} />

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="body" fontWeight={'bold'} color="initial">{column.label}</Typography>
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 150 }}>
                <Typography variant="body" fontWeight={'bold'} color="initial">Aksi</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Box>
                        <EditIcon
                          onClick={() => {
                            setOpen(true);
                            setDataForm(row);
                          }}
                        />
                        <DeleteIcon sx={{
                          marginLeft: 4,
                          color: 'error.main',
                        }}
                          onClick={() => {
                            handleDeleteUser(row);
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}