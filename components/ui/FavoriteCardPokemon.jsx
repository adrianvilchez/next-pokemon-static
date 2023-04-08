import { Card, Grid } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const FavoriteCardPokemon = ({ pokemonId }) => {

    const router = useRouter();

    const onFavoriteClicked = () => {

        router.push(`/pokemon/${ pokemonId }`);
    }

  return (
    <Grid
        xs={ 6 }
        sm={ 3 }
        md={ 2 }
        xl={ 1 }
        onClick={ onFavoriteClicked }
    >
        <Card
        isHoverable
        isPressable
        css={{
            padding: 10
        }}>
        <Card.Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemonId }.svg`}
            width={ '100%' }
            height={ 140 }
        />
        </Card>
    </Grid>
  )
}
