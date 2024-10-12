import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { Member, Partner } from '@/db/models/index.ts'
import { User } from '@/db/models/index.ts';
import { addMember, findPartnerByEmail } from '@/db/providers/index.ts'
import { ForbiddenError, NotFoundError } from '@/utils/index.ts'
// import { AnimalType } from '@/db/models/user.ts';

const adminAuthController = async (email: string, password: string) => {
  if (email !== (process.env.ADMIN_EMAIL as string)) {
    throw new NotFoundError(`Admin with email of ${email} does not exist! ${process.env.ADMIN_EMAIL}`)
  }

  const isPasswordCorrect = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH as string)

  if (!isPasswordCorrect) {
    throw new ForbiddenError(`Incorrect credentials!`)
  }

  return jwt.sign(
    { id: process.env.ADMIN_ID as string, email: process.env.ADMIN_EMAIL as string },
    process.env.JWT_ADMIN_SECRET as jwt.Secret,
    { expiresIn: '30m' }
  )
}

const partnerAuthController = async (email: string, password: string) => {
  const partner = await findPartnerByEmail(email, false)

  if (!partner) {
    throw new NotFoundError(`Partner with email of ${email} does not exist!`)
  }

  const isPasswordCorrect = await bcrypt.compare(password, partner.password)

  if (!isPasswordCorrect) {
    throw new ForbiddenError(`Incorrect credentials!`)
  }

  const sanitizedPartner = partner as Partial<Partner>

  delete sanitizedPartner.password

  return jwt.sign(sanitizedPartner, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '30m'
  })
}


const userSignupController = async (name: string, email: string, password: string, animal: string) => {
  const existingUser = await Member.findOne({ where: { email } });
  console.log("EXISTING", existingUser);
  if (existingUser) {
    throw new ForbiddenError(`User with email ${email} already exists!`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // const user = await Member.create({ email, password: hashedPassword, animal, balance: 0 });

  // add user to our "partner" id 1
  const user = await addMember(1, { name, email, password: hashedPassword, animal, balance: 0, status: "ACTIVE" });

  // return { message: 'User created successfully', user };

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, balance: user.balance, animal: user.animal, createdAt: user.createdAt, updatedAt: user.updatedAt },
    process.env.JWT_SECRET as jwt.Secret,
    { expiresIn: '3d' }
  );

  return { token };
};

const userLoginController = async (email: string, password: string) => {
  const user = await Member.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError(`User with email ${email} does not exist!`);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ForbiddenError('Incorrect credentials!');
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, balance: user.balance, animal: user.animal, createdAt: user.createdAt, updatedAt: user.updatedAt },
    process.env.JWT_SECRET as jwt.Secret,
    { expiresIn: '3d' }
  );

  return { token };
};

export { adminAuthController, partnerAuthController, userLoginController, userSignupController}
