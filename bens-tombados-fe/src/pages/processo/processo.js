import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  Fab,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const API_URL = 'http://localhost:3000/processos';

const headCells = [
  { id: 'idProcesso', numeric: true, disablePadding: false, label: 'ID Processo' },
  { id: 'nome', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'processoAno', numeric: false, disablePadding: true, label: 'Processo/Ano' },
  { id: 'denominacao', numeric: false, disablePadding: true, label: 'Denominação' },
  { id: 'denominacaoCompleta', numeric: false, disablePadding: true, label: 'Denominação Completa' },
  { id: 'categoria', numeric: false, disablePadding: true, label: 'Categoria' },
  { id: 'municipio', numeric: false, disablePadding: true, label: 'Município' },
  { id: 'distrito', numeric: false, disablePadding: true, label: 'Dístrito' },
  { id: 'numeroDecreto', numeric: false, disablePadding: true, label: 'Número decreto' },
  { id: 'dataDecreto', numeric: false, disablePadding: true, label: 'Data decreto' },
  { id: 'classes', numeric: false, disablePadding: true, label: 'Classe' },
  { id: 'livros', numeric: false, disablePadding: true, label: 'Livro' },
  { id: 'subclasses', numeric: false, disablePadding: true, label: 'Subclasse' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onSelectAllClick, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell padding="checkbox" align="left">
          <Checkbox
            color="error"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all processes' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const navigate = useNavigate();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idProcesso');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API_URL);
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selected.map((id) => axios.delete(`${API_URL}/${id}`)));
      setRows((prevRows) => prevRows.filter((row) => !selected.includes(row.idProcesso)));
      setSelected([]);
    } catch (error) {
      console.error('Erro ao excluir dados:', error);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows.map((row) => row.idProcesso));
    } else {
      setSelected([]);
    }
  };

  const handleRowClick = (rowId) => {
    const selectedIndex = selected.indexOf(rowId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const visibleRows = React.useMemo(
    () =>
      rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        p: 3,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: '1700px',
          mb: 2,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          overflowX: 'auto',
        }}
      >
        <TableContainer>
          <Table size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.idProcesso}
                    sx={{
                      backgroundColor: selected.includes(row.idProcesso) ? '#ffe6e6' : '',
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell padding="checkbox" align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Checkbox
                        color="error"
                        checked={selected.includes(row.idProcesso)}
                        onChange={() => handleRowClick(row.idProcesso)}
                      />
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/adicionar-processo/${row.idProcesso}`)}
                        sx={{ marginLeft: 1 }}
                      >
                      <EditIcon color="error" />
                      </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      {row.idProcesso}
                    </TableCell>
                    <TableCell align="center">{row.processoNome}</TableCell>
                    <TableCell align="center">{row.processoAno}</TableCell>
                    <TableCell align="center">{row.denominacao}</TableCell>
                    <TableCell align="center">{row.denominacaoCompleta}</TableCell>
                    <TableCell align="center">{row.categoria?.nomeCategoria || 'Sem Categoria'}</TableCell>
                    <TableCell align="center">{row.municipio?.nomeMunicipio || 'Sem Município'}</TableCell>
                    <TableCell align="center">{row.distrito?.nomeDistrito || 'Sem Distrito'}</TableCell>
                    <TableCell align="center">{row.atoLegal.numeroDecreto}</TableCell>
                    <TableCell align="center">{row.atoLegal.dataDecreto}</TableCell>
                    <TableCell align="center">
                      {row.classes?.map((classe) => classe.nomeClasse).join(', ') || 'Sem Classes'}
                    </TableCell>
                    <TableCell align="center">
                      {row.subclasses?.map((subclasse) => subclasse.nomeSubclasse).join(', ') || 'Sem Subclasses'}
                    </TableCell>
                    <TableCell align="center">
                      {row.livros?.map((livro) => livro.nomeLivro).join(', ') || 'Sem Livros'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid #ddd', backgroundColor: '#fafafa' }}
        />
      </Paper>
      {selected.length > 0 && (
        <IconButton
          color="error"
          sx={{ position: 'fixed', bottom: 80, right: 16 }}
          onClick={handleDelete}
        >
          <DeleteIcon sx={{ fontSize: 32 }} />
        </IconButton>
      )}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#D50032'
        }}
        onClick={() => navigate('/adicionar-processo')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
