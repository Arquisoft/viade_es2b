export default {
  // Prevent page scrolling when modal is open
  '@global': {
    'body': {
      overflow: 'hidden',
    },
  },

  // Modal wrapper
  modalOverlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '9999',
    opacity: 1,
    animation: 'show .5s ease',
    overflowX: 'hidden',
    overflowY: 'auto',
  },

  // Fade in open animation
  '@keyframes show': {
    '0%': {
      display: 'none',
      opacity: 0,
    },
    '1%': {
      display: 'flex',
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
};