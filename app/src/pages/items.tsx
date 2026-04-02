import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useItemStore } from '@/stores/item-store';
import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';
import type { CreateItemInput } from '@/types';

export function ItemsPage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { items, loading, error, fetchItems, createItem, deleteItem } = useItemStore();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const input: CreateItemInput = { title: title.trim(), description: description.trim() || undefined };
    await createItem(input);
    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  if (loading) {
    return <p className="py-12 text-center text-neutral-500">{t('common.loading')}</p>;
  }

  if (error) {
    return <p className="py-12 text-center text-red-500">{t('common.error')}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">{t('items.title')}</h1>
        {isAuthenticated && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            {t('items.create')}
          </button>
        )}
      </div>

      {showForm && (
        <Card className="mt-6">
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                {t('items.titleLabel')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                {t('items.descriptionLabel')}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                {t('common.save')}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-md bg-neutral-100 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-200"
              >
                {t('common.cancel')}
              </button>
            </div>
          </form>
        </Card>
      )}

      {items.length === 0 ? (
        <p className="mt-12 text-center text-neutral-500">{t('items.empty')}</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id}>
              <h3 className="font-semibold text-neutral-900">{item.title}</h3>
              {item.description && (
                <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => deleteItem(item.id)}
                  className="mt-3 text-xs text-red-500 hover:text-red-700"
                >
                  {t('items.delete')}
                </button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
