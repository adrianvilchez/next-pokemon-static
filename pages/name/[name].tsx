import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts/Layout';
import { pokeApi } from '@/api';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Pokemon, PokemonListResponse } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import  localFavorites  from '@/utils/localFavorites';

import confetti from 'canvas-confetti';
import { getPokemonInfo } from '@/utils/getPokemonInfo';

interface Props {
  pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
    

  const [existOnFavorite, setExistOnFavorite] = useState( false );

  const onToggleFavorites = () => {

    localFavorites.toggleFavorite( pokemon.id );
    
    setExistOnFavorite( !existOnFavorite );

    if ( !existOnFavorite ) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -170,
        origin: {
          x: 1,
          y: 0,
        }
      });
    }
    
  }

  useEffect(() => {
    setExistOnFavorite( localFavorites.pokemonsExistInFavorites( pokemon.id ) );
  }, [])
  
  

  return (
    <Layout
      title={ pokemon.name }
    >      

      <Grid.Container
        css={{ marginTop: '5px' }}
        gap={ 4 }
      >
        <Grid
          xs={ 12 }
          sm={ 4}
        >
          <Card
            isHoverable
            isPressable
            css={{ padding: '20px' }}
          >
              <Card.Body>
                <Card.Image
                  src={ pokemon.sprites.other?.dream_world.front_default || '/no-image-png' }
                  alt={ pokemon.name }
                  width='100%'
                  height={ 200 }
                >
                </Card.Image>
              </Card.Body>

          </Card>
        </Grid>

        <Grid
          xs={ 12 }
          sm={ 8 }
        >
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between'}}
            >
              <Text h1 transform='capitalize'>{ pokemon.name }</Text>

              <Button
                color='gradient'
                ghost
                onPress={ onToggleFavorites }
              >
                { !existOnFavorite ? 'Guardar en favoritos' : 'Eliminar de favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={ 30 }>Sprites:</Text>

              <Container direction='row' display='flex' gap={ 0 }>
                <Image
                    src={ pokemon.sprites.front_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.back_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.front_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.back_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {


    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
    const { results } = data;
    

  const pokemonNames: string[] = results.map( pokemon => pokemon.name );

  


  return {
    paths: pokemonNames.map( name => ({
      params: { name }
    })),
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
  const { name } = params as { name: string };
  
return {
  props: {
    pokemon: await getPokemonInfo( name )
  }
}
}

export default PokemonByNamePage