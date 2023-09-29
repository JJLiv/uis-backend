\echo 'Delete and recreate up_in_sports db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE up_in_sports;
CREATE DATABASE up_in_sports;
\connect up_in_sports

\i upInSports-schema.sql
\i upInSports-seed.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE up_in_sports_test;
CREATE DATABASE up_in_sports_test;
\connect up_in_sports_test

\i upInSports-schema.sql
