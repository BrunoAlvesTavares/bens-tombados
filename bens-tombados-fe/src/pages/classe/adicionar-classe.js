import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_CLASSES = 'http://localhost:3000/classes';
const API_SUBCLASSES = 'http://localhost:3000/subclasse';

export default function AdicionarClasse() {
  const { idClasse } = useParams();
  const [nomeClasse, setNomeClasse] = useState('');
  const [selectedSubclasses, setSelectedSubclasses] = useState([]);
  const [subclassesOptions, setSubclassesOptions] = useState([]);
  const [error, setError] = useState(false); // Adiciona estado de erro para validação
  const navigate = useNavigate();

  console.log(idClasse);

  useEffect(() => {
    async function fetchSubclasses() {
      try {
        const response = await axios.get(API_SUBCLASSES);
        setSubclassesOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar subclasses:', error);
        alert('Erro ao carregar as opções de subclasses.');
      }
    };
  })
  

  useEffect(() => {
    async function fetchSubclasses() {
      try {
        const response = await axios.get(API_SUBCLASSES);
        setSubclassesOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar subclasses:', error);
        alert('Erro ao carregar as opções de subclasses.');
      }
    }

    async function fetchClasse() {
      if (idClasse) { // Apenas busca os dados se estiver em modo edição
        try {
          const response = await axios.get(`${API_CLASSES}/${idClasse}`);
          console.log(response.data);
          const classe = response.data;
          setNomeClasse(classe.nomeClasse);
          setSelectedSubclasses(classe.subclasses.map((subclasse) => subclasse.idSubclasse));
        } catch (error) {
          console.error('Erro ao buscar classe:', error);
          alert('Erro ao carregar os dados da classe.');
        }
      }
    }

    fetchSubclasses();
    fetchClasse();
  }, [idClasse]);;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedSubclasses.length === 0) {
      setError(true);
      return;
    }

    const classeData = {
      nomeClasse: nomeClasse,
      subclasses: selectedSubclasses,
    };

    try {
      if (idClasse) {
        // Atualizar classe existente
        await axios.put(`${API_CLASSES}/${idClasse}`, classeData);
        alert('Classe atualizada com sucesso!');
      } else {
        // Criar nova classe
        await axios.post(API_CLASSES, classeData);
        alert('Classe adicionada com sucesso!');
      }
      navigate('/classe');
    } catch (error) {
      console.error('Erro ao salvar classe:', error);
      alert('Erro ao salvar classe.');
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

        <FormControl
          fullWidth
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: error ? '#D50032' : '#BDBDBD',
              },
              '&:hover fieldset': {
                borderColor: '#D50032',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D50032',
              },
            },
          }}
          error={error}
        >
          <InputLabel id="subclasses-label">Subclasses</InputLabel>
          <Select
            labelId="subclasses-label"
            multiple
            value={selectedSubclasses}
            onChange={(e) => {
              setSelectedSubclasses(e.target.value);
              setError(false); // Remove erro ao selecionar
            }}
            renderValue={(selected) =>
              subclassesOptions
                .filter((subclass) => selected.includes(subclass.idSubclasse))
                .map((subclass) => subclass.nomeSubclasse)
                .join(', ')
            }
          >
            {subclassesOptions.map((subclass) => (
              <MenuItem key={subclass.idSubclasse} value={subclass.idSubclasse}>
                {subclass.nomeSubclasse}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>Selecione pelo menos uma subclasse.</FormHelperText>}
        </FormControl>

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
