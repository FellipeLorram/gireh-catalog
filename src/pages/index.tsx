import { CheckoutButton } from '@/components/buttons/checkoutButton'
import { CardGrid } from '@/components/layout/cardGrid'
import { Cart } from '@/components/layout/cart'
import { Favorites } from '@/components/layout/favorites'
import Wrapper from '@/components/layout/wrapper'
import { Navbar } from '@/components/navigation/navbar'
import { MockProductsData } from '@/utils/mockProductsData'

export default function Home() {
  return (
    <>
      <Favorites />
      <Cart />
      <CheckoutButton />
      <Wrapper>
        <Navbar />
        <CardGrid products={MockProductsData} />
      </Wrapper>
    </>
  );
}
