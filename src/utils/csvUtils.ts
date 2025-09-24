// utils/csvUtils.ts
import {PlayerGameStatistic} from "../model/PlayerGameStatistic.ts";


// This is to format nested objects like totalTimePlayed and duration
const formatTimeObject = (timeObject: { hours?: number; minutes: number; seconds?: number }) => {
    const timeParts = [];
    if (timeObject.hours !== undefined) timeParts.push(`${timeObject.hours} hours`);
    if (timeObject.minutes !== undefined) timeParts.push(`${timeObject.minutes} minutes`);
    if (timeObject.seconds !== undefined) timeParts.push(`${timeObject.seconds} seconds`);
    return timeParts.join(' ');
};

export const downloadCSV = (data: PlayerGameStatistic[], filename: string) => {

    const headers = Object.keys(data[0]);

    const csvRows = [
        headers.join(','),
        ...data.map((row) => {
            return headers
                .map((fieldName) => {
                    const value = row[fieldName as keyof PlayerGameStatistic];

                    if (value === null || value === undefined) {
                        return '';
                    }

                    if (typeof value === 'object') {
                        return formatTimeObject(value);
                    }

                    return value.toString();
                })
                .join(',');
        }),
    ];

    const csvString = csvRows.join('\n');

    // I create a blob with the CSV string and trigger the download
    const blob = new Blob([csvString], {type: 'text/csv'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};
