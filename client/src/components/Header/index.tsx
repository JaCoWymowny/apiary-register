import { Link } from "react-router-dom";
import bee from "../../images/bee.png";
import check from "../../images/check.png";
import update from "../../images/update.png";

import {
  Container,
  Navigation,
  Tittle,
  Logo,
  Image,
  LinkBox
} from "./styles";

const Header = () => {
  return (
    <Container>
      <Logo src={bee} alt=""/>

      <Tittle>Apiary Register</Tittle>

      <Navigation>
        <LinkBox>
          <Link to={"/registry-list"} className="link">
            <Image src={check} alt=""/>Registry List
          </Link>
        </LinkBox>

        <LinkBox>
          <Link to={"/add-apiary"} className="link">
            <Image src={update} alt=""/><span>Add Apiary</span>
          </Link>
        </LinkBox>
      </Navigation>
    </Container>
  )
}

export default Header;
