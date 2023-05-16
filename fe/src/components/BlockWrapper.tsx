import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

export interface BlockWrapperProps {
    children?: ReactNode;
    className?: string;
}

export const BlockWrapper = ({ children, className }: BlockWrapperProps): ReactElement | null => {
    if (children || (Array.isArray(children) && children.length > 0)) {
        return (
            <section
                className={clsx(
                    'flex justify-center items-center px-5 tablet:px-10 desktop:px-27 py-10 tablet:py-15 tablet-landscape:py-20 col-start-1 col-end-7 tablet:col-end-13 desktop:col-end-17',
                    className,
                )}
            >
                {children}
            </section>
        );
    }
    return null;
};
