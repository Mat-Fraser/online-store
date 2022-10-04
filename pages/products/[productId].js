import Head from 'next/head'
import styles from '../../styles/Product.module.css'
import { useCart } from '../../hooks/use-cart.js';
import { getProductsList } from '../../lib/products'

export default function Product({ product }) {
    console.log(product)
  const { id, title, image, price, description } = product;

  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>{ title } - NTt-Store</title>
        <link rel="icon" href="/nfttab.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />
        </div>

        <div>
          <h1>
            { title }
          </h1>

          <p className={styles.description}>
            { description }
          </p>

          <p className={styles.price}>
            ₹{ price.toFixed(2) }
          </p>
          <p>
            <button className={styles.button} onClick={() => addToCart({ id })}>
              Buy
            </button>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          project website{' '}
          <img src="/akshat.png" alt="Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps({ params = {} }) {
  const products =  await getProductsList()
  const product = products.find(({ id }) => `${id}` === `${params.productId}`);
  return {
    props: {
      product
    },
  };
}

export async function getStaticPaths() {
  const products =  await getProductsList()
  const paths = products.map((product) => {
    const { id } = product;
    return {
      params: {
        productId: id,
      },
    };
  });

  return {
    paths,
    fallback: false
  };
}