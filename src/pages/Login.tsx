import { motion } from 'motion/react';
import { LogIn, UserPlus, Shield, AlertCircle, Laptop } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create initial profile as client
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          role: 'client',
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        });
      }

      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 samakaka-pattern opacity-5 pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 max-w-md w-full relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-bold text-3xl shadow-lg shadow-primary/20">Z</div>
          <h1 className="text-3xl font-bold text-secondary mb-2 tracking-tight">Bem-vindo à ZonaTI</h1>
          <p className="text-gray-500">Aceda à sua conta para gerir os seus pedidos.</p>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-100 hover:border-primary/30 py-4 rounded-2xl font-bold text-secondary transition-all disabled:opacity-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
            {loading ? 'A PROCESSAR...' : 'ENTRAR COM GOOGLE'}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-gray-400">
              <span className="bg-white px-4">Segurança Garantida</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-gray-50">
              <Shield className="text-primary" size={20} />
              <span className="text-sm text-gray-600">Dados encriptados e seguros</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-gray-50">
              <Laptop className="text-primary" size={20} />
              <span className="text-sm text-gray-600">Suporte técnico especializado</span>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </div>

        <p className="mt-12 text-center text-xs text-gray-400 leading-relaxed">
          Ao entrar, concorda com os nossos <a href="#" className="text-primary hover:underline">Termos de Serviço</a> e <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
        </p>
      </motion.div>
    </div>
  );
}
