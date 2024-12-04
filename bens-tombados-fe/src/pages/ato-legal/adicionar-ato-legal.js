import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/atos-legais';

export default function AdicionarAtoLegal() {
  const [numeroDecreto, setNumeroDecreto] = useState('');
  const [dataDecreto, setDataDecreto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newAtoLegal = {
      numeroDecreto: numeroDecreto,
      dataDecreto: dataDecreto,
    };

    try {
      await axios.post(API_URL, newAtoLegal);
      alert('Ato Legal adicionado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar o ato legal:', error);
      alert('Erro ao adicionar o ato legal.');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        marginTop: 5,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Adicionar Novo Ato Legal
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Número do Decreto"
          fullWidth
          value={numeroDecreto}
          onChange={(e) => setNumeroDecreto(e.target.value)}
          required
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#BDBDBD',
              },
              '&:hover fieldset': {
                borderColor: '#BDBDBD',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D50032',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#BDBDBD',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D50032',
            },
          }}
        />
        <TextField
          label="Data do Decreto"
          type="date"
          fullWidth
          value={dataDecreto}
          onChange={(e) => setDataDecreto(e.target.value)}
          required
          InputLabelProps={{
            shrink: true, // Faz com que o label fique acima e visível, mesmo quando o campo não está preenchido.
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#BDBDBD',
              },
              '&:hover fieldset': {
                borderColor: '#BDBDBD',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D50032',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#BDBDBD',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D50032',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ backgroundColor: '#D50032', '&:hover': { backgroundColor: '#C40029' } }}
        >
          Adicionar Ato Legal
        </Button>
      </form>
    </Box>
  );
}
