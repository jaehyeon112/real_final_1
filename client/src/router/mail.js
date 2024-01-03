import { createTransport } from "nodemailer";

static register = async (userDTO: RegisterUserDTO) => {
  try {
    // ... 회원가입 관련 로직들
    const transporter = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        type: "OAuth2",
        user: config.mailer.gmailUser,
        clientId: config.mailer.gmailClientId,
        clientSecret: config.mailer.gmailClientSecret,
        refreshToken: config.mailer.gmailRefreshToken,
      },
    });

    const mailOptions = {
      to: userDTO.email,
      subject: "[헬로디벨로퍼] 회원가입 이메일 인증 메일입니다.",
      html: `인증링크 : <a href="http://www.naver.com?token=${emailVerifyToken}">여기를 눌러주세요</a>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err)
  }
};