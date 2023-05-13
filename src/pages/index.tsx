import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { collection, getDocs, query } from 'firebase/firestore'

import { CheckoutButton } from '@/components/buttons/checkoutButton'
import { CardGrid } from '@/components/layout/cardGrid'
import { Cart } from '@/components/layout/cart'
import { Favorites } from '@/components/layout/favorites'
import { ItemPreview } from '@/components/layout/itemPreview'
import { Wrapper } from '@/components/layout/wrapper'
import { Navbar } from '@/components/navigation/navbar'
import { ProductsAtom, ProductsCategory, userLocationAtom } from '@/context/appContext'
import { Product } from '@/lib/entities/product'
import { database } from '@/lib/firebase'

interface Props {
  products: ProductsCategory
}

export async function getServerSideProps() {
  const q = query(collection(database, "products"));
  const femProducts: Product[] = [];
  const mascProducts: Product[] = [];
  const childProducts: Product[] = [];
  const allProducts: Product[] = [];

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    allProducts.push({ ...data as Product, id: doc.id });
    switch (data.category) {
      case 'fem':
        femProducts.push({ ...data as Product, id: doc.id });
        break;
      case 'masc':
        mascProducts.push({ ...data as Product, id: doc.id });
        break;
      case 'child':
        childProducts.push({ ...data as Product, id: doc.id });
        break;
      default:
        break;
    }
  });

  return {
    props: {
      products: {
        all: allProducts,
        masc: mascProducts,
        fem: femProducts,
        child: childProducts,
      },
    }
  }
}

export default function Home({ products }: Props) {
  const [, setProductsAtom] = useAtom(ProductsAtom);
  const [userLocation] = useAtom(userLocationAtom);

  useEffect(() => {
    setProductsAtom(products);
  }, [products]);
  
  return (
    <>
      <Favorites />
      <Cart />
      <CheckoutButton />
      <ItemPreview />

      <Wrapper>
        <Navbar />
        {
          userLocation === 'Tudo' && (
            <CardGrid products={products.all} />
          )
        }
        {
          userLocation === 'Feminino' && (
            <CardGrid products={products.fem} />
          )
        }
        {
          userLocation === 'Masculino' && (
            <CardGrid products={products.masc} />
          )
        }
        {
          userLocation === 'Infantil' && (
            <CardGrid products={products.child} />
          )
        }

        {/* <CardGrid products={MockProductsData} /> */}
      </Wrapper>
    </>
  );
}
