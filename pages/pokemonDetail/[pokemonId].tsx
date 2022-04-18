import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

const PokemonDetail: NextPage = ({ data }: any) => {
  const pokemon = {
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    height: data.height,
    weigth: data.weight,
    img: data.sprites.other["official-artwork"].front_default,
    hp: data.stats.filter((stat: any) => stat.stat.name === "hp")[0].base_stat,
    attack: data.stats.filter((stat: any) => stat.stat.name === "attack")[0]
      .base_stat,
    defense: data.stats.filter((stat: any) => stat.stat.name === "defense")[0]
      .base_stat,
    speed: data.stats.filter((stat: any) => stat.stat.name === "speed")[0]
      .base_stat,
    type1:
      data.types[0].type.name.charAt(0).toUpperCase() +
      data.types[0].type.name.slice(1),
    type2: data.types[1]
      ? data.types[1].type.name.charAt(0).toUpperCase() +
        data.types[1].type.name.slice(1)
      : null,
  };
  const goBack = window.location.href.slice(0, -1) + (data.id - 1);
  const goNext = window.location.href.slice(0, -1) + (data.id + 1);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Head>
        <title>{pokemon.name}</title>
        <meta name="description" content={`This is ${pokemon.name}!`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.id > 1 && (
        <Link href={goBack}>
          <Tooltip title="Back">
            <IconButton>
              <ArrowBackIosNewIcon
                sx={{
                  width: "4rem",
                  height: "4rem",
                  fill: "#272727",
                }}
              />
            </IconButton>
          </Tooltip>
        </Link>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF5E4",
          borderRadius: "10px",
          padding: "1rem",
          border: "4px solid #FF6363",
        }}
      >
        <Typography
          variant="h1"
          fontWeight={400}
          color="inherit"
          fontSize={"5rem"}
        >
          {pokemon.name}
        </Typography>
        <Image src={pokemon.img} width={400} height={400}></Image>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <Tooltip title="Height" arrow placement="left-start">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/media/HeightArrow.svg"
                  width={40}
                  height={40}
                ></Image>
                <Typography
                  variant="h4"
                  fontSize={25}
                  fontWeight={500}
                  textAlign="center"
                >
                  {pokemon.height}
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title="Weight" arrow placement="right-start">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/media/WeightScale.svg"
                  width={40}
                  height={40}
                ></Image>
                <Typography
                  variant="h4"
                  fontSize={25}
                  textAlign="center"
                  fontWeight={500}
                >
                  {pokemon.weigth}
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <Tooltip title="Attack" arrow placement="left-start">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/media/AttackSword.svg"
                  width={40}
                  height={40}
                ></Image>
                <Typography
                  variant="h4"
                  fontSize={25}
                  fontWeight={500}
                  textAlign="center"
                >
                  {pokemon.attack}
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title="Defense" arrow placement="right-start">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/media/DefenseShield.svg"
                  width={40}
                  height={40}
                ></Image>
                <Typography
                  variant="h4"
                  fontSize={25}
                  textAlign="center"
                  fontWeight={500}
                >
                  {pokemon.defense}
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <Tooltip title="HP" arrow placement="left-start">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src="/media/HPHeart.svg" width={40} height={40}></Image>
                <Typography
                  variant="h4"
                  fontSize={25}
                  fontWeight={500}
                  textAlign="center"
                >
                  {pokemon.hp}
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title="Speed" arrow placement="right-start">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/media/SpeedFeather.svg"
                  width={40}
                  height={40}
                ></Image>
                <Typography
                  variant="h4"
                  fontSize={25}
                  textAlign="center"
                  fontWeight={500}
                >
                  {pokemon.speed}
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      <Tooltip title="Next">
        <Link href={goNext}>
          <IconButton>
            <ArrowForwardIosIcon
              sx={{
                width: "4rem",
                height: "4rem",
                fill: "#272727",
              }}
            />
          </IconButton>
        </Link>
      </Tooltip>
    </Box>
  );
};

export async function getServerSideProps(ctx: any) {
  // Fetch data from external API
  const { pokemonId } = ctx.query;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default PokemonDetail;
