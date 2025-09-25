import { cn } from '~/lib/utils';

import type { LucideIcon } from 'lucide-react';

const PokerCard = ({
  value,
  isSelected,
  className = '',
  icon,
  onClick,
}: {
  value: string;
  isSelected?: boolean;
  className?: string;
  icon?: LucideIcon;
  onClick?: () => void;
}) => {
  const IconComponent = icon;
  const getValue = (className = 'size-3 sm:size-4') =>
    IconComponent ? <IconComponent className={className} /> : value;

  return (
    <div
      className={cn(
        'card flex flex-col justify-center p-5 rounded-md relative text-xs sm:text-base text-white overflow-hidden z-10 transition-all duration-300 w-[50px] sm:w-[90px] lg:w-[150px] aspect-[5/8] font-bold',
        className,
        isSelected
          ? 'border-sky-600 dark:border-sky-300 border -translate-y-5 sm:-translate-y-10 bg-sky-500 dark:bg-sky-600 hover:cursor-default shadow-md shadow-sky-600 dark:shadow-sky-300'
          : 'dark:bg-sky-700 bg-sky-400'
      )}
      onClick={onClick}
    >
      <span className="absolute inset-0 flex justify-center items-center text-base md:text-2xl lg:text-[48px] ">
        {getValue('size-4 md:size-6 lg:size-12')}
      </span>
      <span className="absolute top-2 left-2 ">{getValue()}</span>
      <span className="absolute top-2 right-2 ">{getValue()}</span>
      <span className="absolute bottom-2 left-2  rotate-180">{getValue()}</span>
      <span className="absolute bottom-2 right-2  rotate-180">
        {getValue()}
      </span>
    </div>
  );
};

export default PokerCard;
