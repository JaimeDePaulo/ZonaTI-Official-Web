import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-xl">Z</div>
              <span className="text-xl font-bold tracking-tighter">Zona<span className="text-primary">TI</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tecnologia que resolve. A sua plataforma de suporte técnico em TI de confiança em Angola.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 border-b-2 border-primary w-fit pr-4">Serviços</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/servicos" className="hover:text-white transition-colors">Suporte Remoto</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors">Assistência ao Domicílio</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors">Planos Empresariais</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors">CCTV e Segurança</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 border-b-2 border-primary w-fit pr-4">Links Úteis</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link to="/como-funciona" className="hover:text-white transition-colors">Como Funciona</Link></li>
              <li><Link to="/tecnico/registo" className="hover:text-white transition-colors">Seja um Técnico</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 border-b-2 border-primary w-fit pr-4">Contacto</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-primary" />
                <span>+244 939 785 068 / 952 328 159</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-primary" />
                <span>jaimenglelodepaulo@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-primary" />
                <span>Lubango, Angola</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2026 ZonaTI. Desenvolvido por Jaime de Paulo.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
