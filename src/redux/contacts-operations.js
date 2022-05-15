import { createAsyncThunk } from "@reduxjs/toolkit";
import * as phonebookApi from "../services/phonebookApi";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const contactsList = await phonebookApi.fetchContacts();
    return contactsList;
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact) => {
    const { data } = await phonebookApi.addContact(contact);
    return data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id) => {
    const { data } = await phonebookApi.deleteContact(id);
    return data;
  }
);
