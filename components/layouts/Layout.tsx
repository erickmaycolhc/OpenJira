import { Box } from "@mui/material";
import Head from "next/head";
import { Navbar, SideBar } from "../ui";
import React from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout = ({ title = "OpenJira", children }: Props) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <SideBar />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
