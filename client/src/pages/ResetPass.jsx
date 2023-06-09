import React, { useState, useEffect } from "react";
import styles from "../styles/reset.module.css";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const [isDisable, setDis] = useState(true);
  const [passErr, setErr] = useState(false);
  const [showPass, setShow] = useState(false);
  const [password, setPass] = useState("");
  const [otp, setOtp] = useState();
  const [confirmPass, setConfirmPass] = useState("");
  const [invalidOtp, setInvalid] = useState(false);
  const navigate = useNavigate()
  const toast = useToast();

  const handleReset = () => {
    let div1 = document.querySelector("#div1");
    let div2 = document.querySelector("#div2");

    if (validator.isStrongPassword(password) && password === confirmPass) {
      /// move further and fetch forget password API
      setErr(null);
      // axios.post("http://localhost:8080/auth/reset")
      if (otp && password) {
        const payload = {
          otp: otp,
          password: password,
        };
        axios.post("https://lazy-ruby-leopard-kilt.cyclic.app/auth/reset", payload).then((res) => {
          if (res.status === 200) {
            setInvalid(false)
            div1.style.display = "none";
            div2.style.display = "block";
            toast({
              title: "Password Reset Success.",
              description: "you've changed your password.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
        }).catch((err) => {
          if(err.response.status === 401){
            setInvalid(true)
          }
        })
      }
    } else if (password?.length < 8) {
      setErr("password length must be 8");
    } else if (password !== confirmPass) {
      setErr("password not matched");
    } else {
      setErr("password must be alphanumeric");
    }
  };

  useEffect(() => {
    if (password && confirmPass) {
      setDis(false);
    } else {
      setDis(true);
    }
  }, [password, confirmPass]);

  return (
    <Box className={styles.container}>
      <Box className={styles.logo}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17AUEhLvh0V_XYDZYeHh4Mq7xXHYNY6DKMlgT6_Y5&s"
          alt="masai logo"
          width={"10%"}
        />
      </Box>
      <Box className={styles.cont}>
        <Box className={styles.box1}>
          <Box>
            <Box className={styles.small}>
              <Text fontSize={"30px"} lineHeight="40px" fontWeight={600}>
                Get access to one-step solution for securing your dream
                internship
              </Text>
              <Flex className={styles.flex}>
                <AiFillCheckCircle color="#4358F6" fontSize={"30px"} />
                <Text>
                  earn a stipend upto 6000 by inrolling in india's first outcome
                  based internship program or get ALL of your money back.
                </Text>
              </Flex>
              <Flex className={styles.flex}>
                <AiFillCheckCircle color="#4358F6" fontSize={"30px"} />
                <Text>
                  start learning with certified certificate-relevent course
                  videos and 1000+ practice questions to make you unstoppable.
                </Text>
              </Flex>
              <Flex className={styles.flex}>
                <AiFillCheckCircle color="#4358F6" fontSize={"30px"} />
                <Text>
                  earn a stipend upto 6000 by inrolling in india's first outcome
                  based internship program or get ALL of your money back.
                </Text>
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box className={styles.box2}>
          <Box className={styles.form}>
            <Text fontSize={"24px"} fontWeight={600}>
              Reset Password
            </Text>
            <Box id="div1" className={styles.afterDiv1}>
              <Text textAlign={"center"}>
                your new password must be different from previously used
                password
              </Text>
              <Box className={styles.btns}>
                <Text textAlign={"start"}>Enter Otp</Text>
                <HStack>
                  <PinInput onChange={(e) => setOtp(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <Box className={styles.errorTxt}>
                  {invalidOtp ? <Text>Invalid OTP</Text> : null}
                </Box>
                <Text textAlign={"start"}>New password</Text>
                <Input
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Create a new password"
                />
                <Text mt={4} textAlign={"start"}>
                  Confirm password
                </Text>
                <Input
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm passowrd"
                />
                <Box className={styles.msgTxt}>
                  <Checkbox onChange={(e) => setShow(e.target.checked)}>
                    show password
                  </Checkbox>
                </Box>
                <Box mt={3}>
                  {passErr ? (
                    <Text fontWeight={600} textAlign={"start"} color="red">
                      {passErr}
                    </Text>
                  ) : null}
                </Box>
                <Button
                  isDisabled={isDisable}
                  bg={"#4358F6"}
                  mt="20px"
                  color={"white"}
                  outline="none"
                  w="100%"
                  onClick={handleReset}
                >
                  RESET PASSWORD
                </Button>
                <Button mt="20px">CANCEL</Button>
              </Box>
            </Box>
            <Box id="div2" className={styles.afterDiv2}>
              <Box m="auto">
                <Text>
                  Your password is successfully reset. Click below to sign in
                  your account.
                </Text>
              </Box>
              <Button
                w="50%"
                fontWeight={400}
                m="20px"
                bg={"#4358F6"}
                color="white"
                onClick={()=>navigate("/signin")}
              >
                SIGN IN
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPass;
