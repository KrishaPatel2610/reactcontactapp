//Home.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
const Home = ({ contacts, onSignOut, setContacts }) => {
  const navigate = useNavigate();

  const addContact = () => {
    navigate('/add-contact');
  };
  const viewContact = () => {
    navigate('/contact-list');
  };
  const exportContactsToCSV = () => {
    const csv = Papa.unparse(contacts);
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvBlob);
    link.setAttribute('download', 'contacts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleImportContacts = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          processImportedContacts(result.data);
        },
        header: true,
      });
    }
  };
  const processImportedContacts = (importedContacts) => {
    setContacts(importedContacts);
  };
  const triggerFileInput = () => {
    document.getElementById('csvFileInput').click();
  };
  return (
    <div>
      <nav className='nav-bar'>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
        <input
          type='file'
          id='csvFileInput'
          style={{ display: 'none' }}
          accept='.csv'
          onChange={handleImportContacts}
        />
        <button onClick={triggerFileInput}>Import</button>
        <button onClick={exportContactsToCSV}>Export</button>
        <button onClick={addContact}>Add Contact</button>
        <button onClick={viewContact}>View Contact</button>
        <button onClick={onSignOut}>Logout</button>
      </nav>

      <Outlet />
    </div>
  );
};

export default Home;
