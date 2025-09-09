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

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({ groupname: '', attribute: '', op: '', value: '' });
  const [editGroupId, setEditGroupId] = useState(null);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/group`);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const createGroup = async () => {
    try {
      // For simplicity, we're only using groupname in the POST endpoint.
      await axios.post(`${API_BASE_URL}/group`, { groupname: formData.groupname });
      setFormData({ groupname: '', attribute: '', op: '', value: '' });
      fetchGroups();
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const updateGroup = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/group/${id}`, formData);
      setFormData({ groupname: '', attribute: '', op: '', value: '' });
      setEditGroupId(null);
      fetchGroups();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const deleteGroup = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/group/${id}`);
      fetchGroups();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editGroupId) {
      updateGroup(editGroupId);
    } else {
      createGroup();
    }
  };

  const handleEdit = (group) => {
    setEditGroupId(group.id);
    setFormData({ 
      groupname: group.groupname, 
      attribute: group.attribute, 
      op: group.op, 
      value: group.value 
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Group Management
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              label="Group Name"
              variant="outlined"
              value={formData.groupname}
              onChange={(e) => setFormData({ ...formData, groupname: e.target.value })}
              required
            />
            {/* Optionally add fields for attribute, op, and value */}
            <Button variant="contained" color="primary" type="submit">
              {editGroupId ? 'Update Group' : 'Add Group'}
            </Button>
          </Box>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Group Name</TableCell>
              <TableCell>Attribute</TableCell>
              <TableCell>Operator</TableCell>
              <TableCell>Value</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.groupname}</TableCell>
                <TableCell>{group.attribute}</TableCell>
                <TableCell>{group.op}</TableCell>
                <TableCell>{group.value}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="info"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(group)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteGroup(group.id)}
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

export default GroupList;
