import { useState } from 'react';
import { Coffee, User } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui';
import PokerCard from '~/pages/Home/components/poker-card';
import UserModal from '~/pages/Home/components/user-modal';
import ThemeToggleButton from '~/pages/Home/components/theme-toggle';

export default function HomePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCardShown, setIsCardShown] = useState(false);

  const cards = [
    {
      value: '1',
    },
    {
      value: '3',
    },
    {
      value: '5',
    },
    {
      value: '8',
    },
    {
      value: '13',
    },
    {
      value: '0',
      icon: Coffee,
    },
  ];

  const showSelectedCard = isCardShown && selectedIdx !== null;

  return (
    <>
      <UserModal onSubmit={(name) => setUsername(name)} />

      <div className="h-screen flex flex-col p-4">
        <div className="flex w-full justify-end">
          <ThemeToggleButton />
        </div>
        <div className="h-full w-full flex flex-col items-center text-2xl font-bold gap-4">
          <div>Selected cards</div>
          <PokerCard
            value={showSelectedCard ? cards[selectedIdx].value : '?'}
            icon={showSelectedCard ? cards[selectedIdx].icon : undefined}
          />
          <div className="flex gap-2 items-center text-sm">
            <User />
            {username}
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="flex card-stacker py-10">
            {cards.map((cardData, index) => (
              <PokerCard
                key={index}
                value={cardData.value}
                icon={cardData.icon}
                isSelected={index === selectedIdx}
                className={cn(
                  'hover:-translate-y-10 hover:cursor-pointer',
                  index !== 0
                    ? '-ml-8 md:-ml-24 shadow-[-5px_5px_10px_rgba(0,0,0,0.1)]'
                    : ''
                )}
                onClick={() => setSelectedIdx(index)}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 w-full items-center justify-center">
          <Button
            size="lg"
            className="w-[100px]"
            onClick={() => setIsCardShown(!isCardShown)}
          >
            {isCardShown ? 'Hide' : 'Show'}
          </Button>
          <Button
            size="lg"
            className="w-[100px]"
            onClick={() => {
              setSelectedIdx(null);
              setIsCardShown(false);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}
