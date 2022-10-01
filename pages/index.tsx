import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from '@solana/web3.js'


const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setExecutable] = useState(false)

  const addressSubmittedHandler = (address: string) => {

    try {
    const key = new Web3.PublicKey(address)
    setAddress(key.toBase58())
    const connection = new Web3.Connection(Web3.clusterApiUrl('mainnet-beta'))

    
    connection.getBalance(key).then (balance => {
      setBalance(balance / Web3.LAMPORTS_PER_SOL)
      if((balance / Web3.LAMPORTS_PER_SOL)==0){
        alert('seems you have no money :(')}
      })
        

    connection.getAccountInfo(key).then (isExecutable => {
      setExecutable(isExecutable?.executable ?? false)
    })

    }catch(error){
      setAddress('')
      setBalance(0)
      alert(error)
    }
    
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1 > <em>Hola</em>👋</h1>
        <p>
          Let's find out who has how much $SOL 🤑
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        {/* <p>{`Is it executable: ${isExecutable? 'Yupp':'Nuh-uh'}`}</p> */}
      </header>
    </div>
  )
}

export default Home
