import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/categorias';

export default function AdicionarCategoria() {
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { idCategoria } = useParams(); // Pega o ID da URL, se estiver no modo de edição

  // Função para buscar uma categoria específica
  useEffect(() => {
    if (idCategoria) {
      setIsEditMode(true);
      const fetchCategoria = async () => {
        try {
          const response = await axios.get(`${API_URL}/${idCategoria}`);
          setNomeCategoria(response.data.nomeCategoria); // Preenche o campo com o nome da categoria
        } catch (error) {
          console.error('Erro ao buscar a categoria:', error);
          alert('Erro ao buscar a categoria.');
        }
      };
      fetchCategoria();
    }
  }, [idCategoria]);

  // Função para submeter o formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoriaData = {
      nomeCategoria: nomeCategoria,
    };

    try {
      if (isEditMode) {
        // Atualiza a categoria existente
        await axios.put(`${API_URL}/${idCategoria}`, categoriaData);
        alert('Categoria atualizada com sucesso!');
      } else {
        // Cria uma nova categoria
        await axios.post(API_URL, categoriaData);
        alert('Categoria adicionada com sucesso!');
      }
      navigate('/categoria'); // Redireciona para a lista de categorias após a operação
    } catch (error) {
      console.error('Erro ao salvar a categoria:', error);
      alert(isEditMode ? 'Erro ao atualizar a categoria.' : 'Erro ao adicionar a categoria.');
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
        {isEditMode ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Nome da Categoria"
          fullWidth
          value={nomeCategoria}
          onChange={(e) => setNomeCategoria(e.target.value)}
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
          {isEditMode ? 'Atualizar Categoria' : 'Adicionar Categoria'}
        </Button>
      </form>
    </Box>
  );
}
