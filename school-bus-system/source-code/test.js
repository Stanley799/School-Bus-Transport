const {
  getAllUsers,
  createUser,
  getUserByEmail,
  updateLoginStatus,
  deleteUser
} = require('./models/userModel');

(async () => {
  try {
    // 1. Create a new user
    const newUser = await createUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword123',
      phone: '0700123456',
      role: 'parent'
    });
    console.log('User created:', newUser);

    // 2. Get all users
    const users = await getAllUsers();
    console.log('All users:', users);

    // 3. Get one user by email
    const user = await getUserByEmail('john@example.com');
    console.log('Found user:', user);

    // 4. Update login status
    const updated = await updateLoginStatus('john@example.com', true);
    console.log('Updated login status:', updated);

    // 5. Delete user by id (optional)
    // await deleteUser(newUser.id);
    // console.log('User deleted.');

  } catch (err) {
    console.error('Error during test:', err);
  }
})();
