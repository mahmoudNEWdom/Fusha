"use client";
import React, { useState, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import {
  StyledButton,
  StyledLink,
  StyledTextField,
} from "../styledComponent/Register/StyledRegister";
import {
  Container,
  FormContainer,
  LeftSection,
  RightSection,
  StyledTypography
} from "../styledComponent/Login/styledLogin";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";
import Image from "next/image";

const MemoizedTypography = React.memo(({ children, ...props }) => (
  <StyledTypography {...props}>{children}</StyledTypography>
));

const MemoizedStyledTextField = React.memo(({ children, ...props }) => (
  <StyledTextField {...props}>{children}</StyledTextField>
));

const LogIn = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  const handleClickShowPassword = useCallback((field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Client-side validation
      if (!email || !password) {
        setError("الرجاء ملء جميع الحقول");
        return;
      }

      axios
        .post("http://localhost:4000/api/login", { email, password })
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", token);
          window.location.href = "/";
        })
        .catch((err) => {
          const serverError =
            err.response?.data?.error?.[0] ||
            err.response?.data?.error ||
            "فشل تسجيل الدخول البريد الالكتروني أو كلمة المرور غير صحيحة";
          setError(serverError);
        });
    },
    [email, password]
  );

  return (
    <Container>
      <LeftSection>
        <div className="background-image-wrapper">
          <Image
            src="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Background"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              filter: "blur(3px) brightness(0.9)",
            }}
            quality={75}
          />
        </div>
        <svg
          width="400"
          height="110"
          viewBox="0 0 533 182"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M71.4 16C70.5 17.5 67.3 19.7 61.8 22.6C61.5 18.5 60.2 14.7 57.7 11.2C56 8.80004 55.6 6.70003 56.6 5.00003C57.4 3.60003 62.6 2.10002 72.1 0.400024C71.5 1.50002 71.3 2.70004 71.3 4.20004C71.3 5.70004 71.5 7.10004 71.6 8.60004C71.7 10.1 71.9 11.4 71.9 12.8C72.1 14 71.9 15.1 71.4 16Z"
            fill="white"
          />
          <path
            d="M89.9 27C89 28.5 85.8 30.7 80.3 33.6C80 29.5 78.7 25.7 76.2 22.2C74.5 19.8 74.1 17.7 75.1 16C75.9 14.6 81.1 13.1 90.6 11.4C90 12.5 89.8 13.7 89.8 15.2C89.8 16.7 90 18.1 90.1 19.6C90.2 21.1 90.4 22.4 90.4 23.8C90.6 25.1 90.4 26.2 89.9 27Z"
            fill="white"
          />
          <path
            d="M285.4 179.6C283.3 180.9 280.7 181.5 277.6 181.5C254.7 181.5 235.3 172.6 219.3 154.7H142.1V128.6H202.9L188.9 105.6C185.4 99.8999 181.9 95.6999 178.2 93.0999C174.5 90.3999 170.9 89.0999 167.5 89.0999C162.8 89.0999 158.2 90.3999 153.5 92.8999L183.1 61.2999C190 53.8999 195.1 50.2 198.4 50.2C200.9 50.2 204.3 54.6999 208.5 63.7999L238.9 128.7H275.5V154.8H252.9C258.3 162.8 265.7 169.5 275.2 174.8C277.9 175.7 281.3 177.3 285.4 179.6Z"
            fill="white"
          />
          <path
            d="M425.5 154.8H263V128.7H285.8L284.5 125.7C282.5 121.3 279.1 117.8 274.1 115.3L295.4 92.7L312.1 128.7H330.3L321.8 110.8C319.6 106.4 316.2 102.9 311.4 100.4L332.7 77.8L356.3 128.8H374.5L358.9 95.6C356.7 91.2 353.3 87.7 348.5 85.2L369.8 62.6L400.3 128.9H425.5C424.8 129.4 419 133.3 418.4 140.7C418 146.1 420.7 151.6 425.5 154.8Z"
            fill="white"
          />
          <path
            d="M518.5 51.8999C511.7 30.8999 490.3 17.9999 469.2 22.1999C455.4 24.9999 445 32.6999 438.4 45.4999C432.6 56.7999 431.5 68.4999 436.5 80.5999C439.3 87.2999 442.7 93.6999 446.5 99.7999C454.1 112.2 462.9 123.7 472.1 134.9C473.7 136.9 475.4 138.8 477.1 140.8C477.3 140.5 477.5 140.3 477.6 140.2C485.7 130.8 493.4 121 500.5 110.7C506.6 101.9 512.4 92.7999 516.7 82.7999C518.6 78.2999 520.2 73.7999 520.7 68.8999C521.2 63.0999 520.3 57.3999 518.5 51.8999ZM477.1 85.1999C465.1 85.1999 455.1 74.9999 455.1 62.5999C455.1 50.1999 465 39.9999 477.1 40.0999C489.2 40.0999 498.9 50.1999 499 62.5999C499 75.0999 489.2 85.1999 477.1 85.1999Z"
            fill="white"
          />
          <path
            d="M529.9 149C526.8 153.2 522.6 156 518.1 158.3C510.8 162 503.1 164.2 495.1 165.5C488.1 166.7 481 167.2 473.9 167C461.5 166.5 449.4 164.5 437.9 159.2C433 157 428.4 154.2 424.9 150C423 147.8 421.8 145.2 421.6 142.2C421.4 138 423.2 134.7 426.4 132.3C429.8 129.7 433.7 128.3 437.7 127.2C443.9 125.6 450.2 124.8 456.6 124.3C457 124.3 457.3 124.3 457.7 124.2C458.9 123.9 459.6 124.4 460 125.5C456.8 126.1 453.6 126.5 450.4 127.2C444.3 128.5 438.3 130.1 432.9 133.5C431.2 134.6 429.7 136 428.4 137.5C426.7 139.5 426.9 141.8 428.4 144C429.8 146 431.8 147.3 433.8 148.5C438.8 151.3 444.3 152.8 449.8 153.9C461.6 156.4 473.6 156.9 485.6 156.3C495 155.8 504.3 154.5 513.3 151.5C516.5 150.4 519.7 149.1 522.5 147.1C523.5 146.4 524.4 145.6 525.2 144.7C527.4 142.2 527.4 139.5 525.3 136.9C523.7 134.9 521.6 133.6 519.4 132.4C514.1 129.6 508.4 128 502.5 126.9C499.7 126.4 496.9 125.9 494 125.4C494.5 124.2 495.3 123.9 496.5 124.1C501.8 124.9 507.2 125.4 512.5 126.3C516.1 126.9 519.7 127.9 523 129.5C524.5 130.2 526 131 527.3 132C533.2 136.3 534.2 143.2 529.9 149Z"
            fill="white"
          />
          <path
            d="M151.3 128.7H129.2C128.8 128.7 128.3 128.5 128.1 128L106.3 82.7999C98.7 66.9999 94.9 56.8 94.9 52C94.9 47.1 95.6 42 97 36.7999C97.1 36.5999 100 30.7999 100 30.7999C100 30.7999 109.7 14.8 110.1 14.1C110.4 13.6 111 13 111.6 12.9C116.4 11.4 117.8 6.59995 114.4 2.79995C112.4 0.49995 108.6 -0.100038 106.1 1.49996C103.7 2.99996 102.9 5.79996 104 8.99996C104.2 9.59996 104.1 10.5 103.8 11C96.1 23.8 88.4 36.6 80.7 49.4C80.5 49.7 32 127.5 32.2 127.7C32.8 128.2 39.1 132.9 39.2 141.2C39.2 149.6 33 154.3 32.3 154.7H151.2C151.8 154.7 152.4 154.2 152.4 153.5V129.8C152.1 129.5 151.7 129.1 151.3 128.7ZM93.7 128.8C93.2 128.8 92.6 128.8 92.1 128.8H84C82.7 128.8 81.4 128.8 79.9 128.7C79.5 128.7 79.1 128.4 78.9 128.1L71.6 113.1C69.7 109.2 68.7 105.7 68.7 102.7C68.7 101.8 69.2 100.5 70.3 99C71.3 97.4 72.5 95.8999 73.7 94.2999C74.9 92.7 76.1 91.4 77.2 90.2C77.4 90 77.7 89.7999 78 89.7999C78.5 89.7999 79.1 90.2 79.2 90.7999C79.8 94.3999 81.5 99.2 84.3 105.1L94.8 127.2C95.1 127.9 94.6 128.8 93.7 128.8Z"
            fill="white"
          />
          <path
            d="M83.4 37.7C64.8 67.5 46.3 97.2 27.7 127C23.2 123.9 4.40001 113.7 2.00001 108.3C0.100014 103.9 0.200015 99.8 2.70001 95.7C10.2 83.6 17.8 71.5 25.3 59.4C31.5 49.5 37.7 39.6 43.8 29.7C46.8 24.8 51 22.7 56.5 23.2C58.1 23.3 59.8 23.7 61.2 24.5C64.2 25.9 80.5 35.9 83.4 37.7Z"
            fill="white"
          />
          <path
            d="M35.3 141.6C35.3 146.8 31 151 25.8 151C20.4 151 16.1 146.7 16 141.3C16 136 20.3 131.6 25.6 131.6C31.1 131.6 35.3 136 35.3 141.6Z"
            fill="white"
          />
          <path
            d="M491.9 63.1999C491.9 71.1999 485.3 77.5999 477.3 77.5999C469 77.5999 462.4 70.9999 462.3 62.6999C462.2 54.5999 469 47.6999 477 47.7999C485.4 47.7999 491.9 54.4999 491.9 63.1999Z"
            fill="white"
          />
        </svg>
      </LeftSection>
      <RightSection>
        <FormContainer>
          <h2 style={{ textAlign: "center" }}>تسجيل الدخول</h2>
            <form onSubmit={handleSubmit}>
            <MemoizedStyledTextField
            fullWidth
            margin="dense"
            label="البريد الإلكتروني"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MemoizedStyledTextField
            fullWidth
            margin="dense"
            label="الرقم السري"
            type={showPassword.password ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("password")}
                    edge="end"
                  >
                    {showPassword.password ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />
          {error && (
            <MemoizedTypography
              $sx={{ textAlign: "center", color: "red", marginBottom: 2 }}
            >
              {error}
            </MemoizedTypography>
          )}
          <StyledButton
            variant="contained"
            type="submit"
          >
            تسجيل الدخول
          </StyledButton>
          <MemoizedTypography $sx={{ textAlign: "center" }}>
            ليس لديك حساب؟{" "}
            <StyledLink href="/register" $sx={{ ml: 1 }}>
              سجل الآن
            </StyledLink>
          </MemoizedTypography>
          <MemoizedTypography $sx={{ textAlign: "center" }}>
            <StyledLink href="/forgot-password" $sx={{ ml: 1 }}>
              هل نسيت كلمة المرور؟
            </StyledLink>
          </MemoizedTypography>
        </form>
        </FormContainer>
      </RightSection>
    </Container>
  );
};

export default React.memo(LogIn);
