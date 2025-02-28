import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'; // Import Dropdown components
import { useTranslation, initReactI18next } from 'react-i18next';
import { Languages } from 'lucide-react';

function LanguageDropdown() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Get the current language

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change the language
  };

  return (
    <DropdownMenu>
      {/* Trigger: The button that opens the dropdown */}
      <DropdownMenuTrigger className="flex items-center justify-center px-4 py-2 bg-gray-200 rounded-md hover:bg-green-500">
        {/* {currentLanguage === 'en' ? 'Language' : 'አማርኛ'} */}
        <Languages />
      </DropdownMenuTrigger>

      {/* Content: The dropdown menu content */}
      <DropdownMenuContent className="w-32">
        {/* English Option */}
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={currentLanguage === 'en' ? 'bg-gray-200' : ''}
        >
          English
        </DropdownMenuItem>

        {/* Amharic Option */}
        <DropdownMenuItem
          onClick={() => changeLanguage('am')}
          className={currentLanguage === 'am' ? 'bg-gray-200' : ''}
        >
          አማርኛ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageDropdown;