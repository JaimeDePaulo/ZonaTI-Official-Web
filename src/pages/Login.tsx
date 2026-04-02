import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, UserPlus, Shield, AlertCircle, Laptop, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      let role = 'client';
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          role: 'client',
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        });
      } else {
        role = userDoc.data().role;
      }

      if (role === 'technician' || role === 'admin') {
        navigate('/tecnico/dashboard');
      } else {
        navigate('/cliente/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Erro ao entrar com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        // Register
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        
        await updateProfile(user, { displayName });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: displayName,
          email: user.email,
          role: 'client',
          createdAt: serverTimestamp(),
        });
        navigate('/cliente/dashboard');
      } else {
        // Login
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          if (role === 'technician' || role === 'admin') {
            navigate('/tecnico/dashboard');
          } else {
            navigate('/cliente/dashboard');
          }
        } else {
          navigate('/cliente/dashboard');
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este email já está em uso.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Email ou senha incorretos.');
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError('Ocorreu um erro. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-background px-4 py-12">
      <div className="absolute inset-0 samakaka-pattern opacity-5 pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-bold text-3xl shadow-lg shadow-primary/20">Z</div>
          <h1 className="text-3xl font-bold text-secondary mb-2 tracking-tight">
            {isRegistering ? 'Criar Conta' : 'Bem-vindo de volta'}
          </h1>
          <p className="text-gray-500">
            {isRegistering ? 'Registe-se para pedir suporte técnico.' : 'Aceda à sua conta ZonaTI.'}
          </p>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          {isRegistering && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                required
                placeholder="Nome Completo"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              required
              placeholder="Senha"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'A PROCESSAR...' : (isRegistering ? 'REGISTAR' : 'ENTRAR')}
            {isRegistering ? <UserPlus size={20} /> : <LogIn size={20} />}
          </button>
        </form>

        <div className="relative py-4 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest text-gray-400">
            <span className="bg-white px-4">Ou continue com</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-100 hover:border-primary/30 py-4 rounded-2xl font-bold text-secondary transition-all disabled:opacity-50 mb-8"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          GOOGLE
        </button>

        <div className="text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm font-bold text-primary hover:underline"
          >
            {isRegistering ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Registe-se agora'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-12">
          <div className="flex flex-col items-center gap-2 p-4 bg-background rounded-2xl border border-gray-50">
            <Shield className="text-primary" size={20} />
            <span className="text-[10px] uppercase font-bold text-gray-400">Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-background rounded-2xl border border-gray-50">
            <Laptop className="text-primary" size={20} />
            <span className="text-[10px] uppercase font-bold text-gray-400">Suporte</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
