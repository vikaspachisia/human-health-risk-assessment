import './stylesheets/fontawesome.css'
import "bootstrap/dist/css/bootstrap.min.css";
import './stylesheets/App.css';

import Header from './components/Header';   // Include Navbar
import Footer from './components/Footer';   // Include Footer

function App() {
  return (
    <div className="App">
      <Header />

      <Footer />
    </div >
  );
}

export default App;
