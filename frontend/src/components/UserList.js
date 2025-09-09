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

const API_BASE_URL = 'http://localhost:5000'; // adjust if needed

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [editUserId, setEditUserId] = useState(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Create a new user
  const createUser = async () => {
    try {
      await axios.post(`${API_BASE_URL}/user`, formData);
      setFormData({ username: '', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Update an existing user
  const updateUser = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/user/${id}`, formData);
      setFormData({ username: '', password: '' });
      setEditUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUserId) {
      updateUser(editUserId);
    } else {
      createUser();
    }
  };

  // Set form for editing
  const handleEdit = (user) => {
    setEditUserId(user.id);
    setFormData({ username: user.username, password: user.value });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              {editUserId ? 'Update User' : 'Add User'}
            </Button>
          </Box>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Attribute</TableCell>
              <TableCell>Operator</TableCell>
              <TableCell>Value</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.attribute}</TableCell>
                <TableCell>{u.op}</TableCell>
                <TableCell>{u.value}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="info"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteUser(u.id)}
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

export default UserList;
