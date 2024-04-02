//contactList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, setContacts } from '../actions/contactActions.js';
import { deleteContactFromLocalStorage } from '../updateLocalStorageContacts.js';

function ContactList() {
  const dispatch = useDispatch();

  const finalContacts = useSelector((state) => state.contactReducer.contacts);

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    index: null,
  });

  const navigate = useNavigate();

  const handleEditData = (contactId, index) => {
    navigate(`/add-contact/edit/${contactId}`, {
      state: { contact: finalContacts[index] },
    });
  };

  const confirmDelete = () => {
    const { index } = deleteConfirmation;
    if (index !== null) {
      dispatch(deleteContact(finalContacts[index].contactId));
      closeAndResetModal();
      const updatedContacts = deleteContactFromLocalStorage(
        finalContacts[index].contactId
      );
      dispatch(setContacts(updatedContacts));
    }
  };

  const closeAndResetModal = () => {
    setDeleteConfirmation({ isOpen: false, index: null });
  };

  const handleDeleteData = (index) => {
    setDeleteConfirmation({ isOpen: true, index: index });
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={closeAndResetModal}
        onConfirm={confirmDelete}
      />
      {finalContacts.length > 0 ? (
        <table>
          <tbody>
            {finalContacts.map((contact, index) => (
              <tr key={index}>
                <td>
                  <img
                    className='img-tbl'
                    src={
                      contact.image ||
                      'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'
                    }
                    alt='userImg'
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phoneNumber}</td>
                <td>
                  <button
                    className='edit-btn'
                    onClick={() => handleEditData(contact.contactId, index)}
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
      ) : (
        <div className='no-data-section'>
          <h3 className='no-data'>No contacts found, Please add contacts.</h3>
          <button
            className='add-contact-list-btn'
            onClick={() => {
              navigate('/add-contact');
            }}
          >
            Add Contact
          </button>
        </div>
      )}
    </div>
  );
}
export default ContactList;
