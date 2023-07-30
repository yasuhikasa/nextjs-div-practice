import Link from 'next/link';

const navigation: React.FC = () => (
  <nav>
    AWS：Amplify
    <Link href="/auth/signUp">Sign Up</Link>
    <Link href="/auth/signIn">Sign In</Link>
    <Link href="/auth/logout">Log Out</Link>
  </nav>
);

export default navigation;