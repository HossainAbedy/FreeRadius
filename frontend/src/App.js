import React from 'react';
import Dashboard from './components/Dashboard';
import { Grid, Paper, Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#E57373' }}>
        ABEDY
      </Typography>
      <Dashboard />
    </div>
  );
}

export default App;
