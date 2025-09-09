import React, { useState } from 'react';
import { Grid, Paper, Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import UserList from './UserList';
import GroupList from './GroupList';
import NasList from './NasList';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'users':
        return <UserList />;
      case 'groups':
        return <GroupList />;
      case 'nas':
        return <NasList />;
      default:
        return (
          <Typography variant="h5" color="textSecondary" align="center">
            Select a section to manage
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976D2' }}>
        FreeRADIUS Management Dashboard
      </Typography>

      {/* Navigation Cards */}
      <Grid container spacing={3} justifyContent="center">
        {[
          { title: 'Manage Users', key: 'users', color: '#E57373' }, // Red
          { title: 'Manage Groups', key: 'groups', color: '#64B5F6' }, // Blue
          { title: 'Manage NAS Devices', key: 'nas', color: '#81C784' }, // Green
        ].map((item) => (
          <Grid item xs={12} sm={4} key={item.key}>
            <Card elevation={5} sx={{ backgroundColor: item.color, color: '#fff' }}>
              <CardActionArea onClick={() => setSelectedComponent(item.key)}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Render Selected Component */}
      <Box sx={{ mt: 4, p: 2 }}>
        <Paper elevation={3} sx={{ p: 3 }}>{renderComponent()}</Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
