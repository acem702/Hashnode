import Showdown from "showdown";
import showdownHighlight from "showdown-highlight";
import { reduceText } from "utils/helpers/miniFunctions";
import Image from "next/image";
import { useEffect, useState } from "react";

const Card = ({ details }) => {
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    extensions: [
      showdownHighlight({
        pre: true,
      }),
    ],
  });

  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(
      reduceText(
        details.content,
        details.cover_image && details.cover_image.url ? 200 : 240,
        converter
      )
    );
  });

  return (
    <div className="bg-transparent border-b dark:border-dark-border_primary">
      <header className="flex gap-3 py-4">
        <div className="w-12 h-12 rounded-full bg-gray-700">
          <Image
            src={details.user.profile_photo.url}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-dark-heading_color text-xl font-medium">
            {details.user.name}
          </h1>
          <p className="text-md dark:text-dark-paragraph_color">
            <span>16 hours ago</span>
          </p>
        </div>
      </header>

      <main className="flex flex-col md:flex-row gap-4 justify-between py-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold dark:text-dark-heading_color mb-4">
            {details.title}
          </h1>
          <p className="dark:text-dark-paragraph_color">{content}</p>
        </div>
        {details.cover_image.url && (
          <div className="w-full md:max-w-[16rem] h-full bg-gray-700 rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={details.cover_image.url}
              alt={details.title}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Card;
