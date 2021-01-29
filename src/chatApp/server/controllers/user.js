
module.exports = {
    onGetAllUsers: async (req, res) => {
        try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })

    } },
    onGetUserById: async (req, res) => { },
    onCreateUser: async (req, res) => { },
    onDeleteUserById: async (req, res) => { },
  }