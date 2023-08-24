import Link from "next/link";

const Header = () => {
  return (
    <header className="p-20 border-gray-400 border-b-1">
      <nav className="mx-auto max-w-1200">
        <ul className="flex gap-20 font-medium text-20">
          <li>
            <Link href={"/"}>MyForum</Link>
          </li>
          <li>
            <Link href={"/list"}>List</Link>
          </li>
          <li>
            <Link href={"/write"}>Write</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
