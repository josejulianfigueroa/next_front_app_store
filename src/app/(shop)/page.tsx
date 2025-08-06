import { ProductGrid, Title } from '@/components';
import { Product } from '@/interfaces';


const getProducts = async() => {

  try {
    return await fetch(`http://localhost:3001/api/products?limit=100&offset=0`,{
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );
    
  } catch (error) {
   // notFound();
  }

}

export default async function Home() {
    const products: Product[] = await getProducts();
console.log(products);
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />
      
    </>
  );
}
