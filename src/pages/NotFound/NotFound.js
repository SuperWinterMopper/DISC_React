import './NotFound.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';


export default function NotFound() {
    return (
        <div className="not-found">
            Looks like that page doesn't exist 😞
            <Link to='/' className='react-link'>Go back Home!</Link>
            <Footer />
        </div>
    );
}