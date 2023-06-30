-- Define the users table to store the user's basic information
CREATE TABLE users (
    id                  SERIAL       PRIMARY KEY,
    given_name          VARCHAR(50)  NOT NULL DEFAULT '',
    family_name         VARCHAR(50)  NOT NULL DEFAULT '',
    profile_picture.    TEXT         NOT NULL,
    email               VARCHAR(255) NOT NULL UNIQUE,
    complete_google_jwt TEXT         NOT NULL,
    g_csrf_token        TEXT         NOT NULL,
    created_date        DATE         NOT NULL DEFAULT CURRENT_DATE,
    notes               TEXT         NOT NULL DEFAULT '',
    is_admin            BOOLEAN      NOT NULL DEFAULT false
);

