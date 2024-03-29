//Main App Component
import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import ErrorPage from './Components/ErrorPage';
import ContactList from './Components/ContactList';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddContact from './Components/AddContact';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const contactToEdit = location.state?.contact;

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSignIn = () => {
    navigate('/contact-list');
  };

  const handleSignUp = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    setUser(null);
    navigate('/login');
  };

  const handleSaveContact = (editedContact) => {
    const contactIndex = contacts.findIndex(
      (c) => c.email === editedContact.email
    );
    if (contactIndex !== -1) {
      const updatedContacts = [...contacts];
      updatedContacts[contactIndex] = editedContact;
      setContacts(updatedContacts);
    } else {
      setContacts([...contacts, editedContact]);
    }
  };

  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path='/login' element={<SignIn onSignIn={handleSignIn} />} />
          <Route path='/sign-up' element={<SignUp onSignUp={handleSignUp} />} />
          <Route
            path='/'
            element={
              <Home
                contacts={contacts}
                onSignOut={handleSignOut}
                setContacts={setContacts}
              />
            }
          >
            <Route
              path='/add-contact'
              element={
                <AddContact
                  contact={contactToEdit}
                  contacts={contacts} // Pass contacts as a prop
                  setContacts={setContacts}
                />
              }
            />
            ;
            <Route
              path='/contact-list'
              element={<ContactList contacts={contacts} />}
            ></Route>
            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
// const handleSave = () => {
//   const isNameValid = validateName();
//   const isEmailValid = validateEmail();
//   const isPhoneNumberValid = validatePhoneNumber();

//   if (isNameValid && isEmailValid && isPhoneNumberValid) {
//     toast.success('Contact data added successfully!');
//     const { name, email, phoneNumber } = formData;
//     const contactData = { name, email, phoneNumber, image: file };
//     if (contact.email) {
//       dispatch(updateContact(contactData));
//     } else {
//       dispatch(addContact(contactData));
//     }
//     navigate('/contact-list');
//   }
// };
// import React from 'react';
// import { useSelector } from 'react-redux';

// function ContactList() {
//   const contacts = useSelector(state => state.contactReducer.contacts);

//   return (
//     <div>
//       {/* Render your contacts here */}
//     </div>
//   );
// }

// export default ContactList;
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addContact, updateContact } from '../actions/contactActions'; // Adjust the path as necessary
//Example for AddContact Component
// const handleSave = () => {
//   const isNameValid = validateName();
//   const isEmailValid = validateEmail();
//   const isPhoneNumberValid = validatePhoneNumber();

//   if (isNameValid && isEmailValid && isPhoneNumberValid) {
//     toast.success('Contact data added successfully!');
//     const { name, email, phoneNumber } = formData;
//     const contactData = { name, email, phoneNumber, image: file };

//     // Dispatch addContact if contact does not exist, otherwise dispatch updateContact
//     if (!contact.email) {
//       dispatch(addContact(contactData));
//     } else {
//       dispatch(updateContact(contactData));
//     }

//     // Update local storage with the updated contacts
//     const updatedContacts = [...contacts];
//     const existingContactIndex = updatedContacts.findIndex(
//       (c) => c.email === contact.email
//     );
//     if (existingContactIndex !== -1) {
//       updatedContacts[existingContactIndex] = contactData;
//     } else {
//       updatedContacts.push(contactData);
//     }
//     setContacts(updatedContacts);
//     localStorage.setItem('contacts', JSON.stringify(updatedContacts));

//     // Navigate to contact list page
//     navigate('/contact-list');
//   }
// };
