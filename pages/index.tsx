import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts'
import { NextPage, GetStaticProps } from 'next'
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { Grid } from '@nextui-org/react';
import { PokemonCard } from '@/components/pokemon';

type PokemonsType = {
  pokemons: SmallPokemon[],
}

const HomePage: NextPage<PokemonsType> = ({ pokemons }) => {

  const listadoPokemons = 'Listado de Pokemons';

  return (
    <>
      <Layout title={ listadoPokemons }>
        <Grid.Container
          gap={ 2 }
          justify='flex-start'
        >
          {
            pokemons.map((pokemon) => (
              <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
            ))
          }
        </Grid.Container>
      </Layout>
    </>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
// Sólo se ejecuta del lado del servidor, en el build time y sólo se puede poner dentro de las páginas

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151');
    console.log(data);
    
    const pokemons: SmallPokemon[] = data.results.map((poke, i) => (({
      ...poke,
      id: i + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`,
      //url: `${url.split('/').at(-2)}`,
    }))

    )
  
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage