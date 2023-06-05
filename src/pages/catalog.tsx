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
}

export default function Home() {
  const [productsAtom, setProductsAtom] = useAtom(ProductsAtom);
  const [userLocation] = useAtom(userLocationAtom);

  useEffect(() => {
    (async () => {
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

      const products: ProductsCategory = {
        all: allProducts,
        fem: femProducts,
        masc: mascProducts,
        child: childProducts,
      };

      setProductsAtom(products);
    })();
  }, []);

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
            <CardGrid products={productsAtom.all} />
          )
        }
        {
          userLocation === 'Feminino' && (
            <CardGrid products={productsAtom.fem} />
          )
        }
        {
          userLocation === 'Masculino' && (
            <CardGrid products={productsAtom.masc} />
          )
        }
        {
          userLocation === 'Infantil' && (
            <CardGrid products={productsAtom.child} />
          )
        }

        {/* <CardGrid products={MockProductsData} /> */}
      </Wrapper>
    </>
  );
}
