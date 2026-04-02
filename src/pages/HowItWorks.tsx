import { motion } from 'motion/react';
import { ClipboardList, UserCheck, Zap, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Descreva o problema',
      desc: 'Utilize o nosso formulário online ou contacte-nos via WhatsApp para explicar o que está a acontecer com o seu equipamento ou sistema.',
      icon: <ClipboardList className="w-12 h-12 text-primary" />,
    },
    {
      number: '02',
      title: 'Conectamos com um técnico',
      desc: 'O nosso sistema inteligente designa o técnico mais qualificado para o seu problema específico em poucos minutos.',
      icon: <UserCheck className="w-12 h-12 text-primary" />,
    },
    {
      number: '03',
      title: 'Resolução rápida',
      desc: 'O técnico resolve o problema remotamente ou agenda uma visita ao domicílio, garantindo que tudo volte ao normal rapidamente.',
      icon: <Zap className="w-12 h-12 text-primary" />,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-secondary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 samakaka-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Como Funciona</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simples, rápido e transparente. Veja como a ZonaTI resolve os seus problemas tecnológicos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-12",
                  i % 2 !== 0 && "md:flex-row-reverse"
                )}
              >
                <div className="flex-1">
                  <div className="text-8xl font-bold text-primary/10 mb-4">{step.number}</div>
                  <div className="mb-6">{step.icon}</div>
                  <h3 className="text-3xl font-bold mb-6 text-secondary tracking-tight">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{step.desc}</p>
                  <div className="flex items-center gap-4 text-primary font-bold">
                    <CheckCircle2 size={24} />
                    <span>Processo garantido pela ZonaTI</span>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-gray-100">
                    <img 
                      src={`https://images.unsplash.com/photo-${i === 0 ? '1517694712202-14dd9538aa97' : i === 1 ? '1573497019940-1c28c88b4f3e' : '1581092918056-0c4c3acd3789'}?auto=format&fit=crop&q=80&w=800`} 
                      alt={step.title} 
                      className="rounded-[2rem] w-full h-80 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4 tracking-tight">Porquê a Zona<span className="text-primary">TI</span>?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Segurança Total</h3>
              <p className="text-gray-600">Todos os nossos técnicos passam por um rigoroso processo de verificação e formação.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Rapidez</h3>
              <p className="text-gray-600">Tempo médio de resposta inferior a 30 minutos para pedidos de suporte remoto.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Garantia</h3>
              <p className="text-gray-600">Se o problema não for resolvido, não paga nada. Garantia de satisfação total.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-secondary p-16 rounded-[3rem] text-white relative overflow-hidden">
            <div className="absolute inset-0 samakaka-pattern opacity-5"></div>
            <h2 className="text-4xl font-bold mb-8 relative z-10 tracking-tight">Pronto para começar?</h2>
            <p className="text-gray-400 text-xl mb-12 relative z-10 max-w-2xl mx-auto">
              Junte-se a milhares de angolanos que já confiam na ZonaTI para o seu suporte tecnológico.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link
                to="/pedido"
                className="bg-primary text-white px-12 py-4 rounded-full text-lg font-bold hover:bg-red-700 transition-all transform hover:scale-105"
              >
                PEDIR SUPORTE AGORA
              </Link>
              <Link
                to="/tecnico/registo"
                className="bg-white text-secondary px-12 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all"
              >
                SOU TÉCNICO
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
