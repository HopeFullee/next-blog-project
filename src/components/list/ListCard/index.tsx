"use client";

import { ObjectId } from "mongodb";
import Link from "next/link";
import { useState, useEffect } from "react";

type ListCardProps = {
  id: string;
  title: string;
  createdAt: string;
};

const ListCard = ({ id, title, createdAt }: ListCardProps) => {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const date = new Date(createdAt);
    const browserLocale = window.navigator.language;
    const formatter = new Intl.DateTimeFormat(browserLocale);

    setLocalTime(formatter.format(date));
  });

  return (
    <Link href={`/detail/${id}`}>
      <li className="border-b-2 rounded-sm p-15 border-cyan-500/40">
        <h4 className="font-semibold text-20">{title}</h4>
        <p>{localTime}</p>
      </li>
    </Link>
  );
};

export default ListCard;
