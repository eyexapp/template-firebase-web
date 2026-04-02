import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl font-bold text-neutral-900">{t('notFound.title')}</h1>
      <p className="mt-3 text-neutral-600">{t('notFound.message')}</p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-md bg-neutral-100 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-200"
        >
          {t('notFound.goBack')}
        </button>
        <Link
          to="/"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          {t('notFound.goHome')}
        </Link>
      </div>
    </div>
  );
}
