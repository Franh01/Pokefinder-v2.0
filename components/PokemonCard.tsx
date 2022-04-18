import { Box, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  type1: string;
  type2: string;
  img: string;
  isLoading: boolean;
  id: number;
}

export const PokemonCard: React.FC<Props> = ({
  name,
  type1,
  type2,
  img,
  isLoading,
  id,
}) => {
  const mainStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#FAF5E4",
    borderRadius: "10px",
    maxWidth: "100%",
    border: "3px solid #F8B400",
    cursor: "pointer",
  };
  return (
    <Link href={`pokemonDetail/${id}`}>
      <Box sx={isLoading ? null : mainStyles}>
        {isLoading ? (
          <Skeleton width={"100%"} />
        ) : (
          <Typography>{name}</Typography>
        )}
        {isLoading ? (
          <Skeleton variant="rectangular" width={"100%"} height={200} />
        ) : (
          <Image src={img} alt="" width={200} height={200} />
        )}
        {isLoading ? (
          <Skeleton width={"100%"} />
        ) : (
          <Box sx={{ display: "flex" }}>
            <Typography>{type1}</Typography> <Typography>{type2}</Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};
