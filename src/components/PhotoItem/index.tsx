import React from 'react'
import * as k from './styles'

type Props = {
    url: string;
    name: string;
}

const PhotoItem = ({url, name}:Props) => {
  return (
    <k.Container>
        <img src={url} alt={name}/>
        {name}
    </k.Container>
  )
}

export default PhotoItem