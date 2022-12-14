import Head from 'next/head'
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/Cart.module.css'
import { useCart } from '../hooks/use-cart.js';
import Table from '../components/Table';

const columns = [
  {
    columnId: 'title',
    Header: 'Product Name'
  },
  {
    columnId: 'quantity',
    Header: 'Quantity'
  },
  {
    columnId: 'pricePerUnit',
    Header: 'Price Per Item'
  },
  {
    columnId: 'total',
    Header: 'Item Total'
  }
];

export default function Cart() {
  const { cartItems, checkout, updateItem, subtotal, products  } = useCart();

  const data = cartItems.map(({ id, quantity, pricePerUnit }) => {
    const product = products.find(({ id: pid }) => pid === id);
    const { title } = product || {};



    const Quantity = () => {
  
        function handleOnSubmit(e) {
          e.preventDefault();
  
          const { currentTarget } = e;
          const inputs = Array.from(currentTarget.elements);
          const quantity = inputs.find(input => input.name === 'quantity')?.value;
  
          updateItem({
            id,
            quantity: quantity && parseInt(quantity)
          });
        }

        return (
          <form className={styles.cartQuantity} onSubmit={handleOnSubmit}>
            <input name="quantity" type="number" min={0} defaultValue={quantity} className={styles.quantity}/>
            <button className={styles.button}>Update</button>
          </form>
        )
      }
    return {
      id,
      title,
      quantity: <Quantity />,
      pricePerUnit: pricePerUnit.toFixed(2),
      total: (quantity * pricePerUnit).toFixed(2)
    }
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT-Store</title>
        <link rel="icon" href="/nfttab.png" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />
        <div className={styles.totalAmount}><strong>Total: Rs.{subtotal}</strong></div>
        <p className={styles.checkout}>
          
          <button className={styles.checkoutButton} onClick={checkout}>
            Pay Here
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
           <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          NFt-Store
          <img src="/akshat.png" alt="Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}