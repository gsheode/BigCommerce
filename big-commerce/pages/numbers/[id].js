import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useRouter } from "next/router";
import Router from "next/router";

export const getStaticProps = async ({ params }) => {
  const responseCards = await fetch('https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=' + params.id)
    .then((result) => {
      if (result.ok) return result.json();
      throw new Error('api not responding')
    }
    )
  return {
    props: { cards: responseCards }
  }
}

export const getStaticPaths = async () => {

  const response = await fetch('https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds')
    .then((result) => {
      if (result.ok) return result.json();
      throw new Error('api not responding')
    }
    )
  return {
    paths: response.map(res => {
      return {
        params: {
          id: res
        }
      }
    }),
    fallback: false
  }
}




export default function num({ cards }) {
  const router = useRouter();
  const data = cards;
  return (
    <div>
      <div>
      <button className='back-button' onClick={() => router.push('/about')}>BACK</button>
      </div>
      <div className='card'>
        {/* <div className='card' dangerouslySetInnerHTML={{ __html: data.image.img }}></div> */}
        <img className="card" src={data.image.url} alt={data.image.alt}></img>
      </div>


    </div>
  )
}
