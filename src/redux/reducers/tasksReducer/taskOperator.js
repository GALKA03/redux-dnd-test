import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.github.com/repos/facebook/react/issues');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// export const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`/contacts/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (contact, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`/contacts`, contact);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const updateContacts = createAsyncThunk(
//   'contacts/updateContact',
//   async (contact, { rejectWithValue }) => {
//     try {
//       const { name, number } = contact;
//       const { data } = await axios.patch(`/contacts/${contact.id}`, {
//         name,
//         number,
//       });

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

