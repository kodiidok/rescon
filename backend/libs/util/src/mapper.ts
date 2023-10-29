import { ChairPerson, Session } from './interfaces';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { json_users, json_sessions } from './filepaths';

export function convertTimeRange(timeRange, date) {
  const [start, end] = timeRange.split('-').map((time) => time.trim());
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);

  const isAM = startHour >= 7 && startHour < 12;

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
      mappedData.username = `${initials}${randomNumber}`;
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
