import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header'; 
import LivroTombo from './pages/livro-tombo/livro-tombo'; 
import AdicionarLivro from './pages/livro-tombo/adicionar-livro';
import AtoLegal from './pages/ato-legal/ato-legal'; 
import AdicionarAtoLegal from './pages/ato-legal/adicionar-ato-legal'; 
import Distrito from './pages/distrito/distrito';
import Municipio from './pages/municipio/municipio';
import Categoria from './pages/categoria/categoria';
import AdicionarCategoria from './pages/categoria/adicionar-categoria'
import Classe from './pages/classe/classe';
import AdicionarClasse from './pages/classe/adicionar-classe';
import AdicionarDistrito from './pages/distrito/adicionar-distrito';
import SubClasse from './pages/subclasse/subclasse';
import Processo from './pages/processo/processo';
import Paper from '@mui/material/Paper'; 
import Typography from '@mui/material/Typography'; 
import AdicionarSubclasse from './pages/subclasse/adicionar-subclasse';
import AdicionarProcesso from './pages/processo/adicionar.processo';
import AdicionarMunicipio from './pages/municipio/adicionar-municipio';
import HistoricoLogsTable from './pages/logs-processo/logs-processo';

function App() {
  return (
    <Router>
      <div className="App">
        <Header title="Bens tombados" />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <div> 
                <Paper 
                  elevation={3} 
                  style={{ 
                    padding: '20px', 
                    margin: '20px', 
                    width: '80%', 
                    maxWidth: '1200px',
                    marginLeft: 'auto', 
                    marginRight: 'auto' 
                  }}
                >
                  <Typography variant="h4" component="h2" gutterBottom>
                    Fundamentos de banco de dados
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Rafael Alves e Bruno Alves
                  </Typography>
                  <Typography variant="body1" paragraph>
                    O banco de dados do patrimônio cultural tombado pelo Estado de Minas Gerais diz respeito aos bens culturais materiais que, em função de seu valor histórico, artístico, estético, afetivo, simbólico, dentre outros, receberam proteção pelo poder público estadual pelo instrumento do tombamento. Um bem cultural tombado encontra-se sob um regime especial de tutela pelo Estado, uma vez que a ele foi atribuído um valor social. É importante destacar que os bens tombados em âmbito estadual não podem ser destruídos, demolidos, mutilados ou sofrer intervenções sem ciência, análise prévia, aprovação e acompanhamento técnico do Instituto Estadual do Patrimônio Histórico e Artístico de Minas Gerais - Iepha-MG.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    O Iepha-MG é o responsável por promover a identificação, o reconhecimento e a salvaguarda do patrimônio cultural do Estado, sendo o tombamento uma das medidas administrativas para a proteção desse patrimônio. O tombamento é instituído por um ato legal e, posteriormente, o bem tombado é inscrito como integrante do patrimônio cultural de Minas Gerais em livro(s) de tombo estabelecidos pelo Decreto Estadual nº 14.260, de 14/01/1972. No Iepha-MG, a Gerência de Patrimônio Cultural Material é responsável por realizar as ações de proteção dos bens culturais materiais e a Gerência de Identificação e Pesquisa tem como uma de suas competências reunir e manter atualizadas as informações sobre os bens tombados (Decreto nº 47.921, de 22/04/2020)
                  </Typography>
                  <Typography variant="body1" paragraph>
                    [1.0.0] - 2023-08-30<br />
                    Versão inicial publicada.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Licença: CC-BY-4.0<br />
                    Formatos: CSV; JSON;<br />
                    Atualização: -<br />
                    Última alteração: 12/10/2024 05:38:24
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <a href="https://dados.gov.br/dados/conjuntos-dados/bens-tombados2" target="_blank" rel="noopener noreferrer">
                      Acesse o repositório
                    </a>
                  </Typography>
                </Paper>
              </div>
            } 
          />

          <Route path="/livro-tombo" element={<LivroTombo />} />
          <Route path="/ato-legal" element={<AtoLegal />} />
          <Route path="/distrito" element={<Distrito />} />
          <Route path="/municipio" element={<Municipio />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/classe" element={<Classe />} />
          <Route path="/subclasse" element={<SubClasse />} />
          <Route path="/processo" element={<Processo />} />
          <Route path="/historico-logs" element={<HistoricoLogsTable />} />
          <Route path="/adicionar-livro" element={<AdicionarLivro />} />
          <Route path="/adicionar-livro/:idLivro" element={<AdicionarLivro />} />
          <Route path="/adicionar-ato-legal" element={<AdicionarAtoLegal />} />
          <Route path="/adicionar-ato-legal/:idAtoLegal" element={<AdicionarAtoLegal />} />
          <Route path="/adicionar-categoria" element={<AdicionarCategoria />} />
          <Route path="/adicionar-categoria/:idCategoria" element={<AdicionarCategoria />} />
          <Route path="/adicionar-classe" element={<AdicionarClasse />} />
          <Route path="/adicionar-classe/:idClasse" element={<AdicionarClasse />} />
          <Route path="/adicionar-distrito" element={<AdicionarDistrito />} />
          <Route path="/adicionar-distrito/:idDistrito" element={<AdicionarDistrito />} />
          <Route path="/adicionar-subclasse" element={<AdicionarSubclasse />} />
          <Route path="/adicionar-subclasse/:idSubclasse" element={<AdicionarSubclasse />} />
          <Route path="/adicionar-processo" element={<AdicionarProcesso />} />
          <Route path="/adicionar-municipio" element={<AdicionarMunicipio />} />
          <Route path="/adicionar-municipio/:idMunicipio" element={<AdicionarMunicipio />} />
          <Route path="/adicionar-processo/:idProcesso" element={<AdicionarProcesso />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
