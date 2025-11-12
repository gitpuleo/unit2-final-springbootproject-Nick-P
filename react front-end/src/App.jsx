import { BrowserRouter as Router, Routes, Route, Link } from 'react-router'
import './App.css'
import LandingPage from './Pages/LandingPage'
import Footer from './Components/Footer'
import Header from './Components/Header'
import About from './Pages/About'
import License from './Pages/License'
import Contact from './Pages/Contact'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ResumeDisplay from './newcomponents/ResumeDisplay.jsx'

function App() {


  return (
    <>
    <Router>
       <div className="app">
   <Header />
    <main style={{ flex: 1}}>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resumes/:id" element={<ResumeDisplay />} />


        <Route path="/about" element={<About />} />
        <Route path="/license" element={<License />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    
      

      </main>

      <Footer />
      </div>
    </Router>
      
    </>
  );
}

export default App;
