import { motion } from 'motion/react';
import { Laptop, Phone, Shield, Wifi, Camera, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const allServices = [
    {
      title: 'Manutenção de Computadores',
      description: 'Reparação de hardware, limpeza interna, substituição de componentes e otimização de sistema.',
      icon: <Laptop className="w-10 h-10 text-primary" />,
      price: 'A partir de 5.000 Kz',
    },
    {
      title: 'Redes e Internet',
      description: 'Instalação e configuração de redes Wi-Fi, cablagem estruturada e resolução de problemas de conectividade.',
      icon: <Wifi className="w-10 h-10 text-primary" />,
      price: 'A partir de 10.000 Kz',
    },
    {
      title: 'CCTV e Segurança',
      description: 'Instalação de sistemas de videovigilância, alarmes e controlo de acessos para a sua casa ou empresa.',
      icon: <Camera className="w-10 h-10 text-primary" />,
      price: 'Sob consulta',
    },
    {
      title: 'Software e Sistemas',
      description: 'Instalação de sistemas operativos, antivírus, software de gestão e recuperação de dados.',
      icon: <Database className="w-10 h-10 text-primary" />,
      price: 'A partir de 7.500 Kz',
    },
    {
      title: 'Suporte Remoto',
      description: 'Assistência técnica imediata via internet para problemas de software e configurações rápidas.',
      icon: <Phone className="w-10 h-10 text-primary" />,
      price: 'A partir de 3.000 Kz',
    },
    {
      title: 'Planos Empresariais',
      description: 'Contratos de manutenção mensal com suporte prioritário e consultoria tecnológica.',
      icon: <Shield className="w-10 h-10 text-primary" />,
      price: 'Sob consulta',
    },
  ];

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
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Nossos Serviços</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Soluções tecnológicas completas e profissionais para todas as suas necessidades.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className="mb-8 p-4 bg-primary/5 rounded-2xl w-fit group-hover:bg-primary group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">{service.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                  <span className="text-primary font-bold">{service.price}</span>
                  <Link
                    to="/pedido"
                    className="bg-secondary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-primary transition-all"
                  >
                    SOLICITAR
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute inset-0 samakaka-pattern opacity-5"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold mb-6 tracking-tight">Precisa de uma solução personalizada?</h2>
                <p className="text-gray-400 text-lg mb-8">
                  Se o seu problema não se enquadra nas categorias acima, não se preocupe. A nossa equipa está pronta para analisar o seu caso específico.
                </p>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-4 transition-all"
                >
                  Falar com um especialista <ArrowRight size={20} />
                </Link>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-primary p-8 rounded-3xl text-center">
                  <h3 className="text-2xl font-bold mb-2">Suporte Prioritário</h3>
                  <p className="text-white/80 mb-6">Para empresas que não podem parar.</p>
                  <Link
                    to="/pedido"
                    className="block w-full bg-white text-secondary py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    SABER MAIS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
