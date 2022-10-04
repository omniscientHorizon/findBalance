import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from '@solana/web3.js'
import { checkIsManualRevalidate } from 'next/dist/server/api-utils'
import { get } from 'https'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [Tbalance, setTBalance] = useState(0)
  const [Dbalance, setDBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [chainName, setchainName] = useState('mainnet-beta')
  const [isExecutable, setExecutable] = useState(false)


  const addressSubmittedHandler = (address: string) => {

    try {
    const key = new Web3.PublicKey(address)
    setAddress(key.toBase58())
    let connection = new Web3.Connection(Web3.clusterApiUrl('mainnet-beta'))
    //setting mainnet balance
    connection.getBalance(key).then (balance => {
      setBalance(balance / Web3.LAMPORTS_PER_SOL)
      // if((balance / Web3.LAMPORTS_PER_SOL)==0){
      //   alert('seems you have no money on mainnet :(')}
      })

    connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    //setting devnet balance
    connection.getBalance(key).then (balance => {
      setDBalance(balance / Web3.LAMPORTS_PER_SOL)
      // if((balance / Web3.LAMPORTS_PER_SOL)==0){
      //   alert('seems you have no money on devnet :(')}
      })
    
    connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    //setting testnet balance
    connection.getBalance(key).then (balance => {
      setTBalance(balance / Web3.LAMPORTS_PER_SOL)
      // if((balance / Web3.LAMPORTS_PER_SOL)==0){
      //   alert('seems you have no money on testnet:(')}
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
        <div className={styles.Rules}>
        <p className={styles.opacityIncrease}>
          Let&apos; find out who has how much $SOL 🤑
        </p>
        <ol className={styles.opacityIncrease}>
          <li>Enter a public key</li>
          <li>Click check balance</li>
        </ol>

        </div>
        <AddressForm handler={addressSubmittedHandler} />
        <div className={styles.buttonHolder}>
        <button className={styles.mainnetButton} disabled>mainnet ${balance}</button>
        <button className={styles.devnetButton} >devnet ${Dbalance}</button>
        <button className={styles.testnetButton} >testnet ${Tbalance}</button>
        </div>
        <p>{`Address: ${address}`} <br/>
        </p>
        {/* <p>{`Is it executable: ${isExecutable? 'Yupp':'Nuh-uh'}`}</p> */}
      </header>
    </div>
  )
}

export default Home
