import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import Footer from './Components/Footer'
import Header from './Components/Header'
import About from './Pages/About'
import License from './Pages/License'
import Contact from './Pages/Contact'
import '@fortawesome/fontawesome-free/css/all.min.css'


function App() {


  return (
    <>
    <Router>
       <div className="app">
   <Header />
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/License" element={<License />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    
      <main style={{ flex: 1}}>

      </main>

      <Footer />
      </div>
    </Router>
      
    </>
  );
}

export default App;
