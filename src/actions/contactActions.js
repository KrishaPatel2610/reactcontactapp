// actions/contactActions.js
export const setContacts = (contacts) => ({
  type: 'SET_CONTACTS',
  payload: contacts,
});

export const addContact = (contact) => ({
  type: 'ADD_CONTACT',
  payload: contact,
});

export const updateContact = (contact) => ({
  type: 'UPDATE_CONTACT',
  payload: contact,
});

export const deleteContact = (contactId) => ({
  type: 'DELETE_CONTACT',
  payload: contactId,
});
