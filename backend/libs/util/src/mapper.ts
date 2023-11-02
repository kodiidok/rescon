import {
  ChairPerson,
  PanalDiscussion,
  PlenaryTalk,
  Session,
  SessionItem,
  User,
} from './interfaces';
import * as crypto from 'crypto';
import * as fs from 'fs';
import {
  json_users,
  json_sessions,
  json_sessionitems,
  json_panaldiscussions,
  json_plenarytalks,
  json_paidusers,
} from './filepaths';

export function convertTimeRange(timeRange, date) {
  const [start, end] = timeRange.split('-').map((time) => time.trim());
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);

  const isAM = startHour >= 7 && startHour <= 12;

  const startDate = new Date(date);
  startDate.setHours(isAM ? startHour : startHour + 12, startMinute, 0, 0);

  const endDate = new Date(date);
  endDate.setHours(isAM ? endHour : endHour + 12, endMinute, 0, 0);

  const startTime = startDate.toLocaleTimeString('en-US', { hour12: false });
  const endTime = endDate.toLocaleTimeString('en-US', { hour12: false });

  return [startTime, endTime];
}

export function mapChairPersonData({ email, name }: ChairPerson) {
  try {
    const mappedData: ChairPerson = {
      username: 'user',
      email: 'default@email.com',
      password: 'P@ssw0rd',
      roleName: 'session_chair',
    };
    if (email) {
      mappedData.email = email;
    }
    if (name) {
      mappedData.name = name;
      // Combine initials and random string to form the username
      mappedData.username = generateUsername(name);
    }

    // Read the existing JSON file
    const existingData = JSON.parse(fs.readFileSync(json_users, 'utf-8'));

    // Append the new data to the existing data
    existingData.push(mappedData);

    // Save the updated data back to the file
    fs.writeFileSync(
      json_users,
      JSON.stringify(existingData, null, 2),
      'utf-8',
    );
  } catch (error) {
    throw new Error(error);
  }
}

export function mapSessionData({
  sessionId,
  category,
  location,
  date,
  startTime,
  endTime,
}: Session) {
  try {
    const mappedData: Session = {
      sessionId,
      category,
      location,
      date,
      startTime,
      endTime,
    };

    // Read the existing JSON file
    const existingData = JSON.parse(fs.readFileSync(json_sessions, 'utf-8'));

    // Append the new data to the existing data
    existingData.push(mappedData);

    // Save the updated data back to the file
    fs.writeFileSync(
      json_sessions,
      JSON.stringify(existingData, null, 2),
      'utf-8',
    );
  } catch (error) {
    throw new Error(error);
  }
}

export function mapSessionItemData({
  sessionId,
  abstractId,
  presenter,
  title,
  startTime,
  endTime,
  via,
}: SessionItem) {
  try {
    const mappedData: SessionItem = {
      sessionId,
      abstractId,
      presenter,
      title,
      startTime,
      endTime,
      via,
    };

    // Read the existing JSON file
    const existingData = JSON.parse(
      fs.readFileSync(json_sessionitems, 'utf-8'),
    );

    // Append the new data to the existing data
    existingData.push(mappedData);

    // Save the updated data back to the file
    fs.writeFileSync(
      json_sessionitems,
      JSON.stringify(existingData, null, 2),
      'utf-8',
    );
  } catch (error) {
    throw new Error(error);
  }
}

export function mapPanalDiscussionData({
  sessionId,
  startTime,
  endTime,
}: PanalDiscussion) {
  try {
    const mappedData: PanalDiscussion = {
      sessionId,
      startTime,
      endTime,
    };

    // Read the existing JSON file
    const existingData = JSON.parse(
      fs.readFileSync(json_panaldiscussions, 'utf-8'),
    );

    // Append the new data to the existing data
    existingData.push(mappedData);

    // Save the updated data back to the file
    fs.writeFileSync(
      json_panaldiscussions,
      JSON.stringify(existingData, null, 2),
      'utf-8',
    );
  } catch (error) {
    throw new Error(error);
  }
}

