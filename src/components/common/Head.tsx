import React from 'react';
import NextHead from 'next/head';

type Props = {
  title?: string;
  description?: string;
};

export const Head = ({
  title = 'Help Help Center',
  description = 'description'
}: Props) => {
  return (
    <NextHead>
      <meta charSet='UTF-8' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      />
    </NextHead>
  );
};
