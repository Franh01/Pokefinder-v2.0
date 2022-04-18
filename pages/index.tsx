import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Head>
        <title>Pokefinder</title>
        <meta name="description" content="Search for a pokemon!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h1">Pokefinder</Typography>
      <Typography variant="h2">Landing page</Typography>
      <Link href="/pokemons">
        <Button variant="contained">Comenzar</Button>
      </Link>
    </Box>
  );
};

export default Home;
