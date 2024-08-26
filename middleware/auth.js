export default function ({ redirect, route }) {
    if (process.client) {
      console.log('Checking authentication...');
      const token = localStorage.getItem('token');
      
      // Permitir el acceso a las páginas de login y registro si no hay token
      if (!token && (route.path === '/login' || route.path === '/register')) {
        return;
      }
      
      // Redirigir a la página de login si no hay token y no estás en la página de login o registro
      if (!token && route.path !== '/login') {
        console.log('No token found, redirecting to /login');
        return redirect('/login');
      }
    }
  }
  