import { ObjectId } from "mongodb";
import Link from "next/link";

type ListCardProps = {
  id: string;
  title: string;
  createdAt: string;
};

const ListCard = ({ id, title, createdAt }: ListCardProps) => {
  return (
    <Link href={`/detail/${id}`}>
      <li className="border-b-2 rounded-sm p-15 border-cyan-500/40">
        <h4 className="font-semibold text-20">{title}</h4>
        <p>{createdAt}</p>
      </li>
    </Link>
  );
};

export default ListCard;
