import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ClipboardList, Clock, CheckCircle, User, Phone, Mail, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TechnicianDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          setUserRole(role);
          if (role !== 'technician' && role !== 'admin') {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (userRole === 'technician' || userRole === 'admin') {
      const q = query(collection(db, 'supportRequests'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRequests(data);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching requests:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [userRole]);

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    try {
      const requestRef = doc(db, 'supportRequests', requestId);
      await updateDoc(requestRef, {
        status: newStatus,
        technicianId: auth.currentUser?.uid,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-secondary tracking-tight">Solicitações de Serviço</h1>
            <p className="text-gray-500 mt-2">Gerencie os pedidos de suporte técnico da plataforma.</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
            {requests.length} Pedidos Totais
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {requests.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
              <ClipboardList size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Nenhuma solicitação encontrada no momento.</p>
            </div>
          ) : (
            requests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      request.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {request.status}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {request.createdAt?.toDate ? request.createdAt.toDate().toLocaleString() : 'Recentemente'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">{request.serviceType.toUpperCase()}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{request.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <User size={16} className="text-primary" />
                      <span>{request.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Phone size={16} className="text-primary" />
                      <span>{request.clientPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Mail size={16} className="text-primary" />
                      <span>{request.clientEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate(request.id, 'in-progress')}
                      className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Clock size={18} /> ASSUMIR PEDIDO
                    </button>
                  )}
                  {request.status === 'in-progress' && (
                    <button
                      onClick={() => handleStatusUpdate(request.id, 'completed')}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} /> FINALIZAR
                    </button>
                  )}
                  {request.status === 'completed' && (
                    <div className="text-green-600 font-bold flex items-center gap-2 px-6 py-3">
                      <CheckCircle size={18} /> CONCLUÍDO
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
