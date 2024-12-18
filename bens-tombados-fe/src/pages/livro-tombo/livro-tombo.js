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
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';

const API_URL = 'http://localhost:3000/livros-tombo';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, rowCount, numSelected, onSelectAllClick } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
<TableHead>
  <TableRow>
    <TableCell padding="checkbox" align="left">
      <Checkbox
        color="error"
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllClick}
        sx={{
          '&.Mui-checked': {
            color: '#D50032',
          },
        }}
      />
    </TableCell>
    <TableCell align="center" sortDirection={orderBy === 'idLivro' ? order : false}>
      <TableSortLabel
        active={orderBy === 'idLivro'}
        direction={orderBy === 'idLivro' ? order : 'asc'}
        onClick={createSortHandler('idLivro')}
      >
        ID Livro
      </TableSortLabel>
    </TableCell>
    <TableCell align="center">Nome do Livro</TableCell>
  </TableRow>
</TableHead>
  );
}

export default function EnhancedTable() {
  const navigate = useNavigate();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idLivro');
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

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.idLivro);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selected.map((id) => axios.delete(`${API_URL}/${id}`)));
      setRows((prevRows) => prevRows.filter((row) => !selected.includes(row.idLivro)));
      setSelected([]);
    } catch (error) {
      console.error('Erro ao excluir dados:', error);
    }
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
          maxWidth: '1200px',
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
        key={row.idLivro}
        sx={{
          backgroundColor: selected.includes(row.idLivro) ? '#ffe6e6' : '',
          cursor: 'pointer',
        }}
      >
        <TableCell padding="checkbox" align="center">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Checkbox */}
            <Checkbox
              color="error"
              checked={selected.includes(row.idLivro)}
              onChange={() => handleSelect(row.idLivro)}
              sx={{
                '&.Mui-checked': {
                  color: '#D50032', 
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={() => navigate(`/adicionar-livro/${row.idLivro}`)}
              sx={{ marginLeft: 1 }}
            >
            <EditIcon color="error" />
            </IconButton>
          </Box>
        </TableCell>
        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
          {row.idLivro}
        </TableCell>
        <TableCell align="center">{row.nomeLivro}</TableCell>
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
          backgroundColor: '#D50032',
        }}
        onClick={() => navigate('/adicionar-livro')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
