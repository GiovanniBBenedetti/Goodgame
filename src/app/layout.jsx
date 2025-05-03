import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/page';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">

      <body className={''}>
        <Navbar></Navbar>
        {children}

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossOrigin="anonymous"></script>

        <Footer></Footer>
      </body>

    </html>
  );
}
