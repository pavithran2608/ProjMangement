import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "TaskManager",
            link: "https://taskmanagelink.com",
        },
    });
};

    

const emailVerificationMailgenContent = (usernamedb, verifyUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our Project Management App! We're excited to have you on board.",
            action: {
                instructions: "To get started, please verify your email address by clicking the button below:",
                button: {
                    color: "#22BC66", // Optional action button color    
                    text: "Verify Your Email",
                    link: verifyUrl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    }
};


const forgotPasswordMailgenContent = (usernamedb, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We received a request to reset your password. Click the button below to reset it." ,
            action: {
                instructions: "To reset your password, please click the button below:",
                button: {
                    color: "#22BC66", // Optional action button color    
                    text: "Reset Your Password",
                    link: passwordResetUrl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    }
};

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };

