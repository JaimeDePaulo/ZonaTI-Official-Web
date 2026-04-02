import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  LogOut, 
  User as UserIcon, 
  Settings,
  ChevronRight,
  Activity
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function ClientDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'supportRequests'),
        where('clientId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRequests(data);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching client requests:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-gray-500 font-medium animate-pulse">A carregar o seu painel...</p>
        </div>
      </div>
    );
  }

  const activeRequests = requests.filter(r => r.status !== 'completed' && r.status !== 'cancelled');
  const solvedRequests = requests.filter(r => r.status === 'completed');

  const stats = [
    { label: 'Total de Pedidos', value: requests.length, icon: <ClipboardList className="text-blue-500" /> },
    { label: 'Em Curso', value: activeRequests.length, icon: <Clock className="text-yellow-500" /> },
    { label: 'Concluídos', value: solvedRequests.length, icon: <CheckCircle className="text-green-500" /> },
  ];

  return (
    <div className="bg-background min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-secondary tracking-tight">
              Olá, <span className="text-primary">{user?.displayName?.split(' ')[0] || 'Cliente'}</span> 👋
            </h1>
            <p className="text-gray-500 mt-1">Bem-vindo à sua área de gestão técnica.</p>
          </motion.div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/pedido"
              className="flex-1 md:flex-none bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <Plus size={20} /> NOVO PEDIDO
            </Link>
            <button
              onClick={handleLogout}
              className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-2xl border border-gray-100 transition-all shadow-sm"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5"
            >
              <div className="p-4 bg-gray-50 rounded-2xl">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content: Requests */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-3">
                <Activity className="text-primary" size={20} /> Pedidos em Curso
              </h2>
              {activeRequests.length > 0 && (
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  {activeRequests.length} ATIVOS
                </span>
              )}
            </div>
            
            {activeRequests.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-16 rounded-[2.5rem] text-center border border-gray-100 border-dashed"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ClipboardList size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">Tudo em dia!</h3>
                <p className="text-gray-400 max-w-xs mx-auto mb-8">Não tem pedidos ativos no momento. Precisa de ajuda com algum equipamento?</p>
                <Link to="/pedido" className="text-primary font-bold flex items-center justify-center gap-2 hover:gap-3 transition-all">
                  Solicitar suporte agora <ChevronRight size={16} />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {activeRequests.map((request, i) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                          request.status === 'pending' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`}></div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          request.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {request.status === 'pending' ? 'Aguardando Técnico' : 'Técnico em Caminho'}
                        </span>
                      </div>
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        ID: #{request.id.slice(-6).toUpperCase()} • {request.createdAt?.toDate ? request.createdAt.toDate().toLocaleDateString() : 'Hoje'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">{request.serviceType}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{request.description}</p>
                    
                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <UserIcon size={14} className="text-gray-400" />
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                          {request.technicianId ? 'Técnico Atribuído' : 'A aguardar atribuição'}
                        </span>
                      </div>
                      <button className="text-xs font-bold text-primary hover:underline">Ver Detalhes</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar: Profile & History */}
          <div className="space-y-10">
            
            {/* Profile Card */}
            <div className="bg-secondary p-8 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute inset-0 samakaka-pattern opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                    {user?.displayName ? user.displayName[0].toUpperCase() : 'C'}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight">{user?.displayName || 'Cliente'}</h4>
                    <p className="text-white/50 text-xs truncate max-w-[150px]">{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group">
                    <span className="text-sm font-medium">Editar Perfil</span>
                    <Settings size={16} className="text-white/30 group-hover:text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* History Summary */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-3">
                <CheckCircle className="text-green-500" size={20} /> Histórico Recente
              </h2>
              
              {solvedRequests.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl text-center border border-gray-100">
                  <p className="text-gray-400 text-xs italic leading-relaxed">Ainda não tem serviços concluídos na sua conta.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {solvedRequests.slice(0, 5).map((request) => (
                    <motion.div
                      key={request.id}
                      whileHover={{ x: 5 }}
                      className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                          <CheckCircle size={18} className="text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-secondary text-sm group-hover:text-primary transition-colors">{request.serviceType}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Concluído</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-all" />
                    </motion.div>
                  ))}
                  {solvedRequests.length > 5 && (
                    <button className="w-full py-3 text-xs font-bold text-gray-400 hover:text-primary transition-all">
                      VER TODO O HISTÓRICO
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Support Banner */}
            <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10">
              <h4 className="font-bold text-secondary mb-2">Precisa de Ajuda?</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">A nossa equipa de suporte está disponível 24/7 para o ajudar.</p>
              <a href="https://wa.me/244939785068" className="block text-center bg-white text-primary py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all">
                Falar com Suporte
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
