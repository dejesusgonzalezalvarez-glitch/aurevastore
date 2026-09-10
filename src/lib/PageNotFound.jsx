import { Link, useLocation } from 'react-router-dom';

import { Seo } from '@/lib/seo';

export default function PageNotFound() {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-5 py-24 text-center">
            <Seo title="Page Not Found — AUREVA" description="This page could not be found." robots="noindex, follow" />
            <div className="max-w-md w-full">
                <h1 className="font-display text-7xl font-light text-muted-foreground/40">404</h1>
                <p className="mt-6 font-display text-2xl font-light text-foreground">
                    This page couldn't be found.
                </p>
                {pageName && (
                    <p className="mt-3 text-sm text-muted-foreground">
                        We couldn't find "{pageName}".
                    </p>
                )}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/" className="text-[11px] tracking-wide-sm uppercase bg-foreground text-background px-6 py-3 hover:bg-foreground/85 transition-colors">
                        Back Home
                    </Link>
                    <Link to="/shop" className="text-[11px] tracking-wide-sm uppercase border hairline text-foreground px-6 py-3 hover:bg-secondary transition-colors">
                        Shop the Collection
                    </Link>
                </div>
            </div>
        </div>
    )
}
