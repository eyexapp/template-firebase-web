import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold text-neutral-900">{t('home.title')}</h1>
      <p className="mt-4 max-w-md text-lg text-neutral-600">{t('home.subtitle')}</p>
      <Link
        to="/items"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        {t('home.getStarted')}
      </Link>
    </div>
  );
}
