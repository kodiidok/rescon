export const MAIN_APP = {
  host: process.env.MAIN_APP_HOST || 'localhost',
  port: process.env.MAIN_APP_PORT || 3333,
  name: process.env.MAIN_APP_NAME || 'rescon',
  ssl: process.env.SSL || false,
}