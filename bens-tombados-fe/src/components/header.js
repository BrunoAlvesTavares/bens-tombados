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
import CategoryIcon from '@mui/icons-material/Category'; // Ícone de Categoria
import { Link } from 'react-router-dom'; // Importar Link para navegação
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AppsIcon from '@mui/icons-material/Apps';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History'; // Ícone de Histórico

export default function Header({ title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#D50032' }}>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            {title} {/* Título clicável */}
          </Typography>

          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{
              position: 'absolute',
              right: '20px',
            }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
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
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/livro-tombo" onClick={handleClose}>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Livro Tombo" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/ato-legal" onClick={handleClose}>
                  <ListItemIcon>
                    <GavelIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ato Legal" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/distrito" onClick={handleClose}>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Distrito" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/municipio" onClick={handleClose}>
                  <ListItemIcon>
                    <LocationCityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Município" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/categoria" onClick={handleClose}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Categoria" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/classe" onClick={handleClose}>
                  <ListItemIcon>
                    <SpaceDashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Classe" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/subclasse" onClick={handleClose}>
                  <ListItemIcon>
                    <AppsIcon />
                  </ListItemIcon>
                  <ListItemText primary="SubClasse" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/processo" onClick={handleClose}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Processo" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/historico-logs" onClick={handleClose}>
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Histórico de processo" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Popover>
    </Box>
  );
}
