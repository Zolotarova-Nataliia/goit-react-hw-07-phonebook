import axios from "axios";

axios.defaults.baseURL = "https://627e3f4d271f386ceff45511.mockapi.io";

export async function fetchContacts() {
  const response = await axios.get("/contacts");
  return response.data;
}

export async function addContact(contact) {
  return await axios.post("/contacts", contact);
}

export async function deleteContact(id) {
  return await axios.delete(`/contacts/${id}`);
}
