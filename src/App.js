import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Contacts, Filter, Form } from "./components/index";
import { FormTitle, FormSubtitle } from "./components/Phonebook.styled";
import { addContact, fetchContacts } from "./redux/contacts-operations";
import { getContacts, getFilter } from "./redux/contacts-selectors";
import { changeContactFilter } from "./redux/contact-actions";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const { contactList } = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const formSubmitHandler = (data) => {
    const { name, number } = data;
    const addedContact = contactList.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (addedContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name, number }));
    addContact(data);
  };

  const filterHandler = (event) => {
    dispatch(changeContactFilter(event.currentTarget.value));
  };

  return (
    <div className="App">
      <Provider store={store}>
        <FormTitle>Phonebook</FormTitle>
        <Form onSubmit={formSubmitHandler}></Form>

        <FormSubtitle>Contacts</FormSubtitle>
        <Filter value={filter} onChange={filterHandler}></Filter>
        <Contacts />
      </Provider>
    </div>
  );
}
