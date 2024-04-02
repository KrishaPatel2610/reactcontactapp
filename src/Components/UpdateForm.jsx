//Add contact.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  addContact,
  updateContact,
  setContacts,
} from '../actions/contactActions';
import { updateContacts } from '../updateLocalStorageContacts';
import { CloseButton } from '@chakra-ui/react';
import { useRef } from 'react';

function UpdateForm({ contactToEdit = {} }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { contactId } = useParams();

  const [formData, setFormData] = useState({
    id: contactToEdit.contactId,
    name: contactToEdit.name,
    email: contactToEdit.email,
    phoneNumber: contactToEdit.phoneNumber,
  });

  const [error, setError] = useState({
    nameError: '',
    emailError: '',
    phoneNumberError: '',
  });
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(contactToEdit.image || null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateName = () => {
    const { name } = formData;
    if (!name) {
      setError((prevState) => ({
        ...prevState,
        nameError: 'Name is required.',
      }));
      return false;
    }
    if (name.length < 4) {
      setError((prevState) => ({
        ...prevState,
        nameError: 'Name must be at least 4 characters long',
      }));

      return false;
    }
    if (typeof name != 'string') {
      setError((prevState) => ({
        ...prevState,
        nameError: 'Invalid Name!',
      }));
      return false;
    }
    setError((prevState) => ({
      ...prevState,
      nameError: '',
    }));
    return true;
  };

  const validateEmail = () => {
    const { email } = formData;
    if (!email) {
      setError((prevState) => ({
        ...prevState,
        emailError: 'Email is required.',
      }));

      return false;
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setError((prevState) => ({
        ...prevState,
        emailError: 'Please enter a valid email.',
      }));
      return false;
    }

    setError((prevState) => ({
      ...prevState,
      emailError: '',
    }));
    return true;
  };

  const validatePhoneNumber = () => {
    const { phoneNumber } = formData;
    if (!phoneNumber) {
      setError((prevState) => ({
        ...prevState,
        phoneNumberError: 'Phone Number is required.',
      }));
      return false;
    }
    if (phoneNumber.length !== 10) {
      setError((prevState) => ({
        ...prevState,
        phoneNumberError: 'Phone number must be contain 10 digits',
      }));

      return false;
    }

    setError((prevState) => ({
      ...prevState,
      phoneNumberError: '',
    }));
    return true;
  };

  function handleChangeImg(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    } else {
      setFile(
        'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'
      );
    }
  }

  const handleSave = () => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneNumberValid = validatePhoneNumber();

    if (isNameValid && isEmailValid && isPhoneNumberValid) {
      const { name, email, phoneNumber } = formData;
      const contactData = { contactId, name, email, phoneNumber, image: file };
      let actionType = '';

      if (contactToEdit.contactId) {
        contactData.contactId = contactToEdit.contactId;
        dispatch(updateContact(contactData));
        actionType = 'update';
        toast.success('Contact updated successfully!');
      } else {
        dispatch(addContact(contactData));
        actionType = 'add';
        toast.success('Contact added successfully!');
      }

      const updatedContacts = updateContacts(contactData, actionType);
      dispatch(setContacts(updatedContacts));
      navigate('/contact-list');
    }
  };
  function handleRemoveImage() {
    setFile(undefined);
  }
  function handleImageClick() {
    fileInputRef.current.click();
  }

  return (
    <div className='contact-data'>
      <input
        type='file'
        accept='image/png,image/gif,image/jpeg'
        onChange={handleChangeImg}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      {file && (
        <CloseButton onClick={handleRemoveImage} className='remove-img-btn' />
      )}
      <img
        src={
          file ||
          'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'
        }
        className='profile-img'
        alt='profile'
        onClick={handleImageClick}
      />

      <input
        type='text'
        className='input-field'
        placeholder='Name'
        name='name'
        value={formData.name}
        onChange={handleChange}
      />
      {error.nameError && <p className='error'>{error.nameError}</p>}
      <input
        type='email'
        className='input-field'
        placeholder='Email'
        name='email'
        value={formData.email}
        onChange={handleChange}
      />
      {error.emailError && <p className='error'>{error.emailError}</p>}
      <input
        type='tel'
        placeholder='Phone Number'
        className='input-field'
        name='phoneNumber'
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      {error.phoneNumberError && (
        <p className='error'>{error.phoneNumberError}</p>
      )}
      <button className='save-btn' onClick={handleSave}>
        Update
      </button>
    </div>
  );
}

export default UpdateForm;
