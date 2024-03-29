function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 1000,
        }}
        onClick={onClose}
      ></div>

      <div
        style={{
          marginTop: '5em',
          border: 'none',
          borderRadius: '1em',
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          zIndex: 1001,
        }}
      >
        <h2>Are you sure?</h2>
        <p>Do you really want to delete this contact?</p>
        <button className='confirm-delete' onClick={onConfirm}>
          Yes, Delete
        </button>
        <button className='cancel-btn' onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
export default ConfirmationModal;
