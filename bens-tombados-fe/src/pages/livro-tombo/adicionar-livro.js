import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/livros-tombo';

export default function AdicionarLivro() {
  const [nomeLivro, setNomeLivro] = useState('');
  const [idLivro, setIdLivro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Dados do livro
    const newLivro = {
      idLivro: idLivro,
      nomeLivro: nomeLivro,
    };

    try {
      await axios.post(API_URL, newLivro);
      alert('Livro adicionado com sucesso!');
      navigate('/'); // Redireciona de volta para a lista de livros
    } catch (error) {
      console.error('Erro ao adicionar o livro:', error);
      alert('Erro ao adicionar o livro.');
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
        marginTop: 5
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Adicionar Novo Livro
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="ID do Livro"
          fullWidth
          value={idLivro}
          onChange={(e) => setIdLivro(e.target.value)}
          required
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#BDBDBD', // Borda cinza por padrão
              },
              '&:hover fieldset': {
                borderColor: '#BDBDBD', // Cor da borda ao passar o mouse (cinza)
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D50032', // Cor da borda quando estiver em foco (vermelho)
              },
            },
            '& .MuiInputLabel-root': {
              color: '#BDBDBD', // Cor do label cinza por padrão
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D50032', // Cor do label ao focar (vermelho)
            },
          }}
        />
        <TextField
          label="Nome do Livro"
          fullWidth
          value={nomeLivro}
          onChange={(e) => setNomeLivro(e.target.value)}
          required
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#BDBDBD', // Borda cinza por padrão
              },
              '&:hover fieldset': {
                borderColor: '#BDBDBD', // Cor da borda ao passar o mouse (cinza)
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D50032', // Cor da borda quando estiver em foco (vermelho)
              },
            },
            '& .MuiInputLabel-root': {
              color: '#BDBDBD', // Cor do label cinza por padrão
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D50032', // Cor do label ao focar (vermelho)
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
          Adicionar Livro
        </Button>
      </form>
    </Box>
  );
}
