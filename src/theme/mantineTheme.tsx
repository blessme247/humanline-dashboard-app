import { MantineThemeOverride } from '@mantine/core';

export const mantineThemeConfig: MantineThemeOverride = {
  colors: {
    // Custom green color for selections
    brand: [
      '#f0fdf4', // 50
      '#dcfce7', // 100
      '#bbf7d0', // 200
      '#86efac', // 300
      '#4ade80', // 400
      '#22c55e', // 500
      '#16a34a', // 600
      '#15803d', // 700
      '#166534', // 800
      '#14532d', // 900
    ],
  },
  primaryColor: 'brand',
  components: {
    DatePicker: {
      styles: (theme) => ({
        calendarHeader: {
          backgroundColor: '#374151',
          color: '#ffffff',
          padding: '16px',
          borderRadius: '8px 8px 0 0',
          borderBottom: '1px solid #4B5563',
        },
        calendarHeaderControl: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#4B5563',
          },
        },
        calendarHeaderLevel: {
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 500,
        },
        calendar: {
          backgroundColor: '#374151',
          border: 'none',
          borderRadius: '8px',
        },
        month: {
          backgroundColor: '#374151',
          padding: '16px',
        },
        weekdayCell: {
          color: '#9CA3AF',
          fontSize: '12px',
          fontWeight: 400,
          padding: '8px',
        },
        day: {
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 400,
          border: 'none',
          borderRadius: '6px',
          width: '36px',
          height: '36px',
          '&:hover': {
            backgroundColor: '#4B5563',
          },
          '&[data-selected]': {
            backgroundColor: '#22c55e',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#16a34a',
            },
          },
          '&[data-in-range]': {
            backgroundColor: '#22c55e',
            color: '#ffffff',
          },
          '&[data-first-in-range]': {
            backgroundColor: '#22c55e',
            color: '#ffffff',
            borderRadius: '6px 0 0 6px',
          },
          '&[data-last-in-range]': {
            backgroundColor: '#22c55e',
            color: '#ffffff',
            borderRadius: '0 6px 6px 0',
          },
          '&[data-outside]': {
            color: '#6B7280',
          },
        },
      }),
    },
    Modal: {
      styles: (theme) => ({
        modal: {
          backgroundColor: '#374151',
          border: 'none',
          borderRadius: '12px',
        },
        header: {
          backgroundColor: '#374151',
          borderBottom: '1px solid #4B5563',
          padding: '20px 24px 16px',
        },
        title: {
          color: '#ffffff',
          fontSize: '18px',
          fontWeight: 600,
        },
        body: {
          padding: '0',
        },
      }),
    },
    Button: {
      styles: (theme) => ({
        root: {
          borderRadius: '8px',
          height: '44px',
          fontSize: '14px',
          fontWeight: 500,
        },
      }),
    },
  },
};