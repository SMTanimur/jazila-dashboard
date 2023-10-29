import { productClient } from '@/services/product.service'
import { Metadata, ResolvingMetadata } from 'next'

type Props ={
  params:{
    product:string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
 
  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())
 const product= await productClient.getProduct(params.product)
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `Product ${ product.name}`,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section >{children}</section>;
}