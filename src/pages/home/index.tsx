import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export function Home() {

    return (
      <main className={styles.container}>

        <form className={styles.form}>
          <input type='text' placeholder='Digite o nome do ativo' />
          <button type='submit'>
            <BsSearch size={30} color='#FFF' />
          </button>
        </form>

        <table>

          <thead>
            <tr>
              <th scope='col'>Moeda</th>
              <th scope='col'>Valor de mercado</th>
              <th scope='col'>Preço</th>
              <th scope='col'>Volume</th>
              <th scope='col'>24 horas</th>
            </tr>
          </thead>

          <tbody id='tbody'>

            <tr className={styles.tr}>

              <td className={styles.tdlabel} data-label="Moeda">
                <div className={styles.name}>
                  <Link to={'/detail/bitcoin'}>
                    <span>Bitcoin</span> | BTC
                  </Link>
                </div>
              </td>

              <td className={styles.tdlabel} data-label="Market Cap">
                1T
              </td>

              <td className={styles.tdlabel} data-label="Price">
                8.000
              </td>

              <td className={styles.tdlabel} data-label="Volume">
                2B
              </td>

              <td className={styles.tdProfit} data-label="Change (24hr)">
                <span>1.20</span>
              </td>

            </tr>

          </tbody>

        </table>

      </main>
    )
  }
  
  