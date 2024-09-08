import { Box, Tooltip } from '@chakra-ui/react';
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function shiftDate(date: any, numDays: any) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PublicProfile = () => {
  const today = new Date();
  const randomValues = getRange(200).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });

  return (
    <Box  padding="2rem 6rem" display="flex" flexDirection="column" justifyContent='center' alignItems="center" >
        <Box width="100%" display="flex" alignItems="center" justifyContent="center" bg="grey" padding="2rem" mt="1rem" gap="1rem" borderRadius='6px'>
                <Box padding="3rem" bg="beige" borderRadius="6px">
                    1st
                </Box>
                <Box padding="3rem" bg="beige" borderRadius="6px">
                    2nd
                </Box>
        </Box>
        <Box width="90%" display="flex" gap='2rem' mt="1rem">
            <Box padding="1rem" bg="grey" borderRadius="6px">
                1st box
            </Box>
            <Box width="50%" mt="2rem" borderRadius='6px'>
                <CalendarHeatmap
                    startDate={shiftDate(today, -140)}
                    endDate={today}
                    values={randomValues}
                    classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-github-${value.count}`;
                    }}
                    tooltipDataAttrs={(value: any) => ({
                    'data-tip': `${value.date} has count: ${value.count}`,
                    })}
                    showWeekdayLabels={true}
                    onClick={(value) =>
                    alert(`Clicked on value with count: ${value?.count}`)
                    }
                    transformDayElement={(element, value) => (
                    <Tooltip
                        label={`Date: ${value?.date} - Count: ${value?.count}`}
                        aria-label="contribution-tooltip"
                        placement="top"
                        hasArrow
                    >
                        {element}
                    </Tooltip>
                    )}
                />
            </Box>
        </Box>
    </Box>
  );
};

export default PublicProfile;
