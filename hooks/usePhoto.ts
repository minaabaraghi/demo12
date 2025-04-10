// hooks/usePhotos.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePhotos() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('https://picsum.photos/v2/list');
                setPhotos(response.data); // داده‌های JSON مستقیم از API
            } catch (err) {
                setError('خطا در بارگذاری عکس‌ها');
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    return { photos, loading, error };
}

// تعریف نوع Photo برای Lorem Picsum
export type Photo = {
    id: string;
    download_url: string;
    author: string;
    width: number;
    height: number;
    url: string;
};