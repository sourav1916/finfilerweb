const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  className = ''
}) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-secondary text-primary-foreground border border-border hover:bg-primary',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 
        ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;