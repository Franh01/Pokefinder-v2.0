import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { PokemonCard } from "../../components/PokemonCard";

const Pokemons: NextPage = () => {
  const shimmerArray = Array.from({ length: 20 }, (_, i) => i + 1);
  const [data, setData]: any = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsToFetch, setPokemonsToFech] = useState(0);
  const getAllPokemon = () => {
    let urls = [];
    for (let i = pokemonsToFetch; i < 20 * currentPage; i++) {
      urls.push(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
    }
    return urls;
  };

  let allPokemonsUrls = getAllPokemon();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPokemonsToFech((value - 1) * 20);
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all(
      allPokemonsUrls.map((url) => fetch(url).then((res) => res.json()))
    ).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [currentPage]);

  return (
    <Box
      sx={{
        width: "80%",
        margin: "auto",
        height: "100%",
      }}
    >
      <Head>
        <title>Pokefinder</title>
        <meta name="description" content="Search for a pokemon!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography>Pokemons</Typography>
      {isLoading ? (
        <Grid container spacing={2}>
          {shimmerArray.map((i: any) => (
            <Grid item xs={12} md={6} lg={3} key={i}>
              <PokemonCard
                name={"null"}
                type1={"null"}
                type2={"null"}
                img={"null"}
                isLoading={isLoading}
                id={i}
              ></PokemonCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        data && (
          <Grid container spacing={2}>
            {data.map((pokemon: any) => {
              const name =
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
              const imgUrl =
                pokemon.sprites.other["official-artwork"].front_default;
              const type1 =
                pokemon.types[0].type.name.charAt(0).toUpperCase() +
                pokemon.types[0].type.name.slice(1);
              const type2 = pokemon.types[1]
                ? pokemon.types[1].type.name.charAt(0).toUpperCase() +
                  pokemon.types[1].type.name.slice(1)
                : null;
              return (
                <Grid item xs={12} md={6} lg={3} key={pokemon.id}>
                  <PokemonCard
                    name={name}
                    type1={type1}
                    type2={type2}
                    img={imgUrl}
                    isLoading={isLoading}
                    id={pokemon.id}
                  ></PokemonCard>
                </Grid>
              );
            })}
          </Grid>
        )
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "2rem",
          mb: "2rem",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={44}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={handleChangePage}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Pokemons;
