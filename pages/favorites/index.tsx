import { Layout } from '@/components/layouts'
import { FavoritePokemons, NoFavorites } from '@/components/ui';
import { Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import  localFavorites  from '@/utils/localFavorites';

const FavoritesPage = () => {

  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {

    //let favs: number[] = JSON.parse( localStorage.getItem('favorites')  || '[]' )
    setFavorites( localFavorites.pokemons() );

  }, [])
  
  
  return (
    <Layout title='Pokemons - Favoritos'>
        
      {
        favorites.length === 0 && (<NoFavorites />)
      }
      {
        favorites && (
          <FavoritePokemons pokemons={ favorites } />
        )
      }
    </Layout>
    
  )
}

export default FavoritesPage
