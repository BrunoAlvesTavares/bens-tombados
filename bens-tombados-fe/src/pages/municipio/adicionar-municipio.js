import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/municipios';

export default function AdicionarMunicipio() {
  const [nomeMunicipio, setNomeMunicipio] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { idMunicipio } = useParams(); // Pega o ID da URL, se estiver no modo de edição

  // Função para buscar um município específico
  useEffect(() => {
    if (idMunicipio) {
      setIsEditMode(true);
      const fetchMunicipio = async () => {
        try {
          const response = await axios.get(`${API_URL}/${idMunicipio}`);
          setNomeMunicipio(response.data.nomeMunicipio); // Preenche o campo com o nome do município
        } catch (error) {
          console.error('Erro ao buscar o município:', error);
          alert('Erro ao buscar o município.');
        }
      };
      fetchMunicipio();
    }
  }, [idMunicipio]);

  // Função para submeter o formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const municipioData = {
      nomeMunicipio: nomeMunicipio,
    };

    try {
      if (isEditMode) {
        // Atualiza o município existente
        await axios.put(`${API_URL}/${idMunicipio}`, municipioData);
        alert('Município atualizado com sucesso!');
      } else {
        // Cria um novo município
        await axios.post(API_URL, municipioData);
        alert('Município adicionado com sucesso!');
      }
      navigate('/municipio'); // Redireciona para a lista de municípios após a operação
    } catch (error) {
      console.error('Erro ao salvar o município:', error);
      alert(isEditMode ? 'Erro ao atualizar o município.' : 'Erro ao adicionar o município.');
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
        {isEditMode ? 'Editar Município' : 'Adicionar Novo Município'}
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Nome do Município"
          fullWidth
          value={nomeMunicipio}
          onChange={(e) => setNomeMunicipio(e.target.value)}
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
          {isEditMode ? 'Atualizar Município' : 'Adicionar Município'}
        </Button>
      </form>
    </Box>
  );
}
