import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL_SUBCLASSES = 'http://localhost:3000/subclasse';
const API_URL_CLASSES = 'http://localhost:3000/classes';

export default function AdicionarSubclasse() {
  const [nomeSubclasse, setNomeSubclasse] = useState('');
  const [idClasse, setIdClasse] = useState('');
  const [classes, setClasses] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { idSubclasse } = useParams(); // Pega o ID da URL para editar

  // Função para buscar uma subclasse específica
  useEffect(() => {
    if (idSubclasse) {
      setIsEditMode(true);
      const fetchSubclasse = async () => {
        try {
          const response = await axios.get(`${API_URL_SUBCLASSES}/${idSubclasse}`);
          setNomeSubclasse(response.data.nomeSubclasse); // Preenche o campo com o nome da subclasse
          const responseClasse = await axios.get(`${API_URL_CLASSES}/${idSubclasse}`);
          setIdClasse(responseClasse.data.idClasse); // Preenche o campo com a classe associada
        } catch (error) {
          console.error('Erro ao buscar a subclasse:', error);
          alert('Erro ao buscar a subclasse.');
        }
      };
      fetchSubclasse();
    }
  }, [idSubclasse]);

  // Função para buscar as classes disponíveis
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(API_URL_CLASSES);
        setClasses(response.data);
      } catch (error) {
        console.error('Erro ao buscar classes:', error);
        alert('Não foi possível carregar as classes.');
      }
    };
    fetchClasses();
  }, []);

  // Função para submeter o formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const subclasseData = {
      nomeSubclasse,
      idClasse,
    };

    try {
      if (isEditMode) {
        // Atualiza a subclasse existente
        await axios.put(`${API_URL_SUBCLASSES}/${idSubclasse}`, subclasseData);
        alert('Subclasse atualizada com sucesso!');
      } else {
        // Cria uma nova subclasse
        await axios.post(API_URL_SUBCLASSES, subclasseData);
        alert('Subclasse adicionada com sucesso!');
      }
      navigate('/subclasse'); // Redireciona para a lista de subclasses após a operação
    } catch (error) {
      console.error('Erro ao salvar a subclasse:', error);
      alert(isEditMode ? 'Erro ao atualizar a subclasse.' : 'Erro ao adicionar a subclasse.');
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
        {isEditMode ? 'Editar Subclasse' : 'Adicionar Nova Subclasse'}
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
          {isEditMode ? 'Atualizar Subclasse' : 'Adicionar Subclasse'}
        </Button>
      </form>
    </Box>
  );
}
