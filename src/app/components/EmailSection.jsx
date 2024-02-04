"use client"
import React, { useState } from "react"
import GithubIcon from "../../../public/github-icon.svg"
import Link from "next/link"
import Image from "next/image"
import { Box, Button, Spinner, useToast } from "@chakra-ui/react"

const EmailSection = () => {
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const sendMail = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subject,
          message,
        }),
      })

      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
      console.log(await response.json())

      setEmail("")
      setSubject("")
      setMessage("")

      //show notif
      toast({
        title: "Send Successfully",
        description: "Your email has been sent successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          {" "}
          I&apos;m currently looking for new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I&apos;ll try my best to get
          back to you!
        </p>

        <div className="socials flex flex-row gap-3">
          <Link href="https://github.com/tajulsubqi">
            <Image
              src={GithubIcon}
              alt="Github Icon"
              width={35}
              height={35}
              className="hover:scale-110 hover:duration-300 hover:transition"
            />
          </Link>

          <Link href="https://www.linkedin.com/in/tajulsubqi">
            <img
              src="../../../images/linkedin.png"
              alt="Linkedin Icon"
              width={35}
              height={35}
              className="hover:scale-110 hover:duration-300 hover:transition"
            />
          </Link>

          <Link href="https://www.instagram.com/tajulsubqi">
            <img
              src="../../../images/instagram.png"
              alt="Instagram Icon"
              width={35}
              height={35}
              className="hover:scale-110 hover:duration-300 hover:transition"
            />
          </Link>

          <Link href="https://wa.link/borlkj">
            <img
              src="../../../images/whatsapp.png"
              alt="whatsapp Icon"
              width={35}
              height={35}
              className="hover:scale-110 hover:duration-300 hover:transition"
            />
          </Link>
        </div>
      </div>

      <div>
        <form onSubmit={sendMail} className="flex flex-col">
          <div className="mb-6">
            <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
              Your email
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="example@mail.com"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="subject"
              className="text-white block text-sm mb-2 font-medium"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              id="subject"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Just saying hi"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="text-white block text-sm mb-2 font-medium"
            >
              Message
            </label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              className="bg-[#18191E] border border-[#14172a] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Let's talk about..."
            />
          </div>

          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            {isLoading ? (
              <Button type="submit" bg={"purple.500"}>
                <Spinner color="white" />
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  bg={"purple.500"}
                  _hover={{ bg: "purple.600" }}
                  fontSize={"lg"}
                  color={"white"}
                  width={{ base: "100%" }}
                  height={{ base: "10", md: "12" }}
                >
                  Send Message
                </Button>
              </>
            )}
          </Box>
        </form>
      </div>
    </section>
  )
}

export default EmailSection
