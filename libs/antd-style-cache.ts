// libs/antd-style-cache.ts
'use client';
import { createStyles } from 'antd-style';
import { createCache, extractStyle } from '@ant-design/cssinjs';

const useStyle = createStyles(({ css, token }: { css: any; token: any }) => {
    const { antCls } = token;
    return {
        customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
    };
});

export { createCache, extractStyle, useStyle };