import { useState } from 'react';

import { Button, Input, Card } from '~/components/ui';

const UserModal = ({ onSubmit }: { onSubmit: (username: string) => void }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = () => {
    const trimmed = usernameInput.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 flex items-center justify-center">
      <Card className="p-6 rounded-lg w-full max-w-sm  ">
        <h2 className="text-xl font-semibold text-center">Enter your name</h2>
        <Input
          type="text"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="e.g. Alice"
          autoFocus
        />
        <Button onClick={handleSubmit} className="w-full flex">
          Join
        </Button>
      </Card>
    </div>
  );
};

export default UserModal;
