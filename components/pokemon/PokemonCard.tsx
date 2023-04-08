import { SmallPokemon } from "@/interfaces"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { NextPage } from "next"
import { useRouter } from "next/router"

type Props = {
    pokemon: SmallPokemon
}

export const PokemonCard: NextPage<Props> = ({ pokemon }) => {

    const router = useRouter();

    const { id, img, name } = pokemon;

    const onClick = () => {
        //router.push(`/pokemon/${ id }`);
        router.push(`/name/${ name }`);
    }

  return (
    <Grid
        xs={ 6 }
        sm={ 3 }
        md={ 2 }
        xl={ 1 }
    >
        <Card
            isHoverable
            isPressable
            onClick={ onClick }
        >

        
        <Card.Body
            css={{ p: 1 }}
        >
            <Card.Image
            src={ img }
            //objectFit="cover"
            width='100%'
            height={ 140 }
            alt={ name }
            />
        </Card.Body>

        <Card.Footer css={{ justifyItems: "flex-start" }}>
            <Row wrap="wrap" justify="space-between" align="center">
            <Text transform='capitalize'>{ name }</Text>
            <Text
                css={{
                color: "$accents7",
                fontWeight: "$semibold",
                fontSize: "$sm" }}
            >
                #{ id }
            </Text>
            </Row>
        </Card.Footer>
        </Card>  
    </Grid>
  )
}
