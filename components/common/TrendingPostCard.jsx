import Image from "next/image";
import Link from "next/link";
import { readingTime } from "utils/helpers/miniFunctions";

const TrendingPostCard = ({ card }) => {
  return (
    <Link href={`${card.user.username}/${card.slug}`}>
      <div className="cursor-pointer last:mb-0 last:border-none py-2 bg-white dark:bg-dark-primary_background border-b border-light-border_primary dark:border-dark-border_primary flex gap-4">
        <div className="w-[40px]">
          <Image
            src={card.user.profile_photo.url}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-md font-semibold text-black dark:text-dark-heading_color hover:text-[#222] dark:hover:text-[#ccc] transition duration-200">
            {card.title}
          </h1>
          <p className="text-md gap-2 text-light-paragraph_color dark:text-dark-paragraph_color">
            {card.user.name} · {readingTime(card.content)} min read
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TrendingPostCard;
