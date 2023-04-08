import { NextPage } from 'next';
import { FavoriteCardPokemon } from './FavoriteCardPokemon';
import { Grid } from '@nextui-org/react';

type Props = {
    pokemons: number[]
}

export const FavoritePokemons: NextPage<Props> = ({ pokemons }) => {
  return (
    <Grid.Container
      gap={ 2 }
      direction='row'
      justify='flex-start'
    >
      {
        pokemons?.map( (pokemonId: number) => (
          <FavoriteCardPokemon key={ pokemonId } pokemonId={ pokemonId }/>
        ))
      }
    </Grid.Container>
  )
}
