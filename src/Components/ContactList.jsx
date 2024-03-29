//contactList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal.jsx';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../actions/contactActions.js';

function ContactList({ contacts }) {
  const dispatch = useDispatch();

  const [contactList, setContactList] = useState(contacts);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  const handleEditData = (index) => {
    navigate('/add-contact', { state: { contact: contactList[index] } });
    setEditIndex(index);
  };
  // const confirmDelete = () => {
  //   const updatedContacts = [...contactList];
  //   if (toBeDeleted !== null) {
  //     updatedContacts.splice(toBeDeleted, 1);
  //     setContactList(updatedContacts);
  //     localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  //   }
  //   closeAndResetModal();
  // };
  // const confirmDelete = () => {
  //   if (toBeDeleted !== null) {
  //     dispatch(deleteContact(toBeDeleted));
  //     closeAndResetModal();
  //   }
  // };
  const confirmDelete = () => {
    const updatedContacts = [...contacts];
    if (toBeDeleted !== null) {
      dispatch(deleteContact(contactList[toBeDeleted].email));

      updatedContacts.splice(toBeDeleted, 1);
      setContactList(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
    closeAndResetModal();
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setToBeDeleted(null);
  };

  const handleDeleteData = (index) => {
    setToBeDeleted(index);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h3>Contact List</h3>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeAndResetModal}
        onConfirm={confirmDelete}
      />
      <table>
        <tbody>
          {contactList.map((contact, index) => (
            <tr key={index}>
              <td>
                <img className='img-tbl' src={contact.image} alt='userImg' />
              </td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
              <td>
                <button
                  className='edit-btn'
                  onClick={() => handleEditData(index)}
                >
                  Edit
                </button>
                <button
                  className='delete-btn'
                  onClick={() => handleDeleteData(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;
