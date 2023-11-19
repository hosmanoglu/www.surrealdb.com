-- Set a field to have the array data type
DEFINE FIELD roles ON TABLE user TYPE array;
-- Set the contents of the array to only support a string data type
DEFINE FIELD roles.* ON TABLE user TYPE string;

-- Set a field to have the array data type
DEFINE FIELD posts ON TABLE user TYPE array;
-- Set the contents of the array to only support a record data type
DEFINE FIELD posts.* ON TABLE user TYPE record<post>;
