import { useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/context/theme-context';

const ThemeToggleButton = ({
  showLabel = false,
  className,
}: {
  showLabel?: boolean;
  className?: string;
}) => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = useCallback(() => {
    const styleId = `theme-transition-${Date.now()}`;
    const style = document.createElement('style');
    style.id = styleId;

    const css = `
      @supports (view-transition-name: root) {
        ::view-transition-old(root) { animation: none; }
        ::view-transition-new(root) {
          animation: ${theme === 'light' ? 'wipe-in-dark' : 'wipe-in-light'} 0.4s ease-out;
        }
        @keyframes wipe-in-dark {
          from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
          to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }
        @keyframes wipe-in-light {
          from { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
          to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }
      }
    `;

    style.textContent = css;
    document.head.appendChild(style);

    setTimeout(() => {
      document.getElementById(styleId)?.remove();
    }, 3000);

    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        toggleTheme();
      });
    } else {
      toggleTheme();
    }
  }, [theme, toggleTheme]);

  return (
    <Button
      variant="outline"
      size={showLabel ? 'default' : 'icon'}
      onClick={handleClick}
      className={cn(
        'relative overflow-hidden transition-all',
        showLabel && 'gap-2',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      {showLabel && (
        <span className="text-sm">{theme === 'light' ? 'Light' : 'Dark'}</span>
      )}
    </Button>
  );
};

export default ThemeToggleButton;
