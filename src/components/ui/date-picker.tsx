import React, { useState } from 'react';
import { Modal, Button, Group, Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface CustomDatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
}

export function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
}: CustomDatePickerProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [tempValue, setTempValue] = useState<Date | null>(value || null);

  const handleSave = () => {
    onChange?.(tempValue);
    close();
  };

  const handleCancel = () => {
    setTempValue(value || null);
    close();
  };

  const today = new Date();
  const currentMonth = tempValue || today;
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  
  // Previous month days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDay = new Date(year, month, -i);
    days.push({ date: prevDay, isOutside: true });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push({ date, isOutside: false });
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <>
      <Box
        onClick={open}
        style={{
          padding: '10px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text size="sm" c={value ? undefined : 'dimmed'}>
          {value ? value.toLocaleDateString() : placeholder}
        </Text>
      </Box>

      <Modal
        opened={opened}
        onClose={handleCancel}
        title="Set Date"
        centered
        size="auto"
      >
        <Box p="md">
          <div style={{ backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Text size="md" style={{ color: '#ffffff', fontWeight: 500 }}>
                {monthNames[month]} {year}
              </Text>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <Text key={day} size="xs" style={{ color: '#9CA3AF', textAlign: 'center', padding: '8px' }}>
                  {day}
                </Text>
              ))}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {days.map((day, index) => {
                const isSelected = tempValue && day.date.toDateString() === tempValue.toDateString();
                return (
                  <Button
                    key={index}
                    onClick={() => setTempValue(day.date)}
                    variant="subtle"
                    size="xs"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      backgroundColor: isSelected ? '#22c55e' : 'transparent',
                      color: day.isOutside ? '#6B7280' : (isSelected ? '#ffffff' : '#ffffff'),
                      border: 'none',
                    }}
                  >
                    {day.date.getDate()}
                  </Button>
                );
              })}
            </div>
          </div>
          
          <Group justify="space-between" mt="lg" gap="md">
            <Button
              onClick={handleCancel}
              style={{ 
                flex: 1,
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid #4B5563',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              style={{ 
                flex: 1,
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
              }}
            >
              Save
            </Button>
          </Group>
        </Box>
      </Modal>
    </>
  );
}