import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function CustomFormDialog({ title, contents, dataForm, action, open, onClose }) {
  const handleClose = () => {
    onClose();
  };

  const [data, setData] = useState(Object.fromEntries(contents.map(({ name }) => [name, ''])));
  const [editedData, setDataEdit] = useState(Object.fromEntries(contents.map(({ name }) => [name, ''])));
  const [dataError, setDataError] = useState(Object.fromEntries(contents.map(({ name }) => [name, false])));


  const handleSubmit = e => {
    e.preventDefault();

    const dataError = Object.keys(dataForm).length != 0 ?
      Object.fromEntries(contents.map(({ name }) => [name, editedData[name].length === 0])) :
      Object.fromEntries(contents.map(({ name }) => [name, data[name].length === 0]));
    setDataError(dataError);

    if (Object.values(dataError).every(value => !value)) {
      action(Object.keys(dataForm).length != 0 ? editedData : data);
    }

  };

  useEffect(() => {
    if (Object.keys(dataForm).length != 0) {
      setDataEdit(dataForm);
    }
  }, [dataForm]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <form noValidate>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <DialogTitle>{title}</DialogTitle>
        </Box>
        <DialogContent>
          {contents.map(({ label, name }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              variant="outlined"
              error={dataError[name]}
              helperText={dataError[name] && `${label} tidak boleh kosong!!`}
              fullWidth
              margin='normal'
              value={Object.keys(dataForm).length != 0 ? editedData[name] : data[name]}
              onChange={e => {
                Object.keys(dataForm).length != 0 ? setDataEdit({ ...editedData, [name]: e.target.value }) : setData({ ...data, [name]: e.target.value });
                setDataError({ ...dataError, [name]: e.target.value.length === 0 });
              }}
            />
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', marginBottom: 2 }}>
          <Button variant='contained' onClick={handleSubmit}>Simpan</Button>
          <Button variant='outlined' onClick={handleClose}>Batal</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}