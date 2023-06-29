-- Define the users table to store the user's basic information
CREATE TABLE users (
    id                  SERIAL       PRIMARY KEY,
    first_name          VARCHAR(50)  NOT NULL DEFAULT '',
    last_name           VARCHAR(50)  NOT NULL DEFAULT '',
    email               VARCHAR(255) NOT NULL UNIQUE,
    complete_google_jwt TEXT         NOT NULL,
    g_csrf_token        TEXT         NOT NULL,
    created_date        DATE         NOT NULL DEFAULT CURRENT_DATE,
    notes               TEXT         NOT NULL DEFAULT '',
    is_admin            BOOLEAN      NOT NULL DEFAULT false
);

-- Define the admins table to indicate which user is admin
CREATE TABLE admins (
    id          SERIAL  PRIMARY KEY,
    user_id     INT     NOT NULL REFERENCES users (id)  
);

