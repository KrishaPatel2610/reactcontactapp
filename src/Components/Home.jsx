//Home.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { GoArrowLeft } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { setContacts } from '../actions/contactActions';
import { setContactInLocalStorage } from '../updateLocalStorageContacts';

const Home = ({ contacts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addContact = () => {
    navigate('/add-contact');
  };
  const viewContact = () => {
    navigate('/contact-list');
  };
  const handleSignOut = () => {
    navigate('/login');
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
    dispatch(setContacts(importedContacts));
    setContactInLocalStorage(importedContacts);
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
          <GoArrowLeft />
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
        <button onClick={handleSignOut}>Logout</button>
      </nav>

      <Outlet />
    </div>
  );
};

export default Home;
