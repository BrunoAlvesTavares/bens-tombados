import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/distrito';
const MUNICIPIOS_URL = 'http://localhost:3000/municipios';

export default function AdicionarDistrito() {
  const [nomeDistrito, setNomeDistrito] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [municipios, setMunicipios] = useState([]);
  const [loadingMunicipios, setLoadingMunicipios] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get(MUNICIPIOS_URL);
        setMunicipios(response.data);
        setLoadingMunicipios(false);
      } catch (error) {
        console.error('Erro ao buscar municípios:', error);
        setLoadingMunicipios(false);
      }
    };

    fetchMunicipios();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDistrito = {
      nomeDistrito,
      municipio,
    };

    try {
      await axios.post(API_URL, newDistrito);
      alert('Distrito adicionado com sucesso!');
      navigate('/distrito');
    } catch (error) {
      console.error('Erro ao adicionar o distrito:', error);
      alert('Erro ao adicionar o distrito.');
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
        Adicionar Novo Distrito
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Nome do Distrito"
          fullWidth
          value={nomeDistrito}
          onChange={(e) => setNomeDistrito(e.target.value)}
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
          label="Município"
          fullWidth
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
          required
          disabled={loadingMunicipios}
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
          {loadingMunicipios ? (
            <MenuItem value="">
              Carregando municípios...
            </MenuItem>
          ) : (
            municipios.map((mun) => (
              <MenuItem key={mun.idMunicipio} value={mun.idMunicipio}>
                {mun.nomeMunicipio}
              </MenuItem>
            ))
          )}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ backgroundColor: '#D50032', '&:hover': { backgroundColor: '#C40029' } }}
        >
          Adicionar Distrito
        </Button>
      </form>
    </Box>
  );
}
