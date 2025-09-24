import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {CartProvider} from "./context/CartProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <CartProvider>
            <App/>
        </CartProvider>
    </QueryClientProvider>
)
