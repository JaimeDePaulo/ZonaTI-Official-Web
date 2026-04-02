import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-secondary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 samakaka-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Contacto</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Estamos aqui para ajudar. Entre em contacto connosco por qualquer um dos canais abaixo.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold mb-8 text-secondary">Informações</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Telefone</p>
                      <p className="text-secondary font-medium">+244 939 785 068</p>
                      <p className="text-secondary font-medium">+244 952 328 159</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Email</p>
                      <p className="text-secondary font-medium">jaimenglelodepaulo@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Localização</p>
                      <p className="text-secondary font-medium">Lubango, Angola</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary p-8 rounded-3xl text-white">
                <h3 className="text-2xl font-bold mb-4">Suporte Rápido</h3>
                <p className="mb-8 text-white/80">Para uma resposta imediata, utilize o nosso canal de WhatsApp.</p>
                <a
                  href="https://wa.me/244939785068"
                  className="flex items-center justify-center gap-2 bg-white text-primary py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors"
                >
                  <MessageSquare size={20} /> WHATSAPP
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold mb-8 text-secondary">Envie-nos uma mensagem</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Telefone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="+244 952 328 159"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Assunto</label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="suporte">Suporte Técnico</option>
                        <option value="vendas">Planos Empresariais</option>
                        <option value="tecnico">Trabalhar como Técnico</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mensagem</label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Como podemos ajudar?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                  >
                    ENVIAR MENSAGEM <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
