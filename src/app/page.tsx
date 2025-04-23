import Topnav from "@/components/ui/topNav";
import Footer from "@/components/ui/footer";
import SubForm from "@/components/ui/form/subForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-foreground">
            Por que Assinar?
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Desfrute de uma experiência premium com benefícios exclusivos que
            transformam sua jornada de aprendizado.
          </p>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <Card className="group flex flex-col justify-center items-center text-center p-6 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-col justify-center items-center gap-1">
                  <svg
                    className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Conteúdo Exclusivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Artigos, vídeos e guias premium só para assinantes.
                  </p>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card className="group flex flex-col items-center justify-center text-center p-6 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-col justify-center items-center gap-1">
                  <svg
                    className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Atualizações Semanais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Notícias e tendências entregues diretamente a você.
                  </p>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card className="group flex flex-col items-center justify-center text-center p-6 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-col justify-center items-center gap-1">
                  <svg
                    className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Comunidade Exclusiva
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Participe de fóruns e eventos exclusivos para assinantes.
                  </p>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card className="group flex flex-col items-center text-center p-6 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-col justify-center items-center gap-1">
                  <svg
                    className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Zero Anúncios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sem distrações nos melhores momentos da sua leitura.
                  </p>
                </CardContent>
              </Card>
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
