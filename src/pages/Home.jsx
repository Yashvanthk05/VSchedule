import { hero, h1, p, container, button, footer } from './styles/Home.css';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';

const Home = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/vit-ffcs-planner/start');
  };

  return (
    <div className={container}>
      <Navbar />
      <main className={hero}>
        <h1 className={h1}>VIT FFCS Planner</h1>
        <div>
          <p className={p}>Build your perfect VIT timetable in seconds</p>
          <p className={p}>No more clashes. No more confusion.</p>
        </div>
        <button onClick={handleRedirect} className={button}>
          Get started &rarr;
        </button>
      </main>
      <footer className={footer}>&copy; {year} kdx-08 &amp; Yashix. All rights reserved.</footer>
    </div>
  );
};

export default Home;
