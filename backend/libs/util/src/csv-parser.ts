import * as fs from 'fs';
import {
  convertTimeRange,
  extractAbstractIds,
  mapChairPersonData,
  mapPanalDiscussionData,
  mapParticipantData,
  mapPlenaryTalkData,
  mapSessionData,
  mapSessionItemData,
  splitZoom,
  toReversed,
} from './mapper';
import {
  csv_paidusers,
  csv_panaldiscussions,
  csv_plenarytalks,
  csv_sessionitems,
  csv_sessions,
} from './filepaths';

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
// readFile(csv_sessions, (lines) => {
//   const dataLines = lines.slice(1);
//   return dataLines;
// })
//   .then((dataLines) => {
//     for (const line of dataLines) {
//       let [
//         id,
//         chair1,
//         email1,
//         chair2,
//         email2,
//         date,
//         time,
//         location,
//         theme,
//         ...rest
//       ] = line.split(',');

//       if (rest) {
//         theme = [theme, ...rest].join(',');
//       }

//       const [startTime, endTime] = convertTimeRange(time, date);

//       // map data and save to json file
//       mapChairPersonData({ email: email1, name: chair1 });
//       mapChairPersonData({ email: email2, name: chair2 });
//       mapSessionData({
//         sessionId: id,
//         category: theme.replace(/\r/g, ''),
//         location: location,
//         date: date,
//         startTime: startTime,
//         endTime: endTime,
//       });
//     }
//   })
//   .catch((error) => {
//     console.error('Error reading the file:', error.message);
//   });

/** read session-items.csv file and parse data */
// readFile(csv_sessionitems, (lines) => {
//   const dataLines = lines.slice(1);
//   return dataLines;
// })
//   .then((dataLines) => {
//     for (const line of dataLines) {
//       let [sessionId, time, abstractId, ...rest] = line.split(',');

//       const [startTime, endTime] = convertTimeRange(time, new Date());
//       const [title, presenter, via] = splitZoom(rest);

//       // map data and save to json file
//       mapSessionItemData({
//         sessionId,
//         endTime,
//         startTime,
//         abstractId: parseInt(abstractId, 10),
//         title,
//         presenter,
//         via: via?.replace(/\r/g, ''),
//       });
//     }
//   })
//   .catch((error) => {
//     console.error('Error reading the file:', error.message);
//   });

/** read panal discussion.csv file and parse data */
// readFile(csv_panaldiscussions, (lines) => {
//   const dataLines = lines.slice(1);
//   return dataLines;
// })
//   .then((dataLines) => {
//     for (const line of dataLines) {
//       let [sessionId, time] = line.split(',');

//       const [startTime, endTime] = convertTimeRange(time, new Date());

//       // map data and save to json file
//       mapPanalDiscussionData({
//         sessionId,
//         endTime,
//         startTime,
//       });
//     }
//   })
//   .catch((error) => {
//     console.error('Error reading the file:', error.message);
//   });

/** read plenary talks.csv file and parse data */
// readFile(csv_plenarytalks, (lines) => {
//   const dataLines = lines.slice(1);
//   return dataLines;
// })
//   .then((dataLines) => {
//     for (const line of dataLines) {
//       let [sessionId, time, presenter, plenaryTalkLocation] = line.split(',');

//       const [startTime, endTime] = convertTimeRange(time, new Date());

//       // map data and save to json file
//       mapPlenaryTalkData({
//         sessionId,
//         endTime,
//         startTime,
//         presenter,
//         location: plenaryTalkLocation.replace(/\r/g, '')
//       });
//     }
//   })
//   .catch((error) => {
//     console.error('Error reading the file:', error.message);
//   });

readFile(csv_paidusers, (lines) => {
  const dataLines = lines.slice(1);
  return dataLines;
})
  .then((dataLines) => {
    // Title,Name with Initials,Participation, Abstract ID,Affiliated Organization/Institute,Email,National Identity Card No. (Sri Lanka) or Passport Number
    for (const line of dataLines) {
      const [title, name, role, ...rest] = line.split(',');
      const abstractIds = extractAbstractIds(rest.join(', '));
      const [nic, email, ...institute] = toReversed(rest);

      // map data and save to json file
      mapParticipantData({
        name: [title, name].join(' '),
        roleName: role,
        presentingSessionIds: abstractIds,
        nic: nic.replace(/\r/g, ''),
        email,
        institute: institute.join(' '),
      });
    }
  })
  .catch((error) => {
    console.error('Error reading the file:', error.message);
  });
