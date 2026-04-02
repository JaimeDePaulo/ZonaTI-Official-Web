import React, { useState, useEffect, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

export default function ErrorBoundary({ children }: Props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Uncaught error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 text-center max-w-lg">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-secondary mb-4 tracking-tight">Ups! Algo correu mal.</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Ocorreu um erro inesperado. Por favor, tente recarregar a página ou contacte o suporte se o problema persistir.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw size={20} /> RECARREGAR PÁGINA
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
