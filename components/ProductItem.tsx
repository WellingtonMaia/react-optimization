import { memo, useState } from 'react'
import dynamic from 'next/dynamic';
import { AddProductToWishlistProps } from './AddProductToWishlist';
import { isEqual } from 'lodash';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist);
}, {
  loading: () => (<span>Carregando...</span>)
})

interface ProductItemProps {
  product : {
    id: number;
    price: number;
    title: string;
    priceFormatted?: string;
  },
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
 const [isAddingToWishlist, setIsAddingToWishlist] = useState<boolean>(false);
 
  return (
    <div>
      {product.title} - <strong> {product.priceFormatted} </strong>
      <button
        onClick={() => setIsAddingToWishlist(true)}
      >❤️</button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
} 

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return isEqual(prevProps.product, nextProps.product);
});