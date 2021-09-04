import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Link from 'next/link';
import { API_URL } from '@/config/index';

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

//export async function getStaticProps() : would only render at build time
//But getServerSideProps will render everytime you reach the home page
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  //_sort=date:ASC&_limit=3 : stapri's way
  const events = await res.json();
  console.log(events);

  return {
    props: { events }, //I should add another key-value pair : revalidate: 1, Since it renders whenever we hit the home page it will first check if it's already there, if not then after 1 sec it will re-render
    revalidate: 1,
  };
}
