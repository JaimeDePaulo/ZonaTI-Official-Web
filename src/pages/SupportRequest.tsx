import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Laptop, Phone, Shield, Wifi, Camera, Database, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { cn } from '../lib/utils';

export default function SupportRequest() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: '',
    description: '',
    phone: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'supportRequests'), {
        clientId: user.uid,
        clientName: user.displayName || 'Cliente',
        clientEmail: user.email,
        clientPhone: formData.phone,
        serviceType: formData.serviceType,
        description: formData.description,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setSuccess(true);
      setFormData({ serviceType: '', description: '', phone: '' });
    } catch (err: any) {
      console.error('Error creating support request:', err);
      setError('Ocorreu um erro ao enviar o seu pedido. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Send size={40} />
          </div>
          <h2 className="text-3xl font-bold text-secondary mb-4 tracking-tight">Pedido Enviado!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            O seu pedido de suporte foi recebido com sucesso. Um técnico entrará em contacto consigo em breve.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 transition-all"
          >
            VOLTAR AO INÍCIO
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-secondary mb-4 tracking-tight">Pedir Suporte</h1>
            <p className="text-gray-500">Descreva o seu problema e nós resolvemos.</p>
          </div>

          {!user && (
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl mb-8 flex items-start gap-4">
              <AlertCircle className="text-primary flex-shrink-0" />
              <div>
                <p className="text-secondary font-bold mb-1">Autenticação Necessária</p>
                <p className="text-gray-600 text-sm mb-4">Precisa de estar ligado à sua conta para fazer um pedido de suporte.</p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-all"
                >
                  FAZER LOGIN
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Tipo de Serviço</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: 'manutencao', label: 'Manutenção', icon: <Laptop size={20} /> },
                  { id: 'redes', label: 'Redes', icon: <Wifi size={20} /> },
                  { id: 'seguranca', label: 'Segurança', icon: <Camera size={20} /> },
                  { id: 'software', label: 'Software', icon: <Database size={20} /> },
                  { id: 'remoto', label: 'Remoto', icon: <Phone size={20} /> },
                  { id: 'outro', label: 'Outro', icon: <AlertCircle size={20} /> },
                ].map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: service.id })}
                    className={cn(
                      "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all gap-3",
                      formData.serviceType === service.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-100 hover:border-primary/30 text-gray-500"
                    )}
                  >
                    {service.icon}
                    <span className="text-xs font-bold uppercase">{service.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Telefone de Contacto</label>
              <input
                type="tel"
                required
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="+244 9XX XXX XXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Descrição do Problema</label>
              <textarea
                required
                rows={5}
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                placeholder="Explique detalhadamente o que está a acontecer..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !user}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {loading ? 'A ENVIAR...' : 'ENVIAR PEDIDO'} <Send size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
