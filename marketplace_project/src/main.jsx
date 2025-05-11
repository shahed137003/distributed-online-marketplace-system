import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Itemcontext from './context/Itemcontext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Itemcontext>
          <App />
        </Itemcontext>
      </QueryClientProvider>
    </BrowserRouter>

);