import { motion } from 'motion/react';
import { ArrowRight, Laptop, Shield, Users, Phone, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const services = [
    {
      title: 'Suporte Remoto',
      description: 'Resolução de problemas de software e configuração via internet, sem sair de casa.',
      icon: <Laptop className="w-8 h-8 text-primary" />,
    },
    {
      title: 'Assistência ao Domicílio',
      description: 'Técnicos qualificados que vão até si para resolver problemas de hardware e redes.',
      icon: <Phone className="w-8 h-8 text-primary" />,
    },
    {
      title: 'Planos Empresariais',
      description: 'Gestão completa de TI para a sua empresa, garantindo continuidade e segurança.',
      icon: <Shield className="w-8 h-8 text-primary" />,
    },
  ];

  const testimonials = [
    {
      name: 'João Manuel',
      role: 'Empresário',
      content: 'A ZonaTI resolveu os problemas de rede da minha empresa em tempo recorde. Profissionalismo exemplar.',
      rating: 5,
    },
    {
      name: 'Maria Antónia',
      role: 'Freelancer',
      content: 'Excelente suporte remoto. O técnico foi muito paciente e resolveu o meu problema de software rapidamente.',
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 samakaka-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tighter">
                Tecnologia que <span className="text-primary">resolve</span>.
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
                Suporte técnico especializado em TI para indivíduos e empresas. Rápido, seguro e profissional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/pedido"
                  className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  PEDIR SUPORTE AGORA <ArrowRight size={20} />
                </Link>
                <Link
                  to="/servicos"
                  className="border-2 border-white hover:bg-white hover:text-secondary text-white px-8 py-4 rounded-full text-lg font-bold transition-all"
                >
                  VER SERVIÇOS
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 bg-gradient-to-br from-primary/20 to-transparent p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" 
                  alt="IT Support" 
                  className="rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Técnicos', value: '50+' },
              { label: 'Clientes', value: '1000+' },
              { label: 'Sucessos', value: '98%' },
              { label: 'Cidades', value: '5+' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4 tracking-tight">Nossos Serviços</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma gama completa de soluções tecnológicas para manter o seu negócio e a sua vida digital em movimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-secondary">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <Link to="/servicos" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Saber mais <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 samakaka-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Como Funciona</h2>
            <p className="text-gray-400">Resolver o seu problema de TI nunca foi tão simples.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Descreva o problema', desc: 'Preencha o formulário ou contacte-nos via WhatsApp.' },
              { step: '02', title: 'Conectamos com técnico', desc: 'Um especialista será designado para o seu caso imediatamente.' },
              { step: '03', title: 'Resolva rapidamente', desc: 'O problema é resolvido remotamente ou no local.' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-white/10 absolute -top-8 -left-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-4 relative z-10">{item.title}</h3>
                <p className="text-gray-400 relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4 tracking-tight">O que dizem os nossos clientes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">{t.name}</h4>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8 tracking-tight">Pronto para resolver os seus problemas de TI?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pedido"
              className="bg-secondary text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-black transition-all"
            >
              SOLICITAR AGORA
            </Link>
            <a
              href="https://wa.me/244939785068"
              className="bg-green-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              WHATSAPP
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
