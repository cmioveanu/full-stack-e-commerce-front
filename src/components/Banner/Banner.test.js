import React from 'react';
import { render, screen } from '@testing-library/react';

import { Banner } from './Banner';

test('renders Banner component with sunglasses', () => {
    render(<Banner leftBanner={{
        class: 'bannerLeftSunglasses',
        category: 'Wooden Sunglasses',
        name: 'The Utah'
        }}
        rightBanner={{
            class: 'bannerRightSunglasses',
            category: 'Wooden Sunglasses',
            name: 'The Idaho'
        }}
    />);

    const sunglassesCategory = screen.getAllByText('Wooden Sunglasses');
    const sunglassesTitleLeft = screen.getByText('The Utah');
    const sunglassesTitleRight = screen.getByText('The Idaho');

    expect(sunglassesCategory[0]).toBeInTheDocument();
    expect(sunglassesCategory[1]).toBeInTheDocument();

    expect(sunglassesTitleLeft).toBeInTheDocument();
    expect(sunglassesTitleRight).toBeInTheDocument();
});


test('renders Banner component with watches', () => {
    render(<Banner leftBanner={{
        class: 'bannerLeftWatch',
        category: 'Wooden Watch',
        name: 'The Geneva'
    }}
        rightBanner={{
            class: 'bannerRightWatch',
            category: 'Wooden Watch',
            name: 'The Scandinavia'
        }}
    />);

    const watches = screen.getAllByText('Wooden Watch');
    const watchesTitleLeft = screen.getByText('The Geneva');
    const watchesTitleRight = screen.getByText('The Scandinavia');

    expect(watches[0]).toBeInTheDocument();
    expect(watches[1]).toBeInTheDocument();

    expect(watchesTitleLeft).toBeInTheDocument();
    expect(watchesTitleRight).toBeInTheDocument();
});