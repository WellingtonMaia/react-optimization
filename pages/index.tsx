import { FormEvent, useCallback, useState } from 'react';
import styles from '../styles/Home.module.css';
import { SearchResult } from '../components/SearchResult';

type Product = {
  id: number; price:number; priceFormatted?: string; title: string;
}
type ProductProps = {
  totalPrice?: string;
  data: Array<Product>;
}

export default function Home() {
  const [search, setSearch] = useState<string>('')
  const [products, setProducts] = useState<ProductProps>({
    totalPrice: 'R$ 0,00',
    data: []
  });

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if(!search.trim()){
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const productsData = data.map((product: Product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatted.format(product.price),
      }
    })

    const totalPrice = data.reduce((price: number, product: Product) => {
      return price + product.price;
    }, 0);
    const totalPriceFormatted = formatted.format(totalPrice);
    setProducts({
      totalPrice: totalPriceFormatted, 
      data : productsData
    });
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.main}>
        <input 
          name="search" 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button
          type="submit"
        >
          Search
        </button>
      </form>
      <SearchResult
        products={products.data}
        totalPrice={products.totalPrice}    
        onAddToWishlist={addToWishlist}
      />
    </div>
  )
}