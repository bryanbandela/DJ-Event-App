import qs from 'qs';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import { useRouter } from 'next/router';

export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

//Now here we'll use getServerSideProps for search
export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  //to search for one field: ?name_contains=
  //but for multiple fields we use qs
  const res = await fetch(`${API_URL}/events?${query}`);
  //Remember that you no longer use the api folder route from NextJS but rather strapi
  const events = await res.json();

  //no need for revalidate coz it's getStaticProps
  return {
    props: { events },
  };
}
