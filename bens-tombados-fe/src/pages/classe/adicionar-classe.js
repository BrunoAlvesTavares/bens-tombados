import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/classes';

export default function AdicionarClasse() {
  const [nomeClasse, setNomeClasse] = useState('');
  const [subclasses, setSubclasses] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newClasse = {
      nomeClasse: nomeClasse,
      subclasses: subclasses.split(',').map(subclass => subclass.trim()), // Divide a string de subclasses e remove espaços extras
    };

    try {
      await axios.post(API_URL, newClasse);
      alert('Classe adicionada com sucesso!');
      navigate('/'); // Redireciona para a página principal após a adição
    } catch (error) {
      console.error('Erro ao adicionar classe:', error);
      alert('Erro ao adicionar classe.');
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
        Adicionar Nova Classe
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Nome da Classe"
          fullWidth
          value={nomeClasse}
          onChange={(e) => setNomeClasse(e.target.value)}
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
          label="Subclasses (separadas por vírgula)"
          fullWidth
          value={subclasses}
          onChange={(e) => setSubclasses(e.target.value)}
          required
          multiline
          rows={4}
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
          Adicionar Classe
        </Button>
      </form>
    </Box>
  );
}
