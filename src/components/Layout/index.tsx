import Header from "./Header";
import { getServerSession } from "next-auth/next";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const session = await getServerSession();

  return (
    <>
      <Header session={session} />
      {children}
    </>
  );
};

export default Layout;
