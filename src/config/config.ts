export function config() {
  return {
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    frontendUrl: process.env.FRONTEND_URL,
    apiRoot: process.env.API_ROOT,
    enableSwagger:
      process.env.ENABLE_SWAGGER.toString().toLowerCase() === 'true',
    loggingInternalServerError:
      process.env.LOGGING_INTERNAL_SERVER_ERROR.toString().toLowerCase() ===
      'true',
    // Database
    db: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      logging: process.env.DATABASE_LOGGING + ''.toLowerCase() === 'true',
    },
    // Auth
    auth: {
      pwd: {
        pepper: process.env.AUTH_PWD_PEPPER,
        resetTokenLifeTime: process.env.AUTH_PWD_RESET_TOKEN_LIFE_TIME,
      },
      jwt: {
        accessSecretKey: process.env.JWT_ACCESS_SECRET_KEY,
        refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
        accessKeyLifetime: process.env.JWT_ACCESS_KEY_LIFE_TIME,
        refreshSecretKeyLifetime: process.env.JWT_REFRESH_SECRET_KEY_LIFE_TIME,
      },
      oauth: {},
    },
    // Mail
    mail: {
      preview: process.env.MAIL_PREVIEW.toString().toLowerCase() === 'true',
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: Number(process.env.MAIL_AUTH_PORT) === 465,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
      },
      dev: {
        user: process.env.MAIL_DEV_USER,
        pass: process.env.MAIL_DEV_PASS,
      },
    },
  };
}
