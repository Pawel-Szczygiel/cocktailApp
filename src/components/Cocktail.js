import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({id, name, img, info, glass}) => {
  return (
    <article className='cocktail'>
        <Link to={`cocktail/${id}`}>
          <div className='img-container'>
            <img src={img} alt={name} />
          </div>
          <div className='cocktail-footer'>
            <h3>{name}</h3>
            <h4>{glass}</h4>
            <p>{info}</p>
          </div>
        </Link>
    </article>
  )
}

export default Cocktail
