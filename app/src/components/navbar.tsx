import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, signInWithGoogle, signOut } = useAuth();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en');
  };

  return (
    <nav className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-3">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-lg font-bold text-neutral-900">
          🔥 App
        </Link>
        <Link to="/items" className="text-sm text-neutral-600 hover:text-neutral-900">
          {t('nav.items')}
        </Link>
        {isAuthenticated && (
          <Link to="/profile" className="text-sm text-neutral-600 hover:text-neutral-900">
            {t('nav.profile')}
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleLanguage}
          className="rounded-md px-2 py-1 text-xs font-medium text-neutral-500 hover:bg-neutral-100"
        >
          {i18n.language === 'en' ? 'TR' : 'EN'}
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600">
              {t('nav.hello', { name: user?.displayName ?? 'User' })}
            </span>
            <button
              onClick={signOut}
              className="rounded-md bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-200"
            >
              {t('nav.signOut')}
            </button>
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
          >
            {t('nav.signIn')}
          </button>
        )}
      </div>
    </nav>
  );
}
