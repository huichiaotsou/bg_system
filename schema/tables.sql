-- Define the users table to store the user's basic information
CREATE TABLE users (
    id                      SERIAL       PRIMARY KEY,
    given_name_google       VARCHAR(50)  NOT NULL DEFAULT '',
    family_name_google      VARCHAR(50)  NOT NULL DEFAULT '',
    user_define_name        VARCHAR(50)  NOT NULL DEFAULT '',
    phone                   VARCHAR(20)  NOT NULL DEFAULT '',
    profile_picture_link    VARCHAR(255) NOT NULL,
    email                   VARCHAR(255) NOT NULL UNIQUE,
    complete_google_jwt     TEXT         NOT NULL,
    created_date            DATE         NOT NULL DEFAULT CURRENT_DATE,
    notes                   TEXT         NOT NULL DEFAULT '',
    is_admin                BOOLEAN      NOT NULL DEFAULT false
);
