// reducers/contactReducer.js
const initialState = {
  contacts: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case 'UPDATE_CONTACT':
      const updatedContacts = state.contacts.map((contact) =>
        contact.email === action.payload.email ? action.payload : contact
      );
      return {
        ...state,
        contacts: updatedContacts,
      };
    case 'DELETE_CONTACT':
      const filteredContacts = state.contacts.filter(
        (contact) => contact.email !== action.payload
      );

      return {
        ...state,
        contacts: filteredContacts,
      };
    default:
      return state;
  }
};

export default contactReducer;

// case 'DELETE_CONTACT':
//   const filteredContacts = state.contacts.filter(
//     (contact) => contact.email !== action.payload
//   );
//   // Update local storage
//   localStorage.setItem('contacts', JSON.stringify(filteredContacts));
//   return {
//     ...state,
//     contacts: filteredContacts,
//   };
