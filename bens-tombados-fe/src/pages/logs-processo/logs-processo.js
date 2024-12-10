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
  Paper,
} from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:3000/historico-log';

const headCells = [
  { id: 'idLog', numeric: true, disablePadding: false, label: 'ID Log' },
  { id: 'processoNome', numeric: false, disablePadding: false, label: 'Nome do Processo' },
  { id: 'dataHoraLog', numeric: false, disablePadding: true, label: 'Data e Hora' },
];

export default function HistoricoLogsTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await axios.get(API_URL);
        setLogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar logs:', error);
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleLogs = logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={headCells.length} align="center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : (
                visibleLogs.map((log) => (
                  <TableRow hover key={log.idLog}>
                    <TableCell align="center">{log.idLog}</TableCell>
                    <TableCell align="center">{log.processo?.processoNome || 'Sem Nome'}</TableCell>
                    <TableCell align="center">
                      {log.dataHoraLog ? (
                        new Intl.DateTimeFormat('pt-BR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        }).format(new Date(log.dataHoraLog))
                      ) : (
                        'Data Inválida'
                      )}
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
          count={logs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid #ddd', backgroundColor: '#fafafa' }}
        />
      </Paper>
    </Box>
  );
}
