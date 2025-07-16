// hooks/useRewriteUrl.ts
'use client';

import { useCallback } from 'react';

export default function     useRewriteUrl() {
    const rewriteUrl = useCallback((newUrl: string) => {
        if (typeof window !== 'undefined' && newUrl) {
            window.history.replaceState(null, '', newUrl);
        }
    }, []);

    return { rewriteUrl };
}
