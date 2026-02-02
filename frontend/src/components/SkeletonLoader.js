import React from 'react';
import './SkeletonLoader.css';

export const SkeletonCoupleCard = () => (
  <div className="skeleton-person-card">
    <div className="skeleton-card-header"></div>
    <div className="skeleton-card-body">
      <div className="skeleton-text skeleton-text-short"></div>
      <div className="skeleton-text skeleton-text-medium"></div>
      <div className="skeleton-text skeleton-text-long"></div>
      <div className="skeleton-text skeleton-text-medium"></div>
    </div>
  </div>
);

export const SkeletonCouplePhoto = () => (
  <div className="skeleton-photo-container">
    <div className="skeleton-photo-circle"></div>
    <div className="skeleton-text skeleton-text-short" style={{ marginTop: '15px' }}></div>
  </div>
);

export const SkeletonLetterCard = () => (
  <div className="skeleton-letter-card">
    <div className="skeleton-text skeleton-text-medium"></div>
    <div className="skeleton-text skeleton-text-short" style={{ marginTop: '10px' }}></div>
    <div className="skeleton-text skeleton-text-long" style={{ marginTop: '15px' }}></div>
    <div className="skeleton-text skeleton-text-long"></div>
  </div>
);

export const SkeletonMemoryCard = () => (
  <div className="skeleton-memory-card">
    <div className="skeleton-memory-image"></div>
    <div className="skeleton-memory-info">
      <div className="skeleton-text skeleton-text-medium"></div>
      <div className="skeleton-text skeleton-text-short" style={{ marginTop: '8px' }}></div>
      <div className="skeleton-text skeleton-text-long" style={{ marginTop: '12px' }}></div>
    </div>
  </div>
);

export const SkeletonDateCard = () => (
  <div className="skeleton-date-card">
    <div className="skeleton-date-icon"></div>
    <div className="skeleton-date-info">
      <div className="skeleton-text skeleton-text-medium"></div>
      <div className="skeleton-text skeleton-text-short" style={{ marginTop: '8px' }}></div>
      <div className="skeleton-text skeleton-text-long" style={{ marginTop: '12px' }}></div>
    </div>
  </div>
);

export const SkeletonTabContent = () => (
  <div className="skeleton-tab-content">
    <div className="skeleton-text skeleton-text-title" style={{ marginBottom: '30px' }}></div>
    <div className="skeleton-content-area">
      <SkeletonLetterCard />
      <SkeletonLetterCard />
      <SkeletonLetterCard />
    </div>
  </div>
);

