const Footer = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-3xl mx-auto text-center">
        <p className="mb-4 bg-gradient-to-br from-black to-muted-foreground/60 bg-clip-text text-transparent">
          © 2025 Newsletter Co. Todos os direitos reservados.
        </p>
        <div className="flex justify-center gap-4  text-muted-foreground">
          <a href="#" className="hover:text-primary">
            Política de Privacidade
          </a>
          <a href="#" className="hover:text-primary">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
