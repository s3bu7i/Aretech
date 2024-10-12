import bcrypt from 'bcryptjs';

// Function to hash a password with proper typing
function hashPassword(password, saltRounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

// Usage
hashPassword('admin-pw', 10)
  .then(hash => console.log(hash))
  .catch(err => console.error(err));
