import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/livros-tombo';

export default function AdicionarLivro() {
  const [nomeLivro, setNomeLivro] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { idLivro } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (idLivro) {
      setIsEditing(true);
      async function fetchLivro() {
        try {
          const response = await axios.get(`${API_URL}/${idLivro}`);
          setNomeLivro(response.data.nomeLivro);
        } catch (error) {
          console.error('Erro ao carregar os dados do livro:', error);
          alert('Erro ao carregar os dados do livro.');
        }
      }
      fetchLivro();
    }
  }, [idLivro]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const livroData = { nomeLivro };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${idLivro}`, livroData);
        alert('Livro atualizado com sucesso!');
      } else {
        // Cria um novo livro
        await axios.post(API_URL, livroData);
        alert('Livro adicionado com sucesso!');
      }
      navigate('/livro-tombo');
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao salvar os dados.');
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
        {isEditing ? 'Editar Livro' : 'Adicionar Novo Livro'}
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
          {isEditing ? 'Atualizar Livro' : 'Adicionar Livro'}
        </Button>
      </form>
    </Box>
  );
}
