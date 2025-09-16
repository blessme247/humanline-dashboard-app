import { createTheme } from '@mantine/core';

const useMantineThemeConfig = () => {

  // Helper function to get CSS custom property value
  const getCSSVar = (property) => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
    }
    return '';
  };

  // Convert HSL string to hex for Mantine
  const hslToHex = (hsl) => {
    if (!hsl) return '#000000';
    
    // Parse HSL values
    const [h, s, l] = hsl.split(' ').map((val, index) => {
      const num = parseFloat(val.replace('%', ''));
      return index === 0 ? num : num / 100;
    });
    
    // Convert to RGB
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    
    let r, g, b;
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const mantineTheme = createTheme({
    fontFamily: 'Inter, sans-serif',
    headings: { fontFamily: 'Inter, sans-serif' },
    
    // Create custom color palette from CSS variables
    colors: {
      primary: [
         hslToHex('142 76% 96%'),
        hslToHex('142 76% 90%'),
        hslToHex('142 76% 80%'),
        hslToHex('142 76% 70%'),
        hslToHex('142 76% 60%'),
        hslToHex('142 76% 36%'), // Main primary color
        hslToHex('142 76% 30%'),
        hslToHex('142 76% 25%'),
        hslToHex('142 76% 20%'),
        hslToHex('142 76% 15%'),
      ],
      tertiary: [
        hslToHex('224 38% 90%'),
        hslToHex('224 38% 80%'),
        hslToHex('224 38% 70%'),
        hslToHex('224 38% 60%'),
        hslToHex('224 38% 50%'),
        hslToHex(getCSSVar('--tertiary') || '224 38% 11%'), // Main tertiary color
        hslToHex('224 38% 9%'),
        hslToHex('224 38% 7%'),
        hslToHex('224 38% 5%'),
        hslToHex('224 38% 3%'),
      ],
    },
    
    primaryColor: 'primary',
    primaryShade: 5,
    
    components: {
      Button: {
        defaultProps: {
          radius: 'md',
        },
      },
      Card: {
        defaultProps: {
          radius: 'md',
          shadow: 'sm',
        },
      },
      Modal: {
        defaultProps: {
          radius: 'lg',
        },
        styles: (theme) => ({
          content: {
            backgroundColor: `hsl(${getCSSVar('--date-picker-background')})`,
            border: `1px solid hsl(${getCSSVar('--date-picker-border')})`,
          },
          header: {
            backgroundColor: `hsl(${getCSSVar('--date-picker-background')})`,
            borderBottom: `1px solid hsl(${getCSSVar('--date-picker-border')})`,
            color: `hsl(${getCSSVar('--date-picker-foreground')})`,
          },
          title: {
            color: `hsl(${getCSSVar('--date-picker-foreground')})`,
            fontSize: '18px',
            fontWeight: 600,
          },
        }),
      },
      Input: {
        defaultProps: {
          radius: 'md',
        },
      },
      DatePickerInput: {
        defaultProps: {
          radius: 'md',
        },
        styles: (theme) => ({
          input: {
            backgroundColor: `hsl(${getCSSVar('--date-picker-background')})`,
            borderColor: `hsl(${getCSSVar('--date-picker-border')})`,
            color: `hsl(${getCSSVar('--date-picker-foreground')})`,
            '&:focus': {
              borderColor: `hsl(${getCSSVar('--primary')})`,
            },
          },
          dropdown: {
            backgroundColor: `hsl(${getCSSVar('--date-picker-background')})`,
            border: `1px solid hsl(${getCSSVar('--date-picker-border')})`,
            borderRadius: '12px',
          },
        }),
      },
      DatePicker: {
        styles: (theme) => ({
          calendar: {
            backgroundColor: `hsl(${getCSSVar('--date-picker-background')})`,
          },
          calendarHeader: {
            // backgroundColor: `hsl(${getCSSVar('--date-picker-background')})`,
            marginBottom: '16px',
            '&:hover': {
              backgroundColor: `hsl(${getCSSVar('--date-picker-hover')})`,
          }},
          calendarHeaderControl: {
            color: `hsl(${getCSSVar('--date-picker-foreground')})`,
            fontSize: '16px',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: `hsl(${getCSSVar('--primary-hover')})`,
            },
          },
          calendarHeaderLevel: {
            color: `hsl(${getCSSVar('--date-picker-foreground')})`,
            fontSize: '16px',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: `hsl(${getCSSVar('--date-picker-hover')})`,
            },
          },
          weekdaysRow: {
            marginBottom: '8px',
          },
          weekday: {
            color: `hsl(${getCSSVar('--date-picker-muted')})`,
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'capitalize',
          },
          day: {
            color: `hsl(${getCSSVar('--date-picker-foreground')})`,
            fontSize: '14px',
            fontWeight: 400,
            borderRadius: '8px',
            width: '36px',
            height: '36px',
            margin: '2px',
            '&:hover': {
              backgroundColor: `hsl(${getCSSVar('--date-picker-hover')})`,
            },
            '&[data-selected]': {
              backgroundColor: `hsl(${getCSSVar('--primary')})`,
              color: `hsl(${getCSSVar('--primary-foreground')})`,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: `hsl(${getCSSVar('--primary-hover')})`,
              },
            },
            '&[data-today]': {
              backgroundColor: `hsl(${getCSSVar('--primary')})`,
              color: `hsl(${getCSSVar('--primary-foreground')})`,
              fontWeight: 500,
              '&:not([data-selected]):hover': {
                backgroundColor: `hsl(${getCSSVar('--primary-hover')})`,
              },
            },
            '&[data-outside]': {
              color: `hsl(${getCSSVar('--date-picker-muted')})`,
              opacity: 0.4,
            },
            '&[data-in-range]': {
              backgroundColor: `hsl(${getCSSVar('--date-picker-data-in-range')})`,
              color: `hsl(${getCSSVar('--primary')})`,
            },
            '&[data-first-in-range], &[data-last-in-range]': {
              backgroundColor: `hsl(${getCSSVar('--primary')})`,
              color: `hsl(${getCSSVar('--primary-foreground')})`,
            },
          },
          monthCell: {
            color: `hsl(${getCSSVar('--date-picker-foreground')})`,
            fontSize: '14px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: `hsl(${getCSSVar('--date-picker-hover')})`,
            },
            '&[data-selected]': {
              backgroundColor: `hsl(${getCSSVar('--primary')})`,
              color: `hsl(${getCSSVar('--primary-foreground')})`,
            },
          },
          yearCell: {
            color: `hsl(${getCSSVar('--date-picker-foreground')})`,
            fontSize: '14px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: `hsl(${getCSSVar('--date-picker-hover')})`,
            },
            '&[data-selected]': {
              backgroundColor: `hsl(${getCSSVar('--primary')})`,
              color: `hsl(${getCSSVar('--primary-foreground')})`,
            },
          },
        }),
      },
      // Style the action buttons (Cancel/Save)
      Group: {
        styles: {
          root: {
            gap: '12px',
            marginTop: '24px',
          },
        },
      },
    },
  });
  
  return { mantineTheme }
}

export default useMantineThemeConfig


//  colors: {
//     primary: [
//       hslToHex('300 100% 26%'),
//       hslToHex('300 100% 90%'),
//       hslToHex('300 100% 80%'),
//       hslToHex('300 100% 70%'),
//       hslToHex('300 100% 60%'),
//       hslToHex( '300 100% 100%'), // Main primary color
//       hslToHex('300 100% 30%'),
//       hslToHex('300 100% 25%'),
//       hslToHex('300 100% 20%'),
//       hslToHex('300 100% 15%'),
//     ],
//     tertiary: [
//       hslToHex('224 38% 90%'),
//       hslToHex('224 38% 80%'),
//       hslToHex('224 38% 70%'),
//       hslToHex('224 38% 60%'),
//       hslToHex('224 38% 50%'),
//       hslToHex(getCSSVar('--tertiary') || '224 38% 11%'), // Main tertiary color
//       hslToHex('224 38% 9%'),
//       hslToHex('224 38% 7%'),
//       hslToHex('224 38% 5%'),
//       hslToHex('224 38% 3%'),
//     ],
//   },
  