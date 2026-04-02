import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ClipboardList, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function ClientDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    const user = auth.currentUser;
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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeRequests = requests.filter(r => r.status !== 'completed' && r.status !== 'cancelled');
  const solvedRequests = requests.filter(r => r.status === 'completed');

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-secondary tracking-tight">Minha Área de Suporte</h1>
            <p className="text-gray-500 mt-2">Acompanhe os seus pedidos e serviços realizados.</p>
          </div>
          <Link
            to="/pedido"
            className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus size={20} /> NOVO PEDIDO
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Active Requests */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
              <Clock className="text-primary" /> Pedidos em Curso
            </h2>
            
            {activeRequests.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
                <ClipboardList size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Não tem pedidos ativos no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {activeRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {request.status === 'pending' ? 'Pendente' : 'Em Processamento'}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {request.createdAt?.toDate ? request.createdAt.toDate().toLocaleDateString() : 'Hoje'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-2">{request.serviceType.toUpperCase()}</h3>
                    <p className="text-gray-600 leading-relaxed">{request.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Solved Services */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
              <CheckCircle className="text-green-600" /> Serviços Solucionados
            </h2>
            
            {solvedRequests.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl text-center border border-gray-100">
                <p className="text-gray-400 text-sm italic">Ainda não tem serviços concluídos.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {solvedRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 p-6 rounded-2xl border border-green-100"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <h4 className="font-bold text-secondary text-sm">{request.serviceType.toUpperCase()}</h4>
                    </div>
                    <p className="text-gray-500 text-xs line-clamp-2">{request.description}</p>
                    <p className="text-[10px] text-green-700 mt-3 font-bold uppercase tracking-widest">Concluído</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
