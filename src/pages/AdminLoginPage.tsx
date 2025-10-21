import { useNavigate } from 'react-router-dom';
import { AdminLogin } from '../components/AdminLogin';
import { toast } from 'sonner';
import { BackgroundImage } from '../components/BackgroundImage';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function AdminLoginPage() {
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    // Simple demo authentication - in real app, this would validate against backend
    if (username === 'admin' && password === 'admin123') {
      toast.success('Login successful! Redirecting to dashboard...');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials. Use admin / admin123');
    }
  };

  return (
    <BackgroundImage>
      <Navbar />
      
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12">
        <AdminLogin onLogin={handleLogin} />
      </div>
      
      <Footer />
    </BackgroundImage>
  );
}
