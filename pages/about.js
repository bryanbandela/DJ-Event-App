import Layout from '../components/Layout';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout title="About DJ Events">
      <h1>About</h1>

      <p>This is the about page</p>
      <p>This is where you will find all the events</p>
      <Link href="/">Home</Link>
    </Layout>
  );
}
