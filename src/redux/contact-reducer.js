import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { changeContactFilter } from "./contact-actions";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "./contacts-operations";

const contactsList = createReducer([], {
  [fetchContacts.fulfilled]: (_, action) => [...action.payload].reverse(),
  [deleteContact.fulfilled]: (state, action) =>
    state.filter((contact) => contact.id !== action.payload.id),
  [addContact.fulfilled]: (state, action) => [action.payload, ...state],
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.rejected]: () => false,
  [fetchContacts.fulfilled]: () => false,
});

const isAdding = createReducer(false, {
  [addContact.pending]: () => true,
  [addContact.rejected]: () => false,
  [addContact.fulfilled]: () => false,
});

const isDeleting = createReducer(
  {},
  {
    [deleteContact.pending]: (state, action) => {
      return {
        ...state,
        [action.meta.arg]: true,
      };
    },
    [deleteContact.rejected]: (state, action) => {
      const { [action.meta.arg]: removed, ...other } = state;
      return other;
    },
    [deleteContact.fulfilled]: (state, action) => {
      const { [action.meta.arg]: removed, ...other } = state;
      return other;
    },
  }
);

const error = createReducer(null, {
  [fetchContacts.rejected]: (_, action) => action.payload,
  [deleteContact.rejected]: (_, action) => action.payload,
  [addContact.rejected]: (_, action) => action.payload,
});
const filter = createReducer("", {
  [changeContactFilter]: (_, action) => action.payload,
});
export default combineReducers({
  contactsList,
  error,
  filter,
  isLoading,
  isAdding,
  isDeleting,
});
