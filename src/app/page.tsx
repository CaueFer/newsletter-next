import SubForm from "@/components/ui/form/subForm";
import Footer from "@/components/ui/footer";
import Topnav from "@/components/ui/topNav";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topnav />
      {/* Hero Section */}
      <header className="py-32 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Fique por dentro!
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Inscreva-se na nossa newsletter para atualizações exclusivas, dicas
            e insights diretamente na sua caixa de entrada.
          </p>
          <SubForm />
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Por que se inscrever?
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            <li className="flex items-start gap-4">
              <svg
                className="w-6 h-6 text-primary flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Conteúdo Exclusivo</h3>
                <p className="text-muted-foreground">
                  Acesse artigos e recursos disponíveis apenas para assinantes.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <svg
                className="w-6 h-6 text-primary flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Atualizações Semanais</h3>
                <p className="text-muted-foreground">
                  Fique por dentro das últimas notícias e tendências toda
                  semana.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para participar?</h2>
          <p className="text-lg mb-8">Não perca – inscreva-se agora!</p>
          <SubForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
