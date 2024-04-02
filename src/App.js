//Main App Component
import React from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import ErrorPage from './Components/ErrorPage';
import ContactList from './Components/ContactList';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddContact from './Components/AddContact';
import { useDispatch, useSelector } from 'react-redux';
import { getContactFromLocalStorage } from './updateLocalStorageContacts';
import { setContacts } from './actions/contactActions';
import UpdateForm from './Components/UpdateForm';

function App() {
  const finalContacts = useSelector((state) => state.contactReducer.contacts);
  const dispatch = useDispatch();
  const location = useLocation();
  const contactToEdit = location.state?.contact;

  useEffect(() => {
    const contactsFromLocalStorage = getContactFromLocalStorage();
    if (contactsFromLocalStorage) {
      dispatch(setContacts(JSON.parse(contactsFromLocalStorage)));
    }
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/' element={<Home contacts={finalContacts} />}>
          <Route
            path='/add-contact'
            element={<AddContact contactToEdit={contactToEdit} />}
          />
          <Route
            path='/add-contact/edit/:contactId'
            element={<UpdateForm contactToEdit={contactToEdit} />}
          />

          <Route path='/contact-list' element={<ContactList />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
