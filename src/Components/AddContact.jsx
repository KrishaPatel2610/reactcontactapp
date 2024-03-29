//Add contact.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../actions/contactActions';

function AddContact({ contact = {}, contacts, setContacts }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: contact.name || '',
    email: contact.email || '',
    phoneNumber: contact.phoneNumber || '',
  });
  const [error, setError] = useState({
    nameError: '',
    emailError: '',
    phoneNumberError: '',
  });
  const [file, setFile] = useState(contact.image || undefined);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

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
      setFile();
    }
  }

  // const handleSave = () => {
  //   const isNameValid = validateName();
  //   const isEmailValid = validateEmail();
  //   const isPhoneNumberValid = validatePhoneNumber();

  //   if (isNameValid && isEmailValid && isPhoneNumberValid) {
  //     toast.success('Contact data added successfully!');
  //     const { name, email, phoneNumber } = formData;
  //     onSave({ name, email, phoneNumber, image: file });
  //     navigate('/contact-list');
  //   }
  // };
  const handleSave = () => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneNumberValid = validatePhoneNumber();

    if (isNameValid && isEmailValid && isPhoneNumberValid) {
      toast.success('Contact data added successfully!');
      const { name, email, phoneNumber } = formData;
      const contactData = { name, email, phoneNumber, image: file };

      if (!contact.email) {
        dispatch(addContact(contactData));
      } else {
        dispatch(updateContact(contactData));
      }

      const updatedContacts = [...contacts];
      const existingContactIndex = updatedContacts.findIndex(
        (c) => c.email === contact.email
      );
      if (existingContactIndex !== -1) {
        updatedContacts[existingContactIndex] = contactData;
      } else {
        updatedContacts.push(contactData);
      }
      setContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));

      navigate('/contact-list');
    }
  };
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

  return (
    <div className='contact-data'>
      <input
        type='file'
        accept='image/png,image/gif,image/jpeg'
        onChange={handleChangeImg}
      />

      <img
        src={
          file ||
          'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'
        }
        className='profile-img'
        alt='profile'
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
        Save
      </button>
    </div>
  );
}

export default AddContact;
