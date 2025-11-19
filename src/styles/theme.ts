// src/styles/theme.ts (Exemplo)

const theme = {
    colors: {
        primary: '#007bff',       // Azul
        primaryDark: '#0056b3',   // Azul mais escuro (para hover)
        secondary: '#6c757d',     // Cinza
        secondaryDark: '#5a6268', // Cinza mais escuro (para hover)
        background: '#f8f9fa',
        text: '#212529',
        error: '#dc3545',
        success: '#28a745',
        warning: '#ffc107',
        white: '#ffffff',
        border: '#dee2e6',
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
    },
    typography: {
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        subtitle: {
            fontSize: 16,
            fontWeight: '600',
        }
    }
};

export default theme;