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
    id                  SERIAL          PRIMARY KEY,
    user_id             INT             NOT NULL REFERENCES users(id),
    venue_id            INT             NOT NULL REFERENCES venues(id),
    checkin_date        DATE            NOT NULL,
    validated           BOOLEAN         NOT NULL DEFAULT false,
    validated_by        INT             REFERENCES users(id),
    examination_result  TEXT,
    UNIQUE(user_id, checkin_date)
);

CREATE TABLE belong_groups (
    id              SERIAL          PRIMARY KEY,
    group_leader    VARCHAR(50)     NOT NULL DEFAULT ''
);

-- Keep track of which person belongs to which group, for fast filling in group selection at front end
CREATE TABLE group_members (
    group_id        INT             NOT NULL REFERENCES belong_groups (id),
    user_id         INT             NOT NULL REFERENCES users (id)
);

CREATE TYPE WEEKDAYS AS ENUM (
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
);

CREATE TABLE bg_schedule (
    id              SERIAL          PRIMARY KEY,
    group_id        INT             NOT NULL REFERENCES belong_groups (id),
    scheduled_day   WEEKDAYS        NOT NULL,
    
    -- Keep records of the valid period:
    start_day       DATE            NOT NULL,
    end_day         DATE            NOT NULL
);