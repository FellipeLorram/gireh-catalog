import { CheckoutButton } from '@/components/buttons/checkoutButton'
import { CardGrid } from '@/components/layout/cardGrid'
import { Cart } from '@/components/layout/cart'
import { Favorites } from '@/components/layout/favorites'
import ItemPreview from '@/components/layout/itemPreview'
import Wrapper from '@/components/layout/wrapper'
import { Navbar } from '@/components/navigation/navbar'
import { MockProductsData } from '@/utils/mockProductsData'

export default function Home() {
  return (
    <>
      <Favorites />
      <Cart />
      <CheckoutButton />
      <ItemPreview />
      <Wrapper>
        <Navbar />
        <CardGrid products={MockProductsData} />
      </Wrapper>
    </>
  );
}
