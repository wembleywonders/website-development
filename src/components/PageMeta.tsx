// src/components/PageMeta.tsx
// Drop this into any page to inject per-page metadata.
//
// Usage:
//   import PageMeta from '@components/PageMeta'
//   <PageMeta pageKey="easy-street" />
//
// Override any field:
//   <PageMeta pageKey="easy-street" title="Custom Title" />

import React from 'react'
import { Helmet } from 'react-helmet-async'
import { getPageMeta, PageMeta as PageMetaType } from '@utils/seo'

interface Props extends Partial<PageMetaType> {
  pageKey: string
}

const PageMeta: React.FC<Props> = ({ pageKey, ...overrides }) => {
  const meta = { ...getPageMeta(pageKey), ...overrides }

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:type" content={meta.ogType ?? 'website'} />
      {meta.canonical && <meta property="og:url" content={meta.canonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={meta.ogTitle} />
      <meta name="twitter:description" content={meta.ogDescription} />

      {/* Canonical URL */}
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}
    </Helmet>
  )
}

export default PageMeta