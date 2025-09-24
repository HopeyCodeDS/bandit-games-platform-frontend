const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(255, 215, 0, 0.05)',  // Subtle gold background
        '& fieldset': {
            borderColor: 'rgba(255, 215, 0, 0.3)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 215, 0, 0.5)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFD700',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#FFD700',
        '&.Mui-focused': {
            color: '#FFD700',  // Keep gold color when focused
        },
    },
    '& .MuiInputBase-input': {
        color: '#FFFFFF',
    },
    mb: 2,
};

export default textFieldStyle;