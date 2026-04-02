import { motion } from 'motion/react';
import { Target, Eye, Heart, History, CheckCircle } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Missão',
      desc: 'Providenciar soluções tecnológicas eficientes e acessíveis, conectando os melhores técnicos aos clientes que precisam de suporte de qualidade.',
      icon: <Target className="w-8 h-8 text-primary" />,
    },
    {
      title: 'Visão',
      desc: 'Ser a plataforma líder em suporte técnico em Angola, reconhecida pela excelência, rapidez e inovação tecnológica.',
      icon: <Eye className="w-8 h-8 text-primary" />,
    },
    {
      title: 'Valores',
      desc: 'Integridade, profissionalismo, foco no cliente e compromisso com a excelência em cada intervenção técnica.',
      icon: <Heart className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-secondary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 samakaka-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl font-bold mb-8 tracking-tight">Sobre a <span className="text-primary">ZonaTI</span></h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                Nascemos da necessidade de profissionalizar o mercado de suporte técnico em Angola, criando uma ponte segura e eficiente entre quem precisa de ajuda e quem sabe resolver.
              </p>
              <div className="flex items-center gap-4 text-primary font-bold">
                <History size={24} />
                <span>Desde 2024 a transformar o suporte técnico.</span>
              </div>
            </motion.div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Team working" 
                className="rounded-3xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-primary rounded-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="mb-6">{v.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-secondary mb-8 text-center tracking-tight">A Nossa História</h2>
            <div className="space-y-12">
              <div className="flex gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">O Início</h3>
                  <p className="text-gray-600 leading-relaxed">
                    A ZonaTI começou como um pequeno projeto de suporte técnico em Luanda, focado em ajudar pequenas empresas a digitalizarem-se com segurança.
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">A Expansão</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Com o aumento da procura, percebemos que precisávamos de uma plataforma que pudesse escalar o atendimento e garantir a qualidade técnica em todo o país.
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Hoje</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Atualmente, somos uma plataforma robusta que integra clientes, técnicos e empresas, utilizando tecnologia de ponta para resolver problemas complexos de TI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary text-white overflow-hidden relative">
        <div className="absolute inset-0 samakaka-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Porquê Escolher a ZonaTI?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              'Técnicos Certificados',
              'Atendimento 24/7',
              'Preços Transparentes',
              'Garantia de Serviço',
              'Suporte Remoto Imediato',
              'Soluções Personalizadas',
              'Segurança de Dados',
              'Presença Nacional',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 p-6 rounded-2xl border border-white/10">
                <CheckCircle className="text-primary" size={20} />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
