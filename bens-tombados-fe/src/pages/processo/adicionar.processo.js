import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL_CATEGORIAS = 'http://localhost:3000/categorias';
const API_URL_MUNICIPIOS = 'http://localhost:3000/municipios';
const API_URL_DISTRITOS = 'http://localhost:3000/distrito';
const API_URL_ATOS_LEGAIS = 'http://localhost:3000/atos-legais';
const API_URL_CLASSES = 'http://localhost:3000/classes';
const API_URL_LIVROS = 'http://localhost:3000/livros-tombo';
const API_URL_SUBCLASSES = 'http://localhost:3000/subclasse';
const API_URL_PROCESSOS = 'http://localhost:3000/processos';

export default function AdicionarProcesso() {
  const [processoNome, setProcessoNome] = useState('');
  const [processoAno, setProcessoAno] = useState('');
  const [denominacao, setDenominacao] = useState('');
  const [denominacaoCompleta, setDenominacaoCompleta] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [idMunicipio, setIdMunicipio] = useState('');
  const [idDistrito, setIdDistrito] = useState('');
  const [idAtoLegal, setIdAtoLegal] = useState('');
  const [classes, setClasses] = useState([]);
  const [livros, setLivros] = useState([]);
  const [subclasses, setSubclasses] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [atosLegais, setAtosLegais] = useState([]);
  const [todasClasses, setTodasClasses] = useState([]);
  const [todosLivros, setTodosLivros] = useState([]);
  const [todasSubclasses, setTodasSubclasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          catRes,
          munRes,
          distRes,
          atoRes,
          classeRes,
          livroRes,
          subclasseRes,
        ] = await Promise.all([
          axios.get(API_URL_CATEGORIAS),
          axios.get(API_URL_MUNICIPIOS),
          axios.get(API_URL_DISTRITOS),
          axios.get(API_URL_ATOS_LEGAIS),
          axios.get(API_URL_CLASSES),
          axios.get(API_URL_LIVROS),
          axios.get(API_URL_SUBCLASSES),
        ]);

        setCategorias(catRes.data);
        setMunicipios(munRes.data);
        setDistritos(distRes.data);
        setAtosLegais(atoRes.data);
        setTodasClasses(classeRes.data);
        setTodosLivros(livroRes.data);
        setTodasSubclasses(subclasseRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProcesso = {
      processoNome,
      processoAno: parseInt(processoAno, 10),
      denominacao,
      denominacaoCompleta,
      idCategoria: parseInt(idCategoria, 10),
      idMunicipio: parseInt(idMunicipio, 10),
      idDistrito: idDistrito ? parseInt(idDistrito, 10) : null,
      idAtoLegal: parseInt(idAtoLegal, 10),
      classes: classes.map((id) => parseInt(id, 10)),
      livros: livros.map((id) => parseInt(id, 10)),
      subclasses: subclasses.map((id) => parseInt(id, 10)),
    };

    try {
      const response = await axios.post(API_URL_PROCESSOS, newProcesso);
      console.log('Processo criado:', response.data);
      alert('Processo adicionado com sucesso!');
      navigate('/'); // Redireciona após sucesso
    } catch (error) {
      console.error('Erro ao adicionar processo:', error.response?.data || error.message);
      alert('Erro ao adicionar processo.');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        marginTop: 5,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Adicionar Novo Processo
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome do Processo"
          fullWidth
          value={processoNome}
          onChange={(e) => setProcessoNome(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        <TextField
          label="Ano do Processo"
          fullWidth
          type="number"
          value={processoAno}
          onChange={(e) => setProcessoAno(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        <TextField
          label="Denominação"
          fullWidth
          value={denominacao}
          onChange={(e) => setDenominacao(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        <TextField
          label="Denominação Completa"
          fullWidth
          multiline
          rows={4}
          value={denominacaoCompleta}
          onChange={(e) => setDenominacaoCompleta(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          select
          label="Categoria"
          fullWidth
          value={idCategoria}
          onChange={(e) => setIdCategoria(e.target.value)}
          required
          sx={{ mb: 3 }}
        >
          {categorias.map((categoria) => (
            <MenuItem key={categoria.idCategoria} value={categoria.idCategoria}>
              {categoria.nomeCategoria}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Município"
          fullWidth
          value={idMunicipio}
          onChange={(e) => setIdMunicipio(e.target.value)}
          required
          sx={{ mb: 3 }}
        >
          {municipios.map((municipio) => (
            <MenuItem key={municipio.idMunicipio} value={municipio.idMunicipio}>
              {municipio.nomeMunicipio}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Distrito"
          fullWidth
          value={idDistrito}
          onChange={(e) => setIdDistrito(e.target.value)}
          sx={{ mb: 3 }}
        >
          {distritos.map((distrito) => (
            <MenuItem key={distrito.idDistrito} value={distrito.idDistrito}>
              {distrito.nomeDistrito}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Ato Legal"
          fullWidth
          value={idAtoLegal}
          onChange={(e) => setIdAtoLegal(e.target.value)}
          required
          sx={{ mb: 3 }}
        >
          {atosLegais.map((ato) => (
            <MenuItem key={ato.idAtoLegal} value={ato.idAtoLegal}>
              {`Decreto: ${ato.numeroDecreto} - Data: ${new Date(ato.dataDecreto).toLocaleDateString()}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Classes"
          fullWidth
          SelectProps={{
            multiple: true,
          }}
          value={classes}
          onChange={(e) => setClasses(e.target.value)}
          sx={{ mb: 3 }}
        >
          {todasClasses.map((classe) => (
            <MenuItem key={classe.idClasse} value={classe.idClasse}>
              {classe.nomeClasse}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Livros"
          fullWidth
          SelectProps={{
            multiple: true,
          }}
          value={livros}
          onChange={(e) => setLivros(e.target.value)}
          sx={{ mb: 3 }}
        >
          {todosLivros.map((livro) => (
            <MenuItem key={livro.idLivro} value={livro.idLivro}>
              {livro.nomeLivro}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Subclasses"
          fullWidth
          SelectProps={{
            multiple: true,
          }}
          value={subclasses}
          onChange={(e) => setSubclasses(e.target.value)}
          sx={{ mb: 3 }}
        >
          {todasSubclasses.map((subclasse) => (
            <MenuItem key={subclasse.idSubclasse} value={subclasse.idSubclasse}>
              {subclasse.nomeSubclasse}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Enviar
        </Button>
      </form>
    </Box>
  );
}
