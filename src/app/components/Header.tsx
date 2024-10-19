import Link from "next/link";

export default function Header() {
  return (
    <header className="container-fluid text-center shadow-sm py-2 z-1">
      <Link href="/" className="text-reset">
        <h1>Blog</h1>
      </Link>
    </header>
  );
}
