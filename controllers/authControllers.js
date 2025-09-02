import User from '@/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const login = async (req) => {
  try {
    const body = await req.json();
    const { mail, password, googleToken } = body;

    let user;

    if (googleToken) {
      // ----- Google login flow -----
      
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { email } = payload;

      user = await User.findOne({ mail: email });

      if (!user) {
        return NextResponse.json({ error: 'No such email registered' }, { status: 401 });
      }

    } else {
      
      if (!mail || !password) {
        return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
      }

      user = await User.findOne({ mail });
      
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const isMatch = await bcrypt.compare(password, user.hashed_password);
      if (!isMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
    }

    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "my-big-secret",
      { expiresIn: '72h' }
    );

    
    const response = NextResponse.json({
      user: {
        id: user._id,
        name: user.username,
        mail: user.mail,
      }
    }, { status: 200 });

    response.cookies.set('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};

export const register = async (req) => {
    try {
        const {username,mail,password,phone_num} = await req.json(); 

        const existingUser = await  User.findOne({ mail }).exec();
        if(existingUser){
          return NextResponse.json(
            { error: 'User already exists' },
            { status: 400 }
        );
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            mail,
            phone_num,
            hashed_password: hashedPassword
        })
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "my-big-secret",
            { expiresIn: '72h' }
          );
          const response = NextResponse.json({
            user: {
                id: user._id,
                name: user.username,
                mail: user.mail
            }
        }, { status: 201 });
        response.cookies.set('token', token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 // 24 hours in seconds
      });

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return NextResponse.json(
          { msg: "server error" },
          { status: 500 }
      );
    }
};


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILADD,
    pass: process.env.MAILAPPPASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});


export const sendVerificationEmail = async (req) => {
  const {email} = await req.json();
  const code = generateRandomCode(6);
  const mailOptions = {
    from: process.env.MAILADD,
    to: email,
    subject: 'Verify Your Email Address',
    text: `${code}`
  };

  try {
    await transporter.sendMail(mailOptions);
     return NextResponse.json(
         { success: true, code:code },
         { status: 200 }
      );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {msg: error},
      {status: 500}
    );
  }
};



function generateRandomCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
