import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Link from "next/link";
import Layout from '@/components/Layout';
import utilStyle from "../styles/utils.module.css";
import  {getPostsData}  from "../lib/post";


const inter = Inter({ subsets: ['latin'] })

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props:{
      allPostsData,
    }
  }
}

//SSRの場合 両立できない
// export async function getServerSideProps(context) {
//   const allPostsData = getPostsData();
//   console.log(allPostsData);
//   return {
//     props:{
//       allPostsData,
//     }
//   }
// }

export default function Home({allPostsData}) {
  return (
   <Layout>
    <section className={utilStyle.headingMd}>
      <p>Next.jsのキャッチアップ</p>
    </section>
    <section>
      <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id,title,date,thumbnail})=>(
            <article key ={id}>
            <Link href={`/posts/${id}`}><img src={`${thumbnail}`} className={styles.thumbnailImage}/></Link>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br/>
            <small className={utilStyle.lightText}>{date}</small>
          </article>
        ))}

      </div>
    </section>



   </Layout>
  )
}
