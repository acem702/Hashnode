import { useEffect, useState } from "react";
import Image from "next/image";
import { getDate, reduceText } from "utils/helpers/miniFunctions";

const Card = ({ details }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(
      reduceText(
        details.content,
        details.cover_image && details.cover_image.url ? 200 : 240
      )
    );
  }, []);

  return (
    <div className="card border-0">
      <header className="flex gap-3 pt-4">
        <div className="w-12 h-12 rounded-full bg-gray-700">
          <Image
            src={details.user.profile_photo.url}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-black dark:text-dark-heading_color text-lg font-semibold">
            {details.user.name}
          </h1>
          <p className="text-sm font-medium text-light-paragraph_color dark:text-dark-paragraph_color">
            <span>{getDate(details.createdAt)}</span>
          </p>
        </div>
      </header>

      <main className="flex flex-col md:flex-row gap-4 justify-between py-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-black dark:text-dark-heading_color mb-4">
            {details.title}
          </h1>
          <div className="dark:text-dark-paragraph_color text-light-paragraph_color">
            {content}
          </div>
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
