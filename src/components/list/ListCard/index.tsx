import { ObjectId } from "mongodb";
import Link from "next/link";

type ListCardProps = {
  _id: ObjectId;
  title: string;
  date: {
    year: string;
    month: string;
    date: string;
    time: {
      hours: string;
      minutes: string;
    };
  };
};

const ListCard = ({ _id, title, date }: ListCardProps) => {
  return (
    <Link href={`/detail/${_id}`}>
      <li className="border-b-2 rounded-sm p-15 border-cyan-500/40">
        <h4 className="font-semibold text-20">{title}</h4>
        <p>{date.year}</p>
      </li>
    </Link>
  );
};

export default ListCard;
