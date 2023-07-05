const { executeQuery } = require("./conn");

// Store group details in the groups table
const createGroup = async (groupName) => {
  try {
    const query =
      "INSERT INTO belong_groups (group_leader) VALUES ($1) " + "RETURNING id";

    const values = [groupName];

    const [result] = await executeQuery(query, values);
    const insertedUserId = result.id;

    if (insertedUserId) {
      console.log("Group inserted with group ID:", insertedUserId);
      return insertedUserId;
    } else {
      throw new Error("Failed to insert group");
    }
  } catch (err) {
    console.error("Error storing group:", err);
    throw err;
  }
};

// Store group member in the group_members table
const saveGroupMember = async (userGroup) => {
  try {
    const query =
      "INSERT INTO group_members (group_id, user_id) VALUES ($1, $2) ";
    const values = [userGroup.groupID, userGroup.userID];
    await executeQuery(query, values);
  } catch (err) {
    console.error("Error storing group:", err);
    throw err;
  }
};

module.exports = {
  createGroup,
  saveGroupMember,
};
