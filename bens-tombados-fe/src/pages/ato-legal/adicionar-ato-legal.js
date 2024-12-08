import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/atos-legais';

export default function AdicionarAtoLegal() {
  const [numeroDecreto, setNumeroDecreto] = useState('');
  const [dataDecreto, setDataDecreto] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { idAtoLegal } = useParams(); // Recupera o ID na URL
  const navigate = useNavigate();

  // Carregar dados do ato legal se estivermos em modo de edição
  useEffect(() => {
    if (idAtoLegal) {
      setIsEditing(true);
      async function fetchAtoLegal() {
        try {
          const response = await axios.get(`${API_URL}/${idAtoLegal}`);
          setNumeroDecreto(response.data.numeroDecreto);
          setDataDecreto(response.data.dataDecreto);
        } catch (error) {
          console.error('Erro ao carregar os dados do ato legal:', error);
          alert('Erro ao carregar os dados do ato legal.');
        }
      }
      fetchAtoLegal();
    }
  }, [idAtoLegal]);

  // Função para enviar o formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const atoLegalData = { numeroDecreto, dataDecreto };

    try {
      if (isEditing) {
        // Atualiza o ato legal existente
        await axios.put(`${API_URL}/${idAtoLegal}`, atoLegalData);
        alert('Ato Legal atualizado com sucesso!');
      } else {
        // Cria um novo ato legal
        await axios.post(API_URL, atoLegalData);
        alert('Ato Legal adicionado com sucesso!');
      }
      navigate('/ato-legal');
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
        {isEditing ? 'Editar Ato Legal' : 'Adicionar Novo Ato Legal'}
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
            shrink: true,
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
          {isEditing ? 'Atualizar Ato Legal' : 'Adicionar Ato Legal'}
        </Button>
      </form>
    </Box>
  );
}
