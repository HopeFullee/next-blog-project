import { Session } from "next-auth";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const Layout = ({ children, session }: Props) => {
  return (
    <>
      <Header session={session} />
      {children}
    </>
  );
};

export default Layout;
