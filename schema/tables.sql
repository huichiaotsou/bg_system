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
    created_date            TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes                   TEXT         NOT NULL DEFAULT '',
    is_admin                BOOLEAN      NOT NULL DEFAULT false
);

CREATE TABLE venues (
    id          SERIAL          PRIMARY KEY,
    venue_name  VARCHAR(50)     NOT NULL DEFAULT ''
);

INSERT INTO venues (venue_name) VALUES ('Living Room');
INSERT INTO venues (venue_name) VALUES ('Glassroom');
INSERT INTO venues (venue_name) VALUES ('eHQ');
INSERT INTO venues (venue_name) VALUES ('Kids Central');
INSERT INTO venues (venue_name) VALUES ('Gather');

CREATE TABLE checkins (
    id              SERIAL          PRIMARY KEY,
    user_id         INT             REFERENCES users(id),
    venue_id        INT             REFERENCES venues(id),
    checkin_date    DATE            NOT NULL,
    UNIQUE(user_id, checkin_date)
);