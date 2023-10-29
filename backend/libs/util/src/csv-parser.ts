import * as fs from 'fs';
import { convertTimeRange, mapChairPersonData, mapSessionData } from './mapper';
import { Session } from './interfaces';
import { csv_sessions } from './filepaths';

export function readFile<T>(
  filepath: string,
  processData: (lines: string[]) => T,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filepath, { encoding: 'utf-8' });
    let fileContent = '';

    fileStream.on('data', (chunk: string) => {
      fileContent += chunk;
    });

    fileStream.on('end', () => {
      const lines = fileContent.split('\n');
      const processedData = processData(lines);
      resolve(processedData);
    });

    fileStream.on('error', (error: Error) => {
      reject(error);
    });
  });
}

/** read session.csv file and parse data */
readFile(csv_sessions, (lines) => {
  const dataLines = lines.slice(1);
  return dataLines;
})
  .then((dataLines) => {
    const sesssion: Session = {};
    const sessionArray: Session[] = [];

    for (const line of dataLines) {
      let [
        id,
        chair1,
        email1,
        chair2,
        email2,
        date,
        time,
        location,
        theme,
        ...rest
      ] = line.split(',');

      if (rest) {
        theme = [theme, ...rest].join(',');
      }

      const [startTime, endTime] = convertTimeRange(time, date);

      // map data and save to json file
      // mapChairPersonData({ email: email1, name: chair1 });
      // mapChairPersonData({ email: email2, name: chair2 });
      mapSessionData({
        sessionId: id,
        category: theme.replace(/\r/g, ''),
        location: location,
        date: date,
        startTime: startTime,
        endTime: endTime,
      });
    }
  })
  .catch((error) => {
    console.error('Error reading the file:', error.message);
  });
