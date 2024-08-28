import { useState, FormEvent, useEffect } from 'react'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { GoArrowDown } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom'

export interface CoinProps{
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedVolume?: string;
}

interface DataProps{
  data: CoinProps[]
}

export function Home() {
    const [input, setInput] = useState('');
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [offset, setOffset] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset])

    async function getData() {
      fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
      .then(response => response.json())
      .then((data: DataProps) => {
        const coinsData = data.data;

        const price = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        })

        const priceCompact = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact'
        })

        const formatedResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
          }

          return formated;

        })

        const listCoins = [...coins, ...formatedResult]
        setCoins(listCoins);
        console.log(listCoins)

      })
    }

    function handleSubmit(e: FormEvent) {
      e.preventDefault();
      if(input === '') return;
      navigate(`/detail/${input}`)
    }

    function handleGetMore() {
      if(offset === 0) {
        setOffset(10)
        return;
      }

      setOffset(offset + 10)

    }

    return (
      <main className={styles.container}>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type='text' placeholder='Digite o nome do ativo' value={input} onChange={(e) => setInput(e.target.value)}/>
          <button type='submit'>
            <BsSearch size={30} color='#FFF' />
          </button>
        </form>

        <table>

          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Market Cap</th>
              <th scope='col'>Price</th>
              <th scope='col'>Volume (24Hr)</th>
              <th scope='col'>Change (24Hr)</th>
            </tr>
          </thead>

          <tbody id='tbody'>

           {coins.length > 0 && coins.map((item) => (
             <tr className={styles.tr} key={item.id}>

             <td className={styles.tdlabel} data-label="Moeda">
               <div className={styles.name}>
                <img className={styles.logo} src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="Logo crypto" />
                 <Link to={`/detail/${item.id}`}>
                   <span>{item.symbol}</span>
                 </Link>
               </div>
             </td>

             <td className={styles.tdlabel} data-label="Market Cap">
               {item.formatedMarket}
             </td>

             <td className={styles.tdlabel} data-label="Price">
               {item.formatedPrice}
             </td>

             <td className={styles.tdlabel} data-label="Volume">
               {item.formatedVolume}
             </td>

             <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Change (24hr)">
               <span>{Number(item.changePercent24Hr).toFixed(2) + ' %'}</span>
             </td>

           </tr>
           ))}

          </tbody>

        </table>
        
        <div className='buttonContainer'>
          <button className={styles.buttonMore} onClick={handleGetMore}>
            <GoArrowDown size={30} color='#FFF'/>
          </button>
        </div>

      </main>
    )
  }
  
  