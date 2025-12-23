import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: 'https://placehold.co/200x200/png',
            localPath: ""
        }
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    fullname: {
        type: String,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    isEmailVerified: {
        type: Boolean,
        default: false,
    },

    refreshTokens: {
        type: String,
    },

    forgotPasswordToken: {
        type: String,
    },

    forgotPasswordTokenExpiry: {
        type: Date,
    },

    emailVerificationToken: {
        type: String,
    },

    emailVerificationTokenExpiry: {
        type: Date,
    },

    timestamps: true,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();

});  

userSchema.methods.isPasswordMatch = async function
(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    jwt.sign(
        {_id: this._id,
         email: this.email,
         username: this.username},
        process.env.Access_Token_Secret,
        {expiresIn: process.env.ACESS_TOKEN_EXPIRES}
    );
};

userSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        {_id: this._id,
         email: this.email,
         username: this.username},
        process.env.REFRESH_Token_Secret,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRES}
    );
};

userSchema.methods.generateTemporaryToken = function() {
    const unHashedToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(unHashedToken).digest('hex');
    const tokenExpiry = Date.now() + (20 * 60 * 1000); // 20 minutes from now
    
    return {unHashedToken, hashedToken, tokenExpiry};
};

const User = mongoose.model('User', userSchema);

