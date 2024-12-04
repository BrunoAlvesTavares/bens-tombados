// src/components/header.js

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // ícone de 3 linhas
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import BookIcon from '@mui/icons-material/Book';
import DraftsIcon from '@mui/icons-material/Drafts';
import GavelIcon from '@mui/icons-material/Gavel'; // Ícone de "Ato Legal"
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Ícone de "Distrito"
import LocationCityIcon from '@mui/icons-material/LocationCity'; // Novo ícone de "Município"
import { Link } from 'react-router-dom'; // Importar Link para navegação

export default function Header({ title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Abrir o menu de opções ao clicar no ícone de 3 linhas
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null); // Fecha o menu
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#D50032' }}>
        <Toolbar>
          {/* Título agora é um link que leva à página inicial */}
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            {title} {/* Título clicável */}
          </Typography>

          {/* Ícone de 3 linhas */}
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{
              position: 'absolute',
              right: '20px', // Fixa o ícone no canto direito
            }}
            onClick={handleMenu} // Abre o menu ao clicar
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Popover com lista de opções */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom', // Coloca a lista logo abaixo do cabeçalho
          horizontal: 'right', // Alinha a lista à direita da página
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            padding: 2,
            borderRadius: 1,
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ width: '250px' }}>
          <nav aria-label="main mailbox folders">
            <List>
              {/* Usando Link para navegação e fechando o menu ao clicar */}
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/livro-tombo" onClick={handleClose}> {/* Altere para Link */}
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Livro Tombo" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/ato-legal" onClick={handleClose}> {/* Altere para Link */}
                  <ListItemIcon>
                    <GavelIcon /> {/* Ícone de Ato Legal */}
                  </ListItemIcon>
                  <ListItemText primary="Ato Legal" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/distrito" onClick={handleClose}> {/* Altere para Link */}
                  <ListItemIcon>
                    <LocationOnIcon /> {/* Ícone de Distrito */}
                  </ListItemIcon>
                  <ListItemText primary="Distrito" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/municipio" onClick={handleClose}> {/* Altere para Link */}
                  <ListItemIcon>
                    <LocationCityIcon /> {/* Novo ícone de Município */}
                  </ListItemIcon>
                  <ListItemText primary="Município" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Popover>
    </Box>
  );
}
