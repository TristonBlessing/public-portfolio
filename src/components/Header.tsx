import { ReactElement } from "react"

type HeadingProps = {title: string}

const Header = ({title}: HeadingProps): ReactElement => {
  return (
    <h1>{title}</h1>
  )
}

export default Header