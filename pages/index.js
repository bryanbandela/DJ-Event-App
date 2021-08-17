import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <h1>Home</h1>
      <p>This is the home page</p>
      <Link href="/about">About</Link>
    </Layout>
  );
}
