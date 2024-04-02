export function updateContacts(contactData, actionType) {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  if (actionType === 'add') {
    contacts.push(contactData);
  } else if (actionType === 'update') {
    contacts = contacts.map((contact) =>
      contact.contactId === contactData.contactId ? contactData : contact
    );
  }
  localStorage.setItem('contacts', JSON.stringify(contacts));
  return contacts;
}

export function setContactInLocalStorage(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

export function getContactFromLocalStorage() {
  const contacts = localStorage.getItem('contacts');
  return contacts;
}
export function deleteContactFromLocalStorage(id) {
  console.log(id);
  const contacts = JSON.parse(getContactFromLocalStorage());
  console.log(contacts);
  const newContactList = contacts.filter((contact) => contact.contactId !== id);

  localStorage.setItem('contacts', JSON.stringify(newContactList));
  return newContactList;
}