export function mapPlenaryTalkData({
  sessionId,
  location,
  startTime,
  presenter,
  endTime,
}: PlenaryTalk) {
  try {
    const mappedData: PlenaryTalk = {
      sessionId,
      location,
      startTime,
      endTime,
      presenter,
    };

    // Read the existing JSON file
    const existingData = JSON.parse(
      fs.readFileSync(json_plenarytalks, 'utf-8'),
    );

    // Append the new data to the existing data
    existingData.push(mappedData);

    // Save the updated data back to the file
    fs.writeFileSync(
      json_plenarytalks,
      JSON.stringify(existingData, null, 2),
      'utf-8',
    );
  } catch (error) {
    throw new Error(error);
  }
}

export function mapParticipantData({
  name,
  roleName,
  presentingSessionIds,
  nic,
  email,
  institute,
  username,
  password,
}: User) {
  try {
    const mappedData: User = {
      name,
      presentingSessionIds,
      nic,
      institute,
      username: generateUsername(name),
      email: email ? email : 'default@email.com',
      password: 'P@ssw0rd',
      roleName:
        roleName === 'Presenter'
          ? 'presenter'
          : roleName === 'Participant only'
          ? 'paid_user'
          : 'public_user',
    };

    // Read the existing JSON file
    const existingData = JSON.parse(fs.readFileSync(json_paidusers, 'utf-8'));

    // Append the new data to the existing data
    existingData.push(mappedData);

    // Save the updated data back to the file
    fs.writeFileSync(
      json_paidusers,
      JSON.stringify(existingData, null, 2),
      'utf-8',
    );
  } catch (error) {
    throw new Error(error);
  }
}

// Function to check and split the "zoom"
export function splitZoom(input: string[]) {
  let hasZoom = false;
  let zoom = '';
  let name = '';
  for (const line of input) {
    hasZoom = /zoom/i.test(line);
    if (hasZoom) {
      zoom = input.pop();
      break;
    }
  }

  let splits;

  if (hasZoom) {
    name = input.pop();
    splits = [input.join(', '), name, zoom];
  } else {
    const _ = input.pop();
    name = input.pop();
    splits = [input.join(', ').replace(/"/g, ''), name, undefined];
  }

  return splits;
}

export function toReversed(arr: any) {
  return [...arr].reverse();
}

export function extractAbstractIds(data: string) {
  // Define a regular expression to match the numbers inside quotations
  const regex = /".*?"/g;

  // Extract numbers inside quotations using match and map
  let extractedNumbers = (data.match(regex) || []).map((match) => {
    const numbersString = match.replace(/"/g, '');
    const numbers = numbersString.split(',');
    const filteredNumbers = numbers.map(Number).filter((part) => !isNaN(part));
    return numbers.length === 1 ? filteredNumbers[0] : filteredNumbers;
  });

  // Check if extractedNumbers contains only empty arrays, return an empty array in that case
  if (
    extractedNumbers.every((item) => Array.isArray(item) && item.length === 0)
  ) {
    extractedNumbers = [];
  }

  // If there are no double-quoted numbers, return the number at the 4th position when the data is split
  if (extractedNumbers.length === 0) {
    const [extractedNumber, ...rest] = data.split(',');
    extractedNumbers = [extractedNumber];
  } else {
    extractedNumbers = extractedNumbers[0].map((num) => `${num}`);
  }
  return extractedNumbers;
}

export function generateUsername(name: string) {
  // Generate username based on initials and a random number
  const [, ...names] = name.split('.');
  const initials = names
    .join(' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  // Generate a random number
  const randomBytes = crypto.randomBytes(3);
  const randomHexString = randomBytes.toString('hex');
  const randomNumber = randomHexString.substring(0, 6);

  // Combine initials and random string to form the username
  return `${initials}${randomNumber}`;
}
