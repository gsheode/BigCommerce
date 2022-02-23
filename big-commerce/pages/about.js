import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router";
import Router from "next/router";

export const getStaticProps = async () => {
  const response = await fetch('https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds')
    .then((result) => {
      if (result.ok) return result.json();
      throw new Error('api not responding')
    }
    )

   
    

  return {
    props: { data: response }
  }
}

export default function About(props) {

  const data = props.data;
  const router = useRouter();
  const handleClick = (key) => {
    const string='/numbers/'+key    
    router.push(string)
  }
  return (
    <div>
      <div className='table'>
          {data.map(function (d, idx) {
            return (<button className='button' key={d} onClick={()=>handleClick(d)}>{d}</button>)
          })}
      </div>
     

    </div>
  )
}
