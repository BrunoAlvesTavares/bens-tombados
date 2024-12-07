import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL_SUBCLASSES = 'http://localhost:3000/subclasse';
const API_URL_CLASSES = 'http://localhost:3000/classes';

export default function AdicionarSubclasse() {
  const [nomeSubclasse, setNomeSubclasse] = useState('');
  const [idClasse, setIdClasse] = useState('');
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await axios.get(API_URL_CLASSES);
        setClasses(response.data);
      } catch (error) {
        console.error('Erro ao buscar classes:', error);
        alert('Não foi possível carregar as classes.');
      }
    }
    fetchClasses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSubclasse = {
      nomeSubclasse,
      idClasse,
    };

    try {
      await axios.post(API_URL_SUBCLASSES, newSubclasse);
      alert('Subclasse adicionada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar subclasse:', error);
      alert('Erro ao adicionar subclasse.');
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
        Adicionar Nova Subclasse
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Nome da Subclasse"
          fullWidth
          value={nomeSubclasse}
          onChange={(e) => setNomeSubclasse(e.target.value)}
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
          select
          label="Classe"
          fullWidth
          value={idClasse}
          onChange={(e) => setIdClasse(e.target.value)}
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
        >
          {classes.map((classe) => (
            <MenuItem key={classe.idClasse} value={classe.idClasse}>
              {classe.nomeClasse}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ backgroundColor: '#D50032', '&:hover': { backgroundColor: '#C40029' } }}
        >
          Adicionar Subclasse
        </Button>
      </form>
    </Box>
  );
}
