import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';

export function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">{t('profile.title')}</h1>
      <Card className="mt-6">
        <div className="flex items-center gap-4">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName ?? ''}
              className="h-16 w-16 rounded-full"
            />
          )}
          <div>
            <p className="font-semibold text-neutral-900">{user?.displayName}</p>
            <p className="text-sm text-neutral-500">{user?.email}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
