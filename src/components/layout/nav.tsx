import { auth } from '@/lib/auth';
import NavBar from './navbar';

export default async function Nav() {
  const session = await auth();

  return <NavBar session={session} />;
}