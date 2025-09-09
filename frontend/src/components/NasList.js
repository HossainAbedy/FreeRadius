import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

const API_BASE_URL = 'http://localhost:5000';

const NasList = () => {
  const [nasDevices, setNasDevices] = useState([]);
  const [formData, setFormData] = useState({
    nasname: '', shortname: '', type: '', ports: '', secret: '', server: '', community: '', description: ''
  });
  const [editNasId, setEditNasId] = useState(null);

  const fetchNasDevices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/nas`);
      setNasDevices(response.data);
    } catch (error) {
      console.error('Error fetching NAS devices:', error);
    }
  };

  const createNas = async () => {
    try {
      await axios.post(`${API_BASE_URL}/nas`, formData);
      setFormData({ nasname: '', shortname: '', type: '', ports: '', secret: '', server: '', community: '', description: '' });
      fetchNasDevices();
    } catch (error) {
      console.error('Error creating NAS device:', error);
    }
  };

  const updateNas = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/nas/${id}`, formData);
      setFormData({ nasname: '', shortname: '', type: '', ports: '', secret: '', server: '', community: '', description: '' });
      setEditNasId(null);
      fetchNasDevices();
    } catch (error) {
      console.error('Error updating NAS device:', error);
    }
  };

  const deleteNas = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/nas/${id}`);
      fetchNasDevices();
    } catch (error) {
      console.error('Error deleting NAS device:', error);
    }
  };

  useEffect(() => {
    fetchNasDevices();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editNasId) {
      updateNas(editNasId);
    } else {
      createNas();
    }
  };

  const handleEdit = (nas) => {
    setEditNasId(nas.id);
    setFormData({
      nasname: nas.nasname,
      shortname: nas.shortname,
      type: nas.type,
      ports: nas.ports,
      secret: nas.secret,
      server: nas.server,
      community: nas.community,
      description: nas.description,
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        NAS Device Management
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <TextField
                label="NAS Name"
                variant="outlined"
                value={formData.nasname}
                onChange={(e) => setFormData({ ...formData, nasname: e.target.value })}
                required
            />
            <TextField
                label="Short Name"
                variant="outlined"
                value={formData.shortname}
                onChange={(e) => setFormData({ ...formData, shortname: e.target.value })}
            />
            <TextField
                label="Type"
                variant="outlined"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
            <TextField
                label="Ports"
                variant="outlined"
                type="number"
                value={formData.ports}
                onChange={(e) => setFormData({ ...formData, ports: e.target.value })}
            />
            <TextField
                label="Secret"
                variant="outlined"
                type="password"
                value={formData.secret}
                onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                required
            />
            <TextField
                label="Server"
                variant="outlined"
                value={formData.server}
                onChange={(e) => setFormData({ ...formData, server: e.target.value })}
            />
            <TextField
                label="Community"
                variant="outlined"
                value={formData.community}
                onChange={(e) => setFormData({ ...formData, community: e.target.value })}
            />
            <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Button variant="contained" color="primary" type="submit">
                {editNasId ? 'Update NAS Device' : 'Add NAS Device'}
            </Button>
            </Box>
        </form>
     </Paper>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAS Name</TableCell>
              <TableCell>Short Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Ports</TableCell>
              <TableCell>Secret</TableCell>
              <TableCell>Server</TableCell>
              <TableCell>Community</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nasDevices.map((nas) => (
              <TableRow key={nas.id}>
                <TableCell>{nas.id}</TableCell>
                <TableCell>{nas.nasname}</TableCell>
                <TableCell>{nas.shortname}</TableCell>
                <TableCell>{nas.type}</TableCell>
                <TableCell>{nas.ports}</TableCell>
                <TableCell>{nas.secret}</TableCell>
                <TableCell>{nas.server}</TableCell>
                <TableCell>{nas.community}</TableCell>
                <TableCell>{nas.description}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="info"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(nas)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteNas(nas.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NasList;
