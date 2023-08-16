import { ObjectId } from "mongodb";
import Link from "next/link";

type ListCardProps = {
  _id: ObjectId;
  title: string;
  content: string;
};

const ListCard = ({ _id, title, content }: ListCardProps) => {
  return (
    <Link href={`/detail/${_id}`}>
      <li className="p-15 shadow-[3px_3px_12px_lightgray]">
        <h4 className="font-semibold text-20">{title}</h4>
        <p>{content}</p>
      </li>
    </Link>
  );
};

export default ListCard;
