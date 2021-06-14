// import { useMemo } from 'react';
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from 'react-virtualized';
interface SearchResultProps {
  products: Array<{
    id: number;
    price: number;
    title: string;
  }>;
  totalPrice?: string;
  onAddToWishlist: (id: number) => void;
}

export function SearchResult({ products, totalPrice, onAddToWishlist }: SearchResultProps) {
  // const totalPrice = useMemo(() => {
  //   return 
  // }, [products]); 
  const rowRender : ListRowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ProductItem 
          product={products[index]} 
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  }
  return (
     <>
    <div>Total <strong>{totalPrice}</strong></div> 
    <div> 
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={products.length}
        rowRenderer={rowRender}
      />
      {/* {products.map(product => (
        <ProductItem 
          key={product.id} 
          product={product} 
          onAddToWishlist={onAddToWishlist}
        />
      ))} */}
    </div>
     </>
  );
}